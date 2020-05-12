//AJOUTE DES ARTICLES SELECTIONNE DANS LE PANIER
const panier = [];
for (i=0 ; i<localStorage.length; i++) {
    panier.push(localStorage.getItem(i)); //Pour chaque élement du localStorage, on ajoute sa valeur dans un tableau
};

//TEST
console.table(panier);

// Insertion du contenu du panier dans la page
for (let article of panier) {
      var nouvelArticle = document.createElement("li"); // crée un nouvel élément li
      var nouveauContenu = document.createTextNode(article); // et lui donne le contenu
      nouvelArticle.appendChild(nouveauContenu);// ajoute le texte au nouveau li créé
      var currentUl = document.getElementById ("listeArticles");
      currentUl.appendChild(nouvelArticle);// ajoute le nouvel élément crée et son contenu dans le DOM
};

// FONCTION DE SUPPRESSION DU PANIER
const btnVidePanier = document.getElementById("btnVidePanier"); // récupération du bouton "vider le panier" du DOM
btnVidePanier.addEventListener("click", function(){ // mise en place d'un écouteur de "click"
    localStorage.clear(); // Vidange du localStorage
    window.history.go(0);//raffraichissement de la page pour faire disparaitre les articles.
});
