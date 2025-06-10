import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios' // Importar Axios
import './assets/tailwind.css'

// Criar a instância do app Vue
const app = createApp(App)

// Configurar o Axios como uma propriedade global
app.config.globalProperties.$http = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // URL base da sua API backend
})

// Conectar as funcionalidades ao app
app.use(store).use(router).mount('#app')
