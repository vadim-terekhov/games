import axios from 'axios';

export default {
  state:{
    token: localStorage.getItem('token') || '',
    refreshToken: localStorage.getItem('refresh-token') || '',
    timer: localStorage.getItem('timer') || false,
  },
  getters:{
    getToken(state){
      return state.token;
    },
    isAuth(state){
      return !!state.token;
    }
  },
  mutations:{
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken;
      localStorage.setItem('refresh-token', refreshToken); 
    },
    setTimer(state,value){
      state.timer = value;
      localStorage.setItem('timer', value);
    }
  },
  actions:{
    async fetchToken({commit,dispatch, state},formData){
      const url = `https://poker.evenbetpoker.com/api/web/v2/login`;
      try {
        const data = await axios.post(url,{
          clientId: 'default',
          login: formData.login,
          password: formData.password,
        });
        const token = data.data.data[0].attributes.token;
        const refreshToken = data.data.data[0].attributes['refresh-token'];
        commit('setToken', token);
        commit('setRefreshToken', refreshToken);
        commit('setTimer',true);
        dispatch('startTimer');
        console.log('start');
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh-token');
        console.error(error);
      }
    },
    startTimer({state,dispatch}){
      if(state.timer){
        let timerId = setInterval(() => {
          dispatch('updateTimeToken', state.refreshToken);
        }, 800000);
        localStorage.setItem('timerId', timerId);
      }else{
        clearInterval(localStorage.getItem('timerId'));
      }
    },
    logout({commit,dispatch}){
      localStorage.removeItem('token');
      localStorage.removeItem('refresh-token');
      localStorage.removeItem('timer');
      commit('setToken','');
      commit('setRefreshToken','');
      commit('setTimer','');
      dispatch('startTimer');
    },
    async updateTimeToken({commit},refreshToken){
      console.log('refresh token');
      const url = `https://poker.evenbetpoker.com/api/web/auth/token`;
      try {
        const data = await axios.post(url,{
          clientId: 'default',
          refreshToken: refreshToken,
        });
        const newToken = data.data.token;
        const newRefreshToken = data.data['refresh-token'];
        commit('setToken', newToken);
        commit('setRefreshToken', newRefreshToken);
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh-token');
        console.error(error);
      }
    }
  }

}