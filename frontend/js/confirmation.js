// RÉCUPERATION D'UN EMPLACEMENT DU DOM POUR Y INJECTER TOUT NOTRE CONTENU DYNAMIQUEMENT
const appContainer = document.getElementById("app");
//console.log(appContainer); // TEST

// COMPOSANT DE RECUPERATION DES [OBJETS JSON] ET D'INTEGRATION DE LEUR INTEGRATION (APRÈS TRAITEMENT) AU DOM
class Confirmation { 
    constructor() {
        new Request().get("http://localhost:3000/api/cameras/order").then((result)=>{ // création d'un nouvel objet à partir de la classe Request auquel on transmet une url à sa méthode get() et un paramètre contenant le résultat de la résolution de la promesse utilisée dans cet même méthode get()
            const response = JSON.parse(result);// on transforme le résultat en [objets JSON]
            this.products= response;  // on transmet les [objets JSON] à une propriété "products"
            this.confirmationView = new ConfirmationView(this.products); // on  crée un objet "productListView" à partir de la classe "ProductListView" en lui fournissant comme paramètre les [objets JSON]
            appContainer.appendChild(this.confirmationView.render()); // et on ajoute à l'élément "app" du DOM, un élément enfant qui sera le retour du rendu de cet objet "productListView".
        }).catch(()=>{
            console.log("erreur de chargement");
        })
    }
}


/* ########## COMPOSANTS DE TRAITEMENT DES OBJETS JSON POUR LA PAGE CONFIRMATION ########## */

// 2 : COMPOSANT DE GÉNÉRATION DE LA VUE DU PRODUIT

class CommandeViewPC { // PC pour "Page confirmation"
    constructor(product) { 
        this.product = product; // le parametre "product" contient un seul objet JSON.
    }

    render() { 
        const productContainer = document.createElement("div"); // création d'un élément du DOM de type <div> : "productContainer"
        const price = new ConvertToPrice(this.product.price).render(); // formatage du prix
        productContainer.innerHTML = `<div class="card-header"><h3 class="my-0 font-weight-normal">${this.product.name}</h3></div><div class="card-body"><div class="mb-3"><img class="img-fluid" src="${this.product.imageUrl}" alt="${this.product.imageUrl}" /></div><p class="text-justify">${this.product.description}</p><p>Prix : ${price} €</p></div>`; // ... cette <div> contiendra les éléments HTML remplis par les valeurs de l'objet JSON
        productContainer.setAttribute("class", "card mb-4 shadow-sm");// un peu de style

    
        return productContainer; // on retourne l'élément du DOM "productContainer" 
    } 
}

// 1 : COMPOSANT DE GÉNÉRATION DU CONTENEUR A INTEGRER AU AU DOM

class ConfirmationView { 
    constructor(product){ 
        this.product = product; // On récupère l'objet
        
    }
    render() { 
        const productDetailContainer = document.createElement("div"); // on crée un élément <div> du DOM qui s'appelle "productDetailContainer"
        productDetailContainer.setAttribute("class", "card-deck mb-3 text-center"); // un peu de style
        productDetailContainer.appendChild(new CommandeViewPC(this.product).render()); // on intégre le rendu crée par le composant ProductViewPP
        return productDetailContainer; // on retourne le conteneur <div> avec le produit.
    }
}


// CHARGEMENT DE LA LISTE COMPLÈTE DÈS LE CHARGEMENT COMPLET DE LA PAGE
window.onload = function() {  
    const confirmation = new Confirmation(); // Création d'un nouvel objet "confirmation" à partir de la class "Confirmation"
} 