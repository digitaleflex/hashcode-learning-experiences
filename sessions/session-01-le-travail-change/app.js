const slides=[
{brand:"HASHCODE",kicker:"SESSION 01",background:"./assets/images/opening-cover.webp",time:"00:00",objective:"Créer une ouverture forte.",script:"Laisse deux ou trois secondes de silence. Puis : « Aujourd'hui, je ne suis pas venu vous faire une présentation classique sur l'intelligence artificielle. »",interaction:"Regarde la salle. Ne te précipite pas.",transition:"→ CE SOIR"},
{headline:"CE SOIR,",subheadline:"NOUS ALLONS PARLER<br>DE VOTRE TRAVAIL.",background:"./assets/images/your-work.webp",time:"01:00",objective:"Casser l'attente d'une présentation IA classique.",script:"« Pas uniquement de ChatGPT. Pas uniquement de prompts. Pas uniquement des nouveaux outils qui sortent chaque semaine. Nous allons parler de votre travail. »",interaction:"Aucune réponse demandée.",transition:"→ LE TRAVAIL CHANGE"},
{headline:"LE TRAVAIL <span class='accent'>CHANGE.</span>",subheadline:"De l'utilisateur d'IA…<br>…à l'architecte d'un système intelligent.",background:"./assets/images/work-changes.webp",time:"03:00",objective:"Révéler le thème officiel.",script:"« La transformation la plus importante n'est peut-être pas l'arrivée d'un nouvel outil. C'est la transformation progressive de notre manière de travailler. »",interaction:"Pause entre le titre et le sous-titre.",transition:"→ UNE QUESTION"},
{headline:"UNE QUESTION.",time:"05:00",objective:"Créer de l'attente.",script:"Ne parle pas immédiatement.",interaction:"Silence de quelques secondes.",transition:"→ COMBIEN DE PERSONNES"},
{headline:"COMBIEN DE PERSONNES<br>TRAVAILLENT AVEC VOUS ?",time:"06:00",objective:"Faire émerger la vision traditionnelle de l'équipe.",script:"« Quand je vous pose cette question, à quoi pensez-vous ? »",interaction:"Prendre 3 à 5 réponses.",transition:"→ VRAIMENT ?"},
{headline:"VRAIMENT ?",subheadline:"Prenez quelques secondes.",time:"08:00",objective:"Installer le doute.",script:"« Je pense que votre réponse aurait probablement été différente il y a seulement quelques années. »",interaction:"Laisser la salle réfléchir.",transition:"→ LES INTELLIGENCES"},
{headline:"AVEC QUELLES<br><span class='accent'>INTELLIGENCES</span><br>TRAVAILLEZ-VOUS ?",time:"10:00",objective:"Introduire l'idée de collaboration avec des intelligences non humaines.",script:"« Certaines personnes travaillent déjà avec des systèmes capables de rechercher, analyser, écrire, coder et parfois exécuter certaines tâches. »",interaction:"Demander quels outils les participants utilisent réellement.",transition:"→ PARTICIPER"},
{headline:"VOUS N'ÊTES PAS ICI<br>POUR REGARDER.",subheadline:"VOUS ÊTES ICI POUR <span class='accent'>PARTICIPER.</span>",time:"13:00",objective:"Établir le contrat avec le public.",script:"« Cette session ne fonctionnera pas si vous restez simplement assis à écouter. Je vais vous poser des questions. Vous allez réfléchir, répondre et construire. »",interaction:"Obtenir un accord verbal ou gestuel.",transition:"→ ALORS…"},
{headline:"ALORS…",subheadline:"QU'EST-CE QUI A RÉELLEMENT CHANGÉ ?",time:"16:00",objective:"Préparer le basculement vers la partie suivante.",script:"« Pour répondre à cette question, il faut revenir à ce qui a réellement changé dans notre manière de travailler. »",interaction:"Pause finale.",transition:"→ PARTIE II — LE BASCULEMENT"}
];
let currentSlide=0,startTime=Date.now();
const presentation=document.getElementById("presentation"),progressBar=document.getElementById("progress-bar");
document.body.insertAdjacentHTML("beforeend",`<aside class="presenter-panel"><div class="presenter-top"><span class="presenter-label">HASHCODE</span><span class="presenter-private">PRIVÉ</span></div><h2>Vue présentateur</h2><div class="timer" id="timer">00:00</div><h3 id="slide-title"></h3><p><strong>Objectif</strong><br><span id="objective"></span></p><p><strong>Script</strong><br><span id="script"></span></p><p><strong>Interaction</strong><br><span id="interaction"></span></p><p><strong>Transition</strong><br><span id="transition"></span></p><div class="presenter-actions"><button class="presenter-prev">← Précédente</button><button class="presenter-next">Suivante →</button></div><p class="presenter-shortcuts">← → navigation · R chronomètre · fermer cette fenêtre pour revenir au mode public</p></aside>`);
function renderSlides(){const s=slides[currentSlide];presentation.innerHTML=slides.map((slide,index)=>`<section class="slide ${slide.background?"has-background":""} ${index===currentSlide?"active":""}" style="${slide.background?`--slide-bg:url(${slide.background})`:""}">${slide.brand?`<div class="brand">${slide.brand}</div>`:""}${slide.kicker?`<div class="kicker">${slide.kicker}</div>`:""}${slide.headline?`<h1 class="headline">${slide.headline}</h1>`:""}${slide.subheadline?`<div class="subheadline">${slide.subheadline}</div>`:""}</section>`).join("");progressBar.style.width=`${((currentSlide+1)/slides.length)*100}%`;document.getElementById("slide-title").textContent=`SLIDE ${currentSlide+1}/${slides.length} · cible ${s.time}`;document.getElementById("objective").textContent=s.objective;document.getElementById("script").textContent=s.script;document.getElementById("interaction").textContent=s.interaction;document.getElementById("transition").textContent=s.transition}
function nextSlide(){if(currentSlide<slides.length-1){currentSlide++;renderSlides()}}function previousSlide(){if(currentSlide>0){currentSlide--;renderSlides()}}
function openPresenter(){const url=new URL(window.location.href);url.searchParams.set("presenter","1");const w=window.open(url.toString(),"hashcode-presenter","popup=yes,width=900,height=900");if(!w){alert("Autorise les fenêtres contextuelles pour ouvrir la vue présentateur.")}}
const isPresenter=new URLSearchParams(window.location.search).get("presenter")==="1";
if(isPresenter){
document.body.classList.add("presenter-window");
document.getElementById("presentation").style.display="none";
document.getElementById("progress").style.display="none";
document.getElementById("controls-hint").textContent="Vue privée · synchronisée avec la présentation";
document.body.classList.add("presenter-mode");
}
function presenterNavigate(delta){
if(!isPresenter)return;
currentSlide=Math.max(0,Math.min(slides.length-1,currentSlide+delta));
renderSlides();
broadcast();
}
document.addEventListener("click",e=>{
if(!isPresenter)return;
const panel=document.querySelector(".presenter-panel");
if(e.target.closest(".presenter-next"))presenterNavigate(1);
if(e.target.closest(".presenter-prev"))presenterNavigate(-1);
});

function broadcast(){localStorage.setItem("hashcode-session-01-slide",JSON.stringify({index:currentSlide,ts:Date.now()}))}
function syncFromStorage(){const raw=localStorage.getItem("hashcode-session-01-slide");if(!raw)return;const data=JSON.parse(raw);if(data.index!==currentSlide){currentSlide=data.index;renderSlides()}}
window.addEventListener("storage",e=>{if(e.key==="hashcode-session-01-slide"&&isPresenter)syncFromStorage()});
const originalRender=renderSlides;renderSlides=function(){originalRender();if(!isPresenter)broadcast()};
document.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key===" "){e.preventDefault();isPresenter?presenterNavigate(1):nextSlide()}if(e.key==="ArrowLeft"){isPresenter?presenterNavigate(-1):previousSlide()}if(e.key.toLowerCase()==="p"&&!isPresenter){openPresenter()}if(e.key.toLowerCase()==="f"&&!isPresenter){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}if(e.key.toLowerCase()==="r"){startTime=Date.now()}});
renderSlides();