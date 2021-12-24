import axios from 'axios';
export default {
  state:{
    games: [],
    link: '',
    delay: 0,
  },
  getters:{
    games(state){
      return state.games;
    },
    link(state){
      return state.link;
    },
    showPreload(state){
      return state.delay > 0;
    }
  },
  mutations:{
    setGames(state, games){
      state.games = games;
    },
    setLink(state, link){
      state.link = link;
    },
    isPreload(state){
      state.delay++;
    },
    notPreload(state){
      state.delay--;
    }
  },
  actions:{
    async fetchGames({commit}){
      const url = `https://poker.evenbetpoker.com/api/web/v2/casino/games`;
      try {
        commit('isPreload');
        const data = await axios.get(url);
        commit('notPreload');
        const allGames = data.data.data;
        const newGames = [];
        for(let i of allGames){
          newGames.push({
            id: i.id,
            title: i.attributes.title,
            image: i.attributes.image,
          });
        }
        commit('setGames',newGames);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchLinkGame({commit},id){
      const urlOneGame = `https://poker.evenbetpoker.com/api/web/v2/casino/games/${id}/session-demo`;
      try {
        const oneGame = await axios.post(urlOneGame,{
          clientId: 'default-client',
          gameId: id,
        });
        const linkGame = oneGame.data.data[0].attributes['launch-options']['game-url'];
        commit('setLink',linkGame);
      } catch (error) {
        console.error(error);
      }
    }
  },
}