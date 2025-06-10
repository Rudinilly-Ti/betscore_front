<template>
    <div v-if="partidasPagina.length" class="flex flex-col p-4 w-full">
      <div class="flex justify-between items-center mb-4 w-8/12">
        <div>
          <span class="text-yellow-400 font-semibold">
          {{ nomeTime }}
          </span>
        </div>
        <div class="flex flex-row items-center gap-2">
          <button @click="paginaAtual > 0 && mudarPagina(-1)" :disabled="paginaAtual === 0" class="btn flex items-center justify-center 
          text-gray-400 bg-gray-700 py-2 rounded-2xl text-xs w-12">
              <font-awesome-icon icon="chevron-left" />
          </button>
          <button @click="(paginaAtual + 1) * itemsPorPagina < partidas.length && mudarPagina(1)" :disabled="(paginaAtual + 1) * itemsPorPagina >= partidas.length" class="btn flex items-center justify-center text-gray-400 bg-gray-700 py-2 rounded-2xl text-xs w-12">
            <font-awesome-icon icon="chevron-right" />
          </button>
        </div>
      </div>
      <ul class="space-y-4 w-8/12">
        <li 
          v-for="partida in partidasPagina" 
          :key="partida.id" 
          class="bg-gray-800 text-yellow-400 p-4 rounded flex"
        >
        <div class="w-full flex flex-col">
          <div class="flex flex-row items-center">
            <span class="bg-white rounded-full w-6 h-6 justify-center items-center flex mr-2">
              <img :src="partida.league_id" :alt="getTeam(partida, 'home').name" class="w-4 h-4">
            </span>
            <strong class="text-gray-200 text-xs">{{ partida.league_id }}</strong>
          </div>
          <span class="text-xs capitalize mt-2">
            {{ partida.participants.find(p => p.id == 14).meta.location }}
          </span>
        </div>
        <div class="flex flex-1 items-center gap-3">
          <div class="flex justify-end items-center w-72 space-x-4">
            <strong class="text-gray-200 text-sm">{{ getTeam(partida, "home").name }}</strong>
            <img :src="getTeam(partida, 'home').image_path" :alt="getTeam(partida, 'home').name" class="w-7 h-7">
          </div>
          <div v-if="partida.scores.length" class="text-blue-950 text-sm w-14 flex justify-around items-center font-semibold bg-yellow-400 rounded-full p-1">
            <span>{{ getScore(partida, "home") }}</span>
            <span>-</span>
            <span>{{ getScore(partida, "away") }}</span>
          </div>
           <div v-else class="text-blue-950 text-sm w-14 flex justify-around items-center font-semibold bg-yellow-400 rounded-full p-1">
           {{ formatarHora(partida.starting_at) }}
          </div>
          <div class="flex justify-start items-center w-72 space-x-4">
            <img :src="getTeam(partida, 'away').image_path" :alt="getTeam(partida, 'away').name" class="w-7 h-7">
            <strong class="text-gray-200 text-sm"> {{ getTeam(partida, "away").name }}</strong> 
          </div>
      </div> 
      <div class="flex w-full justify-end items-start mt-2">
        <span class="text-gray-400 text-xs mr-2 capitalize">
          {{ formatarData(partida.starting_at) }}
        </span>
      </div>
        </li>
      </ul>
    </div>
    <p v-else class="text-gray-400">Carregando próximos jogos...</p>
  </template>
  
  <script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

library.add(faChevronLeft, faChevronRight)
  export default {
    data() {
      return {
        partidas: [] , // Inicializa como um objeto com uma propriedade `upcoming` vazia
        paginaAtual: 0,
        itemsPorPagina: 10,
      };
    },
    mounted() {
      axios
        .get('https://betscore-back.onrender.com/api/agenda/time/' + this.$route.params.id)
        .then((response) => {
          console.log('Dados recebidos:', response.data);
          this.partidas = response.data || []; // Verifica se a resposta contém os dados esperados
          this.irParaPaginaDoDiaAtual();
        })
        .catch((error) => {
          console.error('Erro ao buscar próximos jogos:', error);
          this.partidas = []; // Garante que `partidas` seja uma lista em caso de erro
        });
    },
    components: {
      FontAwesomeIcon
    },
    computed: {
      partidasPagina() {
        const start = this.paginaAtual * this.itemsPorPagina;
        return this.partidas.slice(start, start + this.itemsPorPagina);
      },
      nomeTime() {
        if (!this.partidas.length) return '';
        const time = this.partidas[0].participants.find(p => p.id == this.$route.params.id);
        return time ? time.name : '';
      }
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
      mudarPagina(delta) {
        const novaPagina = this.paginaAtual + delta;
        if (novaPagina >= 0 && novaPagina * this.itemsPorPagina < this.partidas.length) {
          this.paginaAtual = novaPagina;
        }
      },
      irParaPaginaDoDiaAtual() {
        const hoje = new Date();
        const idx = this.partidas.findIndex(p => new Date(p.starting_at) >= hoje);
        this.paginaAtual = idx >= 0 ? Math.floor(idx / this.itemsPorPagina) : 0;
      },
    }
  };
  </script>
  