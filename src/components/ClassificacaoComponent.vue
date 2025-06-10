<template>
    <div class="flex flex-col p-4 min-h-screen w-full">
      <div class="w-7/12 flex items-center justify-between mb-4 text-white px-4 py-2 bg-gray-700 rounded text-sm">
        <span class="w-5">#</span>
        <span class="w-80">Time</span>
        <span class="w-10 text-center">P</span>
        <span class="w-10 text-center">V</span>
        <span class="w-10 text-center">E</span>
        <span class="w-10 text-center">D</span>
        <span class="w-10 text-center">GP</span>
        <span class="w-10 text-center">GC</span>
        <span class="w-10 text-center">SG</span>
        <span class="w-10 text-center">PTS</span>
      </div>
      <ul v-if="times.length" class="space-y-4 w-7/12">
        <li 
          v-for="time in times" 
          :key="time.id" 
          class="bg-gray-800 text-yellow-400 p-4 rounded flex justify-between"
        >
        <div class="w-5">
          {{ time.rule?.position || time.position }}
        </div>
        <div class="flex w-80 gap-5 items-center"> 
          <span>
            <font-awesome-icon v-if="time.result == 'up'" :icon="['fas', 'arrow-up']" class="text-green-500" />
            <font-awesome-icon v-else-if="time.result == 'down'" :icon="['fas', 'arrow-down']" class="text-red-500" />
            <font-awesome-icon v-else-if="time.result == 'equal'" :icon="['fas', 'minus']" class="text-gray-500" />
          </span>
          <img :src="time.participant.image_path" :alt="time.participant.name" class="w-7 h-7">
          <span>{{ time.participant.name }}</span>
        </div>
        <div class="w-10 text-center">{{ getMatches(time) }}</div>
        <div class="w-10 text-center">{{ getWins(time) }}</div>
        <div class="w-10 text-center">{{ getDraws(time) }}</div>
        <div class="w-10 text-center">{{ getLosses(time) }}</div>
        <div class="w-10 text-center">{{ getScore(time) }}</div>
        <div class="w-10 text-center">{{ getGoalsConceded(time) }}</div>
        <div class="w-10 text-center">{{ getGoalsDiference(time) }}</div>
        <div class="w-10 text-center"> {{  getPoints(time) }}</div>
        </li>
      </ul>
      <p v-else class="text-gray-400">Carregando times...</p>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowDown, faArrowUp, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
library.add(faArrowUp, faArrowDown, faMinus);

export default {
  data() {
    return {
      times: [], // Inicializa como um objeto com uma propriedade `upcoming` vazia
    };
  },
  components: {
    FontAwesomeIcon
  },
  mounted() {
    axios
      .get('http://127.0.0.1:8000/api/classificacao/')
      .then((response) => {
        console.log('Dados recebidos:', response.data);
        this.times = response.data || {}; // Verifica se a resposta contém os dados esperados
      })
      .catch((error) => {
        console.error('Erro ao buscar próximos jogos:', error);
        this.times = []; // Garante que `partidas` seja uma lista em caso de erro
      });
  },
  methods: {
    formatarData(data) {
      return format(new Date(data), "EEEE, d MMM yy", { locale: ptBR });
    },
    getDraws(participant) {
      const draws = participant.details.find(detail => detail.type.developer_name === 'OVERALL_DRAWS');
      return draws ? draws.value : 0;
    },
    getPoints(participant) {
      const points = participant.details.find(detail => detail.type.developer_name === 'TOTAL_POINTS');
      return points ? points.value : 0;
    },  
    getWins(participant) {
      const wins = participant.details.find(detail => detail.type.developer_name === 'OVERALL_WINS');
      return wins ? wins.value : 0;
    },
    getLosses(participant) {
      const losses = participant.details.find(detail => detail.type.developer_name === 'OVERALL_LOST');
      return losses ? losses.value : 0;
    },
    getMatches(participant) {
      const matches = participant.details.find(detail => detail.type.developer_name === 'OVERALL_MATCHES');
      return matches ? matches.value : 0;
    },
    getGoalsConceded(participant) {
      const goalsConceded = participant.details.find(detail => detail.type.developer_name === 'OVERALL_CONCEDED');
      return goalsConceded ? goalsConceded.value : 0;
    },
    getGoalsDiference(participant) {
      const diference = participant.details.find(detail => detail.type.developer_name === 'OVERALL_GOAL_DIFFERENCE');
      return diference ? diference.value : 0;
    },
    getScore(participant) {
      const score = participant.details.find(detail => detail.type.developer_name === 'OVERALL_SCORED');
      return score ? score.value : 0;
    }
  }
};
</script>
