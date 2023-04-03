import backgroundJaina from "./Assets/img/fond-lumieres-degradees.jpg"
import backgroundGarrosh from "./Assets/img/4006.jpg"
import portraitJaina from "./Assets/img/Jaina_anim.gif"
import portraitGarrosh from "./Assets/img/Garrosh_anim.gif"
import gemmeMana from "./Assets/img/zyro-image.png"
import rage from "./Assets/img/zyro_image_(3).png"




export function fPlay (arg1:HTMLCollectionOf<Element>, arg2:HTMLCollectionOf<Element>) {

    for (let i = 1; i < arg1.length; i++){ 
        arg1[i].classList.add('hide')
    }

    for (let i = arg2.length-1; i > -1;){
        arg2[i].classList.remove('hide')
        i = i - 1
    }
}


export function fName (arg1:HTMLCollectionOf<Element>, arg2:HTMLCollectionOf<Element>,arg3:HTMLCollectionOf<Element>) {

    arg3[0].classList.remove('accueil')

    for (let i = 0; i < arg1.length; i++){ 
        arg1[i].classList.add('hide')
    }

    arg2[0].classList.add('choixHero')
    for (let i = arg2.length-1; i > -1;){
        arg2[i].classList.remove('hide')
        i = i - 1
    }
}

export function fChoixPersonnage (arg1:string | null, arg2:HTMLCollectionOf<Element>, arg3:HTMLCollectionOf<Element>,arg4:HTMLInputElement | null, arg5:HTMLInputElement | null) {

    arg3[0].classList.remove('choixHero')

    for (let i = arg2.length-1; i > -1;){ //Afficher la page 4
        arg2[i].classList.remove('hide')
        i = i - 1
    }

    for (let i = 0; i < arg3.length; i++){ //Cacher la page 3
        arg3[i].classList.add('hide')
    }

        if (arg1 == "choixJaina") { //Traitement du choix de Jaina

            document.body.style.backgroundImage = `url(${backgroundJaina})`;
            arg4?.setAttribute("src", `${portraitJaina}`)
            arg5?.setAttribute("src", `${gemmeMana}`)
            arg5?.setAttribute("alt", "Icone de gemme de Mana")


        } 
        else if (arg1 == "choixGarrosh") { // Traitement du choix de Garrosh

            document.body.style.backgroundImage = `url(${backgroundGarrosh})`;
            arg4?.setAttribute("src", `${portraitGarrosh}`)
            arg5?.setAttribute("src", `${rage}`)
            arg5?.setAttribute("alt", "Icone de rage")

        }

}

let tempsEcoule:number = 0;
let intervalId;

export function startTimer() {
    
    intervalId = setInterval(() => {
    tempsEcoule++;
    afficherTemps();
    if (tempsEcoule == 10) { // A terme : condition avec pv = 0
        clearInterval(intervalId);
        localStorage.setItem('tempsEcoule', tempsEcoule);
      }
    }, 1000);
}

function afficherTemps() {
    const tempsAffiche = document.getElementById('timer');
    const minutes = Math.floor(tempsEcoule / 60);
    const secondes = tempsEcoule % 60;
    if (tempsAffiche){
        tempsAffiche.textContent = `${minutes.toString().padStart(2, '0')}:${secondes.toString().padStart(2, '0')}`;
    }
  }
  

