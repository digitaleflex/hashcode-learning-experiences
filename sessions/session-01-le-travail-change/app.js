const slides=[
{brand:"HASHCODE",kicker:"SESSION 01"},
{headline:"CE SOIR,",subheadline:"NOUS ALLONS PARLER<br>DE VOTRE TRAVAIL."},
{headline:"LE TRAVAIL <span class='accent'>CHANGE.</span>",subheadline:"De l'utilisateur d'IA…<br>…à l'architecte d'un système intelligent."},
{headline:"UNE QUESTION."},
{headline:"COMBIEN DE PERSONNES<br>TRAVAILLENT AVEC VOUS ?"},
{headline:"VRAIMENT ?",subheadline:"Prenez quelques secondes."},
{headline:"AVEC QUELLES<br><span class='accent'>INTELLIGENCES</span><br>TRAVAILLEZ-VOUS ?"},
{headline:"VOUS N'ÊTES PAS ICI<br>POUR REGARDER.",subheadline:"VOUS ÊTES ICI POUR <span class='accent'>PARTICIPER.</span>"},
{headline:"ALORS…",subheadline:"QU'EST-CE QUI A RÉELLEMENT CHANGÉ ?"}
];
let currentSlide=0;
const presentation=document.getElementById("presentation");
const progressBar=document.getElementById("progress-bar");
function renderSlides(){presentation.innerHTML=slides.map((slide,index)=>`<section class="slide ${index===currentSlide?"active":""}">${slide.brand?`<div class="brand">${slide.brand}</div>`:""}${slide.kicker?`<div class="kicker">${slide.kicker}</div>`:""}${slide.headline?`<h1 class="headline">${slide.headline}</h1>`:""}${slide.subheadline?`<div class="subheadline">${slide.subheadline}</div>`:""}</section>`).join("");progressBar.style.width=`${((currentSlide+1)/slides.length)*100}%`}
function nextSlide(){if(currentSlide<slides.length-1){currentSlide++;renderSlides()}}
function previousSlide(){if(currentSlide>0){currentSlide--;renderSlides()}}
document.addEventListener("keydown",event=>{if(event.key==="ArrowRight"||event.key===" "){event.preventDefault();nextSlide()}if(event.key==="ArrowLeft"){previousSlide()}if(event.key.toLowerCase()==="f"){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}});
renderSlides();