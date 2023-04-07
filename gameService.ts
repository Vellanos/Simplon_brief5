// Import des images utilisées dans les fonctions typescript
import backgroundJaina from "./Assets/img/fond-lumieres-degradees.jpg"
import backgroundGarrosh from "./Assets/img/4006.jpg"
import portraitJaina from "./Assets/img/Jaina_anim.gif"
import portraitGarrosh from "./Assets/img/Garrosh_anim.gif"
import gemmeMana from "./Assets/img/zyro-image.png"
import rage from "./Assets/img/zyro_image_(3).png"
import fin from "./Assets/img/last_hs.png"

let tempsEcoule:number = 0;
let intervalId;


//Fonction pour commener le jeu (gros bouton PLAY première page)
export function fPlay (arg1:HTMLCollectionOf<Element>, arg2:HTMLCollectionOf<Element>) {

    for (let i = 1; i < arg1.length; i++){ 
        arg1[i].classList.add('hide')
    }

    for (let i = arg2.length-1; i > -1;){
        arg2[i].classList.remove('hide')
        i = i - 1
    }
}

//Fonction pour afficher le choix des héros après avoir récupérer le nom du joueur
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

//Le choix du héro affiche la page du jeu adapté au personnage choisie et lance la gestion des ressources du jeu (timer, barre de progression...)
export function fChoixPersonnage (arg1:string | null, arg2:HTMLCollectionOf<Element>, arg3:HTMLCollectionOf<Element>,arg4:HTMLInputElement | null, arg5:HTMLInputElement | null, arg6:HTMLCollectionOf<Element>,arg7 ) {

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

            document.body.style.backgroundImage = `url(${backgroundJaina})`; // Décors de fond pour le héro
            arg4?.setAttribute("src", `${portraitJaina}`) // portrait du héro
            arg5?.setAttribute("src", `${gemmeMana}`) // Affichage du bouton pour la ressource propre au héro
            arg5?.setAttribute("alt", "Icone de gemme de Mana") // Gestion du alt pour le bouton
            arg6[arg6.length-1]?.setAttribute("id", "barreMana") // Affichage de la barre de ressource propre au héro
            myHero = new Jaina(arg7, 80, 50, 100) // Utilisation du constructor avec utilisation du username pour le nom du héro


        } 
        else if (arg1 == "choixGarrosh") { // Traitement du choix de Garrosh

            document.body.style.backgroundImage = `url(${backgroundGarrosh})`; // Décors de fond pour le héro
            arg4?.setAttribute("src", `${portraitGarrosh}`) // portrait du héro
            arg5?.setAttribute("src", `${rage}`) // Affichage du bouton pour la ressource propre au héro
            arg5?.setAttribute("alt", "Icone de rage") // Gestion du alt pour le bouton
            arg6[arg6.length-1]?.setAttribute("id", "barreRage") // Affichage de la barre de ressource propre au héro
            myHero = new Garrosh(arg7, 100, 80, 30) // Utilisation du constructor avec utilisation du username pour le nom du héro
            
        }
        fRemoveRessource(arg6, myHero) //Appel de la fonction pour lancer la gestion des barres de progression
        
}

//Fonction pour faire diminiuer les barres de progressions
function fRemoveRessource (arg1:HTMLCollectionOf<Element>, arg2:object) {

    //Récupération des valeurs obtenu avec le constructor
    arg1[0]?.setAttribute("value", arg2.faim)
    arg1[1]?.setAttribute("value", arg2.pv)
    arg1[2]?.setAttribute("value", arg2.mana || arg2.rage)

    
    let intervalRessources = setInterval(() => {
        for (let i = 0; i < arg1.length; i++) {
            
            //Gestion des différents niveaux de suppression de ressource
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

//Fonction pour permettre de rajouter des ressources
export function fAjoutRessource(arg1:string, arg2:HTMLCollectionOf<Element>) {

        //Condition pour trouver quel bouton a été utilisé
        if (arg1 === "Food" && arg2[0].value > 0){
            arg2[0].value += 10
        } else if (arg1 === "Soin" && arg2[1].value > 0){
            arg2[1].value += 10
        } else if (arg1 === "Switch" && arg2[2].value > 0) {
            arg2[2].value += 10
        }
}

//Fonction pour gérer un timer pendant la partie (temps pendant lequel le héro reste "vivant")
//Cette fonction permet aussi d'afficher l'écran de fin quand toutes les ressources tombent à 0
export function startTimer(arg1:HTMLCollectionOf<Element>, arg2:HTMLCollectionOf<Element>,arg3:HTMLCollectionOf<Element>,arg4:Element) {
    
    intervalId = setInterval(() => {
    tempsEcoule++;
    afficherTemps(); //Fonction pour traiter le format d'affichage
    if (arg1[0].value == 0 && arg1[1].value == 0 && arg1[2].value == 0) { //Condition de fin de jeu
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
        //Possible de réutiliser la fonction afficherTemps() pour gérer le format du timer affiché sur la dernière page, need de modifier la fonction afficherTemps() --> ajout d'argument pour la rendre plus générique
      }
    }, 1000);
}

//Fonction pour gérer l'affichage du timer (le format d'affichage) pendant la partie
function afficherTemps() {
    const tempsAffiche = document.getElementById('timer');
    const minutes = Math.floor(tempsEcoule / 60);
    const secondes = tempsEcoule % 60;
    if (tempsAffiche){
        tempsAffiche.textContent = `${minutes.toString().padStart(2, '0')}:${secondes.toString().padStart(2, '0')}`;
    }
  }

//Fonction pour reload la page et relancer le jeu
export function fRestart () {
    location.reload();
}


//Création de la class Héro et des deux héros Jaian et Garrosh
//Les héros ont tous une barre de faim et de soin
//Ils ont aussi une ressources qui leur est propre
class Hero {
  // Propriétés
  name: string // obtenu avec le localStorage et le username (input)
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