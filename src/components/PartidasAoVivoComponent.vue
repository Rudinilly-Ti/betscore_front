<template>
  <div class="flex flex-col items-center">
    <div v-if="partida">
      <div class="flex flex-col items-center py-5 px-10 rounded shadow min-w-[1260px] bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
        <div class="w-full">
          <span class="self-start text-gray-400 capitalize">{{ formatarData(partida.starting_at) }}</span>
          <div class="flex flex-col justify-center items-center">
            <span class="bg-white rounded-full p-1">
              <img :src="partida.league.image_path" :alt="getTeam(partida, 'home').name" class="w-10 h-10 object-contain">
            </span>
            <strong class="text-gray-200 mb-2">{{ partida.league.name }}</strong>
          </div>
        </div>
        <div class="flex justify-around items-center w-full">
          <div class="flex justify-end items-center w-96 space-x-4">
            <strong class="text-gray-200 mb-2 text-xl">{{ getTeam(partida, "home").name }}</strong>
            <img :src="getTeam(partida, 'home').image_path" :alt="getTeam(partida, 'home').name" class="w-20 h-20 object-contain">
          </div>
          <div class="text-blue-950 text-3xl w-28 flex justify-around items-center font-semibold bg-yellow-400 rounded-full p-1">
            <span>{{ getScore(partida, "home") }}</span>
            <span>-</span>
            <span>{{ getScore(partida, "away") }}</span>
          </div>
          <div class="flex justify-start items-center w-96 space-x-4">
            <img :src="getTeam(partida, 'away').image_path" :alt="getTeam(partida, 'away').name" class="w-20 h-20 object-contain">
            <strong class="text-gray-200 mb-2 text-xl"> {{ getTeam(partida, "away").name }}</strong> 
          </div>
      </div>
      <div class="mt-10 h-70 w-full flex space-x-5 items-start">
        <ul v-if="partida.groupedEvents[getTeam(partida, 'home').id].length" class="flex flex-col justify-end w-6/12">
          <li v-for="event in partida.groupedEvents[getTeam(partida, 'home').id]" :key="event.id" class="flex justify-end items-center py-1 space-x-3 ">
            <span class="text-white text-xs">{{ event.player_name }}</span> 
            <span class="text-yellow-300">{{ event.minute }}</span>
            <font-awesome-icon :icon="['fa', getEventIcon(event.type.code)]" class="text-gray-200 w-4 h-4"/>
          </li>
        </ul>
        <ul v-if="partida.groupedEvents[getTeam(partida, 'away').id].length" class="flex flex-col w-6/12">
          <li v-for="event in partida.groupedEvents[getTeam(partida, 'away').id]" :key="event.id" class=" py-1 rounded space-x-3">
            <font-awesome-icon :icon="['fa', getEventIcon(event.type.code)]" class="text-gray-200 w-4 h-4"/>
            <span class="text-yellow-300">{{ event.minute }} </span>
            <span class="text-white text-xs">{{ event.player_name }}</span> 
          </li>
        </ul>
      </div>
    </div> 
    <!-- Afastados-->
    <div class="flex flex-col items-center py-5 px-10 rounded shadow min-w-[1260px] bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 mt-6">
      <span class="text-gray-400 text-lg font-bold">Afastados</span>
      <div class="w-full flex gap-20 mt-10">
        <ul v-if="getSidelinesByParticipantId(partida.sidelined, getTeam(partida,'home').id).quantity" class="flex items-center flex-col flex-1 gap-5">
          <span class="text-yellow-400 text-md font-bold">{{ getSidelinesByParticipantId(partida.sidelined, getTeam(partida, 'home').id).quantity }} jogadores</span>
          <li v-for="sideline in getSidelinesByParticipantId(partida.sidelined, getTeam(partida, 'home').id).items" :key="sideline.id"
            class="flex items-center px-4 gap-4 w-full h-20 bg-gray-400 rounded-md hover:cursor-pointer hover:transform hover:scale-105   transition-transform duration-200"
          >
            <img :src="sideline.sideline.player.image_path" :alt="getTeam(partida, 'home').name" class="w-12 object-contain rounded-full">
            <div class="flex flex-col gap-1">
              <span class="text-yellow-400 text-md font-bold">{{ sideline.sideline.player.name }}</span>
              <span class="text-gray-600 text-xs font-semibold">{{ sideline.sideline.type.name }}</span>
          </div>
          </li>
        </ul>
        <ul class="flex items-center flex-col flex-1 gap-5">
          <span class="text-yellow-400 text-md font-bold">{{ getSidelinesByParticipantId(partida.sidelined, getTeam(partida, 'away').id).quantity }} jogadores</span>
          <li v-for="sideline in getSidelinesByParticipantId(partida.sidelined, getTeam(partida, 'away').id).items" :key="sideline.id"
            class="flex items-center px-4 gap-4 w-full h-20 bg-gray-950 rounded-md border border-gray-700 hover:cursor-pointer hover:transform hover:scale-105   transition-transform duration-200"
          >
            <img :src="sideline.sideline.player.image_path" :alt="getTeam(partida, 'away').name" class="w-12 object-contain rounded-full">
            <div class="flex flex-col gap-1">
              <span class="text-yellow-400 text-md font-bold">{{ sideline.sideline.player.name }}</span>
              <span class="text-gray-600 text-xs font-semibold">{{ sideline.sideline.type.name }}</span>
          </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- Estatisticas -->
    <div class="flex flex-col items-center py-5 px-10 rounded shadow min-w-[1260px] bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 mt-6">
      <span class="text-gray-400 text-lg font-bold">Estatísticas</span>
      <div class="w-full flex items-center flex-col mt-5">
        <span class="text-gray-400 text-sm font-bold">Posse de bola %</span>
        <div class="w-full flex justify-between text-yellow-400 text-sm">
          <span>{{ getStatisticByLocationAndDeveloperName(partida.statistics, "home", "BALL_POSSESSION").data.value }}</span>
          <span>{{ getStatisticByLocationAndDeveloperName(partida.statistics, "away", "BALL_POSSESSION").data.value }}</span>
        </div>
        <div class="w-full h-1.5 rounded-lg mt-1 flex overflow-hidden">
          <div class="h-full bg-yellow-400" :style="`width: ${getRelativeWidths('BALL_POSSESSION').home}%`"></div>
          <div class="h-full bg-blue-400" :style="`width: ${getRelativeWidths('BALL_POSSESSION').away}%`"></div>
        </div>
      </div>
      <div class="w-full flex items-center flex-col mt-5">
        <span class="text-gray-400 text-sm font-bold">Total de chutes</span>
        <div class="w-full flex justify-between text-yellow-400 text-sm">
          <span>{{ getStatisticByLocationAndDeveloperName(partida.statistics, "home", "SHOTS_TOTAL").data.value }}</span>
          <span>{{ getStatisticByLocationAndDeveloperName(partida.statistics, "away", "SHOTS_TOTAL").data.value }}</span>
        </div>
         <div class="w-full h-1.5 rounded-lg mt-1 flex overflow-hidden">
          <div class="h-full bg-yellow-400" :style="`width: ${getRelativeWidths('SHOTS_TOTAL').home}%`"></div>
          <div class="h-full bg-blue-400" :style="`width: ${getRelativeWidths('SHOTS_TOTAL').away}%`"></div>
        </div>
      </div>
      <div class="w-full flex items-center flex-col mt-5">
        <span class="text-gray-400 text-sm font-bold">Chutes ao alvo</span>
        <div class="w-full flex justify-between text-yellow-400 text-sm">
          <span>{{ getStatisticByLocationAndDeveloperName(partida.statistics, "home", "SHOTS_ON_TARGET").data.value }}</span>
          <span>{{ getStatisticByLocationAndDeveloperName(partida.statistics, "away", "SHOTS_ON_TARGET").data.value }}</span>
        </div>
         <div class="w-full h-1.5 rounded-lg mt-1 flex overflow-hidden">
          <div class="h-full bg-yellow-400" :style="`width: ${getRelativeWidths('SHOTS_ON_TARGET').home}%`"></div>
          <div class="h-full bg-blue-400" :style="`width: ${getRelativeWidths('SHOTS_ON_TARGET').away}%`"></div>
        </div>
      </div>
      <div class="w-full flex items-center flex-col mt-5">
        <span class="text-gray-400 text-sm font-bold">Passes</span>
        <div class="w-full flex justify-between text-yellow-400 text-sm">
          <span>{{ getStatisticByLocationAndDeveloperName(partida.statistics, "home", "PASSES").data.value }}</span>
          <span>{{ getStatisticByLocationAndDeveloperName(partida.statistics, "away", "PASSES").data.value }}</span>
        </div>
         <div class="w-full h-1.5 rounded-lg mt-1 flex overflow-hidden">
          <div class="h-full bg-yellow-400" :style="`width: ${getRelativeWidths('PASSES').home}%`"></div>
          <div class="h-full bg-blue-400" :style="`width: ${getRelativeWidths('PASSES').away}%`"></div>
        </div>
      </div>
      <div class="w-full flex items-center flex-col mt-5">
        <span class="text-gray-400 text-sm font-bold">Subistituições</span>
        <div class="w-full flex justify-between text-yellow-400 text-sm">
          <span>{{ getStatisticByLocationAndDeveloperName(partida.statistics, "home", "SUBSTITUTIONS").data.value }}</span>
          <span>{{ getStatisticByLocationAndDeveloperName(partida.statistics, "away", "SUBSTITUTIONS").data.value }}</span>
        </div>
         <div class="w-full h-1.5 rounded-lg mt-1 flex overflow-hidden">
          <div class="h-full bg-yellow-400" :style="`width: ${getRelativeWidths('SUBSTITUTIONS').home}%`"></div>
          <div class="h-full bg-blue-400" :style="`width: ${getRelativeWidths('SUBSTITUTIONS').away}%`"></div>
        </div>
      </div>
      <div class="w-full flex items-center flex-col mt-5">
        <span class="text-gray-400 text-sm font-bold">Cartões Amarelos</span>
        <div class="w-full flex justify-between text-yellow-400 text-sm">
          <span>{{ getStatisticByLocationAndDeveloperName(partida.statistics, "home", "YELLOWCARDS").data.value }}</span>
          <span>{{ getStatisticByLocationAndDeveloperName(partida.statistics, "away", "YELLOWCARDS").data.value }}</span>
        </div>
         <div class="w-full h-1.5 rounded-lg mt-1 flex overflow-hidden">
          <div class="h-full bg-yellow-400" :style="`width: ${getRelativeWidths('YELLOWCARDS').home}%`"></div>
          <div class="h-full bg-blue-400" :style="`width: ${getRelativeWidths('YELLOWCARDS').away}%`"></div>
        </div>
      </div>
      <div class="w-full flex items-center flex-col mt-5">
        <span class="text-gray-400 text-sm font-bold">Cartões Vermelhos</span>
        <div class="w-full flex justify-between text-yellow-400 text-sm">
          <span>{{ getStatisticByLocationAndDeveloperName(partida.statistics, "home", "REDCARDS").data.value }}</span>
          <span>{{ getStatisticByLocationAndDeveloperName(partida.statistics, "away", "REDCARDS").data.value }}</span>
        </div>
         <div class="w-full h-1.5 rounded-lg mt-1 flex overflow-hidden">
          <div class="h-full bg-yellow-400" :style="`width: ${getRelativeWidths('REDCARDS').home}%`"></div>
          <div class="h-full bg-blue-400" :style="`width: ${getRelativeWidths('REDCARDS').away}%`"></div>
        </div>
      </div>
      <div class="w-full flex items-center flex-col mt-5">
        <span class="text-gray-400 text-sm font-bold">Escanteios</span>
        <div class="w-full flex justify-between text-yellow-400 text-sm">
          <span>{{ getStatisticByLocationAndDeveloperName(partida.statistics, "home", "CORNERS").data.value }}</span>
          <span>{{ getStatisticByLocationAndDeveloperName(partida.statistics, "away", "CORNERS").data.value }}</span>
        </div>
         <div class="w-full h-1.5 rounded-lg mt-1 flex overflow-hidden">
          <div class="h-full bg-yellow-400" :style="`width: ${getRelativeWidths('CORNERS').home}%`"></div>
          <div class="h-full bg-blue-400" :style="`width: ${getRelativeWidths('CORNERS').away}%`"></div>
        </div>
      </div>
      <div class="w-full flex items-center flex-col mt-5">
        <span class="text-gray-400 text-sm font-bold">Faltas</span>
        <div class="w-full flex justify-between text-yellow-400 text-sm">
          <span>{{ getStatisticByLocationAndDeveloperName(partida.statistics, "home", "FOULS").data.value }}</span>
          <span>{{ getStatisticByLocationAndDeveloperName(partida.statistics, "away", "FOULS").data.value }}</span>
        </div>
         <div class="w-full h-1.5 rounded-lg mt-1 flex overflow-hidden">
          <div class="h-full bg-yellow-400" :style="`width: ${getRelativeWidths('FOULS').home}%`"></div>
          <div class="h-full bg-blue-400" :style="`width: ${getRelativeWidths('FOULS').away}%`"></div>
        </div>
      </div>
    </div>
    <!-- Local do jogo -->
    <div class="flex flex-col items-center py-5 px-10 rounded shadow min-w-[1260px] bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 mt-6">
      <span class="text-gray-400 text-lg font-bold">Informações do local</span>
      <div class="flex items-center justify-center gap-16 mt-5">
        <div class="flex-1">
          <img :src="partida.venue.image_path" :alt="partida.venue.name" class="w-[650px] object-contain rounded-md">
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <span class="text-sm text-gray-400 font-semibold">Nome</span>
          <span class="text-sm text-yellow-400">{{  partida.venue.name }}</span>
          <span class="text-sm text-gray-400 font-semibold">Capacidade</span>
          <span class="text-sm text-yellow-400">{{ partida.venue.capacity }}</span>
          <span class="text-sm text-gray-400 font-semibold">Suprefície</span>
          <span class="text-sm text-yellow-400">{{ partida.venue.surface }}</span>
          <span class="text-sm text-gray-400 font-semibold">Cidade</span>
          <span class="text-sm text-yellow-400">{{ partida.venue.city_name }}</span>
          <span class="text-sm text-gray-400 font-semibold">Endereço</span>
          <span class="text-sm text-yellow-400">{{ partida.venue.address }}</span>
        </div>
        </div>
          <span class="text-gray-400 text-lg font-bold mt-10">Previsão do tempo</span>
          <div class="flex items-center gap-3 mt-5">
          <img :src="partida.weatherreport.icon" :alt="partida.weatherreport.description" class="w-7 object-contain rounded-md">
          <div class="flex flex-col items-center gap-1">
            <span class="text-sm text-gray-400 font-semibold">Tempo</span>
            <span class="text-xs text-yellow-400">{{ partida.weatherreport.description }}</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <span class="text-sm text-gray-400 font-semibold">Temperatura</span>
            <span class="text-xs text-yellow-400">{{ getTemperatureByDateTime(partida.starting_at, partida.weatherreport.temperature) }} ºC</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <span class="text-sm text-gray-400 font-semibold">Nuvens</span>
            <span class="text-xs text-yellow-400">{{ partida.weatherreport.clouds }}</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <span class="text-sm text-gray-400 font-semibold">Velocidade do vento</span>
            <span class="text-xs text-yellow-400">{{ partida.weatherreport.wind.speed }}</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <span class="text-sm text-gray-400 font-semibold">Humidade</span>
            <span class="text-xs text-yellow-400">{{ partida.weatherreport.humidity }}</span>
          </div>
        </div>
     </div>
    </div>
    <p v-else class="text-gray-400">Carregando partida...</p>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell, faClock, faFlag, faFutbol, faSquare, faStar, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
