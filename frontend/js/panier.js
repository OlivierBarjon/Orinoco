//AJOUTE DES ARTICLES SELECTIONNE DANS LE PANIER
const panier = []; // création d'un tableau vide pour le panier
for (i=0 ; i<localStorage.length; i++) {
    panier.push(localStorage.getItem(i)); //Pour chaque élement du localStorage, on ajoute sa valeur dans le tableau
};
//TEST
console.table(panier);




// INSERTION DU CONTENU DU PANIER DANS LA PAGE
for (let article of panier) {
    var element = article.split("|"); //creation d'un tableau pour chaque article
      var nouvelArticle = document.createElement("li"); // crée un nouvel élément li
      var nouveauContenu = document.createTextNode(element[1]); // et lui donne le contenu de l'index 1 du tableau
      nouvelArticle.appendChild(nouveauContenu);// ajoute le texte au nouveau li créé
      var currentUl = document.getElementById ("listeArticles");
      currentUl.appendChild(nouvelArticle);// ajoute le nouvel élément crée et son contenu dans le DOM
};

// FONCTION GLOBALE DE CALCUL DU PRIX TOTAL

function calculPrixTotal () {
    const detailPrix = []; // création d'un tableau vide pour y mettre tous les prix
    for (let article of panier) { // pour chaque element du panier
        var element = article.split("|"); // création d'un tableau pour chaque article dont les valeurs sont déterminé par le séparateur |
        const prix = element[2]; //création d'une constante dans laquelle on place le prix
        detailPrix.push(prix); // on ajoute ce prix dans le premier tableau
    }
    //TEST
    console.table(detailPrix);

    let prixTotal=0; // création d'une variable de type Number
    for (i=0; i<detailPrix.length; i++) {// mise en place d'une boucle qui se lance pour chaque prix du tableau "detailPrix"
        prixTotal += Number(detailPrix[i]);  // on ajoute à la variable les valeurs du tableau de prix préalablement convertie en type Number
    }
    return prixTotal; // la fonction retourne le prix total
}

//TEST
console.log(calculPrixTotal());

// INSERTION DU PRIX TOTAL

const totalDuPanier = document.getElementById("totalPanier");
totalDuPanier.textContent=`${calculPrixTotal()} €`;

// FONCTION CALLBACK DE SUPPRESSION DU PANIER
const btnVidePanier = document.getElementById("btnVidePanier"); // récupération du bouton "vider le panier" du DOM
btnVidePanier.addEventListener("click", function(){ // mise en place d'un écouteur de "click"
    localStorage.clear(); // Vidange du localStorage
    window.history.go(0);//raffraichissement de la page pour faire disparaitre les articles.
});





