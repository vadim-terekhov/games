<template>
  <div class="login">
    <h3 class="login-title">Страница входа</h3>
    <div v-if="error">
      <p class="login-error">Не верный логин/пароль</p>
    </div>
    <form 
      @submit.prevent="handlerSubmit"
      class="login-form"
    >
      <div class="login-form-row">
        <my-input 
          :config="configFieldsInput.login"
          v-model.trim="formData.login"
        />
        <my-input 
          :config="configFieldsInput.password"
          v-model.trim="formData.password"
        />
      </div>
      <button
        class="login-send"
      >Войти</button>
    </form>
  </div>
</template>

<script>
import {configFieldsInput} from '@/components/Forms/MyInputConfig.js';
import MyInput from '@/components/Forms/MyInput.vue';
import { mapActions } from 'vuex';
export default {
  name: 'LoginPage',
  components: {
    MyInput,
  },
  data(){
    return{
      configFieldsInput,
      formData: {
        login: '',
        password: '',
      },
      error: false,
    }
  },
  methods: {
    ...mapActions(['fetchToken']),
    async handlerSubmit(){
      if ((this.formData.login !== 'entest') || (this.formData.password !== '123456')){
        this.error = true;
        this.formData.login = '';
        this.formData.password = '';
      }else{
        this.error = false;
        this.fetchToken(this.formData).then(
          () => {
            this.$router.push({name: 'main'});
          }
        );
      }
    }
  }
}
</script>

<style scoped>
.login-title{
  margin-bottom: 50px;
  margin-top: 0;
  padding-top: 20px;
}
.login-error{
  color: brown;
}
.login-form{
  width: 300px;
  margin: 0 auto;
}
.login-form-row{
  border: 1px solid white;
  padding: 15px;
  margin-bottom: 10px;
}
.login-send{
  text-transform: uppercase;
  padding: 10px;
  color: white;
  background-color:darkcyan;
  border: 0;
  transition: all 0.5s;
}
.login-send:hover{
  cursor: pointer;
  border-radius: 7px;
  background-color:rgb(0, 77, 77);
}
</style>