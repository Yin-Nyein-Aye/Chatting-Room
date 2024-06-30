import { ref } from "vue";
import {auth,signInWithEmailAndPassword} from "../firebase/config";

let error = ref(null);
let signInAccount = async(email,password)=>{
    try{
        let res = await signInWithEmailAndPassword(auth,email,password)        
        if(!res){
          throw new Error("Can not sign in")
        }
        return res.user;
      }catch(err){
        error.value = getFriendlyErrorMessage(err.code);
    }
}

const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-credential":
        return "User Credential Is Wrong";
      case "auth/invalid-email":
        return "The email address is not valid.";
      case "auth/operation-not-allowed":
        return "Email/password accounts are not enabled.";
      case "auth/weak-password":
        return "The password is too weak.";
      default:
        return "An unknown error occurred. Please try again.";
    }
};
  
let signIn = ()=>{
    return {error,signInAccount};
}

export default signIn;