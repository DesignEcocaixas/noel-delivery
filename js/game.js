'use strict';

/* =====================================================================
   1. SINTETIZADOR DE EFEITOS SONOROS (WEB AUDIO API — ZERO URLs EXTERNAS)
   ===================================================================== */
class SoundFX {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.lastThrustTime = 0;
    }

    unlock() {
        try {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) this.ctx = new AudioCtx();
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        } catch (e) { }
    }

    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }

    playClick() {
        if (this.muted || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(580, now);
            osc.frequency.exponentialRampToValueAtTime(860, now + 0.055);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.07);
        } catch (e) { }
    }

    playThrust() {
        if (this.muted || !this.ctx) return;
        const nowMs = performance.now();
        if (nowMs - this.lastThrustTime < 140) return;
        this.lastThrustTime = nowMs;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(160, now);
            osc.frequency.exponentialRampToValueAtTime(240, now + 0.08);
            gain.gain.setValueAtTime(0.028, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.095);
        } catch (e) { }
    }

    playToss() {
        if (this.muted || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(480, now);
            osc.frequency.exponentialRampToValueAtTime(220, now + 0.11);
            gain.gain.setValueAtTime(0.11, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.13);
        } catch (e) { }
    }

    playEmpty() {
        if (this.muted || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            [0, 0.085].forEach((offset) => {
                const t = now + offset;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(185, t);
                osc.frequency.exponentialRampToValueAtTime(125, t + 0.065);
                gain.gain.setValueAtTime(0.065, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.075);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(t);
                osc.stop(t + 0.08);
            });
        } catch (e) { }
    }

    /** Sinos natalinos cujo tom sobe conforme o combo */
    playDelivery(combo = 1, isVip = false) {
        if (this.muted || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const pitchStep = Math.pow(1.06, Math.min(combo - 1, 10));
            const notes = isVip ? [659.25, 880, 1174.66, 1318.5] : [587.33, 880, 1174.66];
            notes.forEach((freq, i) => {
                const t = now + i * 0.055;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq * pitchStep, t);
                gain.gain.setValueAtTime(0.001, t);
                gain.gain.linearRampToValueAtTime(0.11, t + 0.012);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(t);
                osc.stop(t + 0.26);
            });
        } catch (e) { }
    }

    playRefill() {
        if (this.muted || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
                const t = now + i * 0.048;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, t);
                gain.gain.setValueAtTime(0.001, t);
                gain.gain.linearRampToValueAtTime(0.1, t + 0.012);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(t);
                osc.stop(t + 0.22);
            });
        } catch (e) { }
    }

    playHeal() {
        if (this.muted || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            [440, 554.37, 659.25, 880, 1108.73].forEach((freq, i) => {
                const t = now + i * 0.055;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, t);
                gain.gain.setValueAtTime(0.001, t);
                gain.gain.linearRampToValueAtTime(0.11, t + 0.015);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(t);
                osc.stop(t + 0.27);
            });
        } catch (e) { }
    }

    playMiss() {
        if (this.muted || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(160, now);
            osc.frequency.exponentialRampToValueAtTime(75, now + 0.12);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.14);
        } catch (e) { }
    }

    playWarning() {
        if (this.muted || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            [0, 0.11].forEach((offset) => {
                const t = now + offset;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(880, t);
                osc.frequency.exponentialRampToValueAtTime(1240, t + 0.065);
                gain.gain.setValueAtTime(0.001, t);
                gain.gain.linearRampToValueAtTime(0.09, t + 0.012);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(t);
                osc.stop(t + 0.09);
            });
        } catch (e) { }
    }

    playHit() {
        if (this.muted || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(210, now);
            osc.frequency.exponentialRampToValueAtTime(58, now + 0.24);
            gain.gain.setValueAtTime(0.14, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.28);
        } catch (e) { }
    }

    playPhaseUp() {
        if (this.muted || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const melody = [
                { f: 523.25, t: 0.00, d: 0.14 },
                { f: 659.25, t: 0.10, d: 0.14 },
                { f: 783.99, t: 0.20, d: 0.16 },
                { f: 1046.50, t: 0.32, d: 0.36 }
            ];
            melody.forEach((n) => {
                const start = now + n.t;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(n.f, start);
                gain.gain.setValueAtTime(0.001, start);
                gain.gain.linearRampToValueAtTime(0.12, start + 0.015);
                gain.gain.exponentialRampToValueAtTime(0.001, start + n.d);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(start);
                osc.stop(start + n.d + 0.02);
            });
        } catch (e) { }
    }

    playGameOver() {
        if (this.muted || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            [392.0, 349.23, 311.13, 261.63].forEach((freq, i) => {
                const start = now + i * 0.14;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, start);
                gain.gain.setValueAtTime(0.1, start);
                gain.gain.exponentialRampToValueAtTime(0.001, start + 0.26);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(start);
                osc.stop(start + 0.28);
            });
        } catch (e) { }
    }
}

const soundFX = new SoundFX();

/* =====================================================================
   2. CONSTANTES, CATÁLOGO DE 6 CASAS E 5 PONTOS TURÍSTICOS DA BAHIA
   ===================================================================== */
const MAX_AMMO = 10;
const REFILL_AMOUNT = 4;
const MAX_LIVES = 3;
const CHIMNEY_TEX_W = 44;
const CHIMNEY_TEX_H = 56;
const STORAGE_HIGHSCORE_KEY = 'noel_delivery_highscore_v5';

const STORAGE_RANKING_KEY = 'noel_delivery_ranking_v1';
const STORAGE_LAST_PLAYER_KEY = 'noel_delivery_last_player_v1';
const STORAGE_SELECTED_CHAR_KEY = 'noel_delivery_selected_char_v1';

const DEFAULT_CHARACTER = {
    id: 'santa_default',
    name: 'Papai Noel',
    subtitle: 'Trenó Clássico (Padrão)',
    textureKey: 'santa_sleigh',
    imgSrc: null,
    emoji: '🎅',
    maxW: 92,
    maxH: 58
};

function buildCharacterCatalog() {
    const customList = Array.isArray(window.NOEL_PERSONAGENS) ? window.NOEL_PERSONAGENS : [];
    const normalized = customList
        .filter((item) => item && item.id && item.imgSrc)
        .map((item) => ({
            id: String(item.id).trim(),
            name: item.name || item.id,
            subtitle: item.subtitle || 'Pizzaria Parceira',
            textureKey: item.textureKey || `char_${String(item.id).trim()}`,
            imgSrc: item.imgSrc,
            emoji: item.emoji || '🍕',
            maxW: item.maxW || 92,
            maxH: item.maxH || 66
        }));

    return [DEFAULT_CHARACTER, ...normalized];
}

const CHARACTER_CATALOG = buildCharacterCatalog();

/**
 * Catálogo das 6 casas com coordenadas exatas da chaminé:
 * - Cada casa tem origin(0.5, 1) ancorada em groundY (depth 21).
 * - Cada chaminé é um Image puro (SEM Arcade Physics) com origin(0.5, 1)
 *   em depth 20 (encaixada logo atrás do telhado, sobressaindo ~28px).
 */
const HOUSE_CATALOG = {
    house_chalet_sm: {
        key: 'house_chalet_sm',
        width: 86,
        height: 82,
        chimneyOffsetX: 16,
        chimneyRoofY: 26,
        chimneyHeight: 46,
        isVip: false
    },
    house_classic_md: {
        key: 'house_classic_md',
        width: 114,
        height: 102,
        chimneyOffsetX: -24,
        chimneyRoofY: 58,
        chimneyHeight: 48,
        isVip: false
    },
    house_wide_family: {
        key: 'house_wide_family',
        width: 156,
        height: 86,
        chimneyOffsetX: 36,
        chimneyRoofY: 56,
        chimneyHeight: 46,
        isVip: false
    },
    house_sobrado_tall: {
        key: 'house_sobrado_tall',
        width: 100,
        height: 148,
        chimneyOffsetX: 20,
        chimneyRoofY: 108,
        chimneyHeight: 48,
        isVip: false
    },
    house_manor_lg: {
        key: 'house_manor_lg',
        width: 144,
        height: 126,
        chimneyOffsetX: -38,
        chimneyRoofY: 74,
        chimneyHeight: 48,
        isVip: false
    },
    house_vip: {
        key: 'house_vip',
        width: 138,
        height: 138,
        chimneyOffsetX: 28,
        chimneyRoofY: 92,
        chimneyHeight: 48,
        isVip: true
    }
};

const REGULAR_HOUSE_KEYS = [
    'house_chalet_sm',
    'house_classic_md',
    'house_wide_family',
    'house_sobrado_tall',
    'house_manor_lg'
];

/** 5 Pontos Turísticos / Easter Eggs da Bahia passando na paralaxe ~0.32x */
const LANDMARK_DEFS = [
    {
        key: 'landmark_arembepe',
        lightsKey: 'landmark_arembepe_lights',
        label: 'Aldeia Hippie • Arembepe',
        hasBeacon: false
    },
    {
        key: 'landmark_jaua',
        lightsKey: 'landmark_jaua_lights',
        label: 'Papagaio • Praia de Jauá',
        hasBeacon: false
    },
    {
        key: 'landmark_abrantes',
        lightsKey: 'landmark_abrantes_lights',
        label: 'Igreja da Praia • Abrantes',
        hasBeacon: false
    },
    {
        key: 'landmark_camacari',
        lightsKey: 'landmark_camacari_lights',
        label: 'Prédio Redondo • Camaçari',
        hasBeacon: false
    },
    {
        key: 'landmark_tomba',
        lightsKey: 'landmark_tomba_lights',
        label: "Caixa d'Água do Tomba • Feira",
        hasBeacon: true
    }
];

/* =====================================================================
   3. ESCALADA DE NÍVEIS, INIMIGOS & PALETA DINÂMICA DO CÉU (18h -> 00h+)
   ===================================================================== */
function getPhaseInfo(totalDelivered) {
    // Nível 1 (18:00 — Entardecer | Meta: 8 entregas)
    if (totalDelivered < 8) {
        return {
            phase: 1,
            name: 'Entardecer',
            upperName: 'ENTARDECER',
            timeStr: '18:00',
            inPhase: totalDelivered,
            goal: 8,
            baseSpeed: 162,
            spawnInterval: 2500,
            maxEnemies: 2,
            allowDrones: false,
            allowIceBirds: false,
            formationChance: 0,
            tripleChance: 0,
            electricClouds: false,
            waveAmp: 16,
            multiplier: 1.0,
            vipChance: 0.16,
            alertText: 'Entregue 8 pizzas antes do crepúsculo!'
        };
    }
    // Nível 2 (20:00 — Crepúsculo | Meta: 10 entregas)
    if (totalDelivered < 18) {
        return {
            phase: 2,
            name: 'Crepúsculo',
            upperName: 'CREPÚSCULO',
            timeStr: '20:00',
            inPhase: totalDelivered - 8,
            goal: 10,
            baseSpeed: 192,
            spawnInterval: 1950,
            maxEnemies: 3,
            allowDrones: true,
            allowIceBirds: false,
            formationChance: 0,
            tripleChance: 0,
            electricClouds: false,
            waveAmp: 24,
            multiplier: 1.2,
            vipChance: 0.24,
            alertText: 'Cuidado: Drones Floco-de-Neve no céu!'
        };
    }
    // Nível 3 (22:00 — Noite Natalina | Meta: 12 entregas)
    if (totalDelivered < 30) {
        return {
            phase: 3,
            name: 'Noite Natalina',
            upperName: 'NOITE NATALINA',
            timeStr: '22:00',
            inPhase: totalDelivered - 18,
            goal: 12,
            baseSpeed: 222,
            spawnInterval: 1550,
            maxEnemies: 4,
            allowDrones: true,
            allowIceBirds: true,
            formationChance: 0.36,
            tripleChance: 0,
            electricClouds: false,
            waveAmp: 28,
            multiplier: 1.4,
            vipChance: 0.30,
            alertText: 'Pássaros Gelados velozes e formações duplas!'
        };
    }
    // Nível 4 (00:00 — Meia-Noite! | Meta: 15 entregas)
    if (totalDelivered < 45) {
        return {
            phase: 4,
            name: 'Meia-Noite!',
            upperName: 'MEIA-NOITE!',
            timeStr: '00:00',
            inPhase: totalDelivered - 30,
            goal: 15,
            baseSpeed: 252,
            spawnInterval: 1250,
            maxEnemies: 5,
            allowDrones: true,
            allowIceBirds: true,
            formationChance: 0.50,
            tripleChance: 0.16,
            electricClouds: true,
            waveAmp: 34,
            multiplier: 1.65,
            vipChance: 0.36,
            alertText: 'Meia-Noite: Nuvens elétricas e escadinhas!'
        };
    }
    // Nível 5+ (00:00+ — Madrugada Infinita | Meta: 15 entregas por nível)
    const extra = totalDelivered - 45;
    const step = Math.floor(extra / 15);
    const levelNum = 5 + step;
    const maxEn = Math.min(7, 5 + Math.floor((levelNum - 3) / 2));
    return {
        phase: levelNum,
        name: 'Madrugada Infinita',
        upperName: 'MADRUGADA INFINITA!',
        timeStr: '00:00+',
        inPhase: extra % 15,
        goal: 15,
        baseSpeed: Math.min(330, 266 + step * 16),
        spawnInterval: Math.max(850, 1140 - step * 95),
        maxEnemies: maxEn,
        allowDrones: true,
        allowIceBirds: true,
        formationChance: Math.min(0.76, 0.56 + step * 0.08),
        tripleChance: Math.min(0.38, 0.20 + step * 0.06),
        electricClouds: true,
        waveAmp: Math.min(44, 36 + step * 2),
        multiplier: Number((1.9 + step * 0.25).toFixed(2)),
        vipChance: 0.40,
        alertText: `Até ${maxEn} inimigos simultâneos na tela!`
    };
}

function getTargetSkyProgress(totalDelivered) {
    if (totalDelivered <= 8) return (totalDelivered / 8) * (1 / 3);
    if (totalDelivered <= 18) return (1 / 3) + ((totalDelivered - 8) / 10) * (1 / 3);
    if (totalDelivered <= 30) return (2 / 3) + ((totalDelivered - 18) / 12) * (1 / 3);
    return 1.0;
}

/* Paleta de 4 estágios interpolados suavemente (18:00 -> 20:00 -> 22:00 -> 00:00) */
const SKY_STAGES = [
    {
        // 0.00 -> 18:00 Entardecer Alaranjado/Dourado
        top: 0x3b2f63, mid: 0xd96b43, bottom: 0xfbbf24,
        mtn: 0x6b3e5b, forest: 0x452642, ground: 0xfde6d2,
        cloud: 0xfdba74, landmark: 0xffd7b5
    },
    {
        // 0.33 -> 20:00 Crepúsculo Roxo/Magenta
        top: 0x1e1b4b, mid: 0x6d2859, bottom: 0xc2416d,
        mtn: 0x3b2354, forest: 0x261840, ground: 0xe2d2e8,
        cloud: 0xe879a9, landmark: 0xdcc4e8
    },
    {
        // 0.67 -> 22:00 Noite Azul-Marinho
        top: 0x091026, mid: 0x172554, bottom: 0x1e3a8a,
        mtn: 0x172554, forest: 0x0f1d42, ground: 0xcbd5f5,
        cloud: 0x64748b, landmark: 0x9fb4e0
    },
    {
        // 1.00 -> 00:00 Meia-Noite com Lua Cheia & Aurora
        top: 0x040714, mid: 0x0b1530, bottom: 0x152c55,
        mtn: 0x101d3b, forest: 0x09132b, ground: 0xdbeafe,
        cloud: 0x475569, landmark: 0x8ea9d6
    }
];

function lerpColorHex(c1, c2, t) {
    const r1 = (c1 >> 16) & 255, g1 = (c1 >> 8) & 255, b1 = c1 & 255;
    const r2 = (c2 >> 16) & 255, g2 = (c2 >> 8) & 255, b2 = c2 & 255;
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    return (r << 16) | (g << 8) | b;
}

function sampleSkyPalette(progress) {
    const p = Math.max(0, Math.min(1, progress));
    const scaled = p * (SKY_STAGES.length - 1);
    const idx = Math.min(SKY_STAGES.length - 2, Math.floor(scaled));
    const t = scaled - idx;
    const a = SKY_STAGES[idx];
    const b = SKY_STAGES[idx + 1];
    return {
        top: lerpColorHex(a.top, b.top, t),
        mid: lerpColorHex(a.mid, b.mid, t),
        bottom: lerpColorHex(a.bottom, b.bottom, t),
        mtn: lerpColorHex(a.mtn, b.mtn, t),
        forest: lerpColorHex(a.forest, b.forest, t),
        ground: lerpColorHex(a.ground, b.ground, t),
        cloud: lerpColorHex(a.cloud, b.cloud, t),
        landmark: lerpColorHex(a.landmark, b.landmark, t)
    };
}

/* =====================================================================
   4. PONTE ENTRE DOM (HUD / MENU / RANKING / SLIDER / CONTROLES) E PHASER
   ===================================================================== */
const ui = {
    hudPlayerName: document.getElementById('hud-player-name'),
    hudScore: document.getElementById('hud-score'),
    hearts: Array.from(document.querySelectorAll('.heart-icon')),
    hudPhaseLabel: document.getElementById('hud-phase-label'),
    hudPhaseName: document.getElementById('hud-phase-name'),
    phaseBarFill: document.getElementById('phase-bar-fill'),
    hudPhaseCount: document.getElementById('hud-phase-count'),
    ammoPill: document.getElementById('ammo-pill'),
    hudAmmoText: document.getElementById('hud-ammo-text'),
    ammoBarFill: document.getElementById('ammo-bar-fill'),
    comboBadge: document.getElementById('combo-badge'),
    phaseBanner: document.getElementById('phase-banner'),
    bannerKicker: document.getElementById('banner-kicker'),
    bannerTitle: document.getElementById('banner-title'),
    bannerBonus: document.getElementById('banner-bonus'),
    titleOverlay: document.getElementById('title-overlay'),
    pauseOverlay: document.getElementById('pause-overlay'),
    gameoverOverlay: document.getElementById('gameover-overlay'),
    titleHighscore: document.getElementById('title-highscore'),
    rankingPlayersBadge: document.getElementById('ranking-players-badge'),
    titleRankingList: document.getElementById('title-ranking-list'),
    goRankingList: document.getElementById('go-ranking-list'),
    playerNameInput: document.getElementById('player-name-input'),
    btnCharPrev: document.getElementById('btn-char-prev'),
    btnCharNext: document.getElementById('btn-char-next'),
    charSliderStage: document.getElementById('char-slider-stage'),
    charPreviewImg: document.getElementById('char-preview-img'),
    charPreviewFallback: document.getElementById('char-preview-fallback'),
    charName: document.getElementById('char-name'),
    charSubtitle: document.getElementById('char-subtitle'),
    charCounter: document.getElementById('char-counter'),
    btnCharGrid: document.getElementById('btn-char-grid'),
    charModalOverlay: document.getElementById('char-modal-overlay'),
    btnCharModalClose: document.getElementById('btn-char-modal-close'),
    charSearchInput: document.getElementById('char-search-input'),
    charGridList: document.getElementById('char-grid-list'),
    goPlayerTag: document.getElementById('go-player-tag'),
    goScore: document.getElementById('go-score'),
    goHighscore: document.getElementById('go-highscore'),
    goPizzas: document.getElementById('go-pizzas'),
    goMaxCombo: document.getElementById('go-max-combo'),
    goPhase: document.getElementById('go-phase'),
    newRecordBadge: document.getElementById('new-record-badge'),
    btnStart: document.getElementById('btn-start'),
    btnResume: document.getElementById('btn-resume'),
    btnPauseRestart: document.getElementById('btn-pause-restart'),
    btnPauseMenu: document.getElementById('btn-pause-menu'),
    btnRestart: document.getElementById('btn-restart'),
    btnGoMenu: document.getElementById('btn-go-menu'),
    btnPause: document.getElementById('btn-pause'),
    btnMute: document.getElementById('btn-mute'),
    iconSoundOn: document.getElementById('icon-sound-on'),
    iconSoundOff: document.getElementById('icon-sound-off'),
    btnFly: document.getElementById('btn-fly'),
    btnPizza: document.getElementById('btn-pizza'),
    btnPizzaBadge: document.getElementById('btn-pizza-badge'),
    pizzaCooldownBar: document.getElementById('pizza-cooldown-bar')
};

