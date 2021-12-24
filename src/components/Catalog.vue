<template>
  <div class="catalog">
    <h3 class="catalog-title">Список игр</h3>
    <div
      v-if="showPreload"
    >
      Подождите...
    </div>
    <div v-else>
      <div class="catalog-conteiner"
        v-if="games"
      >
        <game-cart 
          v-for="item in games"
          :key="item.id"
          :item="item"
        />
      </div>
      <div v-else>
        Записей нет...
      </div>
    </div>
  </div>
</template>

<script>
import GameCart from '@/components/Catalog/GameCart.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  components:{ GameCart },
  name: 'Catalog',
  computed: mapGetters(['games','getToken','showPreload']),
  methods: mapActions(['fetchGames']),
  created(){
    this.fetchGames();
  }
}
</script>

<style scoped>
  .catalog{
    flex: 1 0 74%;
    overflow-y: scroll;
  }
  .catalog-title{
    position: sticky;
    top: 0;
    z-index: 1;
    background-color:#2c3e50;
    margin: 0;
    height:50px;
    line-height: 50px;

  }
  .catalog-conteiner{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>