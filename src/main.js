import { createApp } from 'vue'
import './style.css'
import router from "./router";
import App from './App.vue'
import './styles/index.scss'

createApp(App).use(router).mount('#app')
