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
    {
        id: 'alien-bluebook',
        name: 'Alien',
        subtitle: 'Arquivo Secreto • Projeto Blue Book',
        imgSrc: './img/alien.png',
        emoji: '🛸',
        maxW: 92,
        maxH: 58,
        unlockScore: 12618,
        unlockTitle: '📁 Projeto Blue Book (1947–1969)',
        unlockLore: 'Entre 1947 e 1969, o Projeto Blue Book registrou 12.618 aparições de OVNIs. Desses casos, 701 nunca foram explicados. Os cientistas dizem que não existem provas de vida extraterrestre... Mas nenhum deles estava entregando pizzas de trenó na noite de Natal. Coincidência? Desvie das naves e tire suas próprias conclusões!',
        powers: {
            greenHearts: true,
            halfDamage: true,
            laserAmmo: 8
        }
    }
];