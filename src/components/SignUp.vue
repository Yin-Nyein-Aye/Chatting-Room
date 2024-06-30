<template>
  <h1>Sign Up</h1>
  <form @submit.prevent="signUp">
    <label>Name</label>
    <input type="text" v-model="userName">
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
import useSignUp from "../composables/useSignUp"
export default {
    setup(props,context){
        let userName = ref("");
        let email = ref("");
        let password = ref("");
        let {error,createAccount} = useSignUp();
        let signUp = async()=>{
          let res = await createAccount(email.value,password.value,userName.value)
          context.emit("chattingRoom");
        }
        return {userName,email,password,signUp,error}
    }
}
</script>

<style>

</style>