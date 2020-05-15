// 1 : RECUPERATION D'UN EMPLACEMENT DU DOM POUR Y PLACER NOTRE CONTENU DYNAMIQUEMENT
const appContainer = document.getElementById("app"); // récupération de l'élément "app" du DOM dans une constante "appContainer"
//console.log(appContainer); // TEST

// 2 : CREATION D'UN COMPOSANT POUR RECUPERER LES OBJETS JSON DANS UN TABLEAU ET LES INTERGRER AU DOM
class ListProduct { // On crée une classe "ListProduct" qui servira à créer un objet "listproduct"...
    constructor() {
        this.products = [ // ... qui  aura une propriété "products" ayant pour valeur la [ liste des objets JSON ]
            {
                "lenses": [
                    "35mm 1.4",
                    "50mm 1.6"
                ],
                "_id": "5be1ed3f1c9d44000030b061",
                "name": "Zurss 50S",
                "price": 49900,
                "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "imageUrl": "http://localhost:3000/images/vcam_1.jpg"
            },
            {
                "lenses": [
                    "50mm 1.8",
                    "60mm 2.8",
                    "24-60mm 2.8/4.5"
                ],
                "_id": "5be1ef211c9d44000030b062",
                "name": "Hirsch 400DTS",
                "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "price": 309900,
                "imageUrl": "http://localhost:3000/images/vcam_2.jpg"
            },
            {
                "lenses":["25mm 4.5"],
                "_id":"5be9bc241c9d440000a730e7",
                "name":"Franck JS 105",
                "price":209900,
                "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "imageUrl":"http://localhost:3000/images/vcam_3.jpg"
                }
        ];
    this.productListComplete = new ProductListView(this.products); // ... qui créera un objet "productListComplete" à partir de la classe "ProductListView" en lui fournissant comme paramètre la [liste des objets JSON]...
    appContainer.appendChild(this.productListComplete.render()); // ... et qui d'ajoutera à l'élément "app" du DOM, un élément enfant qui sera le retour du rendu (l'objet DOM "productListContainer") de ce nouvel objet "productListView" (étape 5:)
    }
}

// 3 : CREATION D'UN MODELE DE PRODUIT POUR GENERER LES OBJETS PRODUITS

/*class Product { // On crée une classe qui servira à créer un objet... transformer tous nos objets JSON en modèle "Product"
    constructor(params) { //on va récupérer dans "params" les propriétés lenses, id, name, description, price et imageUrl des objets JSON
        this.lenses = params.lenses;
        this._id = params._id;
        this.name = params.name;
        this.description = params.description;
        this.price = params.price;
        this.imageUrl = params.imageUrl;
    }
}*/

// 4 : CREATION D'UN COMPOSANT DE VUE POUR GENERER LE RENDU TYPE POUR 1 PRODUIT ( parce que a chaque élément de ma liste je veux générer une vue produit identique)

class ProductView { // On crée une classe qui servira à créer un objet...
    constructor(product, inList) { // qui prendra deux parametres
        this.product = product; //... le parametre "product" (qui contient un objet JSON - étape 5:) sera assigné à la 1ère propriété "product".  qui passe un élément "product" de type Product (donc pour être utilisé avec la classe "Product" ci-dessus)
    }
    render() { // cette classe a également une méthode de type render...
        const productContainer = document.createElement("div"); // ...qui crée une <div> (en créant un élément du DOM de type <div> qui s'appelle "productContainer") ...
        productContainer.innerHTML = `<div class="card-header"><h3 class="my-0 font-weight-normal">${this.product.name}</h3></div><div class="card-body"><div class="mb-3"><img class="img-fluid" src="${this.product.imageUrl}" alt="${this.product.imageUrl}" /></div><p class="text-justify">${this.product.description}</p><p>Prix : ${this.product.price} €</p></div>`; // ... cette <div> contiendra les éléments HTML remplis par les valeurs de l'objet JSON
        productContainer.setAttribute("class", "card mb-4 shadow-sm");// on ajoute les styles au modele de conteneur
        return productContainer; // cette méthode d'instance de classe retourne la constante "productContainer" qui contient un modèle de vue de produit opérationnel
    } 
}


// 5 : CREATION D'UN COMPOSANT POUR GENERER LA LISTE COMPLETE DES RENDUS QUI DEVRA ETRE INTEGREE AU DOM

class ProductListView { // On crée une classe qui servira à créer un objet...
    constructor(products){ // ... qui prendra 1 paramètre de type [] Product
        this.products = products; // L'objet aura une propriété "products" ayant pour valeur la donnée récupérée dans le paramètre (il s'agira de la [liste des objets JSON] - étape 2:).
    }
    render() { // Cette classe à également une méthode de type render...
        const productListContainer = document.createElement("div"); // ...qui crée une <div> (en créant un élément du DOM qui s'appelle "productListContainer")...
        productListContainer.setAttribute("class", "card-deck mb-3 text-center");
        for (let product of this.products){// ... et qui déclenchera l'éxécution d'une boucle pour chaque product du tableau "products"...
          productListContainer.appendChild(new ProductView(product).render()); // ... afin d'y intégrer un rendu crée (à l'étape 4:) par le composant "productView" pour chaque produits de la liste 
        };
        return productListContainer; // cette méthode d'instance de classe retourne la constante "productListContainer" qui pourra être ajouté au DOM car elle est composé d'une <div> contenant tous les rendus de produits individuels
    }
}

/*
class ApiConsumer {
    constructor({ baseApi }) { // descontruction 
        this.baseApi = baseApi;
    }
    newRequest() {
        return xhr = new XMLHttpRequest();
    }
    getListProduct (callback) {
        const request = this.newRequest()
        request.onload = callback
        request.open("GET", this.baseApi+'/products', true);
        request.send();
    }
}
*/

// 6 : EXECUTION DES COMPOSANTS ET DE LA VUE AU CHARGEMENT DE LA FENÊTRE
window.onload = function() {  // A l'évènement window.onload (chargement de la fenêtre), on exécute une fonction...
    const listProduct = new ListProduct(); //...qui crée un nouvel objet "listProduct" à partir de la class "ListProduct" de l'étape 2:
    console.log(listProduct); //TEST
} 

