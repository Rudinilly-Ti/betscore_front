const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  // Configuração PWA
  pwa: {
    name: 'BetScoreTips', // Nome do app
    themeColor: '#4CAF50', // Cor principal do tema
    msTileColor: '#FFFFFF', // Cor para telas do Windows
    manifestOptions: {
      short_name: 'BetTips',
      start_url: '/', // URL inicial
      display: 'standalone', // Abrir como aplicativo independente
      background_color: '#FFFFFF',
    },
  },

  // Proxy para chamadas ao backend
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // URL do backend local
        changeOrigin: true,
      },
    },
  },
})
