import backgroundJaina from "./Assets/img/fond-lumieres-degradees.jpg"
import backgroundGarrosh from "./Assets/img/4006.jpg"
import portraitJaina from "./Assets/img/Jaina_anim.gif"
import portraitGarrosh from "./Assets/img/Garrosh_anim.gif"
import gemmeMana from "./Assets/img/zyro-image.png"
import rage from "./Assets/img/zyro_image_(3).png"
import fin from "./Assets/img/last_hs.png"

let tempsEcoule:number = 0;
let intervalId;

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

export function fChoixPersonnage (arg1:string | null, arg2:HTMLCollectionOf<Element>, arg3:HTMLCollectionOf<Element>,arg4:HTMLInputElement | null, arg5:HTMLInputElement | null, arg6:HTMLCollectionOf<Element> ) {

    let myHero: object
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
            arg6[arg6.length-1]?.setAttribute("id", "barreMana")
            myHero = new Jaina("Jaina", 80, 50, 100)


        } 
        else if (arg1 == "choixGarrosh") { // Traitement du choix de Garrosh

            document.body.style.backgroundImage = `url(${backgroundGarrosh})`;
            arg4?.setAttribute("src", `${portraitGarrosh}`)
            arg5?.setAttribute("src", `${rage}`)
            arg5?.setAttribute("alt", "Icone de rage")
            arg6[arg6.length-1]?.setAttribute("id", "barreRage")
            myHero = new Garrosh("Garrosh", 10, 10, 10) //100 80 30
            
        }
        fRemoveRessource(arg6, myHero)
        
}

function fRemoveRessource (arg1:HTMLCollectionOf<Element>, arg2:object) {

    arg1[0]?.setAttribute("value", arg2.faim)
    arg1[1]?.setAttribute("value", arg2.pv)
    arg1[2]?.setAttribute("value", arg2.mana || arg2.rage)

    let intervalRessources = setInterval(() => {
        for (let i = 0; i < arg1.length; i++) {
            
            if (arg1[i].value > 50){
                arg1[i].value -= 10
            } else if (arg1[i].value <= 50 && arg1[i].value > 15){
                arg1[i].value -= 6
            } else if (arg1[i].value <= 15) {
                arg1[i].value -= 2
            }
        }
    }, 1000);

}

export function fAjoutRessource(arg1:string, arg2:HTMLCollectionOf<Element>) {
        if (arg1 === "Food" && arg2[0].value > 0){
            arg2[0].value += 10
        } else if (arg1 === "Soin" && arg2[1].value > 0){
            arg2[1].value += 10
        } else if (arg1 === "Switch" && arg2[2].value > 0) {
            arg2[2].value += 10
        }
}

export function startTimer(arg1:HTMLCollectionOf<Element>, arg2:HTMLCollectionOf<Element>,arg3:HTMLCollectionOf<Element>,arg4:Element) {
    
    intervalId = setInterval(() => {
    tempsEcoule++;
    afficherTemps();
    if (arg1[0].value == 0 && arg1[1].value == 0 && arg1[2].value == 0) { // A terme : condition avec pv = 0
        clearInterval(intervalId);
        localStorage.setItem('tempsEcoule', tempsEcoule.toString());
        let leTemps:any = localStorage.getItem('tempsEcoule')
        for (let i = arg2.length-1; i > -1;){ //Cacher la page 4
            arg2[i].classList.add('hide')
            i = i - 1
        }
        for (let i = arg3.length-1; i > -1;){ //Afficher la page 5
            arg3[i].classList.remove('hide')
            i = i - 1
        }
        document.body.style.backgroundImage = `url(${fin})`;
        const minutes = Math.floor(leTemps / 60);
        const secondes = leTemps % 60;
        arg4.innerHTML = "You played " + `${minutes.toString().padStart(2, '0')}:${secondes.toString().padStart(2, '0')}`;
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

export function fRestart () {
    location.reload();
}

class Hero {
  // Propriétés
  name: string
  faim: number
  pv: number

  // Constructor
  constructor(theName: string, theFaim: number, thePv: number){
      this.name = theName
      this.faim = theFaim
      this.pv = thePv
  } 

}

class Jaina extends Hero {
    // Propriétés
    mana: number


    //Constructor
    constructor(theName: string, theFaim: number, thePv: number, theMana: number){
        super(theName, theFaim, thePv)
        this.mana = theMana
    }

}

class Garrosh extends Hero {
    // Propriétés
    rage: number


    //Constructor
    constructor(theName: string, theFaim: number, thePv: number, theRage: number){
        super(theName, theFaim, thePv)
        this.rage = theRage
    }

}