const gameBridge = {
    scene: null,
    isFlyHeld: false,
    activeFlyPointers: new Set(),
    bannerTimeout: null,
    highScore: 0,
    ranking: [],
    currentPlayerName: '',
    selectedCharIndex: 0,
    santaPreviewDataUrl: null,

    initStorage() {
        try {
            const savedName = localStorage.getItem(STORAGE_LAST_PLAYER_KEY) || '';
            this.currentPlayerName = savedName.trim().slice(0, 16);
            if (ui.playerNameInput) ui.playerNameInput.value = this.currentPlayerName;
        } catch (e) { }

        // Prioriza ?pizzaria=id na URL; caso contrário, usa o último salvo no celular
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const urlId = (urlParams.get('pizzaria') || '').trim().toLowerCase();
            const savedCharId = localStorage.getItem(STORAGE_SELECTED_CHAR_KEY);
            const targetId = urlId || savedCharId;
            const idx = CHARACTER_CATALOG.findIndex((c) => c.id.toLowerCase() === (targetId || '').toLowerCase());
            this.selectedCharIndex = idx >= 0 ? idx : 0;
        } catch (e) {
            this.selectedCharIndex = 0;
        }

        let legacyHigh = 0;
        try {
            const saved = parseInt(localStorage.getItem(STORAGE_HIGHSCORE_KEY) || '0', 10);
            legacyHigh = Number.isFinite(saved) && saved > 0 ? saved : 0;
        } catch (e) { }

        try {
            const raw = localStorage.getItem(STORAGE_RANKING_KEY);
            const parsed = raw ? JSON.parse(raw) : [];
            this.ranking = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            this.ranking = [];
        }

        const topRankScore = this.ranking.length > 0 ? (this.ranking[0].score || 0) : 0;
        this.highScore = Math.max(legacyHigh, topRankScore);

        this.renderRankingUI();
        this.renderCharacterSlider();
    },

    getSelectedCharacter() {
        return CHARACTER_CATALOG[this.selectedCharIndex] || CHARACTER_CATALOG[0];
    },

    getActivePlayerName() {
        const typed = ui.playerNameInput ? ui.playerNameInput.value.trim().slice(0, 16) : '';
        this.currentPlayerName = typed || 'Jogador';
        try {
            if (typed) localStorage.setItem(STORAGE_LAST_PLAYER_KEY, typed);
        } catch (e) { }
        return this.currentPlayerName;
    },

    setSelectedCharacterIndex(newIdx) {
        const total = CHARACTER_CATALOG.length;
        this.selectedCharIndex = ((newIdx % total) + total) % total;
        const char = this.getSelectedCharacter();
        try {
            localStorage.setItem(STORAGE_SELECTED_CHAR_KEY, char.id);
        } catch (e) { }

        this.renderCharacterSlider();
        if (this.scene) this.scene.applyCharacter(char);
    },

    renderCharacterSlider() {
        const char = this.getSelectedCharacter();
        if (!ui.charName) return;

        ui.charName.textContent = char.name;
        ui.charSubtitle.textContent = char.subtitle;
        ui.charSubtitle.classList.remove('warn');

        const imgEl = ui.charPreviewImg;
        const fbEl = ui.charPreviewFallback;
        fbEl.textContent = char.emoji || '🎅';

        const previewSrc = char.imgSrc || this.santaPreviewDataUrl;
        if (previewSrc) {
            imgEl.classList.remove('loaded');
            fbEl.classList.remove('hidden');

            imgEl.onload = () => {
                imgEl.classList.add('loaded');
                fbEl.classList.add('hidden');
            };
            imgEl.onerror = () => {
                imgEl.classList.remove('loaded');
                fbEl.classList.remove('hidden');
                if (char.imgSrc) {
                    ui.charSubtitle.textContent = `Adicione ${char.imgSrc}`;
                    ui.charSubtitle.classList.add('warn');
                }
            };
            imgEl.src = previewSrc;
        } else {
            imgEl.classList.remove('loaded');
            fbEl.classList.remove('hidden');
        }

        const total = CHARACTER_CATALOG.length;
        if (ui.charCounter) {
            ui.charCounter.textContent = `${this.selectedCharIndex + 1} / ${total}`;
        }
        if (ui.btnCharGrid) {
            ui.btnCharGrid.textContent = `Ver todos (${total})`;
            ui.btnCharGrid.style.display = total > 1 ? 'inline-flex' : 'none';
        }
    },

    openCharacterModal() {
        if (!ui.charModalOverlay) return;
        if (ui.charSearchInput) ui.charSearchInput.value = '';
        this.renderCharacterGrid('');
        ui.charModalOverlay.classList.remove('hidden');
    },

    closeCharacterModal() {
        if (!ui.charModalOverlay) return;
        if (ui.charSearchInput) ui.charSearchInput.blur();
        ui.charModalOverlay.classList.add('hidden');
    },

    renderCharacterGrid(filterText = '') {
        if (!ui.charGridList) return;
        ui.charGridList.innerHTML = '';

        const q = filterText.trim().toLocaleLowerCase('pt-BR');
        const matches = CHARACTER_CATALOG
            .map((char, idx) => ({ char, idx }))
            .filter(({ char }) => {
                if (!q) return true;
                return (
                    char.name.toLocaleLowerCase('pt-BR').includes(q) ||
                    char.subtitle.toLocaleLowerCase('pt-BR').includes(q)
                );
            });

        if (matches.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'char-grid-empty';
            empty.textContent = 'Nenhuma pizzaria encontrada.';
            ui.charGridList.appendChild(empty);
            return;
        }

        matches.forEach(({ char, idx }) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'char-grid-card' + (idx === this.selectedCharIndex ? ' selected' : '');

            const thumb = document.createElement('div');
            thumb.className = 'char-grid-thumb';
            const src = char.imgSrc || this.santaPreviewDataUrl;

            if (src) {
                const img = document.createElement('img');
                img.src = src;
                img.alt = char.name;
                img.loading = 'lazy';
                img.onerror = () => {
                    thumb.textContent = char.emoji || '🍕';
                };
                thumb.appendChild(img);
            } else {
                thumb.textContent = char.emoji || '🎅';
            }

            const nameEl = document.createElement('div');
            nameEl.className = 'char-grid-name';
            nameEl.textContent = char.name;

            const subEl = document.createElement('div');
            subEl.className = 'char-grid-sub';
            subEl.textContent = char.subtitle;

            btn.appendChild(thumb);
            btn.appendChild(nameEl);
            btn.appendChild(subEl);

            btn.addEventListener('click', () => {
                soundFX.unlock();
                soundFX.playClick();
                this.setSelectedCharacterIndex(idx);
                this.closeCharacterModal();
            });

            ui.charGridList.appendChild(btn);
        });
    },

    recordPlayerScore(playerName, score, pizzas, maxCombo, charId) {
        const cleanName = (playerName || '').trim().slice(0, 16) || 'Jogador';
        const key = cleanName.toLocaleLowerCase('pt-BR');
        const prevOverall = this.highScore;

        const existing = this.ranking.find((r) => r.key === key);
        if (existing) {
            existing.name = cleanName;
            if (score >= existing.score) {
                existing.score = score;
                existing.pizzas = pizzas;
                existing.maxCombo = maxCombo;
                existing.charId = charId;
                existing.updatedAt = Date.now();
            }
        } else {
            this.ranking.push({
                key,
                name: cleanName,
                score,
                pizzas,
                maxCombo,
                charId,
                updatedAt: Date.now()
            });
        }

        this.ranking.sort((a, b) => (b.score - a.score) || (b.pizzas - a.pizzas) || (a.updatedAt - b.updatedAt));
        this.ranking = this.ranking.slice(0, 10);

        if (score > this.highScore) {
            this.highScore = score;
            try {
                localStorage.setItem(STORAGE_HIGHSCORE_KEY, String(score));
            } catch (e) { }
        }

        try {
            localStorage.setItem(STORAGE_RANKING_KEY, JSON.stringify(this.ranking));
        } catch (e) { }

        this.renderRankingUI();
        return score > prevOverall && score > 0;
    },

    renderRankingList(targetUl, maxItems = 5) {
        if (!targetUl) return;
        targetUl.innerHTML = '';

        if (this.ranking.length === 0) {
            const emptyLi = document.createElement('li');
            emptyLi.className = 'ranking-empty';
            emptyLi.textContent = 'Insira seu nome e jogue para estrear o ranking!';
            targetUl.appendChild(emptyLi);
            return;
        }

        const activeKey = (ui.playerNameInput ? ui.playerNameInput.value.trim() : this.currentPlayerName)
            .toLocaleLowerCase('pt-BR');
        const medals = ['🥇', '🥈', '🥉'];

        this.ranking.slice(0, maxItems).forEach((entry, idx) => {
            const li = document.createElement('li');
            li.className = 'ranking-item' + (activeKey && entry.key === activeKey ? ' is-current' : '');

            const posSpan = document.createElement('span');
            posSpan.className = 'ranking-pos';
            posSpan.textContent = medals[idx] || `${idx + 1}º`;

            const charDef = CHARACTER_CATALOG.find((c) => c.id === entry.charId);
            const avatarSpan = document.createElement('span');
            avatarSpan.className = 'ranking-avatar';
            const avatarSrc = (charDef && charDef.imgSrc) || (charDef && charDef.id === 'santa_default' ? this.santaPreviewDataUrl : null);
            if (avatarSrc) {
                const avImg = document.createElement('img');
                avImg.src = avatarSrc;
                avImg.alt = '';
                avImg.onerror = () => {
                    avatarSpan.textContent = (charDef && charDef.emoji) || '🎅';
                };
                avatarSpan.appendChild(avImg);
            } else {
                avatarSpan.textContent = (charDef && charDef.emoji) || '🎅';
            }

            const nameSpan = document.createElement('span');
            nameSpan.className = 'ranking-player';
            nameSpan.textContent = entry.name;

            const scoreSpan = document.createElement('span');
            scoreSpan.className = 'ranking-score';
            scoreSpan.textContent = `${entry.score.toLocaleString('pt-BR')} pts`;

            li.appendChild(posSpan);
            li.appendChild(avatarSpan);
            li.appendChild(nameSpan);
            li.appendChild(scoreSpan);
            targetUl.appendChild(li);
        });
    },



    renderRankingUI() {
        if (ui.titleHighscore) {
            ui.titleHighscore.textContent = this.highScore.toLocaleString('pt-BR');
        }
        if (ui.rankingPlayersBadge) {
            if (this.ranking.length >= 2) {
                ui.rankingPlayersBadge.textContent = `${this.ranking.length} jogadores`;
            } else {
                ui.rankingPlayersBadge.innerHTML = `Recorde: <strong id="title-highscore">${this.highScore.toLocaleString('pt-BR')}</strong>`;
                ui.titleHighscore = document.getElementById('title-highscore');
            }
        }
        this.renderRankingList(ui.titleRankingList, 5);
        this.renderRankingList(ui.goRankingList, 3);
    }
};

gameBridge.initStorage();

function updateHUD(state) {
    const { score, combo, lives, ammo, phaseInfo } = state;

    if (ui.hudPlayerName) {
        ui.hudPlayerName.textContent = gameBridge.currentPlayerName || 'Pontos';
    }
    ui.hudScore.textContent = score.toLocaleString('pt-BR');

    ui.hearts.forEach((h, idx) => {
        h.classList.toggle('lost', idx >= lives);
    });

    ui.hudPhaseLabel.textContent = `NV ${phaseInfo.phase} • ${phaseInfo.timeStr}`;
    ui.hudPhaseName.textContent = phaseInfo.name;
    ui.hudPhaseCount.textContent = `${phaseInfo.inPhase}/${phaseInfo.goal}`;
    const pctPhase = Math.min(100, Math.round((phaseInfo.inPhase / phaseInfo.goal) * 100));
    ui.phaseBarFill.style.width = `${pctPhase}%`;

    ui.hudAmmoText.textContent = `${ammo}/${MAX_AMMO}`;
    ui.ammoBarFill.style.width = `${(ammo / MAX_AMMO) * 100}%`;
    ui.btnPizzaBadge.textContent = String(ammo);

    ui.ammoPill.classList.remove('low-ammo', 'empty-ammo');
    ui.btnPizzaBadge.classList.remove('low', 'empty');
    ui.btnPizza.classList.remove('is-empty');

    if (ammo === 0) {
        ui.ammoPill.classList.add('empty-ammo');
        ui.btnPizzaBadge.classList.add('empty');
        ui.btnPizza.classList.add('is-empty');
    } else if (ammo <= 2) {
        ui.ammoPill.classList.add('low-ammo');
        ui.btnPizzaBadge.classList.add('low');
    }

    if (combo >= 2) {
        ui.comboBadge.textContent = `COMBO x${combo}!`;
        ui.comboBadge.classList.add('visible');
    } else {
        ui.comboBadge.classList.remove('visible');
    }
}

function triggerEmptyAmmoShake() {
    [ui.ammoPill, ui.btnPizzaBadge].forEach((el) => {
        el.classList.remove('shake-error');
        void el.offsetWidth;
        el.classList.add('shake-error');
    });
}

function showPhaseBanner(phaseInfo, bonusAdded) {
    if (gameBridge.bannerTimeout) clearTimeout(gameBridge.bannerTimeout);
    ui.bannerKicker.textContent = phaseInfo.phase >= 4 ? '🌕 CLÍMAX NATALINO!' : '✨ NOVO NÍVEL ALCANÇADO!';
    ui.bannerTitle.textContent = `NÍVEL ${phaseInfo.phase} • ${phaseInfo.timeStr} — ${phaseInfo.upperName}`;
    const bonusPart = bonusAdded > 0
        ? `+${bonusAdded} Pizzas no Trenó!`
        : 'Estoque cheio (+100 pts)!';
    ui.bannerBonus.textContent = `${phaseInfo.alertText} • ${bonusPart}`;

    ui.phaseBanner.classList.add('show');
    gameBridge.bannerTimeout = setTimeout(() => {
        ui.phaseBanner.classList.remove('show');
    }, 3100);
}

function showGameOverScreen(score, pizzasDelivered, maxCombo, phaseInfo) {
    const playerName = gameBridge.currentPlayerName || 'Jogador';
    const char = gameBridge.getSelectedCharacter();
    const isNewRecord = gameBridge.recordPlayerScore(
        playerName,
        score,
        pizzasDelivered,
        maxCombo,
        char.id
    );

    if (ui.goPlayerTag) {
        ui.goPlayerTag.textContent = `${char.emoji} ${playerName} • Fim da Entrega`;
    }
    ui.goScore.textContent = score.toLocaleString('pt-BR');
    ui.goHighscore.textContent = gameBridge.highScore.toLocaleString('pt-BR');
    ui.goPizzas.textContent = String(pizzasDelivered);
    ui.goMaxCombo.textContent = `x${maxCombo}`;
    ui.goPhase.textContent = `Nível ${phaseInfo.phase} • ${phaseInfo.timeStr} — ${phaseInfo.name}`;

    ui.newRecordBadge.classList.toggle('show', isNewRecord);
    ui.gameoverOverlay.classList.remove('hidden');
}

if (ui.playerNameInput) {
    ui.playerNameInput.addEventListener('input', () => {
        gameBridge.renderRankingUI();
    });
    ui.playerNameInput.addEventListener('keydown', (e) => {
        e.stopPropagation();
        if (e.key === 'Enter') {
            ui.playerNameInput.blur();
        }
    });
}

if (ui.btnCharPrev) {
    ui.btnCharPrev.addEventListener('click', () => {
        soundFX.unlock();
        soundFX.playClick();
        gameBridge.setSelectedCharacterIndex(gameBridge.selectedCharIndex - 1);
    });
}
if (ui.btnCharNext) {
    ui.btnCharNext.addEventListener('click', () => {
        soundFX.unlock();
        soundFX.playClick();
        gameBridge.setSelectedCharacterIndex(gameBridge.selectedCharIndex + 1);
    });
}
if (ui.charSliderStage) {
    let swipeStartX = null;
    ui.charSliderStage.addEventListener('pointerdown', (e) => {
        swipeStartX = e.clientX;
    });
    ui.charSliderStage.addEventListener('pointerup', (e) => {
        if (swipeStartX === null) return;
        const dx = e.clientX - swipeStartX;
        swipeStartX = null;
        if (Math.abs(dx) >= 32) {
            soundFX.unlock();
            soundFX.playClick();
            gameBridge.setSelectedCharacterIndex(
                gameBridge.selectedCharIndex + (dx < 0 ? 1 : -1)
            );
        }
    });
    ui.charSliderStage.addEventListener('pointercancel', () => {
        swipeStartX = null;
    });
}

if (ui.btnCharGrid) {
    ui.btnCharGrid.addEventListener('click', () => {
        soundFX.unlock();
        soundFX.playClick();
        gameBridge.openCharacterModal();
    });
}
if (ui.btnCharModalClose) {
    ui.btnCharModalClose.addEventListener('click', () => {
        soundFX.unlock();
        soundFX.playClick();
        gameBridge.closeCharacterModal();
    });
}
if (ui.charModalOverlay) {
    ui.charModalOverlay.addEventListener('click', (e) => {
        if (e.target === ui.charModalOverlay) {
            gameBridge.closeCharacterModal();
        }
    });
}
if (ui.charSearchInput) {
    ui.charSearchInput.addEventListener('input', (e) => {
        gameBridge.renderCharacterGrid(e.target.value);
    });
    ui.charSearchInput.addEventListener('keydown', (e) => {
        e.stopPropagation();
        if (e.key === 'Escape') gameBridge.closeCharacterModal();
    });
}

ui.btnStart.addEventListener('click', () => {
    soundFX.unlock();
    soundFX.playClick();
    if (ui.playerNameInput) ui.playerNameInput.blur();
    gameBridge.getActivePlayerName();
    if (gameBridge.scene) gameBridge.scene.startGame();
});

ui.btnRestart.addEventListener('click', () => {
    soundFX.unlock();
    soundFX.playClick();
    if (gameBridge.scene) gameBridge.scene.startGame();
});

ui.btnResume.addEventListener('click', () => {
    soundFX.unlock();
    soundFX.playClick();
    if (gameBridge.scene) gameBridge.scene.togglePause();
});

ui.btnPauseRestart.addEventListener('click', () => {
    soundFX.unlock();
    soundFX.playClick();
    if (gameBridge.scene) gameBridge.scene.startGame();
});

if (ui.btnPauseMenu) {
    ui.btnPauseMenu.addEventListener('click', () => {
        soundFX.unlock();
        soundFX.playClick();
        if (gameBridge.scene) gameBridge.scene.returnToMenu();
    });
}

if (ui.btnGoMenu) {
    ui.btnGoMenu.addEventListener('click', () => {
        soundFX.unlock();
        soundFX.playClick();
        if (gameBridge.scene) gameBridge.scene.returnToMenu();
    });
}

ui.btnPause.addEventListener('click', () => {
    soundFX.unlock();
    soundFX.playClick();
    if (gameBridge.scene) gameBridge.scene.togglePause();
});

ui.btnMute.addEventListener('click', () => {
    soundFX.unlock();
    const isMuted = soundFX.toggleMute();
    ui.btnMute.classList.toggle('muted', isMuted);
    ui.iconSoundOn.style.display = isMuted ? 'none' : 'block';
    ui.iconSoundOff.style.display = isMuted ? 'block' : 'none';
    if (!isMuted) soundFX.playClick();
});

const releaseFlyButton = (e) => {
    gameBridge.activeFlyPointers.delete(e.pointerId);
    if (gameBridge.activeFlyPointers.size === 0) {
        gameBridge.isFlyHeld = false;
        ui.btnFly.classList.remove('pressed');
    }
};

ui.btnFly.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    soundFX.unlock();
    try { ui.btnFly.setPointerCapture(e.pointerId); } catch (err) { }
    gameBridge.activeFlyPointers.add(e.pointerId);
    gameBridge.isFlyHeld = true;
    ui.btnFly.classList.add('pressed');
});
ui.btnFly.addEventListener('pointerup', releaseFlyButton);
ui.btnFly.addEventListener('pointercancel', releaseFlyButton);
ui.btnFly.addEventListener('lostpointercapture', releaseFlyButton);

