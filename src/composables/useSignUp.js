import { ref } from "vue";
import {auth,createUserWithEmailAndPassword} from "../firebase/config"
import { updateProfile } from 'firebase/auth';
let error = ref(null);
let createAccount = async(email,password,userName)=>{
    try{
        let res =  await createUserWithEmailAndPassword(auth,email,password);
        if(!res){
            throw new Error("could not create new user")
        }
        await updateProfile(res.user,{displayName:userName});                
        return res.user;
    }catch(err){
        // error.value = err.message;
        error.value = getFriendlyErrorMessage(err.code);
    }
}
const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "The email address is already in use by another account.";
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
  
let useSignUp = ()=>{
    return {error,createAccount}
}
export default useSignUp;