/* ########## RÉCUPERATION D'UN EMPLACEMENT DU DOM POUR Y INJECTER TOUT NOTRE CONTENU DYNAMIQUEMENT ########## */
const appContainer = document.getElementById("app");
//console.log(appContainer); // TEST

/* ########## COMPOSANT DE RECUPERATION DES [OBJETS JSON] ET D'INTEGRATION DE LEUR INTEGRATION (APRÈS TRAITEMENT) AU DOM ########## */
class PanierProducts { 
    constructor() {
        new Request().get("http://localhost:3000/api/cameras").then((result)=>{ // création d'un nouvel objet à partir de la classe Request auquel on transmet une url à sa méthode get() et un paramètre contenant le résultat de la résolution de la promesse utilisée dans cet même méthode get()
            const response = JSON.parse(result);// on transforme le résultat en [objets JSON]
            this.products= response;  // on transmet les [objets JSON] à une propriété "products"
            this.productPanierView = new ProductPanierView(this.products); // on  crée un objet "productListView" à partir de la classe "ProductListView" en lui fournissant comme paramètre les [objets JSON]
            appContainer.appendChild(this.productPanierView.render()); // et on ajoute à l'élément "app" du DOM, un élément enfant qui sera le retour du rendu de cet objet "productListView".
            //this.commande = new Commande(this.products).post(); ///////////
        }).catch(()=>{
            console.log("erreur");
        })
    }
}

/* ########## COMPOSANTS DE TRAITEMENT DES OBJETS JSON POUR LA PAGE PANIER ########## */

// 2 : COMPOSANT DE GÉNÉRATION DE VUE TYPE D'UN PRODUIT DU PANIER

class ProductViewPanier { 
    constructor(product) { 
        this.product = product; // le parametre "product" contient un seul objet JSON.
    }
    render() { 
        const productContainer = document.createElement("div"); 
        productContainer.innerHTML = `<p>${this.product.name} (${this.product.price} €)</p>`; 
       
        // bouton de suppression de l'article
        const boutonSuppPanier = document.createElement("button");
        boutonSuppPanier.setAttribute("class", "btn btn-sm btn-outline-primary w-25");// un peu de style
        boutonSuppPanier.textContent = "Retirer cet article";
        productContainer.appendChild(boutonSuppPanier);
        const productName = this.product.name;
        boutonSuppPanier.addEventListener("click", function(event){
            localStorage.removeItem(productName); // supprime l'article du local storage
            window.history.go(); // raffraichissement de la page pour supprimer le produit.
            event.stopPropagation();
            });

        return productContainer; // on retourne l'élément du DOM "productContainer" 
    } 
}

// 1 : COMPOSANT DE GÉNÉRATION DE LA VUE DE LA LISTE DE(S) PRODUIT(S) DU PANIER A INTEGRER AU AU DOM

class ProductPanierView {
    constructor(products) {
        this.products = products;

    }
    render() { 
        const productPanierContainer = document.createElement("div"); 
        productPanierContainer.setAttribute("class", "card mb-3 text-center panier"); //  on ajoute un peu de style
        const prixTotalPanierContainer = document.createElement("div");
        prixTotalPanierContainer.setAttribute("class", "mb-3 text-center"); //  on ajoute un peu de style
        const prixTotal = [];
        const articlesPanier = [];
        if (localStorage.length >0) {
            for (let product of this.products){ // pour chaque produits
                if (localStorage.getItem(product.name)){ // si le produit est dans le localStorage
                    productPanierContainer.appendChild(new ProductViewPanier(product).render()); // j'intègre le rendu du produit
                    prixTotal.push(product.price);
                    articlesPanier.push(product._id);
                }
            };
        } if (prixTotal.length >0){
            const reducer = (accumulator, currentValue)=> accumulator + currentValue; // Fonction reduce()
            const totalCommande = prixTotal.reduce(reducer);
            console.log(prixTotal);//TEST
            console.log(totalCommande);//TEST
            prixTotalPanierContainer.innerHTML = `Total de la commande = ${totalCommande} €`;
            productPanierContainer.appendChild(prixTotalPanierContainer);
        } else {
            productPanierContainer.textContent="Votre panier est vide";
        }
        
        return productPanierContainer; // on retourne le conteneur <div> avec le(s) produit(s) et le prix total
    }

}


/* ########## CHARGEMENT DE LA LISTE COMPLÈTE DÈS LE CHARGEMENT COMPLET DE LA PAGE ########## */
window.onload = function() {  
    const panierProducts = new PanierProducts(); // Création d'un nouvel objet "listProduct" à partir de la class "ListProduct"
} 