ui.btnPizza.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    soundFX.unlock();
    ui.btnPizza.classList.add('pressed');
    if (gameBridge.scene) gameBridge.scene.tryThrowPizza();
});
const releasePizzaButton = () => ui.btnPizza.classList.remove('pressed');
ui.btnPizza.addEventListener('pointerup', releasePizzaButton);
ui.btnPizza.addEventListener('pointercancel', releasePizzaButton);
ui.btnPizza.addEventListener('pointerleave', releasePizzaButton);

/* =====================================================================
   5. GERADOR PROCEDURAL DE SPRITES (FALLBACK AUTOMÁTICO PARA PNGs)
   ===================================================================== */
function generateProceduralTextures(scene) {
    const drawBaseWindow = (g, wx, wy, ww, wh, trimColor) => {
        g.fillStyle(0x334155, 0.94);
        g.fillRoundedRect(wx, wy, ww, wh, 3);
        g.fillStyle(0xfef3c7, 0.28);
        g.fillRoundedRect(wx + 1, wy + 1, ww - 2, wh - 2, 2);
        g.lineStyle(1.8, trimColor, 1);
        g.strokeRoundedRect(wx, wy, ww, wh, 3);
        g.lineBetween(wx + ww / 2, wy, wx + ww / 2, wy + wh);
        g.lineBetween(wx, wy + wh / 2, wx + ww, wy + wh / 2);
    };

    const drawGlowWindow = (g, wx, wy, ww, wh, isVip = false) => {
        g.fillStyle(0xfef08a, isVip ? 0.50 : 0.34);
        g.fillRoundedRect(wx - 4, wy - 4, ww + 8, wh + 8, 6);
        g.fillStyle(0xfde047, 0.96);
        g.fillRoundedRect(wx + 1, wy + 1, ww - 2, wh - 2, 2);
        g.fillStyle(0xffffff, 0.58);
        g.fillRect(wx + 3, wy + 3, Math.max(3, ww * 0.32), Math.max(3, wh * 0.32));
    };

    const drawDoorWithWreath = (g, dx, dy, dw, dh, doorColor, trimColor, arched = false) => {
        g.fillStyle(doorColor, 1);
        const rad = arched ? { tl: dw / 2, tr: dw / 2, bl: 0, br: 0 } : { tl: 6, tr: 6, bl: 0, br: 0 };
        g.fillRoundedRect(dx, dy, dw, dh, rad);
        g.lineStyle(1.8, trimColor, 0.85);
        g.strokeRoundedRect(dx, dy, dw, dh, rad);
        // Guirlanda natalina na porta
        g.lineStyle(2.6, 0x22c55e, 1);
        g.strokeCircle(dx + dw / 2, dy + Math.min(15, dh * 0.42), 4.5);
        g.fillStyle(0xef4444, 1);
        g.fillCircle(dx + dw / 2, dy + Math.min(10.5, dh * 0.42 - 4.5), 1.8);
        g.fillStyle(0xfacc15, 1);
        g.fillCircle(dx + dw - 4.5, dy + dh * 0.62, 1.6);
    };

    // --- 1. TRENÓ DO PAPAI NOEL (`santa_sleigh`: 92 x 58) ---
    if (!scene.textures.exists('santa_sleigh')) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        // Patins dourados
        g.lineStyle(3.5, 0xfacc15, 1);
        g.lineBetween(10, 52, 82, 52);
        g.beginPath();
        g.arc(82, 46, 6, Math.PI * 0.5, -Math.PI * 0.45, true);
        g.strokePath();
        g.lineStyle(2.5, 0xeab308, 1);
        g.lineBetween(24, 44, 24, 52);
        g.lineBetween(62, 44, 62, 52);

        // Pilha de caixas de pizza no fundo do trenó
        g.fillStyle(0xfde68a, 1);
        g.fillRoundedRect(10, 20, 24, 8, 2);
        g.fillRoundedRect(12, 13, 22, 8, 2);
        g.lineStyle(1.4, 0xb91c1c, 1);
        g.strokeRoundedRect(10, 20, 24, 8, 2);
        g.strokeRoundedRect(12, 13, 22, 8, 2);

        // Corpo vermelho do trenó
        g.fillStyle(0xdc2626, 1);
        g.beginPath();
        g.moveTo(8, 28);
        g.lineTo(36, 28);
        g.lineTo(44, 34);
        g.lineTo(74, 30);
        g.lineTo(84, 24);
        g.lineTo(78, 45);
        g.lineTo(14, 45);
        g.closePath();
        g.fillPath();
        g.lineStyle(2.4, 0xfacc15, 1);
        g.lineBetween(10, 30, 35, 30);
        g.lineBetween(44, 36, 78, 30);

        // Papai Noel
        g.fillStyle(0xb91c1c, 1);
        g.fillRoundedRect(40, 18, 22, 18, 6);
        g.fillStyle(0x111827, 1);
        g.fillRect(41, 29, 20, 4);
        g.fillStyle(0xfacc15, 1);
        g.fillRect(49, 28.5, 5, 5);

        // Cabeça + barba branca + gorro
        g.fillStyle(0xfed7aa, 1);
        g.fillCircle(53, 15, 8);
        g.fillStyle(0xffffff, 1);
        g.fillCircle(56, 19, 6.5);
        g.fillCircle(50, 20, 5);
        g.fillStyle(0x111827, 1);
        g.fillCircle(56, 13.5, 1.5);
        g.fillStyle(0xef4444, 1);
        g.fillTriangle(44, 11, 61, 10, 40, 2);
        g.fillStyle(0xffffff, 1);
        g.fillRoundedRect(44, 8.5, 18, 4.5, 2.2);
        g.fillCircle(39, 3, 3.2);

        // Lanterna frontal dourada
        g.fillStyle(0xfef08a, 0.45);
        g.fillCircle(84, 24, 7);
        g.fillStyle(0xfef08a, 1);
        g.fillCircle(84, 24, 3.2);

        g.generateTexture('santa_sleigh', 92, 58);
        g.destroy();
    }

    // --- 2. CAIXA DE PIZZA (`pizza_box`: 32 x 26) ---
    if (!scene.textures.exists('pizza_box')) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xfef3c7, 1);
        g.fillRoundedRect(2, 4, 28, 18, 3);
        g.lineStyle(2, 0xb45309, 1);
        g.strokeRoundedRect(2, 4, 28, 18, 3);
        g.fillStyle(0xdc2626, 1);
        g.fillRect(14, 4, 4, 18);
        g.fillRect(2, 11, 28, 4);
        g.fillStyle(0xfacc15, 1);
        g.fillCircle(16, 13, 4.5);
        g.fillStyle(0xef4444, 1);
        g.fillCircle(15, 12, 1.4);
        g.fillCircle(17.5, 14, 1.3);
        g.generateTexture('pizza_box', 32, 26);
        g.destroy();
    }

    // --- 3. PACOTE AÉREO DE REABASTECIMENTO (`pizza_pack`: 60 x 68) ---
    if (!scene.textures.exists('pizza_pack')) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        // Cordas do paraquedas
        g.lineStyle(1.6, 0xfef3c7, 0.9);
        g.lineBetween(11, 26, 20, 44);
        g.lineBetween(49, 26, 40, 44);
        g.lineBetween(30, 24, 30, 44);

        // Cúpula do paraquedas (vermelho e branco natalino)
        g.fillStyle(0xef4444, 1);
        g.slice(30, 28, 22, Math.PI, 0, false);
        g.fillPath();
        g.fillStyle(0xffffff, 1);
        g.slice(30, 28, 22, Math.PI * 1.28, Math.PI * 1.72, false);
        g.fillPath();
        g.fillStyle(0x16a34a, 1);
        g.slice(30, 28, 22, Math.PI * 1.43, Math.PI * 1.57, false);
        g.fillPath();
        g.lineStyle(2, 0xfef08a, 0.9);
        g.beginPath();
        g.arc(30, 28, 22, Math.PI, 0, false);
        g.strokePath();

        // Pilha de 3 caixas de pizza com laço verde e dourado
        [56, 48, 40].forEach((yPos) => {
            g.fillStyle(0xfef3c7, 1);
            g.fillRoundedRect(13, yPos, 34, 9, 2.5);
            g.lineStyle(1.6, 0xb45309, 1);
            g.strokeRoundedRect(13, yPos, 34, 9, 2.5);
        });
        g.fillStyle(0x16a34a, 1);
        g.fillRect(27.5, 40, 5, 25);
        g.fillStyle(0xfacc15, 1);
        g.fillCircle(30, 40, 4.5);
        g.generateTexture('pizza_pack', 60, 68);
        g.destroy();
    }

    // --- 3B. CORAÇÃO COLETÁVEL DE VIDA EXTRA (`life_heart`: 44 x 44) ---
    if (!scene.textures.exists('life_heart')) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        // Brilho externo e aro dourado (destaque no entardecer e na meia-noite)
        g.fillStyle(0xfca5a5, 0.26);
        g.fillCircle(22, 22, 20);
        g.lineStyle(1.8, 0xfef08a, 0.85);
        g.strokeCircle(22, 22, 19);

        // Sombra / contorno escuro do coração
        g.fillStyle(0x991b1b, 1);
        g.fillCircle(16, 18.5, 8.8);
        g.fillCircle(28, 18.5, 8.8);
        g.fillTriangle(8, 21, 36, 21, 22, 37);

        // Corpo vermelho vibrante do coração
        g.fillStyle(0xef4444, 1);
        g.fillCircle(16, 17.5, 8);
        g.fillCircle(28, 17.5, 8);
        g.fillTriangle(8.5, 20, 35.5, 20, 22, 35.5);

        // Brilho branco no canto superior esquerdo
        g.fillStyle(0xffffff, 0.72);
        g.fillCircle(14, 15, 2.5);
        g.fillCircle(11.8, 18.8, 1.3);

        g.generateTexture('life_heart', 44, 44);
        g.destroy();
    }

    // --- 4. CATÁLOGO DE 6 CASAS + CAMADAS NOTURNAS (`*_lights`) ---

    // 4.1) Chalé A-Frame Pequeno (`house_chalet_sm`: 86 x 82)
    if (!scene.textures.exists('house_chalet_sm')) {
        const w = 86, h = 82;
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x7c2d12, 1);
        g.fillTriangle(43, 8, 6, h, w - 6, h);
        g.lineStyle(1.4, 0x451a03, 0.45);
        for (let ly = 28; ly < h; ly += 9) {
            const hw = ((ly - 8) / (h - 8)) * 36;
            g.lineBetween(43 - hw, ly, 43 + hw, ly);
        }
        g.lineStyle(8, 0xb91c1c, 1);
        g.lineBetween(43, 8, 4, h - 2);
        g.lineBetween(43, 8, w - 4, h - 2);
        g.lineStyle(5, 0xf8fafc, 1);
        g.lineBetween(43, 6, 4, h - 4);
        g.lineBetween(43, 6, w - 4, h - 4);
        drawBaseWindow(g, 35, 30, 16, 16, 0xfef3c7);
        drawDoorWithWreath(g, 33, h - 28, 20, 28, 0x451a03, 0xfde68a, true);
        g.generateTexture('house_chalet_sm', w, h);
        g.destroy();

        const gl = scene.make.graphics({ x: 0, y: 0, add: false });
        drawGlowWindow(gl, 35, 30, 16, 16, false);
        [0xef4444, 0x22c55e, 0xfacc15, 0x38bdf8].forEach((c, i) => {
            gl.fillStyle(c, 0.35);
            gl.fillCircle(28 + i * 10, 51, 5);
            gl.fillStyle(c, 1);
            gl.fillCircle(28 + i * 10, 51, 2.5);
        });
        gl.generateTexture('house_chalet_sm_lights', w, h);
        gl.destroy();
    }

    // 4.2) Casa Clássica Média de Tijolinho (`house_classic_md`: 114 x 102)
    if (!scene.textures.exists('house_classic_md')) {
        const w = 114, h = 102, roofY = 44;
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x991b1b, 1);
        g.fillRect(10, roofY, w - 20, h - roofY);
        g.lineStyle(1, 0x7f1d1d, 0.55);
        for (let by = roofY + 8; by < h; by += 8) g.lineBetween(10, by, w - 10, by);
        g.fillStyle(0x000000, 0.2);
        g.fillRect(10, roofY, w - 20, 6);

        drawBaseWindow(g, 19, roofY + 14, 20, 20, 0xf8fafc);
        drawBaseWindow(g, w - 39, roofY + 14, 20, 20, 0xf8fafc);
        drawDoorWithWreath(g, (w - 22) / 2, h - 34, 22, 34, 0x78350f, 0xfef3c7, false);

        g.fillStyle(0x334155, 1);
        g.fillTriangle(2, roofY + 2, w - 2, roofY + 2, w / 2, 6);
        g.lineStyle(7, 0xf8fafc, 1);
        g.lineBetween(5, roofY + 1, w / 2, 7);
        g.lineBetween(w / 2, 7, w - 5, roofY + 1);
        g.fillStyle(0xf8fafc, 1);
        g.fillCircle(5, roofY + 2, 4);
        g.fillCircle(w - 5, roofY + 2, 4);
        g.generateTexture('house_classic_md', w, h);
        g.destroy();

        const gl = scene.make.graphics({ x: 0, y: 0, add: false });
        drawGlowWindow(gl, 19, roofY + 14, 20, 20, false);
        drawGlowWindow(gl, w - 39, roofY + 14, 20, 20, false);
        const lights = [0xef4444, 0x22c55e, 0xfacc15, 0x38bdf8];
        for (let lx = 14, i = 0; lx <= w - 14; lx += 12, i++) {
            gl.fillStyle(lights[i % lights.length], 0.32);
            gl.fillCircle(lx, roofY + 5, 5);
            gl.fillStyle(lights[i % lights.length], 1);
            gl.fillCircle(lx, roofY + 5, 2.5);
        }
        gl.generateTexture('house_classic_md_lights', w, h);
        gl.destroy();
    }

    // 4.3) Casa Familiar Larga Térrea com Varanda (`house_wide_family`: 156 x 86)
    if (!scene.textures.exists('house_wide_family')) {
        const w = 156, h = 86, roofY = 36;
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x1e3a5f, 1);
        g.fillRect(10, roofY, w - 20, h - roofY);
        g.fillStyle(0x000000, 0.2);
        g.fillRect(10, roofY, w - 20, 6);

        // Varanda frontal com guarda-corpo
        g.fillStyle(0x475569, 1);
        g.fillRect(6, h - 8, w - 12, 8);
        g.lineStyle(2, 0xe2e8f0, 0.85);
        g.lineBetween(12, h - 18, 52, h - 18);
        g.lineBetween(104, h - 18, w - 12, h - 18);
        for (let px = 16; px <= 50; px += 8) g.lineBetween(px, h - 18, px, h - 8);
        for (let px = 106; px <= w - 16; px += 8) g.lineBetween(px, h - 18, px, h - 8);

        drawBaseWindow(g, 18, roofY + 12, 22, 18, 0xfde68a);
        drawBaseWindow(g, 45, roofY + 12, 16, 18, 0xfde68a);
        drawBaseWindow(g, w - 42, roofY + 12, 24, 18, 0xfde68a);
        drawDoorWithWreath(g, 68, h - 35, 22, 35, 0x7c2d12, 0xfef3c7, false);

        g.fillStyle(0x475569, 1);
        g.beginPath();
        g.moveTo(4, roofY + 2);
        g.lineTo(32, 10);
        g.lineTo(w - 32, 10);
        g.lineTo(w - 4, roofY + 2);
        g.closePath();
        g.fillPath();

        g.lineStyle(7, 0xf8fafc, 1);
        g.lineBetween(6, roofY + 1, 32, 10);
        g.lineBetween(32, 10, w - 32, 10);
        g.lineBetween(w - 32, 10, w - 6, roofY + 1);
        g.generateTexture('house_wide_family', w, h);
        g.destroy();

        const gl = scene.make.graphics({ x: 0, y: 0, add: false });
        drawGlowWindow(gl, 18, roofY + 12, 22, 18, false);
        drawGlowWindow(gl, 45, roofY + 12, 16, 18, false);
        drawGlowWindow(gl, w - 42, roofY + 12, 24, 18, false);
        const lights = [0xef4444, 0xfacc15, 0x22c55e, 0x38bdf8, 0xf472b6];
        for (let lx = 12, i = 0; lx <= w - 12; lx += 11, i++) {
            gl.fillStyle(lights[i % lights.length], 0.32);
            gl.fillCircle(lx, roofY + 5, 5);
            gl.fillStyle(lights[i % lights.length], 1);
            gl.fillCircle(lx, roofY + 5, 2.7);
        }
        gl.generateTexture('house_wide_family_lights', w, h);
        gl.destroy();
    }

    // 4.4) Sobrado Alto Brasileiro de 2 Andares (`house_sobrado_tall`: 100 x 148)
    if (!scene.textures.exists('house_sobrado_tall')) {
        const w = 100, h = 148, roofY = 36;
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xc2410c, 1);
        g.fillRect(10, roofY, w - 20, h - roofY);
        g.fillStyle(0xfef3c7, 0.9);
        g.fillRect(8, roofY + 54, w - 16, 5);
        g.fillStyle(0x000000, 0.18);
        g.fillRect(10, roofY, w - 20, 6);

        drawBaseWindow(g, 19, roofY + 14, 24, 26, 0xfef3c7);
        drawBaseWindow(g, 57, roofY + 14, 24, 26, 0xfef3c7);
        g.lineStyle(2, 0x1e293b, 0.95);
        g.strokeRect(14, roofY + 40, w - 28, 14);
        for (let rx = 20; rx < w - 16; rx += 7) g.lineBetween(rx, roofY + 40, rx, roofY + 54);
        g.lineStyle(3, 0x22c55e, 1);
        g.lineBetween(16, roofY + 42, w - 16, roofY + 42);
        [24, 40, 56, 72].forEach((bx) => {
            g.fillStyle(0xef4444, 1);
            g.fillCircle(bx, roofY + 42, 2.6);
        });

        drawBaseWindow(g, 19, roofY + 69, 22, 24, 0xfef3c7);
        drawDoorWithWreath(g, 54, h - 38, 24, 38, 0x451a03, 0xfde68a, false);

        g.fillStyle(0x7c2d12, 1);
        g.fillTriangle(3, roofY + 2, w - 3, roofY + 2, w / 2, 8);
        g.lineStyle(7, 0xf8fafc, 1);
        g.lineBetween(5, roofY + 1, w / 2, 9);
        g.lineBetween(w / 2, 9, w - 5, roofY + 1);
        g.generateTexture('house_sobrado_tall', w, h);
        g.destroy();

        const gl = scene.make.graphics({ x: 0, y: 0, add: false });
        drawGlowWindow(gl, 19, roofY + 14, 24, 26, false);
        drawGlowWindow(gl, 57, roofY + 14, 24, 26, false);
        drawGlowWindow(gl, 19, roofY + 69, 22, 24, false);
        const lights = [0xfacc15, 0xef4444, 0x22c55e, 0x38bdf8];
        for (let lx = 14, i = 0; lx <= w - 14; lx += 12, i++) {
            gl.fillStyle(lights[i % lights.length], 0.32);
            gl.fillCircle(lx, roofY + 5, 5);
            gl.fillStyle(lights[i % lights.length], 1);
            gl.fillCircle(lx, roofY + 5, 2.5);
        }
        gl.generateTexture('house_sobrado_tall_lights', w, h);
        gl.destroy();
    }

    // 4.5) Casarão de Inverno Grande com Mansarda (`house_manor_lg`: 144 x 126)
    if (!scene.textures.exists('house_manor_lg')) {
        const w = 144, h = 126, roofY = 48;
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x1e293b, 1);
        g.fillRect(10, roofY, w - 20, h - roofY);
        g.fillStyle(0x334155, 1);
        g.fillRect(10, roofY, 8, h - roofY);
        g.fillRect(w - 18, roofY, 8, h - roofY);

        drawBaseWindow(g, 23, roofY + 14, 22, 24, 0xe2e8f0);
        drawBaseWindow(g, w - 45, roofY + 14, 22, 24, 0xe2e8f0);
        drawBaseWindow(g, 23, roofY + 46, 22, 20, 0xe2e8f0);
        drawBaseWindow(g, w - 45, roofY + 46, 22, 20, 0xe2e8f0);
        drawDoorWithWreath(g, (w - 28) / 2, h - 42, 28, 42, 0x7f1d1d, 0xfde68a, true);

        g.fillStyle(0x475569, 1);
        g.fillTriangle(3, roofY + 2, w - 3, roofY + 2, w / 2, 10);
        g.lineStyle(7, 0xf8fafc, 1);
        g.lineBetween(5, roofY + 1, w / 2, 11);
        g.lineBetween(w / 2, 11, w - 5, roofY + 1);

        // Mansarda no centro do telhado
        g.fillStyle(0x1e293b, 1);
        g.fillRect(w / 2 - 14, 26, 28, 22);
        g.fillStyle(0x334155, 1);
        g.fillTriangle(w / 2 - 18, 27, w / 2 + 18, 27, w / 2, 16);
        g.lineStyle(4, 0xf8fafc, 1);
        g.lineBetween(w / 2 - 17, 26, w / 2, 16);
        g.lineBetween(w / 2, 16, w / 2 + 17, 26);
        drawBaseWindow(g, w / 2 - 8, 30, 16, 14, 0xfde68a);
        g.generateTexture('house_manor_lg', w, h);
        g.destroy();

        const gl = scene.make.graphics({ x: 0, y: 0, add: false });
        drawGlowWindow(gl, 23, roofY + 14, 22, 24, false);
        drawGlowWindow(gl, w - 45, roofY + 14, 22, 24, false);
        drawGlowWindow(gl, 23, roofY + 46, 22, 20, false);
        drawGlowWindow(gl, w - 45, roofY + 46, 22, 20, false);
        drawGlowWindow(gl, w / 2 - 8, 30, 16, 14, false);
        const lights = [0xef4444, 0x22c55e, 0xfacc15, 0x38bdf8];
        for (let lx = 14, i = 0; lx <= w - 14; lx += 12, i++) {
            gl.fillStyle(lights[i % lights.length], 0.32);
            gl.fillCircle(lx, roofY + 5, 5);
            gl.fillStyle(lights[i % lights.length], 1);
            gl.fillCircle(lx, roofY + 5, 2.7);
        }
        gl.generateTexture('house_manor_lg_lights', w, h);
        gl.destroy();
    }

    // 4.6) Mansão VIP Dourada 2x (`house_vip`: 138 x 138)
    if (!scene.textures.exists('house_vip')) {
        const w = 138, h = 138, roofY = 48;
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xfacc15, 0.16);
        g.fillRoundedRect(4, roofY - 4, w - 8, h - roofY + 4, 10);
        g.fillStyle(0xb45309, 1);
        g.fillRect(10, roofY, w - 20, h - roofY);
        g.lineStyle(2.5, 0xfde047, 0.95);
        g.strokeRect(10, roofY, w - 20, h - roofY);

        drawBaseWindow(g, 21, roofY + 12, 24, 22, 0xfef08a);
        drawBaseWindow(g, w - 45, roofY + 12, 24, 22, 0xfef08a);
        drawBaseWindow(g, 21, roofY + 46, 22, 22, 0xfef08a);
        drawBaseWindow(g, w - 43, roofY + 46, 22, 22, 0xfef08a);
        drawDoorWithWreath(g, (w - 28) / 2, h - 44, 28, 44, 0x991b1b, 0xfde047, true);

        g.fillStyle(0x7c2d12, 1);
        g.fillTriangle(3, roofY + 2, w - 3, roofY + 2, w / 2, 8);
        g.lineStyle(8, 0xf8fafc, 1);
        g.lineBetween(5, roofY + 1, w / 2, 9);
        g.lineBetween(w / 2, 9, w - 5, roofY + 1);
        g.lineStyle(2.5, 0xfacc15, 1);
        g.lineBetween(8, roofY + 3, w - 8, roofY + 3);

        g.fillStyle(0xfde047, 1);
        g.fillCircle(w / 2, 31, 6.5);
        g.fillStyle(0xffffff, 1);
        g.fillCircle(w / 2, 31, 3);
        g.generateTexture('house_vip', w, h);
        g.destroy();

        const gl = scene.make.graphics({ x: 0, y: 0, add: false });
        drawGlowWindow(gl, 21, roofY + 12, 24, 22, true);
        drawGlowWindow(gl, w - 45, roofY + 12, 24, 22, true);
        drawGlowWindow(gl, 21, roofY + 46, 22, 22, true);
        drawGlowWindow(gl, w - 43, roofY + 46, 22, 22, true);
        for (let lx = 14, i = 0; lx <= w - 14; lx += 11, i++) {
            gl.fillStyle(0xfacc15, 0.38);
            gl.fillCircle(lx, roofY + 6, 5.5);
            gl.fillStyle(i % 2 === 0 ? 0xfef08a : 0xfacc15, 1);
            gl.fillCircle(lx, roofY + 6, 3.2);
        }
        gl.generateTexture('house_vip_lights', w, h);
        gl.destroy();
    }

    // --- 5. CHAMINÉS (PADRÃO, VIP E ENTREGUE) ---
    const drawChimneyTex = (key, brickColor, mortarColor, capSnow) => {
        if (scene.textures.exists(key)) return;
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        const w = CHIMNEY_TEX_W, h = CHIMNEY_TEX_H;
        // Corpo de tijolinhos sólido
        g.fillStyle(brickColor, 1);
        g.fillRect(8, 10, w - 16, h - 10);
        g.lineStyle(1.4, mortarColor, 0.72);
        for (let y = 18; y < h; y += 8) {
            g.lineBetween(8, y, w - 8, y);
        }
        // Borda superior da chaminé + neve no topo
        g.fillStyle(mortarColor, 1);
        g.fillRoundedRect(4, 4, w - 8, 9, 2.5);
        g.fillStyle(capSnow, 1);
        g.fillRoundedRect(4, 2, w - 8, 5, 2.5);
        // Abertura escura da boca no topo
        g.fillStyle(0x0f172a, 0.95);
        g.fillRoundedRect(10, 4, w - 20, 4, 2);
        g.generateTexture(key, w, h);
        g.destroy();
    };
    drawChimneyTex('chimney', 0xb45309, 0x78350f, 0xf8fafc);
    drawChimneyTex('chimney_vip', 0xeab308, 0xfef08a, 0xffffff);
    drawChimneyTex('chimney_done', 0x16a34a, 0x86efac, 0xf0fdf4);

    // --- 6. PONTOS TURÍSTICOS DA BAHIA (5 MONUMENTOS NO FUNDO PARALAXE) ---
    const drawPalmTree = (g, baseX, baseY, leanX, height, frondScale = 1) => {
        const topX = baseX + leanX;
        const topY = baseY - height;
        g.lineStyle(6 * frondScale, 0x78350f, 1);
        g.beginPath();
        g.moveTo(baseX, baseY);
        g.lineTo(baseX + leanX * 0.45, baseY - height * 0.52);
        g.lineTo(topX, topY);
        g.strokePath();

        g.fillStyle(0x451a03, 1);
        g.fillCircle(topX - 3, topY + 4, 2.8 * frondScale);
        g.fillCircle(topX + 3, topY + 4, 2.8 * frondScale);

        [-2.6, -2.0, -1.2, -0.5, 0.15, 0.75].forEach((ang) => {
            const len = 24 * frondScale;
            const fx = topX + Math.cos(ang) * len;
            const fy = topY + Math.sin(ang) * len + 6 * frondScale;
            g.lineStyle(4 * frondScale, 0x15803d, 1);
            g.lineBetween(topX, topY, fx, fy);
            g.lineStyle(2.2 * frondScale, 0x22c55e, 1);
            g.lineBetween(topX, topY - 1, fx, fy - 2);
        });
    };

    // 6.1) Aldeia Hippie de Arembepe (`landmark_arembepe`: 224 x 164)
    if (!scene.textures.exists('landmark_arembepe')) {
        const w = 224, h = 164;
        const g = scene.make.graphics({ x: 0, y: 0, add: false });

        g.fillStyle(0x0284c7, 0.78);
        g.fillRoundedRect(6, h - 18, w - 12, 18, 6);
        g.fillStyle(0xeab308, 0.85);
        g.fillEllipse(w / 2, h - 14, w - 16, 22);
        g.fillStyle(0xfde68a, 0.75);
        g.fillRect(10, h - 18, w - 20, 12);

        drawPalmTree(g, 24, h - 16, -10, 82, 0.95);
        drawPalmTree(g, w - 24, h - 16, 12, 92, 1.0);

        const drawPalhoca = (hx, hw, hh, wallColor) => {
            const baseY = h - 16;
            const wallTop = baseY - hh * 0.56;
            g.fillStyle(wallColor, 1);
            g.fillRect(hx - hw / 2 + 4, wallTop, hw - 8, baseY - wallTop);
            g.lineStyle(1.4, 0x451a03, 0.4);
            for (let wx = hx - hw / 2 + 10; wx < hx + hw / 2 - 6; wx += 8) {
                g.lineBetween(wx, wallTop, wx, baseY);
            }
            g.fillStyle(0x291509, 1);
            g.fillRoundedRect(hx - 6, baseY - 22, 12, 22, { tl: 4, tr: 4, bl: 0, br: 0 });
            g.fillStyle(0xca8a04, 1);
            g.fillTriangle(hx, baseY - hh, hx - hw / 2 - 5, wallTop + 5, hx + hw / 2 + 5, wallTop + 5);
            g.fillStyle(0xa16207, 0.7);
            g.fillTriangle(hx, baseY - hh, hx + 2, wallTop + 5, hx + hw / 2 + 5, wallTop + 5);
            g.lineStyle(1.5, 0xfde047, 0.55);
            for (let px = hx - hw / 2 - 2; px <= hx + hw / 2 + 2; px += 7) {
                g.lineBetween(hx, baseY - hh + 4, px, wallTop + 5);
            }
        };

        drawPalhoca(64, 52, 66, 0xb45309);
        drawPalhoca(116, 62, 78, 0xc2410c);
        drawPalhoca(166, 48, 60, 0x92400e);

        // Varal de bandeirinhas coloridas
        g.lineStyle(1.5, 0xfef3c7, 0.85);
        g.lineBetween(24, h - 78, 116, h - 92);
        g.lineBetween(116, h - 92, w - 22, h - 82);
        const flagColors = [0xef4444, 0xfacc15, 0x22c55e, 0x38bdf8, 0xc084fc, 0xf97316];
        for (let i = 0; i < 12; i++) {
            const fx = 34 + i * 14;
            const fy = i < 6 ? (h - 80 - i * 2) : (h - 90 + (i - 6) * 1.6);
            g.fillStyle(flagColors[i % flagColors.length], 0.95);
            g.fillTriangle(fx - 4, fy, fx + 4, fy, fx, fy + 9);
        }

        // Símbolo da Paz
        const px = 116, py = h - 108;
        g.fillStyle(0x78350f, 1);
        g.fillCircle(px, py, 11);
        g.lineStyle(2.2, 0xfde047, 1);
        g.strokeCircle(px, py, 9);
        g.lineBetween(px, py - 9, px, py + 9);
        g.lineBetween(px, py, px - 6, py + 6);
        g.lineBetween(px, py, px + 6, py + 6);

        // Lenha da fogueira
        g.lineStyle(3.2, 0x451a03, 1);
        g.lineBetween(84, h - 10, 98, h - 15);
        g.lineBetween(98, h - 10, 84, h - 15);

        g.generateTexture('landmark_arembepe', w, h);
        g.destroy();

        const gl = scene.make.graphics({ x: 0, y: 0, add: false });
        gl.fillStyle(0xf97316, 0.35);
        gl.fillCircle(91, h - 18, 18);
        gl.fillStyle(0xfb923c, 0.95);
        gl.fillTriangle(91, h - 30, 85, h - 13, 97, h - 13);
        gl.fillStyle(0xfef08a, 1);
        gl.fillTriangle(91, h - 25, 88, h - 14, 94, h - 14);
        [64, 116, 166].forEach((lx) => {
            gl.fillStyle(0xfde047, 0.36);
            gl.fillCircle(lx, h - 26, 14);
            gl.fillStyle(0xfef08a, 0.95);
            gl.fillRoundedRect(lx - 4, h - 32, 8, 13, 3);
        });
        gl.fillStyle(0xfacc15, 0.28);
        gl.fillCircle(116, h - 108, 15);
        gl.generateTexture('landmark_arembepe_lights', w, h);
        gl.destroy();
    }

    // 6.2) Estátua do Papagaio da Praia de Jauá + 3 Barcos (`landmark_jaua`: 232 x 204)
    if (!scene.textures.exists('landmark_jaua')) {
        const w = 232, h = 204;
        const g = scene.make.graphics({ x: 0, y: 0, add: false });

        g.fillStyle(0x0369a1, 0.85);
        g.fillRect(6, h - 24, w - 12, 24);
        g.fillStyle(0xbae6fd, 0.85);
        g.fillEllipse(56, h - 18, 96, 8);
        g.fillEllipse(174, h - 17, 102, 8);
        g.fillStyle(0xfde68a, 0.9);
        g.fillRoundedRect(8, h - 15, w - 16, 15, 5);

        const sx = 82;
        g.fillStyle(0xe2e8f0, 1);
        g.fillRoundedRect(sx - 28, h - 32, 56, 20, 4);
        g.fillStyle(0x0284c7, 0.85);
        g.fillRect(sx - 24, h - 25, 48, 6);
        g.fillStyle(0xcbd5e1, 1);
        g.fillRoundedRect(sx - 20, h - 62, 40, 32, 5);

        g.fillStyle(0x78350f, 1);
        g.fillRoundedRect(sx - 10, h - 82, 20, 24, 5);

        // Cauda, corpo, asas e cabeça do Papagaio colorido
        g.fillStyle(0x16a34a, 1);
        g.fillTriangle(sx - 6, h - 98, sx - 28, h - 54, sx - 4, h - 68);
        g.fillStyle(0x2563eb, 0.92);
        g.fillTriangle(sx - 10, h - 92, sx - 22, h - 58, sx - 8, h - 70);
        g.fillStyle(0x15803d, 1);
        g.fillEllipse(sx + 2, h - 114, 42, 62);
        g.fillStyle(0x22c55e, 1);
        g.fillEllipse(sx + 6, h - 116, 32, 50);
        g.fillStyle(0x16a34a, 1);
        g.fillEllipse(sx - 6, h - 112, 24, 44);
        g.fillStyle(0xfacc15, 1);
        g.fillEllipse(sx - 7, h - 118, 16, 14);
        g.fillStyle(0xef4444, 1);
        g.fillEllipse(sx - 8, h - 105, 14, 14);
        g.fillStyle(0x3b82f6, 1);
        g.fillEllipse(sx - 10, h - 94, 12, 12);

        g.fillStyle(0x22c55e, 1);
        g.fillCircle(sx + 8, h - 150, 18);
        g.fillStyle(0xfacc15, 1);
        g.fillCircle(sx + 13, h - 152, 10);
        g.fillStyle(0xef4444, 1);
        g.fillCircle(sx + 2, h - 158, 7);
        g.fillStyle(0xf59e0b, 1);
        g.fillTriangle(sx + 20, h - 156, sx + 37, h - 147, sx + 21, h - 140);
        g.fillStyle(0x1e293b, 1);
        g.fillTriangle(sx + 22, h - 145, sx + 32, h - 142, sx + 21, h - 137);
        g.fillStyle(0xffffff, 1);
        g.fillCircle(sx + 15, h - 153, 4);
        g.fillStyle(0x0f172a, 1);
        g.fillCircle(sx + 16, h - 153, 2);

        // Gorrinho de Natal no Papagaio
        g.fillStyle(0xef4444, 1);
        g.fillTriangle(sx - 4, h - 164, sx + 18, h - 165, sx - 6, h - 186);
        g.fillStyle(0xffffff, 1);
        g.fillRoundedRect(sx - 5, h - 167, 24, 6, 3);
        g.fillCircle(sx - 7, h - 186, 4);

        // 3 Barcos de pesca estacionados
        const drawBoat = (bx, by, hullColor, stripeColor, scale = 1) => {
            g.fillStyle(hullColor, 1);
            g.beginPath();
            g.moveTo(bx - 22 * scale, by - 10 * scale);
            g.lineTo(bx + 22 * scale, by - 10 * scale);
            g.lineTo(bx + 15 * scale, by);
            g.lineTo(bx - 15 * scale, by);
            g.closePath();
            g.fillPath();
            g.fillStyle(stripeColor, 1);
            g.fillRect(bx - 18 * scale, by - 8 * scale, 36 * scale, 3 * scale);
            g.fillStyle(0xf8fafc, 1);
            g.fillRoundedRect(bx - 8 * scale, by - 19 * scale, 15 * scale, 9 * scale, 2);
            g.fillStyle(0x0284c7, 0.8);
            g.fillRect(bx - 4 * scale, by - 17 * scale, 7 * scale, 4 * scale);
            g.lineStyle(1.8, 0x78350f, 1);
            g.lineBetween(bx + 8 * scale, by - 10 * scale, bx + 8 * scale, by - 32 * scale);
        };

        drawBoat(148, h - 14, 0xef4444, 0xfef08a, 1.0);
        drawBoat(196, h - 16, 0x2563eb, 0xfacc15, 0.95);
        drawBoat(30, h - 14, 0x16a34a, 0xf97316, 0.82);

        g.generateTexture('landmark_jaua', w, h);
        g.destroy();

        const gl = scene.make.graphics({ x: 0, y: 0, add: false });
        gl.fillStyle(0xfef08a, 0.24);
        gl.fillCircle(84, h - 122, 42);
        const boatLights = [0xef4444, 0xfacc15, 0x22c55e, 0x38bdf8];
        [{ x: 148, y: h - 24 }, { x: 196, y: h - 26 }, { x: 30, y: h - 22 }].forEach((b, bi) => {
            for (let i = -2; i <= 2; i++) {
                const c = boatLights[(bi + i + 4) % boatLights.length];
                gl.fillStyle(c, 0.35);
                gl.fillCircle(b.x + i * 7, b.y, 4.5);
                gl.fillStyle(c, 1);
                gl.fillCircle(b.x + i * 7, b.y, 2);
            }
            gl.fillStyle(0xfef08a, 0.95);
            gl.fillCircle(b.x + 7, b.y - 20, 2.4);
        });
        gl.generateTexture('landmark_jaua_lights', w, h);
        gl.destroy();
    }

    // 6.3) Igreja na Beira da Praia de Abrantes (`landmark_abrantes`: 216 x 214)
    if (!scene.textures.exists('landmark_abrantes')) {
        const w = 216, h = 214;
        const g = scene.make.graphics({ x: 0, y: 0, add: false });

        g.fillStyle(0x0284c7, 0.85);
        g.fillRect(6, h - 22, w - 12, 22);
        g.fillStyle(0xe0f2fe, 0.85);
        g.fillEllipse(68, h - 15, 110, 7);
        g.fillEllipse(156, h - 14, 96, 7);
        g.fillStyle(0xfde68a, 0.92);
        g.fillRoundedRect(8, h - 16, w - 16, 16, 5);

        drawPalmTree(g, 28, h - 16, -12, 92, 0.95);
        drawPalmTree(g, w - 26, h - 16, 12, 86, 0.92);

        g.fillStyle(0xcbd5e1, 1);
        g.fillRect(58, h - 24, 98, 10);

        const bodyX = 64, bodyW = 76, baseY = h - 22;
        g.fillStyle(0xf8fafc, 1);
        g.fillRect(bodyX, baseY - 82, bodyW, 82);
        g.lineStyle(2, 0xcbd5e1, 1);
        g.strokeRect(bodyX, baseY - 82, bodyW, 82);

        // Frontão colonial barroco
        g.fillStyle(0xf8fafc, 1);
        g.fillTriangle(bodyX - 2, baseY - 82, bodyX + bodyW + 2, baseY - 82, bodyX + bodyW / 2, baseY - 118);
        g.fillCircle(bodyX + bodyW / 2, baseY - 102, 16);
        g.lineStyle(3, 0x94a3b8, 0.85);
        g.lineBetween(bodyX - 2, baseY - 82, bodyX + bodyW / 2, baseY - 118);
        g.lineBetween(bodyX + bodyW / 2, baseY - 118, bodyX + bodyW + 2, baseY - 82);

        // Torre sineira à direita + cruz
        const towerX = bodyX + bodyW - 4, towerW = 34;
        g.fillStyle(0xe2e8f0, 1);
        g.fillRect(towerX, baseY - 134, towerW, 134);
        g.fillStyle(0xf8fafc, 1);
        g.fillRect(towerX + 3, baseY - 134, towerW - 10, 134);
        g.fillStyle(0x0284c7, 0.9);
        g.fillTriangle(towerX - 3, baseY - 134, towerX + towerW + 3, baseY - 134, towerX + towerW / 2, baseY - 160);

        const tcx = towerX + towerW / 2;
        const fcx = bodyX + bodyW / 2;
        g.lineStyle(2.6, 0xfacc15, 1);
        g.lineBetween(tcx, baseY - 160, tcx, baseY - 180);
        g.lineBetween(tcx - 7, baseY - 172, tcx + 7, baseY - 172);
        g.lineBetween(fcx, baseY - 118, fcx, baseY - 132);
        g.lineBetween(fcx - 5, baseY - 126, fcx + 5, baseY - 126);

        // Sino dourado
        g.fillStyle(0x1e293b, 0.9);
        g.fillRoundedRect(towerX + 9, baseY - 122, 16, 22, { tl: 8, tr: 8, bl: 0, br: 0 });
        g.fillStyle(0xfacc15, 1);
        g.fillTriangle(tcx, baseY - 116, tcx - 5, baseY - 106, tcx + 5, baseY - 106);

        // Portas e janelas azuis
        const drawBlueArch = (ax, ay, aw, ah) => {
            g.fillStyle(0x0284c7, 1);
            g.fillRoundedRect(ax, ay, aw, ah, { tl: aw / 2, tr: aw / 2, bl: 0, br: 0 });
            g.lineStyle(1.8, 0xe0f2fe, 0.9);
            g.strokeRoundedRect(ax, ay, aw, ah, { tl: aw / 2, tr: aw / 2, bl: 0, br: 0 });
        };
        drawBlueArch(fcx - 11, baseY - 36, 22, 36);
        drawBlueArch(bodyX + 12, baseY - 68, 15, 22);
        drawBlueArch(bodyX + bodyW - 27, baseY - 68, 15, 22);
        drawBlueArch(towerX + 11, baseY - 72, 12, 18);
        g.fillStyle(0x0284c7, 1);
        g.fillCircle(fcx, baseY - 94, 7);
        g.lineStyle(1.5, 0xf8fafc, 1);
        g.strokeCircle(fcx, baseY - 94, 7);

        g.generateTexture('landmark_abrantes', w, h);
        g.destroy();

        const gl = scene.make.graphics({ x: 0, y: 0, add: false });
        const glowArch = (ax, ay, aw, ah) => {
            gl.fillStyle(0xfef08a, 0.36);
            gl.fillRoundedRect(ax - 3, ay - 3, aw + 6, ah + 6, { tl: aw / 2 + 2, tr: aw / 2 + 2, bl: 2, br: 2 });
            gl.fillStyle(0xfde047, 0.94);
            gl.fillRoundedRect(ax + 2, ay + 2, aw - 4, ah - 3, { tl: aw / 2, tr: aw / 2, bl: 0, br: 0 });
        };
        glowArch(fcx - 11, baseY - 36, 22, 36);
        glowArch(bodyX + 12, baseY - 68, 15, 22);
        glowArch(bodyX + bodyW - 27, baseY - 68, 15, 22);
        glowArch(towerX + 11, baseY - 72, 12, 18);
        gl.fillStyle(0xfef08a, 0.95);
        gl.fillCircle(fcx, baseY - 94, 6);
        gl.fillStyle(0xfde047, 0.3);
        gl.fillCircle(tcx, baseY - 170, 14);
        gl.generateTexture('landmark_abrantes_lights', w, h);
        gl.destroy();
    }

    // 6.4) Prédio Redondo de Camaçari (`landmark_camacari`: 140 x 260)
    if (!scene.textures.exists('landmark_camacari')) {
        const w = 140, h = 260;
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        const cx = w / 2;

        // Base circular / pilotis
        g.fillStyle(0x475569, 1);
        g.fillRect(cx - 42, h - 22, 84, 22);
        g.fillStyle(0x1e293b, 0.85);
        g.fillRoundedRect(cx - 16, h - 18, 32, 18, { tl: 8, tr: 8, bl: 0, br: 0 });

        // Corpo cilíndrico com degradê lateral (volume 3D)
        g.fillStyle(0x94a3b8, 1);
        g.fillRect(cx - 48, 38, 96, h - 60);
        g.fillStyle(0xcbd5e1, 1);
        g.fillRect(cx - 34, 38, 50, h - 60);
        g.fillStyle(0xe2e8f0, 0.9);
        g.fillRect(cx - 20, 38, 22, h - 60);
        g.fillStyle(0x64748b, 0.7);
        g.fillRect(cx + 26, 38, 22, h - 60);

        // Anéis curvos horizontais dos andares (marca registrada do Prédio Redondo)
        for (let fy = 52; fy <= h - 32; fy += 18) {
            // Faixa envidraçada escura
            g.fillStyle(0x1e293b, 0.88);
            g.fillRect(cx - 47, fy - 9, 94, 9);
            // Sacada / anel curvo sobressaindo
            g.fillStyle(0xf1f5f9, 1);
            g.fillRoundedRect(cx - 52, fy, 104, 6, 3);
            g.fillStyle(0x64748b, 0.55);
            g.fillRect(cx - 50, fy + 4, 100, 2);
        }

        // Coroamento circular no topo + estrela natalina
        g.fillStyle(0x64748b, 1);
        g.fillRoundedRect(cx - 50, 32, 100, 9, 4);
        g.fillStyle(0x475569, 1);
        g.fillRoundedRect(cx - 26, 20, 52, 14, 4);
        g.fillStyle(0xfacc15, 1);
        g.fillCircle(cx, 10, 6);
        g.fillStyle(0xffffff, 1);
        g.fillCircle(cx, 10, 2.8);

        g.generateTexture('landmark_camacari', w, h);
        g.destroy();

        const gl = scene.make.graphics({ x: 0, y: 0, add: false });
        // Janelas acesas em padrão orgânico pelos andares curvos
        let seed = 1;
        for (let fy = 52; fy <= h - 32; fy += 18) {
            for (let wx = cx - 40; wx <= cx + 30; wx += 14) {
                seed = (seed * 37 + 11) % 100;
                if (seed > 36) {
                    gl.fillStyle(0xfef08a, 0.34);
                    gl.fillRect(wx - 1, fy - 9, 11, 9);
                    gl.fillStyle(0xfde047, 0.94);
                    gl.fillRect(wx, fy - 8, 9, 7);
                }
            }
        }
        gl.fillStyle(0xfacc15, 0.38);
        gl.fillCircle(cx, 10, 14);
        gl.generateTexture('landmark_camacari_lights', w, h);
        gl.destroy();
    }

    // 6.5) Caixa d'Água do Tomba — Feira de Santana (`landmark_tomba`: 156 x 288)
    if (!scene.textures.exists('landmark_tomba')) {
        const w = 156, h = 288;
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        const cx = w / 2;

        // Base estrutural larga
        g.fillStyle(0x64748b, 1);
        g.fillRoundedRect(cx - 34, h - 18, 68, 18, 4);

        // Pedestal canelado alto
        g.fillStyle(0x94a3b8, 1);
        g.fillRect(cx - 22, 126, 44, h - 144);
        g.fillStyle(0xcbd5e1, 1);
        g.fillRect(cx - 12, 126, 20, h - 144);
        // Nervuras verticais caneladas
        g.lineStyle(2, 0x475569, 0.65);
        for (let vx = cx - 18; vx <= cx + 18; vx += 9) {
            g.lineBetween(vx, 128, vx, h - 18);
        }

        // Reservatório icônico em formato de taça / cálice
        g.fillStyle(0xcbd5e1, 1);
        g.beginPath();
        g.moveTo(cx - 22, 130);
        g.lineTo(cx - 56, 78);
        g.lineTo(cx + 56, 78);
        g.lineTo(cx + 22, 130);
        g.closePath();
        g.fillPath();

        g.fillStyle(0xe2e8f0, 1);
        g.fillRoundedRect(cx - 58, 46, 116, 36, 8);
        // Sombra lateral direita na taça
        g.fillStyle(0x94a3b8, 0.65);
        g.fillRect(cx + 24, 46, 34, 36);

        // Faixa azul característica da Caixa do Tomba
        g.fillStyle(0x0284c7, 1);
        g.fillRect(cx - 58, 58, 116, 13);
        g.fillStyle(0x38bdf8, 0.75);
        g.fillRect(cx - 42, 60, 44, 9);

        // Cúpula superior + mastro do sinalizador de aviação
        g.fillStyle(0x94a3b8, 1);
        g.fillRoundedRect(cx - 46, 36, 92, 12, 5);
        g.lineStyle(3, 0xe2e8f0, 1);
        g.lineBetween(cx, 36, cx, 8);

        g.generateTexture('landmark_tomba', w, h);
        g.destroy();

        const gl = scene.make.graphics({ x: 0, y: 0, add: false });
        const colors = [0xef4444, 0xfacc15, 0x22c55e, 0x38bdf8];
        for (let lx = cx - 50, i = 0; lx <= cx + 50; lx += 12.5, i++) {
            const c = colors[i % colors.length];
            gl.fillStyle(c, 0.35);
            gl.fillCircle(lx, 79, 5.5);
            gl.fillStyle(c, 1);
            gl.fillCircle(lx, 79, 2.5);
        }
        gl.fillStyle(0x38bdf8, 0.22);
        gl.fillRect(cx - 56, 56, 112, 17);
        gl.generateTexture('landmark_tomba_lights', w, h);
        gl.destroy();
    }

    // --- 7. INIMIGOS / OBSTÁCULOS ---

    // 7.1) Nuvem de Tempestade (`obstacle_cloud`: 84 x 66)
    if (!scene.textures.exists('obstacle_cloud')) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x334155, 1);
        g.fillCircle(24, 38, 18);
        g.fillCircle(44, 28, 22);
        g.fillCircle(62, 38, 17);
        g.fillRoundedRect(18, 34, 50, 22, 10);
        g.fillStyle(0x475569, 0.9);
        g.fillCircle(40, 26, 16);
        g.fillCircle(26, 34, 12);
        // Olhinhos bravos + sobrancelha
        g.fillStyle(0xfef08a, 1);
        g.fillCircle(34, 38, 3.5);
        g.fillCircle(50, 38, 3.5);
        g.fillStyle(0x0f172a, 1);
        g.fillCircle(33, 38, 1.8);
        g.fillCircle(49, 38, 1.8);
        g.lineStyle(2.4, 0x0f172a, 1);
        g.lineBetween(28, 31, 39, 34);
        g.lineBetween(56, 31, 45, 34);
        g.generateTexture('obstacle_cloud', 84, 66);
        g.destroy();
    }

    // 7.2) Drone Floco-de-Neve Giratório (`obstacle_drone`: 48 x 48)
    if (!scene.textures.exists('obstacle_drone')) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        const cx = 24, cy = 24;
        g.fillStyle(0x38bdf8, 0.26);
        g.fillCircle(cx, cy, 22);
        g.lineStyle(4, 0xbae6fd, 1);
        for (let i = 0; i < 6; i++) {
            const ang = (i * Math.PI) / 3;
            const x2 = cx + Math.cos(ang) * 19;
            const y2 = cy + Math.sin(ang) * 19;
            g.lineBetween(cx, cy, x2, y2);
            g.fillStyle(0xe0f2fe, 1);
            g.fillCircle(x2, y2, 2.8);
        }
        g.fillStyle(0x0f172a, 1);
        g.fillCircle(cx, cy, 9);
        g.lineStyle(2, 0x38bdf8, 1);
        g.strokeCircle(cx, cy, 9);
        g.fillStyle(0xef4444, 1);
        g.fillCircle(cx, cy, 4);
        g.generateTexture('obstacle_drone', 48, 48);
        g.destroy();
    }

    // 7.3) Pássaro Gelado Veloz (`obstacle_bird`: 58 x 38)
    if (!scene.textures.exists('obstacle_bird')) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x38bdf8, 0.24);
        g.fillEllipse(30, 20, 52, 26);
        g.fillStyle(0x0284c7, 1);
        g.fillTriangle(24, 18, 44, 4, 42, 20);
        g.fillStyle(0x7dd3fc, 1);
        g.fillEllipse(28, 21, 34, 16);
        g.fillStyle(0xe0f2fe, 1);
        g.fillEllipse(24, 19, 22, 10);
        g.fillStyle(0x38bdf8, 1);
        g.fillTriangle(42, 20, 56, 13, 52, 27);
        g.fillStyle(0xbae6fd, 1);
        g.fillTriangle(20, 20, 36, 2, 35, 22);
        g.lineStyle(1.6, 0xffffff, 0.9);
        g.lineBetween(21, 19, 35, 4);
        g.fillStyle(0xfef08a, 1);
        g.fillTriangle(12, 19, 2, 22, 13, 25);
        g.fillStyle(0xef4444, 1);
        g.fillCircle(17, 19, 2.6);
        g.fillStyle(0xffffff, 1);
        g.fillCircle(16.4, 18.4, 1);
        g.generateTexture('obstacle_bird', 58, 38);
        g.destroy();
    }

    // 7.4) Pinheiro Nevado Alto (`obstacle_pine`: 64 x 186)
    if (!scene.textures.exists('obstacle_pine')) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x78350f, 1);
        g.fillRect(25, 156, 14, 30);

        const drawTier = (topY, halfW, h) => {
            g.fillStyle(0x14532d, 1);
            g.fillTriangle(32, topY, 32 - halfW, topY + h, 32 + halfW, topY + h);
            g.fillStyle(0xf8fafc, 0.94);
            g.fillTriangle(32, topY, 32 - halfW * 0.45, topY + h * 0.40, 32 + halfW * 0.45, topY + h * 0.40);
        };
        drawTier(104, 30, 56);
        drawTier(68, 26, 52);
        drawTier(36, 22, 48);
        drawTier(12, 16, 38);

        // Estrelinha dourada no topo
        g.fillStyle(0xfacc15, 1);
        g.fillCircle(32, 10, 6);
        g.fillStyle(0xfef9c3, 1);
        g.fillCircle(32, 10, 3);
        g.generateTexture('obstacle_pine', 64, 186);
        g.destroy();
    }

    // 7.5) Raio Elétrico das Nuvens de Nível 4+ (`electric_bolt`: 26 x 46)
    if (!scene.textures.exists('electric_bolt')) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xfef08a, 0.5);
        g.fillTriangle(14, 0, 2, 24, 16, 22);
        g.fillTriangle(12, 18, 24, 20, 8, 46);
        g.fillStyle(0xffffff, 1);
        g.fillTriangle(14, 3, 6, 21, 15, 20);
        g.fillTriangle(12, 20, 20, 21, 10, 42);
        g.generateTexture('electric_bolt', 26, 46);
        g.destroy();
    }

    // --- 8. ELEMENTOS DE CENÁRIO, PARTÍCULAS E PARALAXE ---
    if (!scene.textures.exists('sun')) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xf97316, 0.22);
        g.fillCircle(60, 60, 58);
        g.fillStyle(0xfb923c, 0.4);
        g.fillCircle(60, 60, 44);
        g.fillStyle(0xfde047, 1);
        g.fillCircle(60, 60, 32);
        g.fillStyle(0xfef9c3, 0.95);
        g.fillCircle(60, 60, 22);
        g.generateTexture('sun', 120, 120);
        g.destroy();
    }

    if (!scene.textures.exists('moon')) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xe0f2fe, 0.24);
        g.fillCircle(64, 64, 58);
        g.fillStyle(0xf8fafc, 1);
        g.fillCircle(64, 64, 36);
        g.fillStyle(0xcbd5e1, 0.55);
        g.fillCircle(52, 54, 7);
        g.fillCircle(74, 68, 9);
        g.fillCircle(66, 46, 5);
        g.fillCircle(50, 74, 4.5);
        g.generateTexture('moon', 128, 128);
        g.destroy();
    }

    if (!scene.textures.exists('bg_cloud')) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xffffff, 1);
        g.fillCircle(28, 28, 18);
        g.fillCircle(52, 22, 22);
        g.fillCircle(78, 28, 17);
        g.fillRoundedRect(20, 26, 66, 18, 9);
        g.generateTexture('bg_cloud', 106, 48);
        g.destroy();
    }

    if (!scene.textures.exists('bg_mountains')) {
        const w = 420, h = 210;
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xffffff, 1);
        g.fillTriangle(-20, h, 85, 58, 195, h);
        g.fillTriangle(110, h, 235, 34, 360, h);
        g.fillTriangle(265, h, 375, 66, 470, h);
        g.generateTexture('bg_mountains', w, h);
        g.destroy();
    }

    if (!scene.textures.exists('bg_forest')) {
        const w = 420, h = 128;
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xffffff, 1);
        g.fillEllipse(80, h - 6, 220, 82);
        g.fillEllipse(245, h - 4, 240, 96);
        g.fillEllipse(395, h - 6, 190, 78);
        // Silhuetas suaves de pinheiros distantes
        for (let tx = 18; tx < w; tx += 36) {
            const th = 22 + (tx % 15);
            const base = h - 30 - ((tx * 7) % 14);
            g.fillTriangle(tx, base - th, tx - 9, base, tx + 9, base);
        }
        g.generateTexture('bg_forest', w, h);
        g.destroy();
    }

    if (!scene.textures.exists('ground_snow')) {
        const w = 256, h = 48;
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xe2e8f0, 1);
        g.fillRect(0, 8, w, h - 8);
        g.fillStyle(0xffffff, 1);
        g.fillRect(0, 4, w, 12);
        for (let x = 0; x < w; x += 32) {
            g.fillEllipse(x + 16, 7, 36, 12);
        }
        g.fillStyle(0xcbd5e1, 0.55);
        for (let x = 12; x < w; x += 48) {
            g.fillEllipse(x, 26, 24, 6);
            g.fillEllipse(x + 22, 36, 18, 5);
        }
        g.generateTexture('ground_snow', w, h);
        g.destroy();
    }

    if (!scene.textures.exists('star')) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xffffff, 1);
        g.fillCircle(8, 8, 4.2);
        g.fillTriangle(8, 0, 6, 8, 10, 8);
        g.fillTriangle(8, 16, 6, 8, 10, 8);
        g.fillTriangle(0, 8, 8, 6, 8, 10);
        g.fillTriangle(16, 8, 8, 6, 8, 10);
        g.generateTexture('star', 16, 16);
        g.destroy();
    }

    if (!scene.textures.exists('snow_particle')) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xffffff, 1);
        g.fillCircle(6, 6, 5);
        g.generateTexture('snow_particle', 12, 12);
        g.destroy();
    }

    if (!scene.textures.exists('smoke_particle')) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xffffff, 0.85);
        g.fillCircle(10, 10, 8);
        g.generateTexture('smoke_particle', 20, 20);
        g.destroy();
    }
}

