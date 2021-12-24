<template>
  <div class="main-page">
    <sidebar />
    <catalog 
    />
  </div>
</template>

<script>
import Catalog from '../components/Catalog.vue';
import Sidebar from '../components/Sidebar.vue';
import { mapGetters } from 'vuex';
export default {
  components: { Sidebar, Catalog },
  name: 'MainPage',
}
</script>

<style scoped>
.main-page{
  height: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
}
.main-page-catalog{
  flex: 1 0 75%;
}

</style>