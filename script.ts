import { fPlay } from './gameService';
import { fName } from './gameService';
import { fChoixPersonnage } from './gameService';

let page1:HTMLCollectionOf<Element> = document.getElementsByClassName('page_1')
let page2:HTMLCollectionOf<Element> = document.getElementsByClassName('page_2')
let page3:HTMLCollectionOf<Element> = document.getElementsByClassName('page_3')
let page4:HTMLCollectionOf<Element> = document.getElementsByClassName('page_4')
let personnage:HTMLCollectionOf<Element> = document.getElementsByClassName('personnage')
let boutonGame:HTMLCollectionOf<Element> = document.getElementsByClassName('boutonGame')

const play: Element | null = document.querySelector("#play")
const inputName:HTMLInputElement | null = document.querySelector("#inputName")
const portrait:HTMLInputElement | null = document.querySelector("#portrait")
const boutonSwitch:HTMLInputElement | null = document.querySelector("#boutonSwitch")

if (play) {
    play.addEventListener('click', () => fPlay(page1,page2))
}

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
        personnage[i].addEventListener("click",() => fChoixPersonnage(personnage, page4, page3, portrait, boutonSwitch));
    }
}

