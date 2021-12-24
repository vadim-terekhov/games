<template>
  <div class="sidebar">
    <h3>Пользователь</h3>
    <div class="sidebar-img-conteiner">
      <img class="sidebar-img" src="@/assets/user.png" alt="User">
    </div>
    <div class="sidebar-username">
      Иванов Иван
      <p>Баланс: <span>{{ balance }}</span></p>
    </div>
    <button
      class="sidebar-logout"
      @click="Logout"
    >Выход</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Sidebar',
  data(){
    return{
      timerId: null,
    }
  },
  computed: mapGetters(['getToken','balance']),
  methods: {
    ...mapActions(['logout','fetchBalance']),
    Logout(){
      this.logout().then(
        () => {
          this.$router.push({name: 'login'});
        }
      );
    },
    getBalance(){
      if(this.timerId){
        clearInterval(this.timerId);
      }else{
        this.fetchBalance(this.getToken);
        this.timerId = setInterval(() => {
          console.log('get balance');
          this.fetchBalance(this.getToken);
        }, 30000);
      }
    }
  },
  created(){
    this.getBalance();
  },
  beforeDestroy(){
    this.getBalance();
  }
}
</script>

<style scoped>
.sidebar{
  position: relative;
  border-right: 1px solid white;
  width: 25%;
  flex: 1 0 25%;
  height: 100%;
  margin-right: 5px;
  overflow: hidden;
}
.sidebar-img-conteiner{
  max-width: 100px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;
}
.sidebar-img{
  display: block;
  width: 100%;
}
.sidebar-logout{
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  text-transform: uppercase;
  padding: 10px;
  color: white;
  background-color:brown;
  border: 0;
  transition: all 0.5s;
  }
.sidebar-logout:hover{
  cursor: pointer;
  border-radius: 7px;
   background-color:rgb(104, 27, 27);
}
</style>