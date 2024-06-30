import { onAuthStateChanged } from 'firebase/auth';
import { ref } from 'vue';
import {auth} from "../firebase/config";
let user = ref(auth.currentUser);
    onAuthStateChanged(auth,(_user)=>{
    // console.log("user change "+ JSON.stringify(_user, null, 2));
    return user.value = _user;
})

let getUser = ()=>{
    return {user}
}
export default getUser;