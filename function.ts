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
