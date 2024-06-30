<template>
  <form>
    <textarea placeholder="text message" v-model="message" @keypress.enter="HandleEnter"></textarea>
  </form>
</template>

<script>
import { ref } from 'vue'
import { serverTimestamp } from '../firebase/config';
import getUser from '@/composables/getUser';
import useCollection from "../composables/useCollection";
export default {
    setup(){
        let message = ref("");
        let {user} = getUser();
        let {error,addMessage} = useCollection("messages");
        let HandleEnter = async()=>{
            let chat = {
                message : message.value,
                name : user.value.displayName,
                created_at : serverTimestamp()               
            }
            await addMessage(chat);
            message.value = "";

        }
        return {HandleEnter,message}
    }

}
</script>

<style>
form{
    padding: 20px;
}
textarea{
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 20px;
    box-sizing: border-box;
    font-family: inherit;
    border: 1px solid rgb(231, 229, 229);
}
</style>