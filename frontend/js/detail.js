// RÉCUPERATION D'UN EMPLACEMENT DU DOM POUR Y INJECTER TOUT NOTRE CONTENU DYNAMIQUEMENT
const appContainer = document.getElementById("app");
//console.log(appContainer); // TEST

// COMPOSANT DE RECUPERATION DES [OBJETS JSON] ET D'INTEGRATION DE LEUR INTEGRATION (APRÈS TRAITEMENT) AU DOM
class DetailProduct { 
    constructor() {
        new Request().get("http://localhost:3000/api/cameras").then((result)=>{ // création d'un nouvel objet à partir de la classe Request auquel on transmet une url à sa méthode get() et un paramètre contenant le résultat de la résolution de la promesse utilisée dans cet même méthode get()
            const response = JSON.parse(result);// on transforme le résultat en [objets JSON]
            this.products= response;  // on transmet les [objets JSON] à une propriété "products"
            this.productDetailView = new ProductDetailView(this.products); // on  crée un objet "productDetailView" à partir de la classe "productDetailView" en lui fournissant comme paramètre les [objets JSON]
            appContainer.appendChild(this.productDetailView.render()); // et on ajoute à l'élément "app" du DOM, un élément enfant qui sera le retour du rendu de cet objet "productDetailView.
        }).catch(()=>{
            console.log("erreur de chargement");
        })
    }
}


// CHARGEMENT DU PRODUIT DÈS LE CHARGEMENT COMPLET DE LA PAGE
window.onload = function() {  
    const detailProduct = new DetailProduct(); // Création d'un nouvel objet "detailProduct" à partir de la class "DetailProduct"
} 
