<template>
    <div class="chat-window">
        <div class="messages" ref="msgBox">        
            <div v-for="message in formatedMessages" :key="message.id" class="singleMessage" :class="{'message-left':message.name !== user.displayName, 'message-right':message.name === user.displayName}"> 
                <span class="name">{{message.name}}</span>
                <span class="message">{{message.message}}</span>
                <span class="created_at">{{message.created_at}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import {db} from "../firebase/config"
import { computed, onUpdated, ref } from 'vue'
import {formatDistanceToNow} from "date-fns"
import getUser from "../composables/getUser";
export default {
    setup(){        
        let messages = ref([]);
        let msgBox = ref(null);
        onUpdated(()=>{
            msgBox.value.scrollTop=msgBox.value.scrollHeight;
        })
        let formatedMessages=computed(()=>{
            return messages.value.map((msg)=>{
                let formatTime=formatDistanceToNow(msg.created_at.toDate());
                return{...msg,created_at:formatTime}              
            })
        })
        let getMsg = collection(db,"messages");
        let MsgOrder = query(getMsg,orderBy("created_at","asc"));
        onSnapshot(MsgOrder,(snap)=>{
            let results = [];
            snap.docs.forEach((doc)=>{
                let document = {...doc.data(),id:doc.id}
                doc.data().created_at && results.push(document);
            })
            messages.value = results;
        })
        let {user} = getUser();
        return {messages,formatedMessages,msgBox,user};
    }
}
</script>

<style>
.chat-window{
    padding: 10px;
    margin: 15px;    
    border-radius: 10px;
}
.singleMessage{
    margin-bottom: 20px;
}
.created_at{
    margin-top: 5px;
    display: block;
    font-size: 10px;    
    font-style: italic;
    color: rgb(194, 189, 189);
    padding-left: 5px;
}
.name{
    display: block;
    color: rgb(127, 126, 126);
    margin: 5px;
    font-weight: bold;
}
.message{
    display: inline-block;
    background: paleturquoise;
    border-radius: 15px 5px;
    padding: 5px;
}
.messages{
    display: flex;
    flex-direction: column;
    max-height: 400px;
    overflow: auto;
    padding-right: 20px;   
    scrollbar-width: thin;
    border-radius: 20px;
    scrollbar-color: #cce6e7 #ffffff;    
}

.message-left {
  align-self: flex-start; 
}
.message-right {
  align-self: flex-end;
}
</style>