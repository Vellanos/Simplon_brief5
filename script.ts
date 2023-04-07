//Import des fonctions depuis gameService.ts
import { fPlay } from './gameService';
import { fName } from './gameService';
import { fChoixPersonnage } from './gameService';
import { startTimer } from './gameService';
import { fAjoutRessource } from './gameService';
import { fRestart } from './gameService';


// Récupération des éléments classes
let page1:HTMLCollectionOf<Element> = document.getElementsByClassName('page_1')
let page2:HTMLCollectionOf<Element> = document.getElementsByClassName('page_2')
let page3:HTMLCollectionOf<Element> = document.getElementsByClassName('page_3')
let page4:HTMLCollectionOf<Element> = document.getElementsByClassName('page_4')
let page5:HTMLCollectionOf<Element> = document.getElementsByClassName('page_5')
let personnage:HTMLCollectionOf<Element> = document.getElementsByClassName('personnage')
let boutonGame:HTMLCollectionOf<Element> = document.getElementsByClassName('boutonGame')
let barreProgress:HTMLCollectionOf<Element> = document.getElementsByClassName('barre_progress')

// Récupération des éléments id
const play: Element | null = document.querySelector("#play")
const inputName:HTMLInputElement | null = document.querySelector("#inputName")
const portrait:Element | null = document.querySelector("#portrait")
const boutonSwitch:Element | null = document.querySelector("#boutonSwitch")
const boutonSoin:Element | null = document.querySelector("#boutonSoin")
const boutonFood:Element | null = document.querySelector("#boutonFood")
const timerPlayed:Element | null = document.querySelector("#timerPlayed")
const restart:Element | null = document.querySelector("#restart")


//Ajout des event click et appel des fonctions créées dans gameService.ts

//Ajout des ressources pour la barre Food
if (boutonFood) {
    boutonFood.addEventListener('click', () => fAjoutRessource("Food",barreProgress))
}

//Ajout des ressources pour la barre Soin
if (boutonSoin) {
    boutonSoin.addEventListener('click', () => fAjoutRessource("Soin",barreProgress))
}

//Ajout des ressources pour la barre Switch (Mana pour Jaina et Rage pour Garrosh)
if (boutonSwitch) {
    boutonSwitch.addEventListener('click', () => fAjoutRessource("Switch",barreProgress))
}

//Bouton pour lancer le jeu
if (play) {
    play.addEventListener('click', () => fPlay(page1,page2))
}

//Input pour le nom du joueur, stock le nom de le localStorage
if (inputName){
    inputName.addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            localStorage.setItem("username", inputName?.value)
            fName(page2,page3,page1)
            
        }
      });
}

if (personnage){
    for (let i = 0; i < personnage.length;i++){
        personnage[i].addEventListener("click",() => {
            localStorage.setItem('idPersonnage', personnage[i].id);
            let choixPersonnage:string | null = localStorage.getItem('idPersonnage')
            fChoixPersonnage(choixPersonnage, page4, page3, portrait, boutonSwitch,barreProgress,localStorage.getItem("username"))
            startTimer(barreProgress,page4,page5,timerPlayed)
            })
    }
}

if (restart) {
    restart.addEventListener('click', () => fRestart())
}