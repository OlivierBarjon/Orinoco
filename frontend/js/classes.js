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
        for (let lentille of this.product.lenses){ // pour chaque lentilles
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




// ###### COMPOSANTS DE TRAITEMENT DES OBJETS JSON POUR LA PAGE PANIER #######



// COMPOSANT DE GÉNÉRATION DE VUE TYPE D'UN PRODUIT DU PANIER

class ProductViewPanier { 
    constructor(product) { 
        this.product = product; // le parametre "product" contient un seul objet JSON.
    }
    render() { 
        const productContainer = document.createElement("div"); 
       // productContainer.setAttribute("class", "mb-3");// un peu de style
        productContainer.innerHTML = `<p>${this.product.name} (${this.product.price} €)</p>`; 
        //productContainer.setAttribute("class", "card mb-4 shadow-sm");// un peu de style

        // bouton de suppresion de l'article
        const boutonSuppPanier = document.createElement("button");
        //boutonSuppPanier.setAttribute("type", "button");
        //boutonSuppPanier.setAttribute("id","boutonSuppPanier");
        boutonSuppPanier.setAttribute("class", "btn btn-sm btn-outline-primary w-25");// un peu de style
        boutonSuppPanier.textContent = "Supprimer l'article";
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



// COMPOSANT DE GÉNÉRATION DE LA VUE DE LA LISTE DE(S) PRODUIT(S) DU PANIER A INTEGRER AU AU DOM

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
        for (let product of this.products){ // pour chaque produits
            if (localStorage.getItem(product.name)){ // si le produit est dans le localStorage
                productPanierContainer.appendChild(new ProductViewPanier(product).render()); // j'intègre le rendu du produit
                prixTotal.push(product.price);
                articlesPanier.push(product._id);
            }
        };
        console.log(articlesPanier);//TEST

        // prix total
        const reducer = (accumulator, currentValue)=> accumulator + currentValue;
        const totalCommande = prixTotal.reduce(reducer);
        console.log(prixTotal);//TEST
        console.log(totalCommande);//TEST
        prixTotalPanierContainer.innerHTML = `Total de la commande = ${totalCommande} €`;
        productPanierContainer.appendChild(prixTotalPanierContainer);


        // envoie du panier au formulaire
        const envoiePanierFormulaire = new Commande(articlesPanier).expedition();

        return productPanierContainer; // on retourne le conteneur <div> avec le(s) produit(s) et le prix total
    }
}


// COMPOSANT DE TRAITEMENT DU FORMULAIRE

class Commande {
    constructor(articlesPanier) {
        this.products = articlesPanier;//tableau des produits commandé à envoyer à l'API
    }
    expedition() {
        const form = document.getElementById("form");//on récupère le formulaire
        const contact ={};
        // On récupère les valeurs du formulaire pour en créer un objet contact ???? lire le cotenu avec un événement ?
        contact.prenom = document.getElementById("prenom").value;
        contact.nom = document.getElementById("nom").value;
        contact.adresse = document.getElementById("adresse").value;
        contact.cp = document.getElementById("cp").value;
        contact.ville = document.getElementById("ville").value;
        contact.email = document.getElementById("email").value;
        // créer un objet contact avec les valeurs du formulaire ?????? Condition ???????
         console.log(contact);//TEST
         // on écoute la validation du formulaire pour envoyer une requête post
        form.addEventListener("submit", function(){ //Promesse Post ??????????? paralléliser plusieurs requetes ? une post puis une get ?
                const request = new XMLHttpRequest();
                request.open("POST","http://localhost:3000/api/cameras", true);
                //request.setRequestHeader("Content-Type","application/json");
                request.send(products, contact);// contact ???
        });
        //return ???;
    }
}
