/* ########## RÉCUPERATION D'UN EMPLACEMENT DU DOM POUR Y INJECTER TOUT NOTRE CONTENU DYNAMIQUEMENT ########## */

const appContainer = document.getElementById("app");
//console.log(appContainer); // TEST

/* ########## COMPOSANT DE RECUPERATION DES [OBJETS JSON] ET D'INTEGRATION DE LEUR INTEGRATION (APRÈS TRAITEMENT) AU DOM ########## */

class DetailProduct { 
    constructor(id) {
        new Request().get(`http://localhost:3000/api/cameras/${id}`).then((result)=>{ // création d'un nouvel objet à partir de la classe Request auquel on transmet l'url exacte du produit à sa méthode get() et qui retournera le résultat de la résolution de la promesse utilisée dans cet même méthode get()
            const response = JSON.parse(result);// on transforme le résultat en objet JSON
            this.product= response;  // on transmet l'objet à une propriété "product"
            this.productDetailView = new ProductDetailView(this.product); // on  crée un objet "productDetailView" à partir de la classe "productDetailView" en lui fournissant comme paramètre l'objet à traiter
            appContainer.appendChild(this.productDetailView.render()); // et on ajoute à l'élément "app" du DOM, un élément enfant qui sera le retour du rendu de cet objet "productDetailView.
            //console.log(this.product);//TEST (retourne un objet)
        }).catch(()=>{
            console.log("erreur de chargement"); // si on à une réponse du type 4XX ou 5XX, on affiche un message d'erreur
            appContainer.textContent = "aucun produit sélectionné"; // on affiche un message à l'utilisateur
        })
    }
}

/* ########## COMPOSANTS DE TRAITEMENT DES OBJETS JSON POUR LA PAGE PRODUIT ########## */

/* - 2 : COMPOSANT DE GÉNÉRATION DE LA VUE DU PRODUIT ##### */

class ProductViewPP { // PP pour "Page Produit"
    constructor(product) { 
        this.product = product; // le parametre "product" contient un seul objet JSON.
    }

    render() { 
        const productContainer = document.createElement("div"); // on crée d'un élément du DOM de type <div> : "productContainer"
        const price = new ConvertToPrice(this.product.price).render(); // on récupère le prix en euros (formatage du prix)
        productContainer.innerHTML = `<div class="card-header"><h3 class="my-0 font-weight-normal">${this.product.name}</h3></div><div class="card-body"><div class="mb-3"><img class="img-fluid" src="${this.product.imageUrl}" alt="${this.product.imageUrl}" /></div><p class="text-justify">${this.product.description}</p><p>Prix : ${price} €</p></div>`; // on ajoute au conteneur les éléments HTML remplis par les valeurs de l'objet
        productContainer.setAttribute("class", "card mb-4 shadow-sm"); // on y ajoute un peu de style

        // options lentilles
        const labelChoixLentille = document.createElement("label"); // on crée un label explicatif
        labelChoixLentille.setAttribute("for","LensOpt"); // on y ajoute un attribut for
        labelChoixLentille.textContent = "Choisissez une lentille en option :"; // on y ajoute du texte
        const selectChoixLentille = document.createElement("select"); // on crée un élément <select>
        selectChoixLentille.setAttribute("name","LensOpt"); // on y ajoute un attribut name
        selectChoixLentille.setAttribute("class","form-control mb-3 w-25 product__option-lens"); // on y ajoute un peu de style
        for (let lentille of this.product.lenses){ // pour chaque lentilles
            var nouvelleLentille = document.createElement("option"); // on crée un nouvel élément <option>
            var nouveauContenu = document.createTextNode(lentille); // on récupère la lentille dans une variable
            nouvelleLentille.appendChild(nouveauContenu);// on l'ajoute à l'élément <option>
            selectChoixLentille.appendChild(nouvelleLentille); // on ajoute l'élément <option> à l'élément <select>
        };
        productContainer.appendChild(labelChoixLentille); // on ajoute notre label au conteneur
        productContainer.appendChild(selectChoixLentille); // on ajoute notre liste de selection au conteneur

        // bouton panier
        const boutonPanier = document.createElement("button"); // création du bouton
        boutonPanier.setAttribute("type", "button"); // on y ajoute un attribut type
        boutonPanier.setAttribute("id","boutonPanier"); // on y ajoute un attribut id
        boutonPanier.setAttribute("class", "btn btn-lg btn-outline-primary w-75");// on y ajoute un peu de style
        boutonPanier.textContent = "Ajouter au panier"; // on y ajoute du texte
        productContainer.appendChild(boutonPanier); // on ajoute notre bouton au conteneur
        const idProdLStorage = this.product._id; // on crée une variable qui contient l'id du produit
        const prixProdLStorage = this.product.price; // on crée une variable qui contient le prix du produit
        boutonPanier.addEventListener("click", function(event){ // on ajoute un écouteur d'événement. au click sur le bouton
            localStorage.setItem(idProdLStorage,prixProdLStorage); // on ajoute l'article au local storage avec l'id et le prix du produit
            boutonPanier.classList.replace("btn-outline-primary","btn-primary"); // on modifie l'apparence du bouton
            boutonPanier.textContent = "Article ajouté au panier";// on modifie le texte du bouton
            event.stopPropagation(); // on stope la propagation
            });

        return productContainer; // on retourne l'élément du DOM "productContainer" 
    } 
}

/* - 1 : COMPOSANT DE GÉNÉRATION DU CONTENEUR A INTEGRER AU AU DOM ##### */

class ProductDetailView { 
    constructor(product){ 
        this.product = product; // On récupère l'objet
        
    }
    render() { 
        const productDetailContainer = document.createElement("div"); // on crée un élément <div> du DOM qui s'appelle "productDetailContainer"
        productDetailContainer.setAttribute("class", "card-deck mb-3 text-center"); // on y ajoute un peu de style
        productDetailContainer.appendChild(new ProductViewPP(this.product).render()); // on y intégre le rendu crée par le composant ProductViewPP
        return productDetailContainer; // on retourne le conteneur <div> avec le produit.
    }
}


/* ########## CHARGEMENT DU PRODUIT DÈS LE CHARGEMENT COMPLET DE LA PAGE ########## */

window.onload = function() {  
    const paramUrl = window.location.search; // on récupère les paramètres d'url
    const id = new Identifiant(paramUrl).determinId(); // on applique notre méthode pour récupérer l'id du produit
    const detailProduct = new DetailProduct(id); // on crée nouvel objet "detailProduct" à partir de la class "DetailProduct" en lui envoyant l'id du produit en paramètre
    //console.log(id);//TEST (doit afficher l'id du produit demandé)
} 



