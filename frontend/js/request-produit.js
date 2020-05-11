
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
    return Id[1];
  }
// TEST
//alert (obtenirParametreUrl());

// création d'une variable d'index de Bdd
let indexBdd;
// assignation des index de la Bdd en fonction des Id
switch (obtenirParametreUrl()){
    case "5be1ed3f1c9d44000030b061" :
        indexBdd = 0;
        break;
    case "5be1ef211c9d44000030b062" :
        indexBdd = 1;
        break;
    case "5be9bc241c9d440000a730e7" :
        indexBdd = 2;
        break;
    case "5be9c4471c9d440000a730e8" :
        indexBdd = 3;
        break;
    case "5be9c4c71c9d440000a730e9" :
        indexBdd = 4;
        break;
}
  

// REQUETE PAGE PRODUIT
var request = new XMLHttpRequest(); 
request.onreadystatechange = function () { 
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { 
        const response = JSON.parse(this.responseText); 

        nomModele.textContent=`${response[indexBdd].name}`;

        prixModele.textContent=`${response[indexBdd].price}`;

        descripModele.textContent=`${response[indexBdd].description}`;

        imageModele.innerHTML=`<img class="card-img-top card__body--image" src="${response[indexBdd].imageUrl}" alt="${response[indexBdd].name}"/>`;

        buttonModele.innerHTML=`<button type="button" class="btn btn-lg btn-outline-primary">Ajouter au panier</button>`;

        //TEST
        console.table(response);

         };
    }
request.open("GET","http://localhost:3000/api/cameras");
request.send();

// Local storage

buttonModele.addEventListener("click", function(event){
        localStorage.setItem(indexBdd,obtenirParametreUrl());
        event.stopPropagation();
});
