<template>
  <h1>Login</h1>
  <form @submit.prevent="login">    
    <label>Email</label>
    <input type="text" v-model="email">
    <label>Password</label>
    <input type="password" v-model="password">
    <div v-if="error" class="error">
      <p>{{error}}</p>
    </div>
    <button>Submit</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import useSignIn from "../composables/useSignIn";
export default {
  setup(props,context){
    let email = ref("");
    let password = ref("");
    let {error,signInAccount} = useSignIn();
    let login = async()=>{
      let res = await signInAccount(email.value,password.value)
      if(res){
        context.emit("chattingRoom");
      }
    }
    return {email,password,login,error}
  }
}
</script>

<style>

</style>