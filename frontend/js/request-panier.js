
//récupération des éléments du DOM

/*
const prixModele = document.getElementById ("prixModele");
const descripModele = document.getElementById ("descripModele");
const imageModele = document.getElementById ("imageModele");
const buttonModele = document.getElementById ("buttonModele");
*/

// LocalStorage

//Je rempli le panier
const panier = [];
for (i=0 ; i<localStorage.length; i++) {
    panier.push(localStorage.getItem(i));
};

//TEST
console.table(panier);

// J'insère le contenu du panier dans la page
for (let article of panier) {
      var nouvelArticle = document.createElement("li"); // crée un nouvel élément li
      var nouveauContenu = document.createTextNode(article); // et lui donne le contenu
      nouvelArticle.appendChild(nouveauContenu);// ajoute le texte au nouveau li créé
      var currentUl = document.getElementById ("listeArticles");
      currentUl.appendChild(nouvelArticle);// ajoute le nouvel élément crée et son contenu dans le DOM
};
