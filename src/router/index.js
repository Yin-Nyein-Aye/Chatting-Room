import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Chatroom from '../views/Chatroom.vue'
import {auth} from "../firebase/config";
import { onAuthStateChanged } from 'firebase/auth';

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome,
    beforeEnter(to,from,next){
      onAuthStateChanged(auth, (user) => {
        if(!user){
          next();
        }else{
          next({name:"chatroom"})
        }
      });
    }
  },
  {
    path: "/chatroom",
    name: "chatroom",
    component: Chatroom,
    beforeEnter(to,from,next){
      onAuthStateChanged(auth, (user) => {
        if(user){
          next();
        }else{
          next({name:"welcome"})
        }
      });
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
