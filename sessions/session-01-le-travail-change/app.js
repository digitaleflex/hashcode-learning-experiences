const slides=[
{type:"cover",brand:"HASHCODE",kicker:"SESSION 01",notes:"Laisse 2 à 3 secondes de silence. Commence calmement : « Aujourd'hui, je ne suis pas venu vous faire une présentation classique sur l'intelligence artificielle. »",time:"00:00"},
{eyebrow:"CE SOIR",headline:"NOUS ALLONS PARLER",sub:"DE VOTRE TRAVAIL.",notes:"Casse immédiatement l'attente d'une simple présentation sur ChatGPT, les prompts ou les outils.",time:"01:00"},
{headline:"LE TRAVAIL <span class='accent'>CHANGE.</span>",sub:"De l'utilisateur d'IA…<br>…à l'architecte d'un système intelligent.",notes:"Annonce le thème officiel. Pause entre les deux parties du sous-titre.",time:"03:00"},
{headline:"UNE QUESTION.",notes:"Ne parle pas immédiatement. Laisse la salle anticiper.",time:"05:00"},
{headline:"COMBIEN DE PERSONNES<br>TRAVAILLENT AVEC VOUS ?",notes:"Pose la question et écoute quelques réponses : collègues, équipe, partenaires, employés.",time:"06:00"},
{headline:"VRAIMENT ?",sub:"Prenez quelques secondes.",notes:"Crée le doute. Ne donne pas encore la réponse.",time:"08:00"},
{stack:["VOUS","VOUS + UNE ÉQUIPE","VOUS + UNE ÉQUIPE + DES OUTILS","VOUS + UNE ÉQUIPE + DES INTELLIGENCES"],notes:"Révèle les lignes progressivement. Explique que certains systèmes recherchent, analysent, écrivent, codent et exécutent déjà des tâches.",time:"10:00"},
{headline:"AVEC QUELLES<br><span class='accent'>INTELLIGENCES</span><br>TRAVAILLEZ-VOUS ?",notes:"Laisse la question résonner. C'est le point de bascule.",time:"13:00"},
{eyebrow:"AUJOURD'HUI",headline:"VOUS N'ÊTES PAS ICI<br>POUR REGARDER.",sub:"VOUS ÊTES ICI POUR <span class='accent'>PARTICIPER.</span>",notes:"Annonce le contrat avec le public : questions, réflexion, réponses et construction collective.",time:"15:00"},
{headline:"ALORS…",sub:"QU'EST-CE QUI A RÉELLEMENT CHANGÉ ?",notes:"Transition directe vers PARTIE II — Le Basculement.",time:"18:00"}
];

let current=0,step=0,start=Date.now();
const root=document.querySelector("#presentation");
const progress=document.querySelector("#progress-bar");
document.body.insertAdjacentHTML("beforeend",`<aside class="presenter-panel"><h2>Vue présentateur</h2><div class="timer" id="timer">00:00</div><h3 id="slide-label"></h3><p id="notes"></p><hr><strong>Raccourcis</strong><p>← → : navigation<br>P : vue présentateur<br>F : plein écran</p></aside>`);

function render(){
 root.innerHTML=slides.map((s,i)=>{
   let content=s.stack?'<div class="stack">'+s.stack.map((x,j)=>`<div class="reveal ${i===current&&j<=step?'visible':''}" data-step="${j}">${x}</div>`).join('')+'</div>':
   `<div class="eyebrow">${s.eyebrow||''}</div>${s.brand?'<div class="brand">'+s.brand+'</div>':''}${s.kicker?'<div class="kicker">'+s.kicker+'</div>':''}${s.headline?'<h1 class="headline">'+s.headline+'</h1>':''}${s.sub?'<div class="subheadline">'+s.sub+'</div>':''}`;
   return `<section class="slide ${i===current?'active':''}">${content}</section>`;
 }).join('');
 progress.style.width=`${((current+1)/slides.length)*100}%`;
 document.querySelector("#slide-label").textContent=`Slide ${current+1}/${slides.length} · cible ${slides[current].time}`;
 document.querySelector("#notes").textContent=slides[current].notes;
}
function next(){
 const s=slides[current];
 if(s.stack && step<s.stack.length-1){step++;render();return}
 if(current<slides.length-1){current++;step=0;render()}
}
function prev(){if(step>0){step--;render();return}if(current>0){current--;step=0;render()}}
document.addEventListener("keydown",e=>{
 if(["ArrowRight"," ","ArrowDown"].includes(e.key)){e.preventDefault();next()}
 if(["ArrowLeft","ArrowUp"].includes(e.key)){e.preventDefault();prev()}
 if(e.key.toLowerCase()==="p")document.body.classList.toggle("presenter-mode");
 if(e.key.toLowerCase()==="f"){if(!document.fullscreenElement)document.documentElement.requestFullscreen();else document.exitFullscreen()}
});
setInterval(()=>{const d=Math.floor((Date.now()-start)/1000);document.querySelector("#timer").textContent=`${String(Math.floor(d/60)).padStart(2,"0")}:${String(d%60).padStart(2,"0")}`},1000);
render();