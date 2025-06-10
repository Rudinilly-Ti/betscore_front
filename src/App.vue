<template>
  <div id="app" class="bg-gray-950 w-full h-dvh flex flex-col font-sans">
    <div class="w-full h-20 fixed top-0 left-0 flex justify-start pl-10 items-center bg-gray-950 border-b-2 border-gray-800 z-50">
      <span class="text-yellow-400 font-bold text-2xl">Betscoretips</span>
    </div>
    <div class="flex flex-row flex-grow pt-20 h-dvh">
      <nav class="w-64 flex flex-col bg-gray-900 px-9 text-white space-y-3 pt-9 h-full fixed top-20 left-0 border-r border-gray-800">
        <router-link to="/">
          <font-awesome-icon :icon="['fas', 'tower-broadcast']" class="text-red-600" />
          Partidas
        </router-link>
        <router-link to="/classificacao">
          <font-awesome-icon :icon="['fa', 'ranking-star']" class="text-gray-200 w-4 h-4"/>
          Classificação
        </router-link>
        <router-link to="/agenda/time/14">
          <font-awesome-icon :icon="['fa', 'calendar']" class="text-gray-200 w-4 h-4"/>
          Próximos Jogos
        </router-link>
      </nav>

      <!-- Router View / Content -->
      <div class="flex-grow ml-64 px-5 py-7 bg-gray-950 overflow-y-auto 
      [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-5
      [&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-track]:bg-gray-900 [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-corner]:bg-gray-900 [&::-webkit-scrollbar-corner]:rounded-full
      [&::-webkit-scrollbar-button]:bg-gray-900 [&::-webkit-scrollbar-button]:rounded-full
      [&::-webkit-scrollbar-button]:w-0 [&::-webkit-scrollbar-button]:h-0
      ">
        <router-view />
      </div>
    </div>
  </div>
</template>

<link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faFutbol, faRankingStar, faTowerBroadcast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faCalendar, faTowerBroadcast, faFutbol, faRankingStar);

export default {
  components: {
    FontAwesomeIcon
  },
  name: 'App',
};
</script>

<style>
/* Adicione estilos, se necessário */
</style>
