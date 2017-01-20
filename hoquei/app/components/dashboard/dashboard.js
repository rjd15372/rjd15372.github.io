var app = angular.module('HoqueiApp');

app.component('dashboard', {
    templateUrl: 'app/components/dashboard/dashboard.tpl.html',
    bindings: {},
    controller: function ($scope, jogadorService) {
        var self = this;
        var set_interval_id = null;
        
        var timer_colors = [
            "#FFFFFF",
            "#ffffde",
            "#fffec8",
            "#fffeb5",
            "#fffea1",
            "#fffd9c",
            "#fffd8a",
            "#fffc78",
            "#fffc62",
            "#fffc5d",
            "#fffc30",
            "#fffc10",
            "#ffeb10",
            "#ffe510",
            "#ffca10",
            "#ffb910",
            "#ffbe10",
            "#ff9810",
            "#ff7d10",
            "#ff6710",
            "#ff4c10",
            "#ff2610",
            "#ff1010"
            ];
        
        this.NUM_JOGADORES = 5;
        this.num_jogadores_em_jogo = 0;
        this.a_jogar = false;
        this.jogador_a_substituir = null;
        
        this.jogadores = [
            { 
                nome: 'André Barrela',
                timestamps: [],
                em_jogo: false,
                timer_color: "#FFFFFF",
                tempo_de_jogo_ant: 0,
                tempo_de_jogo: 0
            },
            { 
                nome: 'David',
                timestamps: [],
                em_jogo: false,
                timer_color: "#FFFFFF",
                tempo_de_jogo_ant: 0,
                tempo_de_jogo: 0
            },
            { 
                nome: 'Diogo Dias',
                timestamps: [],
                em_jogo: false,
                timer_color: "#FFFFFF",
                tempo_de_jogo_ant: 0,
                tempo_de_jogo: 0
            },
            { 
                nome: 'Eduardo',
                timestamps: [],
                em_jogo: false,
                timer_color: "#FFFFFF",
                tempo_de_jogo_ant: 0,
                tempo_de_jogo: 0
            },
            { 
                nome: 'Filipe',
                timestamps: [],
                em_jogo: false,
                timer_color: "#FFFFFF",
                tempo_de_jogo_ant: 0,
                tempo_de_jogo: 0
            },
            { 
                nome: 'João Estriga',
                timestamps: [],
                em_jogo: false,
                timer_color: "#FFFFFF",
                tempo_de_jogo_ant: 0,
                tempo_de_jogo: 0
            },
            { 
                nome: 'Nuno Reis',
                timestamps: [],
                em_jogo: false,
                timer_color: "#FFFFFF",
                tempo_de_jogo_ant: 0,
                tempo_de_jogo: 0
            },
            { 
                nome: 'Madalena',
                timestamps: [],
                em_jogo: false,
                timer_color: "#FFFFFF",
                tempo_de_jogo_ant: 0,
                tempo_de_jogo: 0
            },
            { 
                nome: 'Martim',
                timestamps: [],
                em_jogo: false,
                timer_color: "#FFFFFF",
                tempo_de_jogo_ant: 0,
                tempo_de_jogo: 0
            },
            { 
                nome: 'Simão',
                timestamps: [],
                em_jogo: false,
                timer_color: "#FFFFFF",
                tempo_de_jogo_ant: 0,
                tempo_de_jogo: 0
            }
            ];
            
            var atualizar_tempo_jogador = function(jogador, tempo) {
                jogador.timestamps.push(tempo);
                var len = jogador.timestamps.length;
                if (jogador.timestamps.length % 2 == 0) {
                    var interval = jogador.timestamps[len-1].getTime() -
                                   jogador.timestamps[len-2].getTime();
                    jogador.tempo_de_jogo_ant += interval;
                    jogador.tempo_de_jogo = jogador.tempo_de_jogo_ant;
                }    
            };
            
            var atualizar_tempo_de_jogo = function(jogador, now) {
                if (jogador.timestamps.length % 2 != 0) {
                    var len = jogador.timestamps.length;
                    var interval = now.getTime() - 
                                   jogador.timestamps[len-1].getTime();
                    jogador.tempo_de_jogo = jogador.tempo_de_jogo_ant + interval;
                    
                    var min = Math.round(jogador.tempo_de_jogo / 1000 / 60);
                    if (min > 22) {
                        min = 22;
                    }
                    jogador.timer_color = timer_colors[min];
                }
            };
            
            var tick_tack = function() {
                var now = new Date();
                self.jogadores.forEach(function(jogador) {
                    atualizar_tempo_de_jogo(jogador, now);    
                });
                $scope.$apply();
            };
          
            this.startStopClickHandler = function() {
                if (this.num_jogadores_em_jogo === this.NUM_JOGADORES) {
                    if (set_interval_id != null) {
                        clearInterval(set_interval_id);
                        set_interval_id = null;
                    }
                    this.a_jogar = !this.a_jogar;
                    var tempo = new Date();
                    this.jogadores.forEach(function(jogador) {
                        if (jogador.em_jogo) {
                            atualizar_tempo_jogador(jogador, tempo);
                        }
                    });
                    if (this.a_jogar) {
                        set_interval_id = setInterval(tick_tack, 200);
                    }
                }
            }
            
            this.jogadorClass = function(jogador) {
                if (jogador === this.jogador_a_substituir) {
                    return 'alert-info';
                }  
                if (jogador.em_jogo) {
                    return 'alert-success';
                }
                return 'alert-warning';
            }
            
            this.jogadorClickHandler = function(jogador) {
    
                if (!this.a_jogar && jogador.em_jogo ||
                    (!jogador.em_jogo && this.num_jogadores_em_jogo < this.NUM_JOGADORES)) {
                    jogador.em_jogo = !jogador.em_jogo;
                    this.num_jogadores_em_jogo += jogador.em_jogo ? 1 : -1;
                    return;
                } else if (this.a_jogar) {
                    if (jogador.em_jogo) {
                        if (this.jogador_a_substituir === jogador) {
                            this.jogador_a_substituir = null;
                        }
                        else {
                            this.jogador_a_substituir = jogador;    
                        }
                    }
                    else if (this.jogador_a_substituir != null) {
                        var tempo = new Date();
                        atualizar_tempo_jogador(this.jogador_a_substituir, tempo);
                        atualizar_tempo_jogador(jogador, tempo);
                        
                        jogador.em_jogo = true;
                        this.jogador_a_substituir.em_jogo = false;
                        this.jogador_a_substituir = null;
                    }
                }
            }
    }
});

