<template>
  <div>
    <ul v-if="partidas.length > 0">
      <li v-for="partida in partidas" :key="partida.id">
        <div class="w-9/12 flex flex-col py-5 px-10 mb-5 bg-gray-800 rounded-lg">
          <div class="flex flex-row items-center">
            <span class="bg-white rounded-full w-14 h-14 justify-center items-center flex mr-2">
                <img :src="partida.image_path" :alt="partida.id" class="w-9 h-9">
            </span>
            <strong class="text-yellow-300 text-base ml-3">{{ partida.name }}</strong>
            <span class="text-yellow-300 ml-3"> - </span>
            <span class="text-yellow-300 ml-3 font-normal text-sm ">Round {{  partida.today[0]?.round?.name || "não definido" }}</span>
          </div>
          <ul class="flex flex-row flex-wrap w-full space-x-4">
            <li v-for="hoje in partida.today" :key="hoje.id" @click="irParaDetalhes(hoje.id)" class="mt-7"> 
              <div class="flex flex-row items-center justify-between w-64 bg-gray-900 py-4 px-3 rounded-md border border-gray-700
              hover:cursor-pointer hover:transform hover:scale-105 transition-transform duration-200">
                <div class="flex flex-col justify-start space-y-4">
                  <div class="flex justify-start items-center space-x-4">
                    <img :src="getTeam(hoje, 'home').image_path" :alt="getTeam(hoje, 'home').name" class="w-7 h-7">
                    <strong class="text-gray-200 text-sm">{{ getTeam(hoje, "home").name }}</strong>
                  </div>
                  <div class="flex justify-start items-center space-x-4">
                    <img :src="getTeam(hoje, 'away').image_path" :alt="getTeam(hoje, 'away').name" class="w-7 h-7">
                    <strong class="text-gray-200 text-sm">{{ getTeam(hoje, "away").name }}</strong>
                  </div>
                </div>
                <div>
                  <div v-if="hoje.scores.length == 0" class="text-blue-950 text-sm w-14 flex justify-around items-center font-semibold bg-yellow-400 rounded-full p-1">
                    {{ formatarHora(hoje.starting_at) }}
                  </div>
                  <div v-else class="text-yellow-300 text-sm flex flex-col space-y-7 mr-2 font-semibold rounded-full">
                    <span>{{ getScore(hoje, "home") }}</span>
                    <span>{{ getScore(hoje, "away") }}</span>
                </div>
                </div>
              </div>
            </li> 
          </ul>
        </div>
      </li>
    </ul>
    <p v-else class="text-gray-400">Não há partidas agendadas para hoje.</p>
  </div>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default {
  data() {
    return {
      partidas: [], // Lista de partidas
    };
  },
  mounted() {
       axios
      .get('https://betscore-back.onrender.com/api/partidas/') // Endpoint correto
      .then((response) => {
        this.partidas = response.data.data || [];
        console.log('Partidas:', this.partidas); // Debug de dados
      })
      .catch((error) => {
        console.error('Erro ao buscar partidas:', error); // Debug de erros
      });
  },
  methods: {
      getTeam(partida, type) {
        const participant = partida.participants.find(p => p.meta.location === type);
        return participant
      },
      getScore(partida, type) {
        const score = partida.scores.find(s => s.score.participant === type && s.description === "CURRENT");
        return score ? score.score.goals : 0;
      },
      formatarData(data) {
        return format(new Date(data), "EEEE, d MMM yy", { locale: ptBR });
      },
      formatarHora(data) {
        return format(new Date(data), "HH:mm", { locale: ptBR });
      },
      irParaDetalhes(id) {
        this.$router.push({ name: 'detalhes', params: { id } });
      },
  }
};
</script>