/* =====================================================================
   6. CENA PRINCIPAL DO PHASER 3: NoelDeliveryScene
   ===================================================================== */
class NoelDeliveryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'NoelDeliveryScene' });
    }

    preload() {
        this.failedCharTextures = new Set();
        this.loadingCharTextures = new Set();
        this.desiredCharacter = gameBridge.getSelectedCharacter();

        this.load.on('loaderror', (fileObj) => {
            if (fileObj && fileObj.key) {
                this.failedCharTextures.add(fileObj.key);
                this.loadingCharTextures.delete(fileObj.key);
            }
        });

        // Carrega apenas o personagem selecionado inicialmente (os demais carregam sob demanda)
        if (this.desiredCharacter && this.desiredCharacter.imgSrc) {
            this.loadingCharTextures.add(this.desiredCharacter.textureKey);
            this.load.image(this.desiredCharacter.textureKey, this.desiredCharacter.imgSrc);
        }
    }

    create() {
        gameBridge.scene = this;
        this.input.addPointer(3);

        this.W = this.scale.width;   // 420
        this.H = this.scale.height;  // 740
        this.groundY = this.H - 34;  // 706

        // Detecta quais PNGs customizados foram carregados antes do fallback procedural
        this.customTextureKeys = new Set();
        Object.keys(HOUSE_CATALOG).forEach((k) => {
            if (this.textures.exists(k)) this.customTextureKeys.add(k);
        });
        LANDMARK_DEFS.forEach((def) => {
            if (this.textures.exists(def.key)) this.customTextureKeys.add(def.key);
        });

        generateProceduralTextures(this);

        try {
            gameBridge.santaPreviewDataUrl = this.textures.getBase64('santa_sleigh');
            gameBridge.renderCharacterSlider();
            gameBridge.renderRankingUI();
        } catch (e) { }

        // Estado geral do jogo
        this.gameState = 'TITLE'; // 'TITLE' | 'PLAYING' | 'PAUSED' | 'GAMEOVER'
        this.score = 0;
        this.pizzasDelivered = 0;
        this.ammo = MAX_AMMO;
        this.combo = 0;
        this.maxCombo = 0;
        this.lives = 3;
        this.currentPhase = 1;
        this.isInvincible = false;
        this.scrollSpeed = 162;
        this.lastPizzaTime = 0;
        this.pizzaCooldownMs = 250;
        this.lastEmptyWarnTime = 0;
        this.lastHouseKey = null;
        this.rightmostHouse = null;
        this.obstacleTimer = 1800;
        this.packTimer = 5200;
        this.lifeTimer = Phaser.Math.Between(16000, 23000);

        // Pontos Turísticos da Bahia (10–16s entre spawns, sem repetir consecutivo)
        this.landmarkTimer = Phaser.Math.Between(4500, 6800);
        this.lastLandmarkKey = null;
        this.activeLandmarks = [];

        // Listas determinísticas (casas, chaminés SEM física e alertas de Pássaro Gelado)
        this.housesList = [];
        this.chimneysList = [];
        this.pendingWarnings = [];

        // Progresso dinâmico do céu (0.0 = 18:00 -> 1.0 = 00:00)
        this.skyProgress = 0;
        this.targetSkyProgress = 0;
        this.windowGlowAlpha = 0.22;

        // --- 1. CAMADAS DE FUNDO E PARALAXE ---
        this.skyGraphics = this.add.graphics().setDepth(0);
        this.auroraGraphics = this.add.graphics().setDepth(1);

        this.moonHalo = this.add.circle(this.W - 82, this.groundY - 75, 62, 0xe0f2fe, 0).setDepth(2);
        this.sunSprite = this.add.image(this.W * 0.74, this.groundY - 260, 'sun').setDepth(3).setScale(1.06);
        this.moonSprite = this.add.image(this.W - 82, this.groundY - 75, 'moon').setDepth(3).setAlpha(0);

        this.bgStars = [];
        for (let i = 0; i < 50; i++) {
            const starImg = this.add.image(
                Phaser.Math.Between(10, this.W - 10),
                Phaser.Math.Between(18, this.H * 0.56),
                'star'
            )
                .setScale(Phaser.Math.FloatBetween(0.22, 0.56))
                .setAlpha(0)
                .setDepth(4);
            this.bgStars.push({
                sprite: starImg,
                speed: Phaser.Math.FloatBetween(0.0022, 0.0054),
                phase: Phaser.Math.FloatBetween(0, Math.PI * 2),
                baseMax: Phaser.Math.FloatBetween(0.55, 1.0)
            });
        }

        this.bgClouds = [];
        for (let i = 0; i < 4; i++) {
            const c = this.add.image(
                Phaser.Math.Between(20, this.W + 60),
                Phaser.Math.Between(100, 275),
                'bg_cloud'
            )
                .setScale(Phaser.Math.FloatBetween(0.7, 1.12))
                .setAlpha(0.32)
                .setDepth(5);
            c.driftSpeed = Phaser.Math.FloatBetween(10, 22);
            this.bgClouds.push(c);
        }

        this.mountains = this.add.tileSprite(this.W / 2, this.groundY - 94, this.W, 210, 'bg_mountains').setDepth(6);
        this.forest = this.add.tileSprite(this.W / 2, this.groundY - 54, this.W, 128, 'bg_forest').setDepth(10);

        this.snowEmitter = this.add.particles(0, 0, 'snow_particle', {
            x: { min: 0, max: this.W + 90 },
            y: -10,
            lifespan: 6800,
            speedY: { min: 40, max: 94 },
            speedX: { min: -56, max: -18 },
            scale: { start: 0.5, end: 0.18 },
            alpha: { start: 0.78, end: 0.12 },
            frequency: 84,
            quantity: 1
        }).setDepth(12);

        // --- 2. CHÃO NEVADO (DEPTH 15) E GRUPOS DE FÍSICA ---
        // Casas (depth 21) e Chaminés (depth 20) NÃO usam Arcade Physics -> 0% piscar!
        this.groundTile = this.add.tileSprite(this.W / 2, this.H - 22, this.W, 48, 'ground_snow').setDepth(15);

        this.pizzasGroup = this.physics.add.group();
        this.obstaclesGroup = this.physics.add.group({ allowGravity: false });
        this.packsGroup = this.physics.add.group({ allowGravity: false });
        this.livesGroup = this.physics.add.group({ allowGravity: false });

        this.renderDynamicSky(0, 0);
        this.seedInitialHouses();

        // --- 3. PAPAI NOEL & TRENÓ (DEPTH 30) ---
        this.santa = this.physics.add.sprite(96, 235, 'santa_sleigh').setDepth(30);
        this.santa.body.setAllowGravity(false);
        this.santa.body.setSize(58, 30);
        this.santa.body.setOffset(16, 18);

        this.applyCharacter(gameBridge.getSelectedCharacter());

        this.sleighTrail = this.add.particles(0, 0, 'star', {
            follow: this.santa,
            followOffset: { x: -38, y: 12 },
            speedX: { min: -94, max: -42 },
            speedY: { min: -14, max: 18 },
            scale: { start: 0.44, end: 0 },
            alpha: { start: 0.85, end: 0 },
            tint: [0xfde047, 0xfb923c, 0xffffff],
            lifespan: 440,
            frequency: 55
        }).setDepth(26);

        // Partículas de festa / coleta / impacto
        this.confettiEmitter = this.add.particles(0, 0, 'star', {
            speed: { min: 72, max: 215 },
            angle: { min: 200, max: 340 },
            gravityY: 260,
            scale: { start: 0.92, end: 0 },
            alpha: { start: 1, end: 0 },
            tint: [0xef4444, 0x22c55e, 0xfacc15, 0xffffff],
            lifespan: 760,
            emitting: false
        }).setDepth(35);

        this.goldBurstEmitter = this.add.particles(0, 0, 'star', {
            speed: { min: 65, max: 185 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.95, end: 0 },
            alpha: { start: 1, end: 0 },
            tint: [0xfef08a, 0xfacc15, 0xfb923c, 0xffffff],
            lifespan: 620,
            emitting: false
        }).setDepth(35);

        this.snowPuffEmitter = this.add.particles(0, 0, 'snow_particle', {
            speed: { min: 30, max: 112 },
            angle: { min: 190, max: 350 },
            gravityY: 180,
            scale: { start: 0.95, end: 0 },
            alpha: { start: 0.9, end: 0 },
            lifespan: 450,
            emitting: false
        }).setDepth(35);

        // --- 4. OVERLAPS DO TRENÓ ---
        this.physics.add.overlap(
            this.santa,
            this.obstaclesGroup,
            this.handleSantaObstacleHit,
            null,
            this
        );

        this.physics.add.overlap(
            this.santa,
            this.packsGroup,
            this.handleCollectPizzaPack,
            null,
            this
        );

        this.physics.add.overlap(
            this.santa,
            this.livesGroup,
            this.handleCollectLife,
            null,
            this
        );

        // --- 5. TECLADO & TOQUE DIRETO OPCIONAL NO CANVAS ---
        const isTypingInInput = () => {
            const el = document.activeElement;
            return Boolean(el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'));
        };

        this.keys = this.input.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            w: Phaser.Input.Keyboard.KeyCodes.W,
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            f: Phaser.Input.Keyboard.KeyCodes.F,
            e: Phaser.Input.Keyboard.KeyCodes.E,
            p: Phaser.Input.Keyboard.KeyCodes.P,
            esc: Phaser.Input.Keyboard.KeyCodes.ESC
        }, false);

        this.input.keyboard.on('keydown-ENTER', () => { if (!isTypingInInput()) this.tryThrowPizza(); });
        this.input.keyboard.on('keydown-RIGHT', () => { if (!isTypingInInput()) this.tryThrowPizza(); });
        this.input.keyboard.on('keydown-F', () => { if (!isTypingInInput()) this.tryThrowPizza(); });
        this.input.keyboard.on('keydown-E', () => { if (!isTypingInInput()) this.tryThrowPizza(); });
        this.input.keyboard.on('keydown-P', () => { if (!isTypingInInput()) this.togglePause(); });
        this.input.keyboard.on('keydown-ESC', () => { if (!isTypingInInput()) this.togglePause(); });

        this.canvasFlyPointers = new Set();
        this.input.on('pointerdown', (pointer) => {
            soundFX.unlock();
            if (this.gameState !== 'PLAYING') return;
            if (pointer.x < this.W * 0.5) {
                this.canvasFlyPointers.add(pointer.id);
                gameBridge.isFlyHeld = true;
                ui.btnFly.classList.add('pressed');
            } else {
                this.tryThrowPizza();
            }
        });

        const releaseCanvasPointer = (pointer) => {
            if (this.canvasFlyPointers.has(pointer.id)) {
                this.canvasFlyPointers.delete(pointer.id);
                if (this.canvasFlyPointers.size === 0 && gameBridge.activeFlyPointers.size === 0) {
                    gameBridge.isFlyHeld = false;
                    ui.btnFly.classList.remove('pressed');
                }
            }
        };
        this.input.on('pointerup', releaseCanvasPointer);
        this.input.on('pointerupoutside', releaseCanvasPointer);

        this.syncAllHUD();
    }

    syncAllHUD() {
        updateHUD({
            score: this.score,
            combo: this.combo,
            lives: this.lives,
            ammo: this.ammo,
            phaseInfo: getPhaseInfo(this.pizzasDelivered)
        });
    }

    /** Atualiza degradê do céu, Sol/Lua, estrelas, aurora, paralaxe, janelas e pontos turísticos */
    renderDynamicSky(progress, timeMs) {
        const pal = sampleSkyPalette(progress);
        const W = this.W;
        const H = this.H;
        const midY = Math.round(H * 0.52);

        this.skyGraphics.clear();
        this.skyGraphics.fillGradientStyle(pal.top, pal.top, pal.mid, pal.mid, 1);
        this.skyGraphics.fillRect(0, 0, W, midY + 2);
        this.skyGraphics.fillGradientStyle(pal.mid, pal.mid, pal.bottom, pal.bottom, 1);
        this.skyGraphics.fillRect(0, midY, W, H - midY);

        this.mountains.setTint(pal.mtn);
        this.forest.setTint(pal.forest);
        if (this.groundTile) this.groundTile.setTint(pal.ground);
        for (let i = 0; i < this.bgClouds.length; i++) {
            this.bgClouds[i].setTint(pal.cloud);
        }

        // Acende janelas das casas conforme o horário escurece
        this.windowGlowAlpha = Phaser.Math.Clamp(0.20 + progress * 0.80, 0.20, 1.0);
        for (let i = 0; i < this.housesList.length; i++) {
            const h = this.housesList[i];
            if (h.lightsOverlay) h.lightsOverlay.setAlpha(this.windowGlowAlpha);
        }

        // Iluminação dos Pontos Turísticos da Bahia
        const nightGlow = Phaser.Math.Clamp((progress - 0.14) / 0.52, 0.14, 1.0);
        for (let i = 0; i < this.activeLandmarks.length; i++) {
            const lm = this.activeLandmarks[i];
            lm.bodySprite.setTint(pal.landmark);
            if (lm.lightsSprite) lm.lightsSprite.setAlpha(nightGlow);
        }

        // Sol poente (18:00 -> 20:30)
        const sunProgress = Phaser.Math.Clamp(progress / 0.44, 0, 1);
        const sunY = Phaser.Math.Linear(this.groundY - 265, this.groundY - 36, sunProgress);
        const sunAlpha = Phaser.Math.Clamp(1 - (progress - 0.22) / 0.22, 0, 1);
        this.sunSprite.setPosition(W * 0.74, sunY);
        this.sunSprite.setAlpha(sunAlpha);

        // Lua Cheia com halo luminoso (ápice às 00:00)
        const moonProgress = Phaser.Math.Clamp((progress - 0.50) / 0.50, 0, 1);
        const moonY = Phaser.Math.Linear(this.groundY - 45, 132, moonProgress);
        const moonScale = Phaser.Math.Linear(0.76, 1.12, moonProgress);
        this.moonSprite.setPosition(W - 82, moonY);
        this.moonSprite.setScale(moonScale);
        this.moonSprite.setAlpha(moonProgress);

        const haloPulse = 1 + Math.sin(timeMs * 0.0025) * 0.06;
        this.moonHalo.setPosition(W - 82, moonY);
        this.moonHalo.setScale(moonScale * haloPulse);
        this.moonHalo.setAlpha(moonProgress * 0.26);

        // Estrelas cintilando
        const starVisibility = Phaser.Math.Clamp((progress - 0.22) / 0.52, 0, 1);
        for (let i = 0; i < this.bgStars.length; i++) {
            const st = this.bgStars[i];
            const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(timeMs * st.speed + st.phase));
            st.sprite.setAlpha(starVisibility * st.baseMax * twinkle);
        }

        // Aurora Boreal suave próxima à meia-noite
        this.auroraGraphics.clear();
        const auroraStrength = Phaser.Math.Clamp((progress - 0.68) / 0.32, 0, 1);
        if (auroraStrength > 0.01) {
            const bands = [
                { baseY: 106, amp: 15, freq: 0.015, speed: 0.0008, color: 0x22c55e, alpha: 0.13 * auroraStrength, h: 46 },
                { baseY: 142, amp: 19, freq: 0.012, speed: -0.0006, color: 0x2dd4bf, alpha: 0.10 * auroraStrength, h: 52 },
                { baseY: 84, amp: 12, freq: 0.018, speed: 0.0011, color: 0x38bdf8, alpha: 0.08 * auroraStrength, h: 36 }
            ];
            bands.forEach((b) => {
                this.auroraGraphics.fillStyle(b.color, b.alpha);
                this.auroraGraphics.beginPath();
                this.auroraGraphics.moveTo(0, b.baseY + b.h);
                for (let x = 0; x <= W; x += 24) {
                    const wave = Math.sin(x * b.freq + timeMs * b.speed) * b.amp;
                    this.auroraGraphics.lineTo(x, b.baseY + wave);
                }
                for (let x = W; x >= 0; x -= 24) {
                    const wave = Math.sin(x * b.freq + timeMs * b.speed + 0.7) * b.amp;
                    this.auroraGraphics.lineTo(x, b.baseY + b.h + wave * 0.6);
                }
                this.auroraGraphics.closePath();
                this.auroraGraphics.fillPath();
            });
        }
    }

    seedInitialHouses() {
        this.rightmostHouse = null;
        let rightEdge = 30;
        while (rightEdge < this.W + 150) {
            const spawned = this.spawnNextHouse(false, rightEdge);
            rightEdge = spawned.worldX + spawned.displayWidth * 0.5;
        }
    }

    startGame() {
        soundFX.unlock();
        this.clearDynamicEntities();

        this.gameState = 'PLAYING';
        this.score = 0;
        this.pizzasDelivered = 0;
        this.ammo = MAX_AMMO;
        this.combo = 0;
        this.maxCombo = 0;
        this.lives = 3;
        this.currentPhase = 1;
        this.isInvincible = false;
        this.scrollSpeed = 162;
        this.skyProgress = 0;
        this.targetSkyProgress = 0;
        this.obstacleTimer = 1700;
        this.packTimer = 5200;
        this.lifeTimer = Phaser.Math.Between(16000, 23000);
        this.landmarkTimer = Phaser.Math.Between(4500, 6800);
        this.lastLandmarkKey = null;
        this.lastPizzaTime = 0;
        this.lastHouseKey = null;
        gameBridge.isFlyHeld = false;
        gameBridge.activeFlyPointers.clear();
        this.canvasFlyPointers.clear();
        ui.btnFly.classList.remove('pressed');

        this.santa.setPosition(96, 235);
        this.santa.setAngle(0);
        this.santa.setAlpha(1);

        this.applyCharacter(gameBridge.getSelectedCharacter());

        this.santa.body.setAllowGravity(true);
        this.santa.body.setGravityY(680);
        this.santa.body.setVelocity(0, -85);

        this.seedInitialHouses();
        this.renderDynamicSky(0, this.time.now);
        this.syncAllHUD();

        ui.titleOverlay.classList.add('hidden');
        ui.pauseOverlay.classList.add('hidden');
        ui.gameoverOverlay.classList.add('hidden');
        ui.phaseBanner.classList.remove('show');

        this.physics.resume();
        this.sleighTrail.start();
    }

    togglePause() {
        if (this.gameState === 'PLAYING') {
            this.gameState = 'PAUSED';
            this.physics.pause();
            gameBridge.isFlyHeld = false;
            gameBridge.activeFlyPointers.clear();
            this.canvasFlyPointers.clear();
            ui.btnFly.classList.remove('pressed');
            ui.pauseOverlay.classList.remove('hidden');
        } else if (this.gameState === 'PAUSED') {
            this.gameState = 'PLAYING';
            this.physics.resume();
            ui.pauseOverlay.classList.add('hidden');
        }
    }

    applyCharacter(char) {
        if (!this.santa || !this.santa.active) return;

        const target = char || DEFAULT_CHARACTER;
        this.desiredCharacter = target;

        // Se é o Papai Noel padrão ou o PNG já está em memória, aplica imediatamente
        if (!target.imgSrc || this.textures.exists(target.textureKey)) {
            this.applyCharacterTexture(target);
            return;
        }

        // Se o arquivo falhou ao carregar antes, mantém o Papai Noel como fallback
        if (this.failedCharTextures && this.failedCharTextures.has(target.textureKey)) {
            this.applyCharacterTexture(DEFAULT_CHARACTER);
            return;
        }

        // Enquanto baixa o PNG novo, mantém o sprite seguro e agenda a troca instantânea
        if (!this.loadingCharTextures.has(target.textureKey)) {
            this.loadingCharTextures.add(target.textureKey);
            const key = target.textureKey;

            this.load.once(`filecomplete-image-${key}`, () => {
                this.loadingCharTextures.delete(key);
                if (this.desiredCharacter && this.desiredCharacter.textureKey === key) {
                    this.applyCharacterTexture(this.desiredCharacter);
                }
            });

            this.load.image(key, target.imgSrc);
            if (!this.load.isLoading()) {
                this.load.start();
            }
        }
    }

    applyCharacterTexture(char) {
        if (!this.santa || !this.santa.active) return;

        const hasValidTexture = Boolean(
            char &&
            char.textureKey &&
            this.textures.exists(char.textureKey) &&
            (!this.failedCharTextures || !this.failedCharTextures.has(char.textureKey))
        );

        const keyToUse = hasValidTexture ? char.textureKey : 'santa_sleigh';
        this.santa.setTexture(keyToUse);

        if (keyToUse === 'santa_sleigh') {
            this.santa.setScale(1);
            this.santa.body.setSize(58, 30);
            this.santa.body.setOffset(16, 18);
        } else {
            const frame = this.santa.frame;
            const maxW = (char && char.maxW) || 92;
            const maxH = (char && char.maxH) || 66;
            const scale = Math.min(maxW / frame.width, maxH / frame.height);
            this.santa.setScale(scale);

            const hitW = Math.min(frame.width * 0.8, 58 / scale);
            const hitH = Math.min(frame.height * 0.75, 30 / scale);
            this.santa.body.setSize(hitW, hitH, true);
        }
    }

    returnToMenu() {
        this.clearDynamicEntities();
        this.gameState = 'TITLE';
        this.skyProgress = 0;
        this.targetSkyProgress = 0;

        gameBridge.isFlyHeld = false;
        gameBridge.activeFlyPointers.clear();
        this.canvasFlyPointers.clear();
        ui.btnFly.classList.remove('pressed');

        this.santa.setPosition(96, 235);
        this.santa.setAngle(0);
        this.santa.setAlpha(1);
        this.santa.body.setAllowGravity(false);
        this.santa.body.setVelocity(0, 0);
        this.santa.body.setAccelerationY(0);
        this.applyCharacter(gameBridge.getSelectedCharacter());

        this.seedInitialHouses();
        this.renderDynamicSky(0, this.time.now);
        this.physics.resume();
        this.sleighTrail.start();

        ui.pauseOverlay.classList.add('hidden');
        ui.gameoverOverlay.classList.add('hidden');
        ui.phaseBanner.classList.remove('show');
        ui.titleOverlay.classList.remove('hidden');

        gameBridge.renderRankingUI();
        gameBridge.renderCharacterSlider();
    }

    clearDynamicEntities() {
        this.housesList.forEach((h) => {
            if (h.lightsOverlay) h.lightsOverlay.destroy();
            if (h.chimney) {
                this.destroyChimneyExtras(h.chimney);
                h.chimney.destroy();
            }
            h.destroy();
        });
        this.housesList = [];
        this.chimneysList = [];
        this.rightmostHouse = null;

        this.packsGroup.getChildren().slice().forEach((pk) => {
            if (pk.aura) pk.aura.destroy();
            pk.destroy();
        });

        this.livesGroup.getChildren().slice().forEach((heart) => {
            if (heart.aura) heart.aura.destroy();
            heart.destroy();
        });

        this.obstaclesGroup.getChildren().slice().forEach((obs) => {
            if (obs.boltSprite) obs.boltSprite.destroy();
            obs.destroy();
        });

        this.pendingWarnings.forEach((w) => {
            if (w.bg) w.bg.destroy();
            if (w.txt) w.txt.destroy();
        });
        this.pendingWarnings = [];

        this.activeLandmarks.forEach((lm) => this.destroyLandmark(lm));
        this.activeLandmarks = [];

        this.pizzasGroup.clear(true, true);
    }

    destroyChimneyExtras(chimney) {
        if (chimney.smokeEmitter) {
            chimney.smokeEmitter.destroy();
            chimney.smokeEmitter = null;
        }
        if (chimney.vipLabel) {
            chimney.vipLabel.destroy();
            chimney.vipLabel = null;
        }
    }

    destroyLandmark(lm) {
        if (lm.bodySprite) lm.bodySprite.destroy();
        if (lm.lightsSprite) lm.lightsSprite.destroy();
        if (lm.beaconGlow) lm.beaconGlow.destroy();
        if (lm.beaconCore) lm.beaconCore.destroy();
        if (lm.badgeBg) lm.badgeBg.destroy();
        if (lm.badgeText) lm.badgeText.destroy();
    }

    /**
     * Spawna aleatoriamente 1 dos 5 Pontos Turísticos da Bahia (sem repetir consecutivo),
     * em paralaxe ~0.32x, com iluminação noturna e plaquinha discreta na base.
     */
    spawnBahianLandmark() {
        const candidates = LANDMARK_DEFS.filter((d) => d.key !== this.lastLandmarkKey);
        const def = Phaser.Utils.Array.GetRandom(candidates);
        this.lastLandmarkKey = def.key;

        const useProceduralLights = !this.customTextureKeys.has(def.key);
        const startX = this.W + 135;
        const baseY = this.groundY - 10;

        const bodySprite = this.add.image(startX, baseY, def.key)
            .setOrigin(0.5, 1)
            .setDepth(8);

        let lightsSprite = null;
        if (useProceduralLights && this.textures.exists(def.lightsKey)) {
            lightsSprite = this.add.image(startX, baseY, def.lightsKey)
                .setOrigin(0.5, 1)
                .setDepth(9)
                .setAlpha(0.16);
        }

        // Sinalizador vermelho piscante no mastro da Caixa d'Água do Tomba
        let beaconGlow = null;
        let beaconCore = null;
        if (def.hasBeacon) {
            const beaconY = baseY - bodySprite.displayHeight + 7;
            beaconGlow = this.add.circle(startX, beaconY, 11, 0xef4444, 0.5).setDepth(9);
            beaconCore = this.add.circle(startX, beaconY, 3.2, 0xfca5a5, 1).setDepth(9);
        }

        // Plaquinha discreta na base do monumento (depth 11, acima das colinas mas atrás das casas)
        const badgeY = baseY - 22;
        const badgeText = this.add.text(startX, badgeY, def.label, {
            fontFamily: 'Inter, sans-serif',
            fontSize: '10.5px',
            fontStyle: 'bold',
            color: '#f8fafc',
            stroke: '#0f172a',
            strokeThickness: 3
        }).setOrigin(0.5).setDepth(11.1).setAlpha(0);

        const padX = 14, padY = 6;
        const badgeBg = this.add.graphics().setDepth(11).setAlpha(0);
        badgeBg.fillStyle(0x0f172a, 0.68);
        badgeBg.lineStyle(1, 0xfde68a, 0.45);
        badgeBg.fillRoundedRect(
            -(badgeText.width + padX) / 2,
            -(badgeText.height + padY) / 2,
            badgeText.width + padX,
            badgeText.height + padY,
            8
        );
        badgeBg.strokeRoundedRect(
            -(badgeText.width + padX) / 2,
            -(badgeText.height + padY) / 2,
            badgeText.width + padX,
            badgeText.height + padY,
            8
        );
        badgeBg.setPosition(startX, badgeY);

        this.activeLandmarks.push({
            key: def.key,
            x: startX,
            baseY,
            bodySprite,
            lightsSprite,
            beaconGlow,
            beaconCore,
            badgeBg,
            badgeText
        });
    }

    /**
     * Spawna uma das 6 casas com chaminé 100% ESTÁVEL (Phaser.GameObjects.Image puro,
     * alpha = 1 fixo, SEM corpo do Arcade Physics, depth 20 atrás da fachada depth 21).
     */
    spawnNextHouse(allowSpecial = true, forcedRightEdge = null) {
        const phaseInfo = getPhaseInfo(this.pizzasDelivered);
        const isVip = allowSpecial && Phaser.Math.FloatBetween(0, 1) < phaseInfo.vipChance;

        let houseKey;
        if (isVip) {
            houseKey = 'house_vip';
        } else {
            const candidates = REGULAR_HOUSE_KEYS.filter((k) => k !== this.lastHouseKey);
            houseKey = Phaser.Utils.Array.GetRandom(candidates);
        }
        this.lastHouseKey = houseKey;

        const def = HOUSE_CATALOG[houseKey];
        const prevRightEdge = forcedRightEdge !== null
            ? forcedRightEdge
            : (this.rightmostHouse ? this.rightmostHouse.worldX + this.rightmostHouse.displayWidth * 0.5 : this.W);

        // Espaçamento calculado pela borda direita real para impedir qualquer sobreposição
        const gap = Phaser.Math.Between(72, 134);
        const worldX = prevRightEdge + gap + def.width * 0.5;
        const rx = Math.round(worldX);

        // Fachada da casa (depth 21)
        const house = this.add.image(rx, this.groundY, def.key)
            .setOrigin(0.5, 1)
            .setDepth(21);
        house.worldX = worldX;
        house.houseDef = def;
        this.housesList.push(house);
        this.rightmostHouse = house;

        // Janelas noturnas luminosas (depth 22)
        const lightsKey = `${def.key}_lights`;
        if (!this.customTextureKeys.has(def.key) && this.textures.exists(lightsKey)) {
            house.lightsOverlay = this.add.image(rx, this.groundY, lightsKey)
                .setOrigin(0.5, 1)
                .setDepth(22)
                .setAlpha(this.windowGlowAlpha);
        }

        // CHAMINÉ: Image puro (SEM Arcade Physics), alpha = 1 fixo, origin(0.5, 1), depth 20
        const chX = Math.round(worldX + def.chimneyOffsetX);
        const chY = Math.round(house.y - def.chimneyRoofY);
        const chimneyKey = def.isVip ? 'chimney_vip' : 'chimney';

        const chimney = this.add.image(chX, chY, chimneyKey)
            .setOrigin(0.5, 1)
            .setAlpha(1)
            .setDepth(20);
        chimney.setDisplaySize(CHIMNEY_TEX_W, def.chimneyHeight);

        chimney.parentHouse = house;
        house.chimney = chimney;
        chimney.delivered = false;
        chimney.isVip = def.isVip;
        this.chimneysList.push(chimney);

        const mouthY = chY - def.chimneyHeight;

        // Partículas de fumaça saindo exatamente da boca superior da chaminé
        chimney.smokeEmitter = this.add.particles(chX, mouthY + 2, 'smoke_particle', {
            speedY: { min: -42, max: -20 },
            speedX: { min: -26, max: -8 },
            scale: { start: 0.3, end: 0.92 },
            alpha: { start: 0.62, end: 0 },
            tint: def.isVip ? [0xfef08a, 0xfacc15] : [0xffffff, 0xffedd5],
            lifespan: 950,
            frequency: def.isVip ? 130 : 220
        }).setDepth(23);

        if (def.isVip) {
            chimney.vipLabel = this.add.text(chX, mouthY - 22, '★ VIP 2x', {
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '13px',
                fontStyle: 'bold',
                color: '#fef08a',
                stroke: '#78350f',
                strokeThickness: 4
            }).setOrigin(0.5).setDepth(24);
        }

        // Pinheiro nevado alto apenas em vãos largos (>= 96px) para nunca sobrepor casas
        const activeEnemies = this.obstaclesGroup.getLength() + this.pendingWarnings.length;
        if (
            allowSpecial &&
            this.gameState === 'PLAYING' &&
            gap >= 96 &&
            activeEnemies < phaseInfo.maxEnemies &&
            Phaser.Math.FloatBetween(0, 1) < (phaseInfo.phase >= 2 ? 0.42 : 0.34)
        ) {
            const pineX = prevRightEdge + gap * 0.5;
            const tallestHouse = Math.max(...Object.values(HOUSE_CATALOG).map((h) => h.height));
            const minPineScale = Math.max(0.95, (tallestHouse + 22) / 186); // ~177px mín. (nunca menor que o sobrado de 148px)
            const maxPineScale = gap >= 112 ? 1.45 : 1.28; // até ~270px em vãos largos sem invadir as casas vizinhas
            const pineScale = Phaser.Math.FloatBetween(minPineScale, maxPineScale);

            const pine = this.obstaclesGroup.create(pineX, this.groundY + 4, 'obstacle_pine')
                .setOrigin(0.5, 1)
                .setScale(pineScale)
                .setDepth(18);
            pine.obstacleType = 'pine';
            pine.body.setSize(28, 134);
            pine.body.setOffset(18, 28);
            pine.worldX = pineX;
            this.syncBodyToSprite(pine);
        }

        return house;
    }

    /** Sincronização matemática pixel-perfect a cada frame (ZERO piscar / ZERO tremor) */
    syncChimneyToHouse(chimney, timeMs = 0) {
        const house = chimney.parentHouse;
        if (!house || !house.active) return;

        const def = house.houseDef;
        const cx = Math.round(house.worldX + def.chimneyOffsetX);
        const cy = Math.round(house.y - def.chimneyRoofY);

        chimney.x = cx;
        chimney.y = cy;

        const mouthY = cy - def.chimneyHeight;

        if (chimney.smokeEmitter) {
            chimney.smokeEmitter.setPosition(cx, mouthY + 2);
        }
        if (chimney.vipLabel) {
            chimney.vipLabel.setPosition(cx, Math.round(mouthY - 22 + Math.sin(timeMs * 0.006) * 3));
        }
    }

    /**
     * Sincroniza manualmente a hitbox sem deixar o Arcade Physics
     * sobrescrever sprite.x / sprite.y no postUpdate (corrige flutuação e piscar).
     */
    syncBodyToSprite(sprite) {
        const body = sprite.body;
        if (!body) return;

        body.moves = false;
        body.updateBounds();

        const sx = Math.abs(sprite.scaleX);
        const sy = Math.abs(sprite.scaleY);

        let left;
        let top;
        if (body.isCircle) {
            left = sprite.x - body.halfWidth;
            top = sprite.y - body.halfHeight;
        } else {
            left = sprite.x - sprite.originX * sprite.displayWidth + body.offset.x * sx;
            top = sprite.y - sprite.originY * sprite.displayHeight + body.offset.y * sy;
        }

        body.position.set(left, top);
        body.prev.set(left, top);
        body.prevFrame.set(left, top);
        body.updateCenter();
    }

    /** Spawna um único inimigo aéreo */
    spawnSingleAirEnemy(type, laneY, xOffset, phaseInfo) {
        const spawnX = this.W + 56 + xOffset;

        if (type === 'bird') {
            this.scheduleIceBird(laneY, phaseInfo);
            return;
        }

        if (type === 'drone') {
            const drone = this.obstaclesGroup.create(spawnX, laneY, 'obstacle_drone').setDepth(27);
            drone.obstacleType = 'drone';
            drone.baseY = laneY;
            drone.waveAmp = phaseInfo.waveAmp;
            drone.waveSpeed = phaseInfo.phase >= 4 ? 0.0056 : 0.0045;
            drone.waveOffset = Phaser.Math.FloatBetween(0, Math.PI * 2);
            drone.extraSpeed = Phaser.Math.Between(36, 72) + (phaseInfo.phase - 2) * 14;
            drone.body.setCircle(15, 9, 9);
            this.syncBodyToSprite(drone);
        } else {
            const cloud = this.obstaclesGroup.create(spawnX, laneY, 'obstacle_cloud').setDepth(27);
            cloud.obstacleType = 'cloud';
            cloud.baseY = laneY;
            cloud.waveOffset = Phaser.Math.FloatBetween(0, Math.PI * 2);
            cloud.extraSpeed = Phaser.Math.Between(8, 28) + (phaseInfo.phase - 1) * 6;
            cloud.isElectric = phaseInfo.electricClouds;
            cloud.nextBolt = Phaser.Math.Between(550, 1450);
            cloud.boltTimer = 0;
            cloud.boltSprite = null;
            if (cloud.isElectric) {
                cloud.boltSprite = this.add.image(spawnX, laneY + 34, 'electric_bolt')
                    .setDepth(26.8)
                    .setAlpha(0);
            }
            cloud.body.setSize(52, 34);
            cloud.body.setOffset(16, 16);
            this.syncBodyToSprite(cloud);
        }
    }

    /** Agenda Pássaro Gelado veloz com alerta visual "!" piscando na borda direita */
    scheduleIceBird(targetY, phaseInfo) {
        soundFX.playWarning();

        const warnX = this.W - 26;
        const bg = this.add.circle(warnX, targetY, 15, 0xef4444, 0.94)
            .setStrokeStyle(2.5, 0xfef08a, 1)
            .setDepth(28);
        const txt = this.add.text(warnX, targetY, '!', {
            fontFamily: 'Fredoka, sans-serif',
            fontSize: '21px',
            fontStyle: 'bold',
            color: '#ffffff'
        }).setOrigin(0.5).setDepth(28.1);

        this.pendingWarnings.push({
            targetY,
            timer: 650,
            phaseSpeedBonus: 168 + (phaseInfo.phase - 3) * 18,
            bg,
            txt
        });
    }

    /** Escalada de ondas/formações por nível com corredor vertical seguro garantido */
    spawnEnemyWave() {
        const phaseInfo = getPhaseInfo(this.pizzasDelivered);
        const currentCount = this.obstaclesGroup.getLength() + this.pendingWarnings.length;
        const slotsLeft = phaseInfo.maxEnemies - currentCount;
        if (slotsLeft <= 0) return;

        // 4 faixas aéreas acima dos telhados; 1 faixa é SEMPRE reservada livre
        const lanes = [118, 222, 326, 430];
        const safeLaneIdx = Phaser.Math.Between(0, lanes.length - 1);
        const usableLanes = lanes.filter((_, idx) => idx !== safeLaneIdx);
        Phaser.Utils.Array.Shuffle(usableLanes);

        let waveSize = 1;
        const roll = Phaser.Math.FloatBetween(0, 1);
        if (slotsLeft >= 3 && phaseInfo.tripleChance > 0 && roll < phaseInfo.tripleChance) {
            waveSize = 3;
        } else if (slotsLeft >= 2 && phaseInfo.formationChance > 0 && roll < phaseInfo.formationChance + phaseInfo.tripleChance) {
            waveSize = 2;
        }

        const pickType = () => {
            const r = Phaser.Math.FloatBetween(0, 1);
            if (phaseInfo.allowIceBirds && r < 0.28) return 'bird';
            if (phaseInfo.allowDrones && r < (phaseInfo.phase >= 4 ? 0.68 : 0.56)) return 'drone';
            return 'cloud';
        };

        for (let i = 0; i < waveSize; i++) {
            const laneY = usableLanes[i] + Phaser.Math.Between(-12, 12);
            const type = (waveSize > 1 && i === 1 && phaseInfo.allowDrones) ? 'drone' : pickType();
            // Escadinha horizontal suave em formações duplas/triplas
            const xStagger = i * Phaser.Math.Between(56, 92);
            this.spawnSingleAirEnemy(type, laneY, xStagger, phaseInfo);
        }
    }

    /** Pacote aéreo de reabastecimento (+4 pizzas) */
    spawnPizzaPack() {
        const spawnX = this.W + 46;
        const minY = 114;
        const maxY = this.groundY - 255;
        const spawnY = Phaser.Math.Between(minY, maxY);

        const pack = this.packsGroup.create(spawnX, spawnY, 'pizza_pack').setDepth(27);
        pack.baseY = spawnY;
        pack.waveOffset = Phaser.Math.FloatBetween(0, Math.PI * 2);
        pack.body.setSize(48, 52);
        pack.body.setOffset(6, 10);
        this.syncBodyToSprite(pack);

        pack.aura = this.add.circle(spawnX, spawnY + 8, 28, 0xfacc15, 0.24).setDepth(26.5);
    }

    /** Coração aéreo de vida extra (mais raro que os pacotes de pizza) */
    spawnLifeHeart() {
        const spawnX = this.W + 46;
        const minY = 114;
        const maxY = this.groundY - 255;
        const spawnY = Phaser.Math.Between(minY, maxY);

        const heart = this.livesGroup.create(spawnX, spawnY, 'life_heart').setDepth(27);
        heart.baseY = spawnY;
        heart.waveOffset = Phaser.Math.FloatBetween(0, Math.PI * 2);
        heart.body.setCircle(18, 4, 4);
        this.syncBodyToSprite(heart);

        heart.aura = this.add.circle(spawnX, spawnY, 24, 0xef4444, 0.24).setDepth(26.5);
    }

    tryThrowPizza() {
        if (this.gameState !== 'PLAYING') return;

        const now = this.time.now;
        if (now - this.lastPizzaTime < this.pizzaCooldownMs) return;

        if (this.ammo <= 0) {
            if (now - this.lastEmptyWarnTime > 380) {
                this.lastEmptyWarnTime = now;
                soundFX.playEmpty();
                triggerEmptyAmmoShake();
                this.spawnFloatingText(
                    this.santa.x + 24,
                    this.santa.y - 34,
                    'SEM PIZZAS!',
                    '#f87171',
                    17
                );
            }
            return;
        }

        this.lastPizzaTime = now;
        this.ammo -= 1;
        soundFX.playToss();
        this.animatePizzaCooldown();
        this.syncAllHUD();

        const pizza = this.pizzasGroup.create(this.santa.x + 14, this.santa.y + 18, 'pizza_box')
            .setDepth(27);
        pizza.body.setGravityY(760);
        pizza.body.setVelocity(142, -52);
        pizza.body.setAngularVelocity(360);
        pizza.body.setSize(28, 22);
    }

    animatePizzaCooldown() {
        ui.pizzaCooldownBar.style.transition = 'none';
        ui.pizzaCooldownBar.style.width = '100%';
        requestAnimationFrame(() => {
            ui.pizzaCooldownBar.style.transition = `width ${this.pizzaCooldownMs}ms linear`;
            ui.pizzaCooldownBar.style.width = '0%';
        });
    }

    handleCollectPizzaPack(santa, pack) {
        if (!pack.active || this.gameState !== 'PLAYING') return;

        const px = pack.x;
        const py = pack.y;
        if (pack.aura) pack.aura.destroy();
        pack.destroy();

        soundFX.playRefill();
        this.goldBurstEmitter.explode(22, px, py);

        if (this.ammo >= MAX_AMMO) {
            this.score += 150;
            this.spawnFloatingText(px, py - 18, 'ESTOQUE CHEIO +150!', '#fde047', 16);
        } else {
            const before = this.ammo;
            this.ammo = Math.min(MAX_AMMO, this.ammo + REFILL_AMOUNT);
            const gained = this.ammo - before;
            this.spawnFloatingText(px, py - 18, `+${gained} PIZZAS!`, '#86efac', 20);
        }

        this.syncAllHUD();
    }

    handleCollectLife(santa, heart) {
        if (!heart.active || this.gameState !== 'PLAYING') return;

        const hx = heart.x;
        const hy = heart.y;
        if (heart.aura) heart.aura.destroy();
        heart.destroy();

        soundFX.playHeal();
        this.goldBurstEmitter.explode(20, hx, hy);

        if (this.lives < MAX_LIVES) {
            this.lives += 1;
            this.spawnFloatingText(hx, hy - 18, '+1 VIDA! ❤', '#fda4af', 20);
        } else {
            this.score += 200;
            this.spawnFloatingText(hx, hy - 18, 'VIDA CHEIA +200!', '#fde047', 16);
        }

        this.syncAllHUD();
    }

    handlePizzaChimneyDelivery(pizza, chimney) {
        if (!pizza.active || !chimney.active || chimney.delivered) return;

        chimney.delivered = true;
        pizza.destroy();

        const mouthY = chimney.y - chimney.displayHeight;
        chimney.setTexture('chimney_done');
        this.destroyChimneyExtras(chimney);

        this.pizzasDelivered += 1;
        this.combo += 1;
        if (this.combo > this.maxCombo) this.maxCombo = this.combo;

        const phaseInfo = getPhaseInfo(this.pizzasDelivered);
        const basePts = chimney.isVip ? 200 : 100;
        const comboBonus = this.combo >= 2 ? (this.combo - 1) * 25 : 0;
        const gained = Math.round((basePts + comboBonus) * phaseInfo.multiplier);
        this.score += gained;

        this.targetSkyProgress = getTargetSkyProgress(this.pizzasDelivered);
        this.scrollSpeed = Math.min(335, phaseInfo.baseSpeed + phaseInfo.inPhase * 1.6);

        soundFX.playDelivery(this.combo, chimney.isVip);
        this.confettiEmitter.explode(chimney.isVip ? 26 : 16, chimney.x, mouthY);

        const labelText = chimney.isVip ? `VIP x2! +${gained}` : `+${gained}`;
        this.spawnFloatingText(
            chimney.x,
            mouthY - 20,
            labelText,
            chimney.isVip ? '#fde047' : '#86efac',
            chimney.isVip ? 21 : 19
        );

        if (this.combo >= 2) {
            this.spawnFloatingText(
                chimney.x,
                mouthY - 46,
                `COMBO x${this.combo}!`,
                '#fb923c',
                16
            );
        }

        // Avanço de nível com fanfarra, banner e +2 pizzas
        if (phaseInfo.phase > this.currentPhase) {
            this.currentPhase = phaseInfo.phase;
            const beforeAmmo = this.ammo;
            this.ammo = Math.min(MAX_AMMO, this.ammo + 2);
            const bonusAdded = this.ammo - beforeAmmo;
            if (bonusAdded === 0) this.score += 100;

            soundFX.playPhaseUp();
            this.goldBurstEmitter.explode(28, this.santa.x + 10, this.santa.y);
            showPhaseBanner(phaseInfo, bonusAdded);
        }

        this.syncAllHUD();
    }

    handleSantaObstacleHit(santa, obstacle) {
        if (this.gameState !== 'PLAYING' || this.isInvincible || !obstacle.active) return;

        this.lives -= 1;
        this.combo = 0;
        this.isInvincible = true;

        soundFX.playHit();
        this.cameras.main.shake(220, 0.015);
        this.snowPuffEmitter.explode(14, santa.x + 12, santa.y);

        if (obstacle.obstacleType !== 'pine') {
            if (obstacle.boltSprite) obstacle.boltSprite.destroy();
            obstacle.destroy();
        }

        this.syncAllHUD();

        if (this.lives <= 0) {
            this.triggerGameOver();
            return;
        }

        // Invencibilidade temporária de ~1.5s com efeito de piscar no trenó
        this.tweens.add({
            targets: this.santa,
            alpha: 0.25,
            duration: 107,
            repeat: 13,
            yoyo: true,
            onComplete: () => {
                if (this.santa && this.santa.active) this.santa.setAlpha(1);
                this.isInvincible = false;
            }
        });
    }

    triggerGameOver() {
        this.gameState = 'GAMEOVER';
        gameBridge.isFlyHeld = false;
        gameBridge.activeFlyPointers.clear();
        this.canvasFlyPointers.clear();
        ui.btnFly.classList.remove('pressed');

        soundFX.playGameOver();
        this.sleighTrail.stop();
        this.physics.pause();

        const finalPhaseInfo = getPhaseInfo(this.pizzasDelivered);
        this.time.delayedCall(320, () => {
            showGameOverScreen(this.score, this.pizzasDelivered, this.maxCombo, finalPhaseInfo);
        });
    }

    spawnFloatingText(x, y, message, color, fontSize) {
        const txt = this.add.text(x, y, message, {
            fontFamily: 'Fredoka, sans-serif',
            fontSize: `${fontSize}px`,
            fontStyle: 'bold',
            color: color,
            stroke: '#0f172a',
            strokeThickness: 5
        }).setOrigin(0.5).setDepth(35);

        this.tweens.add({
            targets: txt,
            y: y - 54,
            alpha: 0,
            scale: 1.12,
            duration: 860,
            ease: 'Cubic.easeOut',
            onComplete: () => txt.destroy()
        });
    }

    update(time, delta) {
        const dt = Math.min(delta, 40) / 1000;

        // Interpolação contínua do céu dinâmico (18:00 -> 00:00)
        this.skyProgress = Phaser.Math.Linear(this.skyProgress, this.targetSkyProgress, Math.min(1, dt * 1.4));
        this.renderDynamicSky(this.skyProgress, time);

        for (let i = 0; i < this.bgClouds.length; i++) {
            const c = this.bgClouds[i];
            c.x -= c.driftSpeed * dt;
            if (c.x < -70) {
                c.x = this.W + 70;
                c.y = Phaser.Math.Between(98, 275);
            }
        }

        if (this.gameState === 'TITLE') {
            this.santa.y = 235 + Math.sin(time * 0.003) * 14;
            this.santa.angle = Math.cos(time * 0.003) * 4;
            this.mountains.tilePositionX += 14 * dt;
            this.forest.tilePositionX += 32 * dt;
            this.groundTile.tilePositionX += 70 * dt;
            return;
        }

        if (this.gameState !== 'PLAYING') return;

        const speed = this.scrollSpeed;
        const moveDx = speed * dt;
        const phaseInfo = getPhaseInfo(this.pizzasDelivered);

        // --- 1. PARALAXE & CHÃO ---
        this.mountains.tilePositionX += speed * 0.14 * dt;
        this.forest.tilePositionX += speed * 0.28 * dt;
        this.groundTile.tilePositionX += moveDx;

        // --- 2. PONTOS TURÍSTICOS DA BAHIA AO FUNDO (PARALAXE ~0.32x, 10–16s) ---
        if (this.activeLandmarks.length === 0) {
            this.landmarkTimer -= delta;
            if (this.landmarkTimer <= 0) {
                this.spawnBahianLandmark();
            }
        }

        for (let i = this.activeLandmarks.length - 1; i >= 0; i--) {
            const lm = this.activeLandmarks[i];
            lm.x -= speed * 0.32 * dt;
            const rx = Math.round(lm.x);

            lm.bodySprite.x = rx;
            if (lm.lightsSprite) lm.lightsSprite.x = rx;

            if (lm.beaconGlow && lm.beaconCore) {
                lm.beaconGlow.x = rx;
                lm.beaconCore.x = rx;
                const blinkOn = Math.sin(time * 0.0065) > -0.15;
                lm.beaconGlow.setAlpha(blinkOn ? 0.58 : 0.06);
                lm.beaconCore.setAlpha(blinkOn ? 1.0 : 0.22);
            }

            if (lm.badgeText && lm.badgeBg) {
                lm.badgeText.x = rx;
                lm.badgeBg.x = rx;
                const distFromCenter = Math.abs(lm.x - this.W * 0.5);
                const fade = Phaser.Math.Clamp(1 - (distFromCenter - 105) / 115, 0, 1);
                lm.badgeText.setAlpha(fade * 0.94);
                lm.badgeBg.setAlpha(fade * 0.94);
            }

            if (lm.x < -150) {
                this.destroyLandmark(lm);
                this.activeLandmarks.splice(i, 1);
                this.landmarkTimer = Phaser.Math.Between(10000, 16000);
            }
        }

        // --- 3. FÍSICA DE VOO DO TRENÓ ---
        const flyKeyboard = this.keys.space.isDown || this.keys.up.isDown || this.keys.w.isDown;
        const isFlying = gameBridge.isFlyHeld || flyKeyboard;

        if (isFlying) {
            this.santa.body.setAccelerationY(-1450);
            if (this.santa.body.velocity.y < -290) {
                this.santa.body.setVelocityY(-290);
            }
            soundFX.playThrust();
        } else {
            this.santa.body.setAccelerationY(0);
            if (this.santa.body.velocity.y > 350) {
                this.santa.body.setVelocityY(350);
            }
        }

        const minY = 92;
        const maxY = this.groundY - 166; // 540: permite voar baixo perto dos pinheiros sem entrar nas casas
        if (this.santa.y < minY) {
            this.santa.y = minY;
            if (this.santa.body.velocity.y < 0) this.santa.body.setVelocityY(0);
        } else if (this.santa.y > maxY) {
            this.santa.y = maxY;
            if (this.santa.body.velocity.y > 0) this.santa.body.setVelocityY(0);
        }

        const targetAngle = Phaser.Math.Clamp(this.santa.body.velocity.y * 0.06, -18, 20);
        this.santa.angle = Phaser.Math.Linear(this.santa.angle, targetAngle, 0.16);

        // --- 4. CASAS & CHAMINÉS (SINCRONIZAÇÃO DETERMINÍSTICA ANTI-PISCAR) ---
        for (let i = this.housesList.length - 1; i >= 0; i--) {
            const house = this.housesList[i];
            house.worldX -= moveDx;
            const rx = Math.round(house.worldX);
            house.x = rx;

            if (house.lightsOverlay) house.lightsOverlay.x = rx;
            if (house.chimney && house.chimney.active) {
                this.syncChimneyToHouse(house.chimney, time);
            }

            if (house.worldX + house.displayWidth * 0.5 < -44) {
                if (house.lightsOverlay) house.lightsOverlay.destroy();
                if (house.chimney) {
                    this.destroyChimneyExtras(house.chimney);
                    const chIdx = this.chimneysList.indexOf(house.chimney);
                    if (chIdx !== -1) this.chimneysList.splice(chIdx, 1);
                    house.chimney.destroy();
                }
                if (this.rightmostHouse === house) this.rightmostHouse = null;
                house.destroy();
                this.housesList.splice(i, 1);
            }
        }

        const currentRightEdge = (this.rightmostHouse && this.rightmostHouse.active)
            ? this.rightmostHouse.worldX + this.rightmostHouse.displayWidth * 0.5
            : this.W;
        if (currentRightEdge < this.W + 110) {
            this.spawnNextHouse(true);
        }

        // --- 5. ESCALADA DE INIMIGOS E AVISOS DE PÁSSARO GELADO ---
        this.obstacleTimer -= delta;
        if (this.obstacleTimer <= 0) {
            this.spawnEnemyWave();
            const jitter = Math.round(phaseInfo.spawnInterval * 0.15);
            this.obstacleTimer = Phaser.Math.Between(
                Math.max(780, phaseInfo.spawnInterval - jitter),
                phaseInfo.spawnInterval + jitter
            );
        }

        for (let i = this.pendingWarnings.length - 1; i >= 0; i--) {
            const warn = this.pendingWarnings[i];
            warn.timer -= delta;
            const pulse = 0.88 + Math.sin(time * 0.03) * 0.18;
            warn.bg.setScale(pulse);
            warn.txt.setScale(pulse);

            if (warn.timer <= 0) {
                warn.bg.destroy();
                warn.txt.destroy();
                const bird = this.obstaclesGroup.create(this.W + 42, warn.targetY, 'obstacle_bird')
                    .setDepth(27);
                bird.obstacleType = 'bird';
                bird.baseY = warn.targetY;
                bird.extraSpeed = warn.phaseSpeedBonus;
                bird.waveOffset = Phaser.Math.FloatBetween(0, Math.PI * 2);
                bird.body.setSize(40, 20);
                bird.body.setOffset(8, 10);
                this.syncBodyToSprite(bird);
                this.pendingWarnings.splice(i, 1);
            }
        }

        this.obstaclesGroup.getChildren().slice().forEach((obs) => {
            if (obs.obstacleType === 'pine') {
             obs.worldX -= moveDx;
             obs.x = Math.round(obs.worldX);
             obs.y = this.groundY + 4;
            } else if (obs.obstacleType === 'bird') {
                obs.x -= (speed + obs.extraSpeed) * dt;
                obs.y = obs.baseY + Math.sin(time * 0.008 + obs.waveOffset) * 14;
                obs.scaleY = 0.92 + Math.sin(time * 0.025) * 0.12;
            } else if (obs.obstacleType === 'drone') {
                obs.x -= (speed + obs.extraSpeed) * dt;
                obs.y = obs.baseY + Math.sin(time * obs.waveSpeed + obs.waveOffset) * obs.waveAmp;
                obs.angle += 225 * dt;
            } else {
                obs.x -= (speed + obs.extraSpeed) * dt;
                obs.y = obs.baseY + Math.sin(time * 0.003 + obs.waveOffset) * 10;
                if (obs.isElectric && obs.boltSprite) {
                    obs.boltSprite.setPosition(obs.x, obs.y + 36);
                    obs.nextBolt -= delta;
                    if (obs.nextBolt <= 0) {
                        obs.boltTimer = 170;
                        obs.nextBolt = Phaser.Math.Between(900, 1900);
                    }
                    if (obs.boltTimer > 0) {
                        obs.boltTimer -= delta;
                        obs.boltSprite.setAlpha(obs.boltTimer > 60 ? 0.95 : 0.4);
                        obs.setTint(0xfef08a);
                    } else {
                        obs.boltSprite.setAlpha(0);
                        obs.clearTint();
                    }
                }
            }
            this.syncBodyToSprite(obs);
            if (obs.x < -100) {
                if (obs.boltSprite) obs.boltSprite.destroy();
                obs.destroy();
            }
        });

        // --- 6. PACOTES AÉREOS DE REABASTECIMENTO (SPAWN INTELIGENTE) ---
        const activePacks = this.packsGroup.getLength();
        if (this.ammo <= 2 && activePacks === 0 && this.packTimer > 1300) {
            this.packTimer = 1300;
        } else if (this.ammo <= 3 && activePacks === 0 && this.packTimer > 2500) {
            this.packTimer = 2500;
        }

        this.packTimer -= delta;
        if (this.packTimer <= 0) {
            this.spawnPizzaPack();
            if (this.ammo <= 3) {
                this.packTimer = Phaser.Math.Between(2700, 3900);
            } else if (this.ammo >= MAX_AMMO) {
                this.packTimer = Phaser.Math.Between(8200, 11200);
            } else {
                this.packTimer = Phaser.Math.Between(5500, 7900);
            }
        }

        this.packsGroup.getChildren().slice().forEach((pack) => {
            pack.x -= speed * 0.85 * dt;
            pack.y = pack.baseY + Math.sin(time * 0.0036 + pack.waveOffset) * 18;
            pack.angle = Math.sin(time * 0.0036 + pack.waveOffset) * 7;
            this.syncBodyToSprite(pack);

            if (pack.aura) {
                pack.aura.setPosition(pack.x, pack.y + 8);
                pack.aura.setScale(0.9 + Math.sin(time * 0.008) * 0.16);
            }
            if (pack.x < -70) {
                if (pack.aura) pack.aura.destroy();
                pack.destroy();
            }
        });

        // --- 6B. CORAÇÕES DE VIDA EXTRA (MENOS FREQUENTE QUE AS PIZZAS) ---
        const activeHearts = this.livesGroup.getLength();
        if (this.lives < MAX_LIVES && activeHearts === 0) {
            this.lifeTimer -= delta;
            if (this.lifeTimer <= 0) {
                this.spawnLifeHeart();
                // Frequência bem menor que as pizzas (14–20s com 1 vida; 18–26s com 2 vidas)
                this.lifeTimer = this.lives === 1
                    ? Phaser.Math.Between(14000, 20000)
                    : Phaser.Math.Between(18000, 26000);
            }
        }

        this.livesGroup.getChildren().slice().forEach((heart) => {
            heart.x -= speed * 0.88 * dt;
            heart.y = heart.baseY + Math.sin(time * 0.0042 + heart.waveOffset) * 20;
            const beat = 1 + Math.sin(time * 0.009) * 0.08;
            heart.setScale(beat);
            this.syncBodyToSprite(heart);

            if (heart.aura) {
                heart.aura.setPosition(heart.x, heart.y);
                heart.aura.setScale(0.92 + Math.sin(time * 0.009) * 0.2);
            }
            if (heart.x < -70) {
                if (heart.aura) heart.aura.destroy();
                heart.destroy();
            }
        });

        // --- 7. CAIXAS DE PIZZA + DETECÇÃO AABB NA BOCA DA CHAMINÉ ---
        this.pizzasGroup.getChildren().slice().forEach((pizza) => {
            let delivered = false;

            for (let i = 0; i < this.chimneysList.length; i++) {
                const chimney = this.chimneysList[i];
                if (!chimney.active || chimney.delivered) continue;

                const mouthX = chimney.x;
                const mouthY = chimney.y - chimney.displayHeight;

                // Funil generoso e preciso centrado exatamente na boca da chaminé
                if (
                    Math.abs(pizza.x - mouthX) <= 30 &&
                    pizza.y >= mouthY - 16 &&
                    pizza.y <= mouthY + 28
                ) {
                    this.handlePizzaChimneyDelivery(pizza, chimney);
                    delivered = true;
                    break;
                }
            }

            if (delivered) return;

            if (pizza.y >= this.groundY - 4) {
                this.snowPuffEmitter.explode(10, pizza.x, this.groundY - 4);
                soundFX.playMiss();
                if (this.combo > 0) {
                    this.combo = 0;
                    this.syncAllHUD();
                }
                pizza.destroy();
            } else if (pizza.x > this.W + 50 || pizza.x < -50) {
                pizza.destroy();
            }
        });
    }
}

