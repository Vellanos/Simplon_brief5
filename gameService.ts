import backgroundJaina from "./Assets/img/fond-lumieres-degradees.jpg"
import backgroundGarrosh from "./Assets/img/4006.jpg"
import portraitJaina from "./Assets/img/Jaina_anim.gif"
import portraitGarrosh from "./Assets/img/HERO_01.gif"
import gemmeMana from "./Assets/img/zyro-image.png"
import Rage from ".Assets/img/zyro-image (3).png"


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

export function fChoixPersonnage (arg1:HTMLCollectionOf<Element>,arg2:HTMLCollectionOf<Element>,arg3:HTMLCollectionOf<Element>,arg4:HTMLInputElement | null, arg5:HTMLInputElement | null) {

    arg3[0].classList.remove('choixHero')

    for (let i = 0; i < arg1.length;i++){
    
        if (arg1[i].id == "choixJaina") { //Traitement du choix de Jaina

            for (let i = arg2.length-1; i > -1;){ //Afficher la page 4 de Jaina
                arg2[i].classList.remove('hide')
                i = i - 1
            }

            for (let i = 0; i < arg1.length; i++){ //Cacher la page 3
                arg3[i].classList.add('hide')
            }

            document.body.style.backgroundImage = `url(${backgroundJaina})`;
            arg4?.setAttribute("src", `${portraitJaina}`)
            arg5?.setAttribute("src", `${gemmeMana}`)
            arg5?.setAttribute("alt", "Icone de geme de Mana")


        }else if (arg1[i].id == "choixGarrosh") { // Traitement du choix de Garrosh

        } 
    }
}