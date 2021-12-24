import axios from 'axios';

export default {
  state:{
    balance: 0,
  },
  getters:{
    balance(state){
      return state.balance;
    }
  },
  mutations:{
    setBalance(state,value){
      state.balance = value;
    }
  },
  actions:{
    async fetchBalance({commit},token){
      const url = `https://poker.evenbetpoker.com/api/web/v2/users/me/balance?clientId=default&auth=${token}`;
      if (localStorage.getItem('token') === token) {
        try {
          const data = await axios.get(url);
          const balance = data.data.data[0].attributes.available;
          commit('setBalance',balance);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
}