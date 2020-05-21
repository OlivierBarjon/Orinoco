// ###### COMPOSANTS DE TRAITEMENT DES OBJETS JSON POUR LA HOME PAGE #######

// COMPOSANT DE GÉNÉRATION DE VUE TYPE D'UN PRODUIT

class ProductViewHP { // HP pour "Home Page"
    constructor(product) { 
        this.product = product; // le parametre "product" contient un seul objet JSON.
    }
    render() { 
        const productContainer = document.createElement("div"); // création d'un élément du DOM de type <div> : "productContainer"
        productContainer.innerHTML = `<div class="card-header"><h3 class="my-0 font-weight-normal">${this.product.name}</h3></div><div class="card-body"><div class="mb-3"><img class="img-fluid" src="${this.product.imageUrl}" alt="${this.product.imageUrl}" /></div><p class="text-justify">${this.product.description}</p><p>Prix : ${this.product.price} €</p><a href="produit.html?id=${this.product._id}" type="button" class="btn btn-lg btn-outline-primary">Fiche produit</a></div>`; // ... cette <div> contiendra les éléments HTML remplis par les valeurs de l'objet JSON
        productContainer.setAttribute("class", "card mb-4 shadow-sm");// un peu de style
        return productContainer; // on retourne l'élément du DOM "productContainer" 
    } 
}

// COMPOSANT DE GÉNÉRATION DE LA VUE DE LA LISTE DES PRODUITS A INTEGRER AU AU DOM

class ProductListView { 
    constructor(products){ 
        this.products = products; // On récupère la liste des [objets JSON]
    }
    render() { 
        const productListContainer = document.createElement("div"); // ...qui crée une <div> (en créant un élément du DOM qui s'appelle "productListContainer")...
        productListContainer.setAttribute("class", "card-deck mb-3 text-center"); //  on ajoute un peu de style
        for (let product of this.products){ // Pour chaque produit de cette liste de produit
          productListContainer.appendChild(new ProductViewHP(product).render()); // on ajoute à notre bloc <div> le rendu créer par le composant de génération de vue produit (soit la classe ProductViewHP)
        };
        return productListContainer; // on retourne le conteneur <div> avec tous les produits.
    }
}




// ###### COMPOSANTS DE TRAITEMENT DES OBJETS JSON POUR LA PAGE PRODUIT #######

// COMPOSANT DE GÉNÉRATION DE LA VUE DU PRODUIT

class ProductViewPP { // PP pour "Page Produit"
    constructor(product) { 
        this.product = product; // le parametre "product" contient un seul objet JSON.
        this.listeLentilles = product.lenses; // on récupère la liste des lentilles
    }

    render() { 
        const productContainer = document.createElement("div"); // création d'un élément du DOM de type <div> : "productContainer"

        productContainer.innerHTML = `<div class="card-header"><h3 class="my-0 font-weight-normal">${this.product.name}</h3></div><div class="card-body"><div class="mb-3"><img class="img-fluid" src="${this.product.imageUrl}" alt="${this.product.imageUrl}" /></div><p class="text-justify">${this.product.description}</p><p>Prix : ${this.product.price} €</p></div>`; // ... cette <div> contiendra les éléments HTML remplis par les valeurs de l'objet JSON
        productContainer.setAttribute("class", "card mb-4 shadow-sm");// un peu de style

        // options lentilles
        const labelChoixLentille = document.createElement("label");
        labelChoixLentille.setAttribute("for","LensOpt");
        labelChoixLentille.textContent = "Choisissez une lentille en option :";
        const selectChoixLentille = document.createElement("select");
        selectChoixLentille.setAttribute("name","LensOpt");
        selectChoixLentille.setAttribute("class","form-control mb-3 w-25 product__option-lens");
        for (let lentille of this.listeLentilles){ // pour chaque lentilles
            var nouvelleLentille = document.createElement("option"); // on crée un nouvel élément <option>
            var nouveauContenu = document.createTextNode(lentille); // on récupère la lentille
            nouvelleLentille.appendChild(nouveauContenu);// on l'ajoute à l'élément <option>
            selectChoixLentille.appendChild(nouvelleLentille); // on ajoute l'élément <option> à l'élément <select>
        };
        productContainer.appendChild(labelChoixLentille); // on ajoute notre label 
        productContainer.appendChild(selectChoixLentille); // on ajoute notre liste de selection

        // bouton panier
        const boutonPanier = document.createElement("button");
        boutonPanier.setAttribute("type", "button");
        boutonPanier.setAttribute("id","boutonPanier");
        boutonPanier.setAttribute("class", "btn btn-lg btn-outline-primary w-75");// un peu de style
        boutonPanier.textContent = "Ajouter au panier";
        productContainer.appendChild(boutonPanier);
        const nomProdLStorage = this.product.name;
        const prixProdLStorage = this.product.price;
        boutonPanier.addEventListener("click", function(event){
            localStorage.setItem(nomProdLStorage,prixProdLStorage); // ajoute l'article au local storage
            boutonPanier.classList.replace("btn-outline-primary","btn-primary");//modifie l'apparence du bouton
            boutonPanier.textContent = "Article ajouté au panier";//modification du texte du bouton
            event.stopPropagation();
            });

        return productContainer; // on retourne l'élément du DOM "productContainer" 
    } 
}


//COMPOSANT DE RECUPERATION DE L'IDENTIFIANT DU PRODUIT A PARTIR DE LA CHAINE DES PARAMETRES DE L'URL
class Identifiant {
    constructor(paramUrl){
        this.paramUrl = paramUrl;
    }
    determinId () {
        const id = this.paramUrl.split("="); // On split ce paramètre d'url en utilisant le "=" comme séparateur
        return id[1]; // on retourne l'id qui se situe après le "="
    }
}




// COMPOSANT DE GÉNÉRATION DU CONTENEUR A INTEGRER AU AU DOM

class ProductDetailView { 
    constructor(products){ 
        this.products = products; // On récupère la liste des [objets JSON]
        this.paramUrl = window.location.search; // on récupère les paramètres d'url
        this.id = new Identifiant(this.paramUrl).determinId(); // on applique notre méthode pour récupérer l'id du produit
    }
    render() { 
        const productDetailContainer = document.createElement("div"); // on crée un élément <div> du DOM qui s'appelle "productDetailContainer"
        productDetailContainer.setAttribute("class", "card-deck mb-3 text-center"); // un peu de style
        for (let product of this.products){ // pour chaque product du tableau "products"...
        const IdentifiantProduit=product._id; // ... on récupère l'identifiant du produit...
            if(this.id == IdentifiantProduit) { // ...on vérifie que cet identifiant correspondant à celui transmis dans notre url
                productDetailContainer.appendChild(new ProductViewPP(product).render()); // on intégre le rendu crée par le composant ProductViewPP
             };
        };
        return productDetailContainer; // on retourne le conteneur <div> avec le produit.
    }
}