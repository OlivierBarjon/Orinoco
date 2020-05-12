
// récupération des éléments du DOM
const nomModele = document.getElementById ("nomModele");
const prixModele = document.getElementById ("prixModele");
const descripModele = document.getElementById ("descripModele");
const imageModele = document.getElementById ("imageModele");
const buttonModele = document.getElementById ("buttonModele");


// fonction de récupération du paramètre d'url
function obtenirParametreUrl () {
    parametreUrl= window.location.search;
    const Id = parametreUrl.split("=");
    return Id[1]; // on ne conserve que ce qui se situe après le "="
  }
// TEST
//alert (obtenirParametreUrl());

// création d'une variable d'index de Bdd
let indexBdd;
// assignation des index de la Bdd en fonction des Id
switch (obtenirParametreUrl()){
    case "5be1ed3f1c9d44000030b061|Zurss%2050S|49900" :
        indexBdd = 0;
        break;
    case "5be1ef211c9d44000030b062|Hirsch%20400DTS|309900" :
        indexBdd = 1;
        break;
    case "5be9bc241c9d440000a730e7|Franck%20JS%20105|209900" :
        indexBdd = 2;
        break;
    case "5be9c4471c9d440000a730e8|Kuros%20TTS|159900" :
        indexBdd = 3;
        break;
    case "5be9c4c71c9d440000a730e9|Katatone|59900" :
        indexBdd = 4;
        break;
}
  

// AJOUT DES CONTENUS DE LA BDD DANS LA PAGE
var request = new XMLHttpRequest(); 
request.onreadystatechange = function () { 
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { 
        const response = JSON.parse(this.responseText); 
        nomModele.textContent=`${response[indexBdd].name}`;
        prixModele.textContent=`${response[indexBdd].price}`;
        descripModele.textContent=`${response[indexBdd].description}`;
        imageModele.innerHTML=`<img class="card-img-top card__body--image" src="${response[indexBdd].imageUrl}" alt="${response[indexBdd].name}"/>`;
        
        var listeLentilles = response[indexBdd].lenses;

        for (let lentille of listeLentilles){// liste de lentilles en option
            var nouvelleLentille = document.createElement("option"); // crée un nouvel élément option
            var nouveauContenu = document.createTextNode(lentille); // et récupère une lentille du tableau
            nouvelleLentille.appendChild(nouveauContenu);// ajoute le texte au nouveau option créé
            var choixLentille = document.getElementById ("choixLentille"); 
            choixLentille.appendChild(nouvelleLentille);// ajoute le nouvel élément crée et son contenu dans le DOM
        }
        //TEST
        console.table(response);
        console.table(listeLentilles);
         };
    }
request.open("GET","http://localhost:3000/api/cameras");
request.send();


// Local storage

buttonModele.addEventListener("click", function(event){
        localStorage.setItem(indexBdd,obtenirParametreUrl()); // ajoute l'article au local storage
        buttonModele.classList.replace("btn-outline-primary","btn-primary");//modifie l'apparence du bouton
        const textButton = document.querySelector("#buttonModele>button"); //récupération du texte du bouton
        textButton.textContent = "Article ajouté au panier";//modification du texte du bouton
        event.stopPropagation();
        });