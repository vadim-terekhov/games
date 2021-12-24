<template>
  <div class="game-cart" :data-id="item.id">
    <div class="game-cart-conteiner">
      <img 
        class="game-cart-image"
        :src="item.image" :alt="item.title"
      >
    </div>
    <div class="game-cart-title">
      {{ item.title }}
    </div>
    <button class="game-cart-btn"
      @click="handlerClick(item.id)"
    >Play Demo</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'GameCart',
  props:{
    item: {
      type: Object,
      default: () => {},
    }
  },
  computed: mapGetters(['link']),
  methods:{
    ...mapActions(['fetchLinkGame']),
    async handlerClick(id){
      await this.fetchLinkGame(id);
      if (this.link !== ''){
        //window.location.href = this.link;
        window.open(this.link, '_blank');
      }
    }
  }
}
</script>

<style scoped>
.game-cart{
  border: 1px solid white;
  max-width: 306px;
  width: 100%;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content:space-around;
  padding: 5px;
  margin: 5px;
}
.game-cart-conteiner{
  height: 200px;
  margin-bottom: 15px;
}
.game-cart-image{
  display: block;
  width: 100%;
  height: 100%;
}
.game-cart-title{
  margin-bottom: 15px;
}
.game-cart-btn{
  text-transform: uppercase;
  padding: 10px;
  color: white;
  background-color:darkcyan;
  border: 0;
  transition: all 0.5s;
  width: 50%;
  margin: 0 auto 5px auto;
}
.game-cart-btn:hover{
  cursor: pointer;
  border-radius: 7px;
  background-color:rgb(0, 77, 77);
}
</style>