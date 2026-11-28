'use strict';

/**
 * Cadastro dos mascotes das pizzarias parceiras.
 * Para adicionar uma nova pizzaria:
 * 1) Coloque o PNG transparente em ./img/personagens/
 * 2) Duplique um bloco abaixo com um "id" único (sem espaços ou acentos).
 *
 * Dica: cada pizzaria pode compartilhar um link direto já abrindo com seu mascote:
 * https://seusite.com/noel/?pizzaria=don-marco
 */
window.NOEL_PERSONAGENS = [
    {
        id: 'ecocaixito',
        name: 'Ecocaixito',
        subtitle: '@ecocaixasba • Camaçari',
        imgSrc: './img/personagens/ecocaixito.png',
        emoji: '📦'
    },
    {
        id: 'don-marco',
        name: 'Vovô entregador',
        subtitle: '@sabordosul • Salvador',
        imgSrc: './img/personagens/sabor-do-sul.png',
        emoji: '🍕'
    },
];