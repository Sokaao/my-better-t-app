import { gsap } from "gsap";

// Vidéo d'accroche v3 « Qui fait le lien entre tous vos outils ? » (voix du 03/11 : Julien, Nadia, Pierre ; phrase de la scène 13 et « votre espace » refaites le 05/11)
// Rythme slayte.io : un mot clé par écran, alternance clair / noir, objets d'interface qui jouent la scène.
// La voix (une seule prise ElevenLabs) est découpée en 18 phrases lues chacune à son repère ;
// certains silences sont allongés pour laisser l'image respirer. Fin : figé 5 s, noir 2 s, on reboucle.
// Module lancé par HomeClient ; la fonction renvoyée arrête la vidéo, coupe le son et défait les écouteurs.
export function initStory() {
	var SIG_AC = new AbortController(), SIG = SIG_AC.signal, dead = false, OBS = [], TIMERS = [];
	function IO(cb, o) { var x = new IntersectionObserver(cb, o); OBS.push(x); return x; }
	function later(f, ms) { var id = setTimeout(function () { if (!dead) f(); }, ms); TIMERS.push(id); return id; }
	function frame(f) { return requestAnimationFrame(function (t) { if (!dead) f(t); }); }

  var story = document.getElementById("story");
  if (!story || !story.classList.contains("vd")) return function () {};
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(s) { return story.querySelector(s); }
  function $$(s) { return Array.prototype.slice.call(story.querySelectorAll(s)); }
  var NS = "http://www.w3.org/2000/svg";
  var bar = document.getElementById("storyBar"), nf0 = new Intl.NumberFormat("fr-FR");
  function fmt(n) { return nf0.format(Math.round(n)).replace(/\s/g, " "); }
  var tl = null, W = 0, H = 0;

  // ---------- La voix : [début, fin] de chaque phrase dans le fichier, et silence ajouté avant ----------
  var G = [[0.05, 1.85], [2.37, 2.87], [3.50, 4.46], [4.92, 8.09], [8.54, 10.57], [10.94, 13.30], [13.77, 15.96], [16.38, 25.71], [26.10, 30.93], [31.35, 36.21], [36.51, 39.53], [40.02, 46.94], [47.24, 55.02], [55.47, 59.65], [59.89, 62.87], [63.54, 74.17], [74.62, 79.85], [80.25, 85.59]];
  var PRE = [0.6, 0.9, 0, 0, 0, 0.55, 0.45, 0.35, 0, 0, 0.25, 0.5, 0.35, 0.35, 0.25, 0, 0.35, 0.25];
  var VT = [];
  G.forEach(function (g, i) { VT[i] = i ? VT[i - 1] + (g[0] - G[i - 1][0]) + PRE[i] : PRE[0]; });
  // Temps du fichier audio → temps de la vidéo
  function T(a) { var i = G.length - 1; while (i > 0 && a < G[i][0] - 0.001) i--; return VT[i] + (a - G[i][0]); }
  var VGROUPS = G;

  // ---------- Mots révélés un à un ----------
  function splitWords(el) {
    Array.prototype.slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = document.createDocumentFragment();
        n.nodeValue.split(/(\s+)/).forEach(function (p) {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
          var s = document.createElement("span"); s.className = "w"; s.textContent = p; frag.appendChild(s);
        });
        el.replaceChild(frag, n);
      } else if (n.nodeType === 1) splitWords(n);
    });
  }
  $$("[data-w]").forEach(function (el) { if (el.dataset.split) return; el.dataset.split = "1"; splitWords(el); });

  // ---------- Textes tapés, compteurs et états (recalculés à chaque image : on peut se déplacer dans la vidéo) ----------
  var TY = {
    p1: { el: $("#ptxt1"), txt: "Qui fait le lien entre tous vos outils ?", n: 0 },
    ai: { el: $("#aiMsg"), txt: "Julien n'a pas répondu à votre devis depuis 3 jours. J'ai préparé une relance. Je l'envoie ?", n: 0 }
  };
  var CN = { cal: { el: $("#calD"), v: 15, f: function (v) { return String(Math.round(v)); } }, pay: { el: $("#payN"), v: 0, f: function (v) { return "+" + fmt(Math.round(v / 10) * 10) + " €"; } } };
  var ST = { tag8: 0 }, tag8 = $("#tag8"), last = {};

  // ---------- Son : musique et bruitages fabriqués dans le navigateur (Web Audio), calés sur la ligne de temps ----------
  // Rien ne joue sans clic du visiteur. Chaque son est programmé ~150 ms à l'avance pour tomber pile sur l'image.
  var A = { ctx: null, on: false, sched: -1, master: null, conv: null, bed: null, noise: null, voice: null, loading: false }, S = null, AUD = [];
  var DIST = (function () { var n = 1024, a = new Float32Array(n); for (var i = 0; i < n; i++) a[i] = Math.tanh(2.5 * (i * 2 / n - 1)); return a; })();
  var PENTA = [1567.98, 1760, 2093, 2349.32, 2637.02, 3135.96];
  function graph(c) {
    A.master = c.createGain(); A.master.gain.value = 0.75;
    var comp = c.createDynamicsCompressor(); comp.threshold.value = -16; comp.knee.value = 12; comp.ratio.value = 4; comp.attack.value = 0.004; comp.release.value = 0.25;
    A.master.connect(comp); comp.connect(c.destination);
    var len = Math.floor(c.sampleRate * 2.6), ir = c.createBuffer(2, len, c.sampleRate);
    for (var ch = 0; ch < 2; ch++) { var d = ir.getChannelData(ch); for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.8); }
    A.conv = c.createConvolver(); A.conv.buffer = ir; var rg = c.createGain(); rg.gain.value = 0.32; A.conv.connect(rg); A.bed = c.createGain(); A.bed.connect(A.master); rg.connect(A.bed); A.rev = rg;
    var nl = c.sampleRate * 2, nb = c.createBuffer(1, nl, c.sampleRate), nd = nb.getChannelData(0);
    for (var j = 0; j < nl; j++) nd[j] = Math.random() * 2 - 1;
    A.noise = nb;
  }
  // Une « session » par lecture : on la coupe d'un geste au redémarrage ou au changement de taille
  function newSession() {
    var c = A.ctx, t = c.currentTime;
    if (S) { var o = S; o.dry.gain.setTargetAtTime(0, t, 0.03); o.wet.gain.setTargetAtTime(0, t, 0.03); o.voice.gain.setTargetAtTime(0, t, 0.03); later(function () { try { o.dry.disconnect(); o.wet.disconnect(); o.voice.disconnect(); } catch (e) {} }, 400); }
    S = { dry: c.createGain(), wet: c.createGain(), voice: c.createGain() }; S.dry.connect(A.bed); S.wet.connect(A.conv); S.voice.gain.value = 0.95; S.voice.connect(A.master);
    A.bed.gain.cancelScheduledValues(t); A.bed.gain.setValueAtTime(0.9, t);
  }
  function out(n, d, wt) {
    var c = A.ctx;
    if (d) { var g = c.createGain(); g.gain.value = d; n.connect(g); g.connect(S.dry); }
    if (wt) { var h = c.createGain(); h.gain.value = wt; n.connect(h); h.connect(S.wet); }
  }
  function os(type, f, w, dur) { var o = A.ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, w); o.start(w); o.stop(w + dur); return o; }
  function nz(w, dur) { var s = A.ctx.createBufferSource(); s.buffer = A.noise; s.loop = true; s.start(w, (w * 0.37) % 1.5); s.stop(w + dur + 0.02); return s; }
  function perc(w, v, a, d) { var g = A.ctx.createGain(); g.gain.setValueAtTime(0.0001, w); g.gain.exponentialRampToValueAtTime(v, w + a); g.gain.exponentialRampToValueAtTime(0.0001, w + a + d); return g; }
  function filt(type, f, q) { var b = A.ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; if (q) b.Q.value = q; return b; }
  // Nappe : deux oscillateurs désaccordés par note, filtre passe-bas qui peut s'ouvrir
  function pad(fs, w, dur, o) {
    var c = A.ctx, v = o.vol, at = o.att, rl = o.rel;
    if (at + rl > dur) { var k = dur / (at + rl); at *= k; rl *= k; }
    var f = c.createBiquadFilter(); f.type = "lowpass"; f.Q.value = 0.6; f.frequency.setValueAtTime(o.cut, w);
    if (o.cut2) f.frequency.exponentialRampToValueAtTime(o.cut2, w + dur);
    var g = c.createGain(); g.gain.setValueAtTime(0, w); g.gain.linearRampToValueAtTime(v, w + at); g.gain.setValueAtTime(v, w + dur - rl); g.gain.linearRampToValueAtTime(0, w + dur);
    f.connect(g); out(g, 1, o.wet == null ? 0.5 : o.wet);
    fs.forEach(function (fr) { [-1, 1].forEach(function (s) { var x = os(o.type || "sawtooth", fr, w, dur + 0.05); x.detune.value = s * (o.det || 6); x.connect(f); }); });
  }
  function bass(f, w, dur, v) {
    var c = A.ctx, o = os("sine", f, w, dur + 0.05), o2 = os("triangle", f * 2, w, dur + 0.05), h = c.createGain(); h.gain.value = 0.22; o2.connect(h);
    var g = c.createGain(); g.gain.setValueAtTime(0, w); g.gain.linearRampToValueAtTime(v, w + 0.03); g.gain.setValueAtTime(v, Math.max(w + 0.03, w + dur - 0.15)); g.gain.linearRampToValueAtTime(0, w + dur);
    o.connect(g); h.connect(g); out(g, 1, 0);
  }
  function thump(w, v, f0, f1) { var o = os("sine", f0 || 95, w, 0.5); o.frequency.exponentialRampToValueAtTime(f1 || 42, w + 0.15); var g = perc(w, v, 0.005, 0.4); o.connect(g); out(g, 1, 0.06); }
  function pluck(f, w, v, dec) {
    dec = dec || 0.9; var g = perc(w, v, 0.004, dec); out(g, 1, 0.45);
    [[1, 1], [2, 0.25], [3, 0.08]].forEach(function (p) { var o = os("sine", f * p[0], w, dec + 0.05), h = A.ctx.createGain(); h.gain.value = p[1]; o.connect(h); h.connect(g); });
  }
  function bell(f, w, v, dec) {
    dec = dec || 2;
    [[1, 1, 1], [2.76, 0.45, 0.6], [5.4, 0.22, 0.4], [8.93, 0.1, 0.25]].forEach(function (p) { var o = os("sine", f * p[0], w, dec * p[2] + 0.05), g = perc(w, v * p[1], 0.003, dec * p[2]); o.connect(g); out(g, 1, 0.6); });
  }
  function shimmer(w, v) { for (var i = 0; i < 6; i++) bell(PENTA[(i * 7) % 6], w + i * 0.035, v * (1 - i * 0.12), 0.9); }
  function notif(w, f, v, r) { pluck(f, w, v, 0.35); pluck(f * (r || 1.335), w + 0.075, v * 0.85, 0.45); }
  function whoosh(w, dur, v, f0, f1, p0, p1) {
    var c = A.ctx, n = nz(w, dur), bp = filt("bandpass", f0, 0.8);
    bp.frequency.setValueAtTime(f0, w); bp.frequency.exponentialRampToValueAtTime(f1, w + dur);
    var g = c.createGain(); g.gain.setValueAtTime(0, w); g.gain.linearRampToValueAtTime(v, w + dur * 0.6); g.gain.linearRampToValueAtTime(0, w + dur);
    n.connect(bp); bp.connect(g);
    if (c.createStereoPanner) { var pn = c.createStereoPanner(); pn.pan.setValueAtTime(p0 == null ? 0.5 : p0, w); pn.pan.linearRampToValueAtTime(p1 == null ? -0.5 : p1, w + dur); g.connect(pn); out(pn, 1, 0.3); }
    else out(g, 1, 0.3);
  }
  function riser(w, dur, v) {
    var c = A.ctx, n = nz(w, dur), bp = filt("bandpass", 300, 1.4);
    bp.frequency.setValueAtTime(300, w); bp.frequency.exponentialRampToValueAtTime(6000, w + dur);
    var g = c.createGain(); g.gain.setValueAtTime(0.0001, w); g.gain.exponentialRampToValueAtTime(v, w + dur - 0.015); g.gain.linearRampToValueAtTime(0, w + dur);
    n.connect(bp); bp.connect(g); out(g, 1, 0.25);
    var o = os("sine", 160, w, dur + 0.02); o.frequency.exponentialRampToValueAtTime(880, w + dur);
    var g2 = c.createGain(); g2.gain.setValueAtTime(0.0001, w); g2.gain.exponentialRampToValueAtTime(v * 0.35, w + dur - 0.015); g2.gain.linearRampToValueAtTime(0, w + dur);
    o.connect(g2); out(g2, 1, 0.25);
  }
  function tick(w, v, f) {
    var n = nz(w, 0.03), hp = filt("highpass", 3000), g = perc(w, v, 0.001, 0.025); n.connect(hp); hp.connect(g); out(g, 1, 0.12);
    var o = os("sine", f || 1800, w, 0.07), g2 = perc(w, v * 0.5, 0.001, 0.05); o.connect(g2); out(g2, 1, 0.12);
  }
  function click(w, v) {
    var n = nz(w, 0.02), bp = filt("bandpass", 4200, 1.5), g = perc(w, v, 0.0008, 0.018); n.connect(bp); bp.connect(g); out(g, 1, 0.08);
    var o = os("sine", 1350, w, 0.04), g2 = perc(w, v * 0.4, 0.0008, 0.025); o.connect(g2); out(g2, 1, 0.08);
  }
  function shaker(w, v) { var n = nz(w, 0.06), hp = filt("highpass", 7000), g = perc(w, v, 0.004, 0.045); n.connect(hp); hp.connect(g); out(g, 1, 0.1); }
  function glide(w, dur, f0, f1, v) {
    var c = A.ctx, o = os("triangle", f0, w, dur + 0.35); o.frequency.exponentialRampToValueAtTime(f1, w + dur);
    var g = c.createGain(); g.gain.setValueAtTime(0, w); g.gain.linearRampToValueAtTime(v, w + 0.15); g.gain.setValueAtTime(v, w + dur); g.gain.linearRampToValueAtTime(0, w + dur + 0.3);
    var lp = filt("lowpass", 1200); o.connect(lp); lp.connect(g); out(g, 1, 0.5);
  }
  // La casse : craquement sec, corde qui fouette, impact grave saturé, grondement
  function snap(w) {
    var n = nz(w, 0.12), hp = filt("highpass", 1200), g = perc(w, 0.7, 0.001, 0.09); n.connect(hp); hp.connect(g); out(g, 1, 0.35);
    var s = os("sawtooth", 1100, w, 0.2); s.frequency.exponentialRampToValueAtTime(90, w + 0.16); var lp = filt("lowpass", 2500), g2 = perc(w, 0.18, 0.001, 0.16); s.connect(lp); lp.connect(g2); out(g2, 1, 0.3);
    var b = os("sine", 72, w, 1.6); b.frequency.exponentialRampToValueAtTime(30, w + 1.2); var ws = A.ctx.createWaveShaper(); ws.curve = DIST; var g3 = perc(w, 0.9, 0.004, 1.3); b.connect(ws); ws.connect(g3); out(g3, 1, 0.2);
    var r = nz(w, 1.6), lp2 = filt("lowpass", 180), g4 = perc(w, 0.5, 0.01, 1.4); r.connect(lp2); lp2.connect(g4); out(g4, 1, 0.3);
  }
  // Voix off : une seule prise ElevenLabs ; chaque phrase est lue à son repère (début et fin mesurés dans le fichier)
  var VL = VGROUPS;
  var VD = VL.map(function (l) { return l[1] - l[0]; });
  var VOICE_URL = "/audio/voix-kenzy-v5.mp3";
  // La voix n'est téléchargée qu'au premier clic sur « Activer le son »
  function fetchVoice(c) { return fetch(VOICE_URL).then(function (r) { if (!r.ok) throw new Error("voix " + r.status); return r.arrayBuffer(); }).then(function (b) { return new Promise(function (ok, ko) { c.decodeAudioData(b, ok, ko); }); }); }
  function voiceLine(i, w) {
    if (!A.voice) return;
    var c = A.ctx, a = Math.max(0, VL[i][0] - 0.06), d = VL[i][1] + 0.14 - a, s = c.createBufferSource(), g = c.createGain();
    s.buffer = A.voice;
    g.gain.setValueAtTime(0, w); g.gain.linearRampToValueAtTime(1, w + 0.02); g.gain.setValueAtTime(1, w + d - 0.06); g.gain.linearRampToValueAtTime(0, w + d);
    s.connect(g); g.connect(S.voice); s.start(w, a, d);
    // la musique et les bruitages s'effacent sous la voix (environ −8 dB), puis reviennent
    A.bed.gain.setTargetAtTime(0.36, Math.max(c.currentTime, w - 0.12), 0.05); A.bed.gain.setTargetAtTime(0.9, w + d + 0.05, 0.18);
  }
  // Programmation : à chaque image, on programme les sons des 150 ms à venir (en temps total, boucles comprises)
  function audioTick() {
    if (!A.on || !A.ctx || !S || !tl || !AUD.length) return;
    var tt = tl.totalTime(), D = tl.duration(), now = A.ctx.currentTime;
    if (A.sched < 0 || tt < A.sched - 0.3 || tt > A.sched + 0.6) A.sched = tt - 0.001;   // saut de lecture : on repart d'ici
    var to = tt + 0.15; if (to <= A.sched || !D) return;
    for (var k = Math.floor(A.sched / D); k <= Math.floor(to / D); k++) {
      for (var i = 0; i < AUD.length; i++) {
        var et = AUD[i].t + k * D;
        if (et > A.sched && et <= to) { try { AUD[i].f(Math.max(now, now + et - tt)); A.fired = (A.fired || 0) + 1; } catch (e) {} }
      }
    }
    A.sched = to;
  }
  function soundOn() {
    try {
      if (!A.ctx) { var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return; A.ctx = new AC(); graph(A.ctx); }
      A.ctx.resume();
    } catch (e) { return; }
    sBtn.classList.add("on"); sBtn.setAttribute("aria-pressed", "true");
    if (!A.voice && !A.voiceTried) {
      if (A.loading) return;
      A.loading = true; sLbl.textContent = "Chargement…";
      var done = function (b) { A.voice = b || null; A.voiceTried = true; A.loading = false; if (!dead && sBtn.classList.contains("on")) startSound(); };
      fetchVoice(A.ctx).then(done, function () { done(null); });
      return;
    }
    startSound();
  }
  function startSound() {
    var t = A.ctx.currentTime;
    A.on = true; A.sched = -1; newSession();
    A.master.gain.cancelScheduledValues(t); A.master.gain.setValueAtTime(0.75, t);
    A.rev.gain.cancelScheduledValues(t); A.rev.gain.setValueAtTime(0.32, t);
    sLbl.textContent = "Couper le son";
    if (tl) tl.restart();   // le son raconte une histoire : on la reprend depuis le début
  }
  function soundOff() {
    A.on = false;
    if (A.ctx) A.master.gain.setTargetAtTime(0, A.ctx.currentTime, 0.04);
    sBtn.classList.remove("on"); sBtn.setAttribute("aria-pressed", "false"); sLbl.textContent = "Activer le son";
  }
  var sBtn = $("#fSound"), sLbl = $("#fSoundL");
  if (reduce) sBtn.hidden = true;
  sBtn.addEventListener("click", function () { if (A.on || A.loading) soundOff(); else soundOn(); }, { signal: SIG });
  document.addEventListener("visibilitychange", function () { if (!A.ctx) return; if (document.hidden) A.ctx.suspend(); else if (A.on) A.ctx.resume(); }, { signal: SIG });
  // Pour les tests : rendu hors ligne d'une boucle complète, avec niveaux par tranche de 0,5 s
  story.__audio = A;
  story.__renderAudio = function () {
    var OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext; if (!OAC || !tl) return Promise.resolve(null);
    var D = tl.duration(), oc = new OAC(2, Math.ceil(44100 * D), 44100);
    return new Promise(function (ok) { fetchVoice(oc).then(ok, function () { ok(null); }); }).then(function (vb) {
      var keep = { ctx: A.ctx, master: A.master, conv: A.conv, rev: A.rev, bed: A.bed, noise: A.noise, S: S, voice: A.voice };
      A.ctx = oc; graph(oc); S = null; newSession(); A.voice = vb;
      AUD.forEach(function (e) { e.f(e.t); });
      var res = oc.startRendering();
      A.ctx = keep.ctx; A.master = keep.master; A.conv = keep.conv; A.rev = keep.rev; A.bed = keep.bed; A.noise = keep.noise; S = keep.S; A.voice = keep.voice;
      return res;
    }).then(function (buf) {
      var L = buf.getChannelData(0), Rr = buf.getChannelData(1), win = 4410, rows = [], peak = 0;
      for (var s = 0; s < L.length; s += win) {
        var pk = 0, sq = 0, n = Math.min(win, L.length - s);
        for (var i = s; i < s + n; i++) { var a = Math.max(Math.abs(L[i]), Math.abs(Rr[i])); if (a > pk) pk = a; sq += (L[i] * L[i] + Rr[i] * Rr[i]) / 2; }
        if (pk > peak) peak = pk;
        rows.push([+(s / 44100).toFixed(1), +(20 * Math.log10(pk + 1e-9)).toFixed(1), +(10 * Math.log10(sq / n + 1e-12)).toFixed(1)]);
      }
      return { dur: D, peakDb: +(20 * Math.log10(peak + 1e-9)).toFixed(2), rows: rows };
    });
  };

  function render() {
    var k;
    for (k in TY) { var o = TY[k], s = o.txt.slice(0, Math.round(o.n)); if (last[k] !== s) { last[k] = s; o.el.textContent = s; } }
    for (k in CN) { var q = CN[k], v = q.f(q.v); if (last[k] !== v) { last[k] = v; q.el.textContent = v; } }
    var t8 = ST.tag8 > 0.5;
    if (last.t8 !== t8) { last.t8 = t8; tag8.textContent = t8 ? "Devis envoyé" : "Nouveau"; tag8.className = "v-chip" + (t8 ? " warn" : ""); }
    if (A.on) audioTick();
    if (tl) bar.style.width = (tl.progress() * 100).toFixed(2) + "%";
  }

  // Lignes du moyeu et de l'orbite : du centre vers chaque tuile (coordonnées en %)
  function lines(svgSel, itemSel) {
    var svg = $(svgSel); if (!svg || svg.childNodes.length) return;
    $$(itemSel).forEach(function (it) {
      var cs = getComputedStyle(it), x = parseFloat(cs.getPropertyValue("--x")), y = parseFloat(cs.getPropertyValue("--y"));
      var l = document.createElementNS(NS, "line"); l.dataset.x = x; l.dataset.y = y; l.setAttribute("pathLength", "1");
      svg.appendChild(l);
    });
  }
  // Chaque tuile est posée sur un point d'ancrage ; son contenu est centré dessus en CSS
  $$(".v-tile, .v-ochip").forEach(function (t) { if (t.children.length === 1 && t.firstElementChild.classList.contains("v-in")) return; var inr = document.createElement("span"); inr.className = "v-in"; while (t.firstChild) inr.appendChild(t.firstChild); t.appendChild(inr); });
  lines("#spokes", "#hub .v-tile"); lines("#olines", "#orbit .v-ochip");
  // Les traits sont recalculés en pixels à chaque construction : épaisseur nette, et tracé progressif fiable
  function fitSvg(svg) {
    if (!svg) return;
    var w = svg.parentNode.offsetWidth, h = svg.parentNode.offsetHeight; if (!w || !h) return;
    svg.setAttribute("viewBox", "0 0 " + w + " " + h); svg.removeAttribute("preserveAspectRatio");
    Array.prototype.forEach.call(svg.querySelectorAll("line"), function (l) { l.setAttribute("x1", w / 2); l.setAttribute("y1", h / 2); l.setAttribute("x2", l.dataset.x / 100 * w); l.setAttribute("y2", l.dataset.y / 100 * h); });
    Array.prototype.forEach.call(svg.querySelectorAll("path"), function (p) {
      var d0 = p.dataset.d || p.getAttribute("d"); p.dataset.d = d0;
      p.setAttribute("d", d0.replace(/([\d.]+) ([\d.]+)/g, function (m, a, b) { return (a * w / 100).toFixed(1) + " " + (b * h / 100).toFixed(1); }));
    });
  }

  function fitTeam() {
    var box = $("#s7b .v-teamfiche"), svg = box && box.querySelector(".v-tlines");
    if (!svg) return;
    var w = box.offsetWidth, h = box.offsetHeight; if (!w || !h) return;
    var fc = box.querySelector(".v-fc"), iw = fc.offsetWidth * 0.12, ih = fc.offsetHeight * 0.25, gap = Math.max(4, w * 0.012);
    var cl = fc.offsetLeft, ct = fc.offsetTop, cr = cl + fc.offsetWidth, cb = ct + fc.offsetHeight;
    var paths = svg.querySelectorAll("path");
    [".t1", ".t2", ".t3"].forEach(function (q, i) {
      var a = box.querySelector(q), p = paths[i]; if (!a || !p) return;
      var r = a.offsetWidth / 2, cx = a.offsetLeft + r, cy = a.offsetTop + r;
      // avatar à gauche ou à droite de la fiche : vers son bord ; au-dessus ou en dessous : vers le haut ou le bas
      var ex, ey;
      if (cx < cl || cx > cr) { ex = cx < cl ? cl : cr; ey = Math.min(cb - ih, Math.max(ct + ih, cy)); }
      else { ex = Math.min(cr - iw, Math.max(cl + iw, cx)); ey = cy < ct ? ct : cb; }
      var dx = ex - cx, dy = ey - cy, L = Math.hypot(dx, dy) || 1, k = (r + gap) / L;
      p.setAttribute("d", "M" + (cx + dx * k).toFixed(1) + " " + (cy + dy * k).toFixed(1) + " L" + ex.toFixed(1) + " " + ey.toFixed(1));
    });
  }

  function build() {
    if (tl) { tl.kill(); tl = null; }
    W = story.offsetWidth; H = story.offsetHeight; if (!W || !H) return;
    var M = W < 600, X = Math.round(W * 0.12);
    var CLR = "transform,opacity,visibility,filter,clipPath,strokeDashoffset,display";
    // On ne remet pas à zéro les transformations des éléments SVG intérieurs (GSAP y fige l'origine) : seulement leur tracé
    var CAND = $$(".vstage *").filter(function (e) { return !e.ownerSVGElement; }).concat($$(".vbg"), [$("#vRed"), $("#vBlack")]);
    var DRAWN = $$("#spokes line, #olines line, .v-tlines path, #sig10, #ring14, #arr14");
    // Seuls les éléments animés par la construction précédente portent des styles à effacer (aucun au premier passage).
    // Effacer les 900 éléments de la scène un par un bloquait la page plusieurs secondes sur mobile.
    var RESET = story.__anim || [];
    if (RESET.length) gsap.set(RESET, { clearProps: CLR });
    gsap.set(DRAWN, { strokeDashoffset: 1 });
    fitSvg($("#spokes")); fitSvg($("#olines")); fitSvg($(".v-tlines")); fitTeam();
    last = {};
    function rr(el) { var s = story.getBoundingClientRect(), r = el.getBoundingClientRect(), k = s.width / W; return { x: (r.left - s.left) / k, y: (r.top - s.top) / k, w: r.width / k, h: r.height / k }; }
    // Position du clic sur « Valider », dans le repère de la carte de l'assistant
    var aiR = rr($("#ai9")), okR = rr($("#aiOk")), cw = rr($("#cur9")).w;
    var ckx = okR.x - aiR.x + okR.w * 0.55 - cw * 5 / 32, cky = okR.y - aiR.y + okR.h * 0.62 - cw * 3 / 32;

    // Les scènes sont montées dans une timeline intérieure ; la boucle (plus bas) la rejoue
    // après avoir remis à zéro les seuls éléments qu'elle anime.
    tl = gsap.timeline();
    tl.set(DRAWN, { strokeDashoffset: 1 }, 0)
      .set([TY.p1, TY.ai], { n: 0 }, 0).set(CN.cal, { v: 15 }, 0).set(CN.pay, { v: 0 }, 0).set(ST, { tag8: 0 }, 0)
      .set("#prompt1", { xPercent: -50, yPercent: -50 }, 0)
      .set($$(".v-dr"), { "--hl": 0 }, 0);
    var HIDE = [];
    function hid() { for (var i = 0; i < arguments.length; i++) HIDE.push.apply(HIDE, [].concat(arguments[i])); }

    // ---------- Outils de mise en scène ----------
    function show(el, t) { tl.set(el, { autoAlpha: 1 }, t); }
    function hide(el, t) { tl.set(el, { autoAlpha: 0 }, t); }
    function inR(el, t, d) { show(el, t); tl.fromTo(el, { x: X, filter: "blur(10px)" }, { x: 0, filter: "blur(0px)", duration: d || 0.5, ease: "power4.out", immediateRender: false }, t); }
    function inL(el, t) { show(el, t); tl.fromTo(el, { x: -X, filter: "blur(10px)" }, { x: 0, filter: "blur(0px)", duration: 0.5, ease: "power4.out", immediateRender: false }, t); }
    function outL(el, t) { tl.to(el, { x: -X, filter: "blur(10px)", opacity: 0, duration: 0.3, ease: "power3.in" }, t - 0.3); hide(el, t); }
    function inZ(el, t, s, d) { show(el, t); tl.fromTo(el, { scale: s || 1.25, filter: "blur(12px)" }, { scale: 1, filter: "blur(0px)", duration: d || 0.6, ease: "expo.out", immediateRender: false }, t); }
    function outZ(el, t) { tl.to(el, { scale: 1.15, filter: "blur(10px)", opacity: 0, duration: 0.25, ease: "power3.in" }, t - 0.25); hide(el, t); }
    function pop(el, t, o) {
      o = o || {}; hid(el);
      tl.fromTo(el, { autoAlpha: 0, scale: o.s || 0.82, y: o.y || 0, rotation: o.r0 || 0 }, { autoAlpha: 1, scale: 1, y: 0, rotation: o.r || 0, duration: o.d || 0.5, ease: o.e || "back.out(1.7)", immediateRender: false }, t);
    }
    function words(el, t, span) {
      var ws = el.querySelectorAll(".w"), n = ws.length, st = span ? Math.min(0.13, span / Math.max(1, n)) : 0.06;
      Array.prototype.forEach.call(ws, function (w, i) {
        tl.fromTo(w, { opacity: 0, y: "0.3em", filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power3.out", immediateRender: false }, t + i * st);
      });
    }
    function capOut(el, t) { tl.to(el.querySelectorAll(".w"), { x: -X * 0.45, opacity: 0, filter: "blur(8px)", duration: 0.28, ease: "power3.in", stagger: 0.012 }, t - 0.3); }
    function bg(name, t, d) {
      d = d || 0.22;
      tl.to("#bgL", { opacity: name === "light" ? 1 : 0, duration: d, ease: "power2.inOut" }, t)
        .to("#bgD", { opacity: name === "dark" ? 1 : 0, duration: d, ease: "power2.inOut" }, t)
        .to("#bgO", { opacity: name === "orange" ? 1 : 0, duration: d, ease: "power2.inOut" }, t);
    }
    function push(el, t0, t1, s) { tl.fromTo(el, { scale: 1 }, { scale: s || 1.04, duration: Math.max(0.2, t1 - t0), ease: "sine.inOut", immediateRender: false }, t0); }

    // ===== 1. La question tapée, puis les outils éparpillés (fond clair) =====
    // Fondu depuis le noir : seulement quand la vidéo reboucle (onRepeat plus bas). Au premier affichage,
    // le cadre est clair d'emblée (sinon un carré noir précède la vidéo sur les téléphones lents).
    show("#s1", 0.05);
    pop("#prompt1", 0.15, { s: 0.92, e: "expo.out", d: 0.6 });
    hid("#caret1"); show("#caret1", T(0.05) - 0.05); hide("#caret1", T(1.85) + 0.35);
    tl.to(TY.p1, { n: TY.p1.txt.length, duration: T(1.78) - T(0.05), ease: "none" }, T(0.05));
    tl.fromTo("#psend1", { scale: 1 }, { scale: 0.82, duration: 0.08, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, T(1.90));
    tl.to("#prompt1", { y: -H * (M ? 0.24 : 0.2), duration: 0.7, ease: "power3.inOut" }, T(1.97));
    var WR = [-6, 4, -3, 5, -4], tw0 = T(2.07), twD = (VT[1] - 0.3 - tw0) / 5;
    $$("#s1 .v-win").forEach(function (w, i) { pop(w, tw0 + i * twD, { y: 24, s: 0.85, r0: WR[i] * 2, r: WR[i] }); });

    // ===== 2. « Vous. » (noir) =====
    tl.to("#s1", { scale: 1.08, filter: "blur(10px)", opacity: 0, duration: 0.2, ease: "power3.in" }, VT[1] - 0.2); hide("#s1", VT[1]);
    bg("dark", VT[1] - 0.12, 0.14);
    show("#s2", VT[1]); inZ("#vous", VT[1] - 0.02, 1.6, 0.55);
    $$("#team .av").forEach(function (a, i) { pop(a, T(3.50) + i * 0.08, { s: 0.5 }); });
    words($("#team-t"), T(3.54), 0.8);
    push("#s2", VT[1] + 0.6, T(4.90), 1.05);

    // ===== 3. Recopier, relancer, vérifier (clair) =====
    outL("#s2", T(4.90)); bg("light", T(4.80), 0.22);
    show("#s3", T(4.90)); words($("#s3a"), T(4.92), 0.7);
    var tv = [T(5.69), T(6.54), T(7.47)];
    hid("#vg1", "#vg2", "#vg3");
    words($("#vb1"), tv[0], 0.45); inR("#vg1", tv[0]); pop("#ghost", tv[0] + 0.35, { s: 0.6 });
    tl.fromTo("#ghost", { x: -W * 0.16 }, { x: 0, duration: 0.5, ease: "power3.out", immediateRender: false }, tv[0] + 0.35);
    capOut($("#vb1"), tv[1]); outL("#vg1", tv[1]); words($("#vb2"), tv[1], 0.45); show("#vg2", tv[1]);
    tl.fromTo("#vg2 .v-notif", { y: -H * 0.12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "back.out(1.6)", immediateRender: false }, tv[1]);
    capOut($("#vb2"), tv[2]); outL("#vg2", tv[2]); words($("#vb3"), tv[2], 0.45); show("#vg3", tv[2]);
    $$("#vg3 > *").forEach(function (e, i) { pop(e, tv[2] + 0.05 + i * 0.14, { s: 0.7 }); });

    // ===== 4. Un oubli, et le client signe ailleurs (noir) =====
    outL("#s3", T(8.52)); bg("dark", T(8.44), 0.2);
    show("#s4", T(8.52)); words($("#s4a"), T(8.54), 0.45);
    pop("#ag4", T(8.58), { y: 16 }); pop("#cl4", T(8.70), { y: 16 });
    tl.fromTo("#strike4", { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: "power2.out", immediateRender: false }, T(8.80));
    tl.to("#ag4", { opacity: 0.4, filter: "grayscale(1)", duration: 0.4 }, T(9.10));
    words($("#s4b"), T(9.59), 0.8);
    tl.to("#cl4", { x: W * 0.22, filter: "blur(8px)", opacity: 0, duration: 0.7, ease: "power2.in" }, T(10.20));
    hid("#loss4"); inZ("#loss4", T(10.55), 1.35, 0.5);
    tl.to("#vRed", { opacity: 1, duration: 0.1 }, T(10.55)).to("#vRed", { opacity: 0.45, duration: 0.6 }, T(10.65)).to("#vRed", { opacity: 0, duration: 0.5 }, VT[5] - 0.4);
    tl.to("#s4", { keyframes: { x: [0, -10, 8, -5, 3, 0] }, duration: 0.35, ease: "none" }, T(10.55));

    // ===== 5. Arrêtez de faire le facteur (noir, le titre de la page en pilule) =====
    outL("#s4", VT[5]);
    show("#s5", VT[5]); words($("#s5a"), T(10.94), 1.0);
    hid("#s5b"); inZ("#s5b", T(12.53), 1.3, 0.6);
    push("#s5", T(12.70), VT[6] - 0.3, 1.05);

    // ===== 6. Et si vos outils se parlaient ? (noir, puis l'étincelle ouvre la lumière) =====
    outL("#s5", VT[6]);
    show("#s6", VT[6]); words($("#s6a"), T(13.77), 0.7); words($("#s6b"), T(15.00), 0.8);
    var tSp = T(15.96);
    hid("#spark"); pop("#spark", tSp - 0.1, { s: 0.1, e: "expo.out", d: 0.4 });
    tl.set("#bgL", { opacity: 1, clipPath: "circle(0% at 50% 74%)" }, tSp + 0.15)
      .to("#bgL", { clipPath: "circle(150% at 50% 74%)", duration: 0.55, ease: "power3.in" }, tSp + 0.15)
      .set("#bgD", { opacity: 0 }, tSp + 0.72);
    outZ("#s6", VT[7] - 0.02);

    // ===== 7. Votre propre espace (clair) =====
    inZ("#s7", VT[7] - 0.02, 0.86, 0.6);
    pop("#disc", T(16.45), { s: 0.5 });
    words($("#c7a"), T(17.63), 1.2);
    $$("#spokes line").forEach(function (l, i) { tl.to(l, { strokeDashoffset: 0, duration: 0.35, ease: "power2.out" }, T(18.0) + i * 0.15); });
    $$("#hub .v-tile").forEach(function (e, i) { pop(e, T(18.0) + i * 0.15 + 0.22, { s: 0.6 }); });
    tl.to("#disc", { keyframes: { scale: [1, 1.12, 1] }, duration: 0.5, ease: "power2.out" }, T(18.87));
    capOut($("#c7a"), T(19.42)); words($("#c7a2"), T(19.42), 1.4);
    capOut($("#c7a2"), T(22.35)); words($("#c7b"), T(22.35), 1.2);
    outZ("#s7", T(24.2));
    inZ("#s7b", T(24.2), 0.82, 0.6); words($("#c7c"), T(24.3), 1.0);
    pop("#s7b .v-fc", T(24.4), { y: 14 });
    $$("#s7b .v-teamfiche > .av").forEach(function (a, i) { pop(a, T(24.55) + i * 0.12, { s: 0.5 }); });
    $$("#s7b .v-tlines path").forEach(function (p, i) { tl.to(p, { strokeDashoffset: 0, duration: 0.35, ease: "power2.out" }, T(24.8) + i * 0.1); });
    pop("#s7b .v-fc .v-chip", T(25.35), { s: 0.6 });

    // ===== 8. Prenons Julien (clair) =====
    outL("#s7b", T(26.08));
    inR("#s8", T(26.08)); words($("#c8a"), T(26.10), 1.0);
    hid("#mail8", "#fiche8"); hid($$("#fiche8 .v-fr"));
    capOut($("#c8a"), T(27.72)); words($("#c8b"), T(27.72), 1.4);
    inL("#mail8", T(27.76));
    pop("#fiche8", T(29.11), { y: 18, s: 0.9 });
    tl.to("#mail8", { opacity: 0.4, scale: 0.94, duration: 0.4 }, T(29.26));
    var frs = $$("#fiche8 .v-fr");
    pop(frs[0], T(29.26), { y: 8, s: 0.96 }); pop(frs[1], T(29.41), { y: 8, s: 0.96 });
    capOut($("#c8b"), T(30.13)); words($("#c8c"), T(30.13), 0.5);
    pop(frs[2], T(30.21), { y: 8, s: 0.96 });
    tl.fromTo("#devis8", { x: -40 }, { x: 0, duration: 0.5, ease: "power3.out", immediateRender: false }, T(30.21));
    tl.set(ST, { tag8: 1 }, T(30.56)).fromTo("#tag8", { scale: 1.25 }, { scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, T(30.56));

    // ===== 9. Trois jours plus tard, l'assistant, vous validez (clair) =====
    outL("#s8", T(31.33));
    show("#s9", T(31.33)); words($("#c9a"), T(31.35), 1.6);
    hid("#ai9", "#cal3", "#cur9");
    inR("#cal9", T(31.35));
    tl.to(CN.cal, { v: 18, duration: 0.75, ease: "none" }, T(31.44));
    tl.fromTo("#calD", { y: -8 }, { y: 0, duration: 0.18, repeat: 2, ease: "power2.out", immediateRender: false }, T(31.44));
    pop("#cal3", T(32.78), { s: 0.7 });
    capOut($("#c9a"), T(33.90)); words($("#c9b"), T(33.90), 0.9);
    outL("#cal9", T(33.89)); inR("#ai9", T(33.89));
    tl.to(TY.ai, { n: TY.ai.txt.length, duration: T(35.16) - T(34.03), ease: "none" }, T(34.03));
    capOut($("#c9b"), T(35.40)); words($("#c9c"), T(35.40), 0.6);
    tl.set("#cur9", { autoAlpha: 1, x: ckx + W * 0.1, y: cky + H * 0.16 }, T(34.96))
      .to("#cur9", { x: ckx, y: cky, duration: 0.6, ease: "power3.out" }, T(34.96));
    var tClick = T(35.94);
    tl.to("#cur9", { scale: 0.85, duration: 0.08 }, tClick).to("#cur9", { scale: 1, duration: 0.2 }, tClick + 0.08)
      .to("#aiOk", { scale: 0.9, duration: 0.08 }, tClick).to("#aiOk", { scale: 1, duration: 0.2 }, tClick + 0.08)
      .set("#aiBtn", { display: "none" }, tClick + 0.18).set("#aiDone", { display: "flex" }, tClick + 0.18)
      .to("#cur9", { opacity: 0, duration: 0.25 }, tClick + 0.45);

    // ===== 10. Au final, il signe, la facture suit, il paie (noir) =====
    outL("#s9", VT[10] - 0.02); bg("dark", VT[10] - 0.1, 0.2);
    show("#s10", VT[10] - 0.02);
    hid("#inv10", "#pay10", $$("#pay10 .v-chip"));
    inR("#ct10", VT[10]);
    words($("#c10a"), T(37.10), 0.5);
    tl.to("#sig10", { strokeDashoffset: 0, duration: 0.6, ease: "power1.inOut" }, T(37.41));
    capOut($("#c10a"), T(37.94)); words($("#c10b"), T(37.94), 0.5); outL("#ct10", T(37.94)); inR("#inv10", T(37.94));
    capOut($("#c10b"), T(39.14)); words($("#c10c"), T(39.14), 0.3); outL("#inv10", T(39.14));
    inZ("#pay10", T(39.14), 1.3, 0.55);
    tl.to(CN.pay, { v: 2340, duration: 0.9, ease: "power3.out" }, T(39.19));
    pop($$("#pay10 .v-chip"), T(39.71), { s: 0.6 });

    // ===== 10b. Nadia, organisme de formation (clair) =====
    outL("#s10", VT[11]); bg("light", VT[11] - 0.1, 0.22);
    show("#s10b", VT[11]); words($("#c10ba"), T(40.02), 1.5);
    var prt = $$("#form10b .v-part li"), frb = $$("#fiche10b .v-fr");
    hid("#form10b", "#fiche10b", "#tag10b2", prt, frb);
    inL("#form10b", T(40.41));
    prt.forEach(function (p, i) { pop(p, T(40.71) + i * 0.14, { y: 8, s: 0.9 }); });
    capOut($("#c10ba"), T(42.28)); words($("#c10bb"), T(42.28), 0.9);
    tl.to(prt, { keyframes: { scale: [1, 1.08, 1] }, duration: 0.4, ease: "power2.out", stagger: 0.1 }, T(42.95));
    pop("#fiche10b", T(43.81), { y: 18, s: 0.9 });
    tl.to("#form10b", { opacity: 0.4, scale: 0.94, duration: 0.4 }, T(43.96));
    pop(frb[0], T(44.10), { y: 8, s: 0.96 }); pop(frb[1], T(44.96), { y: 8, s: 0.96 }); pop(frb[2], T(46.14), { y: 8, s: 0.96 });
    hide("#tag10b", T(46.71)); pop("#tag10b2", T(46.71), { s: 1.3, e: "back.out(2)", d: 0.4 });

    // ===== 10c. Pierre, la panne du dimanche soir (noir) =====
    outL("#s10b", VT[12]); bg("dark", VT[12] - 0.1, 0.22);
    show("#s10c", VT[12]); words($("#c10ca"), T(47.24), 1.4);
    hid("#chat10c", "#bout10c", "#stamp10c");
    push("#s10c", VT[12] + 0.5, VT[13] - 0.3, 1.03);
    capOut($("#c10ca"), T(49.55)); words($("#c10cb"), T(49.55), 1.3);
    inR("#chat10c", T(50.01));
    capOut($("#c10cb"), T(51.73)); words($("#c10cc"), T(51.73), 0.8);
    pop("#bout10c", T(52.01), { y: 14, s: 0.94 });
    tl.to("#slotA", { scale: 1.1, duration: 0.12, ease: "power2.out" }, T(53.11)).to("#slotA", { scale: 1, duration: 0.25, ease: "power2.out" }, T(53.23))
      .to("#slotA b", { opacity: 1, duration: 0.15 }, T(53.11))
      .to("#slotB", { opacity: 0.35, duration: 0.3 }, T(53.21));
    pop("#stamp10c", T(54.26), { s: 0.7, e: "back.out(1.8)" });

    // ===== 10d. Trois métiers (clair) =====
    outL("#s10c", VT[13]); bg("light", VT[13] - 0.1, 0.22);
    show("#s10d", VT[13]); words($("#c10da"), T(55.47), 0.4);
    var tcs = $$("#trio .v-tcard");
    tcs.forEach(function (c, i) { pop(c, T(55.51) + i * 0.12, { y: 18, s: 0.9 }); });
    [[56.41, 0.5], [57.46, 0.6], [58.75, 0.5]].forEach(function (q, i) {
      words($("#tr" + (i + 1)), T(q[0]), q[1]);
      tl.to(tcs[i], { keyframes: { scale: [1, 1.07, 1] }, duration: 0.45, ease: "power2.out" }, T(q[0]));
    });

    // ===== 11. Je relie les outils que vous avez déjà (clair) =====
    outZ("#s10d", VT[14]);
    inZ("#s11b", VT[14], 0.86, 0.6);
    hid(".v-odisc"); pop(".v-odisc", T(59.89), { s: 0.5 });
    $$("#orbit .v-ochip").forEach(function (c, i) { pop(c, T(60.1) + i * 0.11, { s: 0.55 }); });
    words($("#c11b"), T(59.89), 1.2);
    $$("#olines line").forEach(function (l, i) { tl.to(l, { strokeDashoffset: 0, duration: 0.35, ease: "power2.out" }, T(60.4) + i * 0.1); });
    capOut($("#c11b"), T(61.82)); words($("#c11c"), T(61.82), 0.7);
    $$("#orbit .v-ochip").forEach(function (c, i) { tl.to(c, { keyframes: { scale: [1, 1.1, 1] }, duration: 0.4, ease: "power2.out" }, T(62.3) + i * 0.06); });

    // ===== 12. Votre espace : vos outils, les automatisations qui les relient, puis ce qui bloque (clair) =====
    outL("#s11b", VT[15]);
    show("#s12", VT[15]); words($("#c12a"), T(63.54), 0.6); inR("#dash12", T(63.6));
    hid("#dash12 .v-tool", "#dash12 .v-auto", "#dash12 .v-dr", "#dash12 .v-ok");
    capOut($("#c12a"), T(64.62)); words($("#c12b"), T(64.62), 0.9);
    $$("#dash12 .v-tool").forEach(function (e, i) { pop(e, T(64.75) + i * 0.1, { s: 0.6 }); });
    $$("#dash12 .v-ok").forEach(function (e, i) { pop(e, T(65.45) + i * 0.07, { s: 0.2 }); });
    capOut($("#c12b"), T(66.23)); words($("#c12c"), T(66.23), 1.1);
    $$("#dash12 .v-auto").forEach(function (e, i) { inR(e, T(66.3) + i * 0.14); });
    $$("#dash12 .v-sw").forEach(function (e, i) { tl.to(e, { "--on": 1, duration: 0.3, ease: "power2.out" }, T(66.9) + i * 0.3); });
    capOut($("#c12c"), T(68.44)); words($("#c12f"), T(68.44), 1.0);
    $$("#dash12 .v-dr").forEach(function (e, i) { inR(e, T(68.5) + i * 0.12); });
    tl.fromTo("#dash12", { scale: 1, transformOrigin: "50% 85%" }, { scale: 1.06, duration: 1.6, ease: "power2.inOut", immediateRender: false }, T(68.9));
    tl.to("#dr1", { "--hl": 1, duration: 0.3 }, T(69.5)).to("#dr2", { "--hl": 1, duration: 0.3 }, T(70.0));
    capOut($("#c12f"), T(70.51)); words($("#c12g"), T(70.51), 0.9);
    outL("#s12", T(72.16));
    show("#s12b", T(72.16)); words($("#c12d"), T(72.18), 0.5);
    hid("#pnote");
    tl.fromTo("#phone", { y: H * 0.35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power4.out", immediateRender: false }, T(72.22));
    capOut($("#c12d"), T(73.01)); words($("#c12e"), T(73.01), 0.8);
    pop("#pnote", T(73.09), { y: -30, s: 0.94 });

    // ===== 13. Vos outils font le lien entre eux ; vous, le lien avec vos clients (noir, réponse à la question du début) =====
    outL("#s12b", VT[16] - 0.02); bg("dark", VT[16] - 0.1, 0.22);
    show("#s13", VT[16] - 0.02); pop("#prompt13", VT[16] + 0.02, { s: 0.92, e: "expo.out", d: 0.5 });
    words($("#c13a"), T(74.62), 0.5); words($("#c13b"), T(75.46), 1.3);
    words($("#c13c1"), T(77.63), 0.25); words($("#c13c2"), T(78.87), 0.7);
    push("#s13", T(75.04), VT[17] - 0.3, 1.04);

    // ===== 14. Frédéric (orange) =====
    outZ("#s13", VT[17]); bg("orange", VT[17] - 0.15, 0.3);
    inZ("#s14", VT[17], 0.86, 0.6);
    tl.to("#ring14", { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, T(80.28));
    pop("#fPh", T(80.31), { s: 0.9, e: "power4.out" });
    words($("#c14a"), T(80.24), 0.8);
    pop("#cta14", T(82.25), { s: 0.7 });
    words($("#c14b"), T(83.46), 1.6);
    hid("#arrW"); show("#arrW", T(85.11)); tl.to("#arr14", { strokeDashoffset: 0, duration: 0.45, ease: "power2.out" }, T(85.11));

    var FROZEN = T(85.59) + 0.7, BLACK = FROZEN + 5, END = BLACK + 0.4 + 2;
    tl.to("#vBlack", { opacity: 1, duration: 0.4, ease: "power2.in" }, BLACK);
    tl.set({}, {}, END);
    tl.set(HIDE, { autoAlpha: 0 }, 0);

    // La boucle : remise à zéro des éléments animés (et d'eux seuls), puis les scènes
    var scenes = tl, used = new Set();
    scenes.getChildren(true, true, false).forEach(function (tw) { tw.targets().forEach(function (e) { used.add(e); }); });
    var ANIM = CAND.filter(function (e) { return used.has(e) && e.id !== "vBlack"; });
    story.__anim = ANIM;
    tl = gsap.timeline({ repeat: -1, onUpdate: render, onRepeat: function () { gsap.fromTo("#vBlack", { opacity: 1 }, { opacity: 0, duration: 0.45, ease: "power2.out" }); } });
    tl.set(ANIM, { clearProps: CLR }, 0).add(scenes, 0);

    // ---------- Partition : voix, musique et bruitages ----------
    AUD = [];
    function E(t, f) { AUD.push({ t: t, f: f }); }
    G.forEach(function (g, i) { E(VT[i], function (w) { voiceLine(i, w); }); });
    var tSpark = tSp, tLight = VT[7], tFred = VT[17];
    E(0.1, function (w) { pad([110, 164.81, 220], w, tSpark - 0.1, { type: "triangle", vol: 0.04, cut: 700, cut2: 1300, att: 1.2, rel: 0.3, wet: 0.45 }); });
    E(VT[1] - 0.05, function (w) { pad([55, 82.41], w, tSpark - VT[1], { type: "triangle", vol: 0.05, cut: 300, att: 0.05, rel: 0.4, wet: 0.3 }); });
    E(tSpark + 0.1, function (w) { pad([261.63, 329.63, 392, 523.25], w, FROZEN + 3 - tSpark, { type: "triangle", vol: 0.035, cut: 900, cut2: 2600, att: 1.4, rel: 2.4, wet: 0.6 }); });
    var bt = 60 / 110, CH = [65.41, 49, 55, 43.65];
    for (var bs = tLight, k = 0; bs < tFred - 0.5; bs += bt * 4, k++) (function (s, kk) {
      E(s, function (w) { bass(CH[kk % 4], w, bt * 4, 0.09); });
      [0, 2].forEach(function (q) { E(s + q * bt, function (w) { thump(w, 0.12, 100, 45); }); });
      [1, 3].forEach(function (q) { E(s + q * bt + bt / 2, function (w) { shaker(w, 0.035); }); });
    })(bs, k);
    var nT = 22; for (var i = 0; i < nT; i++) (function (ii) { E(T(0.05) + ii * (T(1.78) - T(0.05)) / nT, function (w) { tick(w, 0.05, 2200 + (ii % 4) * 180); }); })(i);
    E(T(1.90), function (w) { click(w, 0.3); });
    [659.25, 739.99, 830.61, 880, 987.77].forEach(function (f, ii) { E(tw0 + ii * twD, function (w) { pluck(f, w, 0.06, 0.5); }); });
    E(VT[1] - 0.02, function (w) { thump(w, 0.55, 110, 38); whoosh(w - 0.2, 0.3, 0.12, 600, 2200, 0, 0); });
    [0, 1, 2].forEach(function (ii) { E(T(3.50) + ii * 0.08, function (w) { pluck(523.25 + ii * 130, w, 0.05, 0.5); }); });
    E(T(4.80), function (w) { whoosh(w, 0.35, 0.12, 900, 3800, 0.4, -0.4); });
    E(tv[0] + 0.35, function (w) { whoosh(w, 0.4, 0.08, 1500, 4500, -0.4, 0.4); });
    E(tv[1], function (w) { notif(w, 783.99, 0.07); });
    E(tv[2] + 0.2, function (w) { pluck(196, w, 0.08, 0.8); });
    E(T(8.44), function (w) { whoosh(w, 0.35, 0.12, 900, 3800, 0.4, -0.4); });
    E(T(8.80), function (w) { tick(w, 0.08, 900); });
    E(T(10.20), function (w) { whoosh(w, 0.7, 0.12, 400, 1600, 0, 0.8); });
    E(T(10.53), function (w) { snap(w); });
    E(T(12.50), function (w) { thump(w, 0.4, 120, 40); bell(523.25, w, 0.05, 2); });
    E(tSpark - 0.1, function (w) { shimmer(w, 0.05); bell(1318.51, w, 0.07, 2.2); });
    E(tSpark + 0.15, function (w) { whoosh(w, 0.55, 0.2, 300, 5000, 0, 0); });
    E(T(16.45), function (w) { thump(w, 0.25, 95, 50); });
    [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51].forEach(function (f, ii) { E(T(18.0) + ii * 0.15 + 0.22, function (w) { pluck(f, w, 0.07, 0.9); }); });
    E(T(24.2), function (w) { whoosh(w - 0.2, 0.4, 0.12, 400, 3000, 0, 0); });
    [0, 1, 2].forEach(function (ii) { E(T(24.55) + ii * 0.12, function (w) { pluck(659.25 + ii * 196, w, 0.05, 0.6); }); });
    E(T(26.08), function (w) { whoosh(w - 0.2, 0.35, 0.1, 900, 3800, 0.4, -0.4); });
    E(T(27.76), function (w) { notif(w, 659.25, 0.07); });
    E(T(29.26), function (w) { tick(w, 0.05); }); E(T(29.41), function (w) { tick(w, 0.05); });
    E(T(30.21), function (w) { whoosh(w, 0.35, 0.08, 1200, 4200, -0.4, 0.3); });
    E(T(31.33), function (w) { whoosh(w - 0.2, 0.35, 0.1, 900, 3800, 0.4, -0.4); });
    [0, 1, 2].forEach(function (ii) { E(T(31.44) + ii * 0.25, function (w) { tick(w, 0.09, 1500); }); });
    var nA = 26; for (var j = 0; j < nA; j++) (function (jj) { E(T(34.03) + jj * (T(35.16) - T(34.03)) / nA, function (w) { tick(w, 0.035, 2400 + (jj % 3) * 160); }); })(j);
    E(tClick, function (w) { click(w, 0.4); });
    E(tClick + 0.2, function (w) { notif(w, 659.25, 0.08, 1.5); });
    E(VT[10] - 0.1, function (w) { whoosh(w, 0.35, 0.12, 900, 3800, 0.4, -0.4); });
    E(T(37.94) - 0.15, function (w) { whoosh(w, 0.3, 0.08, 1200, 4200, 0.4, -0.4); });
    E(T(39.19), function (w) { thump(w, 0.4, 120, 40); [1046.5, 1318.51, 1567.98].forEach(function (f, ii) { bell(f, w + ii * 0.045, 0.06, 2.4); }); });
    // Nadia
    E(VT[11] - 0.1, function (w) { whoosh(w, 0.35, 0.12, 900, 3800, 0.4, -0.4); });
    E(T(40.41), function (w) { notif(w, 587.33, 0.06); });
    [0, 1, 2].forEach(function (ii) { E(T(40.71) + ii * 0.14, function (w) { pluck(523.25 + ii * 130, w, 0.05, 0.5); }); });
    [0, 1, 2].forEach(function (ii) { E(T(42.95) + ii * 0.1, function (w) { tick(w, 0.05, 1800 + ii * 200); }); });
    E(T(43.81), function (w) { thump(w, 0.2, 95, 50); });
    [[44.10, 659.25], [44.96, 783.99], [46.14, 880]].forEach(function (q) { E(T(q[0]), function (w) { pluck(q[1], w, 0.07, 0.8); }); });
    E(T(46.71), function (w) { [1046.5, 1318.51].forEach(function (f, ii) { bell(f, w + ii * 0.05, 0.05, 1.8); }); });
    // Pierre
    E(VT[12] - 0.1, function (w) { whoosh(w, 0.35, 0.12, 900, 3800, 0.4, -0.4); });
    E(T(50.01), function (w) { whoosh(w - 0.15, 0.3, 0.06, 1200, 4200, 0.4, -0.4); notif(w + 0.12, 739.99, 0.08); });
    E(T(52.01), function (w) { notif(w, 987.77, 0.08, 1.25); });
    E(T(53.11), function (w) { click(w, 0.3); });
    E(T(54.26), function (w) { thump(w, 0.3, 120, 40); [880, 1108.73, 1318.51].forEach(function (f, ii) { bell(f, w + ii * 0.045, 0.05, 2); }); });
    // Trois métiers
    E(VT[13] - 0.1, function (w) { whoosh(w, 0.35, 0.12, 900, 3800, 0.4, -0.4); });
    [0, 1, 2].forEach(function (ii) { E(T(55.51) + ii * 0.12, function (w) { pluck(523.25 + ii * 130, w, 0.05, 0.5); }); });
    [[56.41, 659.25], [57.46, 783.99], [58.75, 1046.5]].forEach(function (q) { E(T(q[0]), function (w) { pluck(q[1], w, 0.08, 0.9); }); });
    // Tous vos outils
    E(VT[14] - 0.1, function (w) { whoosh(w, 0.6, 0.12, 300, 2600, 0, 0); });
    [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66].forEach(function (f, ii) { E(T(60.1) + ii * 0.11, function (w) { pluck(f, w, 0.07, 0.9); }); });
    E(T(60.4), function (w) { shimmer(w, 0.035); });
    [659.25, 783.99, 880, 1046.5, 1174.66].forEach(function (f, ii) { E(T(64.75) + ii * 0.1, function (w) { pluck(f, w, 0.06, 0.8); }); });
    [0, 1, 2].forEach(function (ii) { E(T(66.9) + ii * 0.3, function (w) { pluck(1318.51, w, 0.05, 0.5); }); });
    E(VT[15] - 0.2, function (w) { whoosh(w, 0.35, 0.1, 900, 3800, 0.4, -0.4); });
    E(T(69.5), function (w) { notif(w, 587.33, 0.06, 0.85); }); E(T(70.0), function (w) { notif(w, 523.25, 0.06, 0.85); });
    E(T(73.09), function (w) { notif(w, 880, 0.08, 1.25); });
    E(VT[16] - 0.1, function (w) { whoosh(w, 0.35, 0.12, 900, 3800, 0.4, -0.4); pad([73.42, 110], w, tFred - VT[16] + 0.1, { type: "triangle", vol: 0.04, cut: 380, att: 0.6, rel: 0.6, wet: 0.4 }); });
    E(tFred - 0.1, function (w) { whoosh(w, 0.5, 0.14, 400, 3000, 0, 0); shimmer(w + 0.1, 0.04); });
    E(T(82.25), function (w) { pluck(1046.5, w, 0.07, 1); });
    E(T(85.11), function (w) { pluck(1318.51, w, 0.06, 1.2); });

    story.__tl = tl; story.__T = T; story.__vt = VT;
    story.__marks = { q: T(0.05), vous: VT[1], verbs: T(4.92), oubli: T(8.54), facteur: VT[5], parlaient: VT[6], spark: tSp, hub: VT[7], fiche: T(24.3), julien: VT[8], cal: VT[9], click: tClick, paie: VT[10], nadia: VT[11], nadiaFin: T(47.01), pierre: VT[12], pierreFin: T(54.91), trois: VT[13], troisFin: T(59.51), outils: VT[14], pilotage: VT[15], espace: T(64.62), automatisations: T(66.9), bloque: T(69.5), matin: T(72.18), lien: VT[16], fred: VT[17], FROZEN: FROZEN, BLACK: BLACK, END: END };
    tl.seek(0.01);
    render();
    if (reduce) tl.pause(FROZEN + 1);
  }

  // Une seule construction quand les polices sont déjà là ; sinon on reconstruit à leur arrivée
  var fontsPending = document.fonts && document.fonts.ready && document.fonts.status !== "loaded";
  build();
  if (fontsPending) document.fonts.ready.then(function () { if (!dead) build(); });
  var rz; window.addEventListener("resize", function () { clearTimeout(rz); rz = later(function () { if (story.offsetWidth !== W) build(); }, 250); }, { signal: SIG });
  if ("IntersectionObserver" in window) IO(function (en) {
    if (!tl || reduce) return;
    if (en[0].isIntersecting) { if (story.__userPaused) return; tl.play(); if (A.ctx && A.on) A.ctx.resume(); } else { tl.pause(); if (A.ctx) A.ctx.suspend(); }
  }, { threshold: 0.1 }).observe(story);

  return function () {
    dead = true; SIG_AC.abort(); clearTimeout(rz);
    OBS.forEach(function (o) { o.disconnect(); }); TIMERS.forEach(clearTimeout);
    if (tl) { tl.kill(); tl = null; }
    A.on = false;
    if (A.ctx) { try { A.ctx.close(); } catch (e) {} A.ctx = null; }
  };
}