library.add(faFutbol, faBell, faStar, faClock, faFlag, faTrophy, faSquare);


export default {
  data() {
    return {
      partida: {} | null, // Inicializado como lista vazia
    };
  },
  components: {
    FontAwesomeIcon
  },
  mounted() {
    this.fetchPartidas();
  },
  methods: {
    async fetchPartidas() {
      try {
        const response = await axios.get('https://betscore-back.onrender.com/api/partidas-ao-vivo/'); // Endpoint do backend
        const events = response.data?.events?.sort((a, b) => a.sort_order - b.sort_order)
        const groupedEvents = [];
        // Agrupa os eventos por participante
        events.forEach(event => {
          const participantId = event.participant_id;
          if (!groupedEvents[participantId]) {
            groupedEvents[participantId] = [];
          }
          if (event.type.code === "goal" || event.type.code === "owngoal" || event.type.code === "penalty") {
            groupedEvents[participantId].push(event);
          }
        });

        
        this.partida = {
          ...response.data,
          groupedEvents: groupedEvents
        };
        console.log('Partida ao vivo:', this.partida); // Debug de dados
      } catch (error) {
        console.error('Erro ao buscar partidas ao vivo:', error);
        this.partida = null; // Garante que `partidas` seja sempre uma lista
      }
    },
    // Retorna o nome do time baseado no tipo (home ou away)
    getTeam(partida, type) {
      const participant = partida.participants.find(p => p.meta.location === type);
      return participant
    },
    // Retorna o placar do time baseado no tipo (home ou away)
    getScore(partida, type) {
      const score = partida.scores.find(s => s.score.participant === type && s.description === "CURRENT");
      return score ? score.score.goals : 0;
    },
    getEventIcon(eventType) {
      const icons = {
        goal: "futbol",
        yellowcard: "square",  // Corrigido para minúsculas
        redcard: "square",  // Adicionei para cartões vermelhos também
        substitution: "star",
        time: "clock",
        foul: "flag",
        win: "trophy",
        owngoal: "futbol",
        penalty: "futbol",
        VAR: "flag",
        missed_penalty: "flag"
      }; 
  return icons[eventType] || "bell";  // Ícone padrão
  },

  formatarData(data) {
    return format(new Date(data), "EEEE, d MMM yy", { locale: ptBR });
  },
  getTemperatureByDateTime(dateTime, temperature) {
      const date = new Date(dateTime);
      const hour = date.getHours();

      if (hour >= 6 && hour < 12) {
        return temperature.morning;
      } else if (hour >= 12 && hour < 18) {
        return temperature.day;
      } else if (hour >= 18 && hour < 24) {
        return temperature.evening;
      } else {
        return temperature.night;
      }
    },
     getStatisticByLocationAndDeveloperName(stats, location, developerName) {
      return stats.find(stat =>
        stat.location === location && stat.type.developer_name === developerName
      );
    },
    getRelativeWidths(developerName) {
      const home = this.getStatisticByLocationAndDeveloperName(this.partida.statistics, 'home', developerName)?.data.value || 0;
      const away = this.getStatisticByLocationAndDeveloperName(this.partida.statistics, 'away', developerName)?.data.value || 0;

      const total = home + away || 1; // evita divisão por zero

      const homePercent = (home / total) * 100;
      const awayPercent = (away / total) * 100;

      return {
        home: homePercent.toFixed(1),
        away: awayPercent.toFixed(1)
      };
    },
    getSidelinesByParticipantId(sidelinesArray, participantId) {
      const filtered = sidelinesArray.filter(item => item.participant_id === participantId);
      return {
        items: filtered,
        quantity: filtered.length
      };
    }
  }
};
</script>