/* =====================================================================
   7. INICIALIZAÇÃO DO PHASER 3 (420x740 RETRATO MOBILE-FIRST)
   ===================================================================== */

function runSplashIntro() {
    const overlay = document.getElementById('splash-overlay');
    const slide71 = document.getElementById('splash-71dev');
    const slideEco = document.getElementById('splash-ecocaixas');
    const slideLogo = document.getElementById('splash-logo');
    if (!overlay || !slide71 || !slideEco || !slideLogo) return;

    let finished = false;
    const timers = [];

    const finishSplash = () => {
        if (finished) return;
        finished = true;
        timers.forEach((t) => clearTimeout(t));
        overlay.classList.add('fade-out');
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 650);
    };

    // Permite pular a intro com um toque/clique
    overlay.addEventListener('pointerdown', finishSplash, { once: true });

    // 1) Logo 71dev + "Desenvolvido por"
    timers.push(setTimeout(() => {
        slide71.classList.add('animate');
    }, 250));

    // 2) Logo Ecocaixas
    timers.push(setTimeout(() => {
        slideEco.classList.add('animate');
    }, 3050));

    // 3) Logo do jogo (logo.png)
    timers.push(setTimeout(() => {
        slideLogo.classList.add('animate');
    }, 5850));

    // 4) Revela o menu inicial
    timers.push(setTimeout(finishSplash, 8650));
}

window.addEventListener('load', () => {
    runSplashIntro();

    const config = {
        type: Phaser.AUTO,
        parent: 'phaser-container',
        width: 420,
        height: 740,
        backgroundColor: '#0b1020',
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        scene: [NoelDeliveryScene]
    };

    new Phaser.Game(config);
});
