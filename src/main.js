import axios from 'axios'; // Importar Axios
import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import './registerServiceWorker'
import router from './router'
import store from './store'

// Criar a instância do app Vue
const app = createApp(App)

// Configurar o Axios como uma propriedade global
app.config.globalProperties.$http = axios.create({
  baseURL: 'https://betscore-back.onrender.com/api/', // URL base da sua API backend
})

// Conectar as funcionalidades ao app
app.use(store).use(router).mount('#app')
