import { fPlay } from './function';
import { fName } from './function';

let page1:HTMLCollectionOf<Element> = document.getElementsByClassName('page_1')
let page2:HTMLCollectionOf<Element> = document.getElementsByClassName('page_2')
let page3:HTMLCollectionOf<Element> = document.getElementsByClassName('page_3')
const play: Element | null = document.querySelector("#play")
const inputName:HTMLInputElement | null = document.querySelector("#inputName")

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
