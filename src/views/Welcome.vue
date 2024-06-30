<template>
  <div class="welcome container">
    <div v-if="showLoginForm">
      <Login @chattingRoom="chattingRoom"></Login>
      <p>
        You don't have an account? <span @click="showLoginForm=!showLoginForm">create account</span>
      </p>
    </div>
    <div v-else>
      <SignUp @chattingRoom="chattingRoom"></SignUp>
      <p>You have an account? <span @click="showLoginForm=!showLoginForm">Login</span></p>
    </div>    
  </div>
</template>

<script>
import { ref } from 'vue';
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import {useRouter} from "vue-router";
export default {
  components: {Login, SignUp },
  setup(){
    let showLoginForm = ref(true);
    let router = useRouter();
    let chattingRoom = ()=>{
      router.push({name:"chatroom"})
    }
    return {showLoginForm,chattingRoom}
  }
}
</script>

<style>
.welcome{
  text-align: center;
  padding: 20px 0;
}
.welcome form{
  width: 300px;
  margin: 20px auto;
}
.welcome label{
  display: block;
  margin: 20px 0 5px;
}
.welcome input{
  width: 100%;
  padding: 10px 30px;
  border-radius: 20px;
  border: 1px solid #eee;
  outline: none;
  color: #999;
  margin: 10px auto;
  letter-spacing: 2px;
}
.welcome span{
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
.welcome button{
  margin: 20px auto;
}
</style>