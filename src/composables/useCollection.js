import { ref } from "vue"
import {db} from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";

let useCollection = (collectionName)=>{
    let error = ref(null);
    let addMessage = async(chatMessage)=>{
        try{
            await addDoc(collection(db,collectionName),chatMessage)
        }catch(err){
            console.log(err.message);
            error.value = "Could Not Send The Message";
        }
    }
    return {error,addMessage}
}
export default useCollection;