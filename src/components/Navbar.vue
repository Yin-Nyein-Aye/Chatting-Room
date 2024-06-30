<template>
    <nav v-if="user">
        <div>
            <p class="Username">User Name : {{user.displayName}}</p>
            <p class="email">Email : {{user.email}}</p>
        </div>
        <div>
            <button @click="logout">Logout</button>
        </div>
    </nav>
</template>

<script>
import { ref } from 'vue';
import {auth,signOut} from "../firebase/config";
import getUser from "../composables/getUser";
export default {
    setup(){
        let error = ref(null);        
        let logout = async()=>{
           try{
             await signOut(auth)
             console.log("signout");
           }catch(err){
                error.value = err.message;
                console.log(error.value);
           }
        }
        let {user} = getUser();
        return {logout,error,user}
    }
}
</script>

<style>
nav{
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
}
nav p{
    margin: 2px auto;
    font-size: 16px;
    color: #444;
}
nav p.email{
    font-size: 14px;
    color: #999;
}
.Username{
    font-weight: bold;
}
p.email{
    color: #cecccc;
}
</style>