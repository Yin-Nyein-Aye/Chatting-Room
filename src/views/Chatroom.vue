<template>
  <div class="container">
    <Navbar></Navbar>
    <ChatWindow></ChatWindow>
    <NewChatForm></NewChatForm>    
  </div>
</template>

<script>
import ChatWindow from '../components/ChatWindow'
import NewChatForm from '../components/NewChatForm'
import { watch } from 'vue'
import Navbar from '../components/Navbar';
import {useRouter} from "vue-router";
import getUser from "../composables/getUser";

export default {
  components: {
    ChatWindow,
    NewChatForm, Navbar },
  setup(){
    let router = useRouter();
    let {user} = getUser();
    watch(user,()=>{
      if(!user.value){
        router.push("/");
      }
    })    
  }

}
</script>

<style>

</style>