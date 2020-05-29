/* ########## RÉCUPERATION D'UN EMPLACEMENT DU DOM POUR Y INJECTER NOTRE CONTENU DYNAMIQUEMENT ########## */
const appContainer = document.getElementById("app");
//console.log(appContainer); // TEST

/* ########## COMPOSANT DE RECUPERATION DES [OBJETS JSON] ET D'INTEGRATION DE LEUR INTEGRATION (APRÈS TRAITEMENT) AU DOM ########## */
class PanierProducts { 
    constructor() {
        new Request().get("http://localhost:3000/api/cameras").then((result)=>{ // nouvel objet à partir de la classe Request à laquelle on transmet une url à sa méthode get() et qui retournera le résultat de la résolution de la promesse utilisée dans cet même méthode get()
            const response = JSON.parse(result);// on transforme le résultat de la promesse en [objets JSON]
            this.products= response;  // on transmet les [objets JSON] à une propriété "products"
            //Filtrage du local Storage
            const articlesPanier = [];//on crée un tableau qui recevra la liste des produits commandés
            const idsProducts= []; // on crée un tableau qui recevra la liste des ids des produits commandés
            if (localStorage.length > 0) { // si des produits sont présents dans le local storage
                for(let product of this.products) { // pour chaque produit présent
                    if (localStorage.getItem(product._id)){ //si le produit est dans le local storage
                        articlesPanier.push(product); // on l'ajoute au tableau listant les produits commandés
                        idsProducts.push(product._id); // on ajoute son id au tableau listant les id des produits commandés
                    }
                }
                console.log(idsProducts);//TEST le tableau d'id envoyé sera bien une liste de strings !
            }
            this.listeCommande = articlesPanier; //on transmet les [objets du LocalStorage] à une propriété listeCommande
            // On crée une itération de la classe ProductPanierView avec en paramètre : les [objets du localStorage] et une fonction qui prend elle même 1 paramètre contact et qui itère la classe Request().post avec l'url/order et le body en paramètre
            this.productPanierView = new ProductPanierView(this.listeCommande, (contact, products)=>{
                new Request().post("http://localhost:3000/api/cameras/order" , {
                    contact:contact,
                    products: idsProducts
                }).then((result)=>{
                    const response = JSON.parse(result);
                    localStorage.setItem("orderId", JSON.stringify(response.orderId)); // On ajoute les éléments qui nous interessent au local Storage
                    localStorage.setItem("firstName", JSON.stringify(response.contact.firstName));
                    localStorage.setItem("lastName", JSON.stringify(response.contact.lastName));
                    document.location.href="confirmation.html"; // on redirige l'utilisateur vers la page de confirmation
                }).catch(() =>{
                    console.log("erreur de chargement");
                });
            }); 
            appContainer.appendChild(this.productPanierView.render()); // et on ajoute à l'élément "app" du DOM, un élément enfant qui sera le retour du rendu de l' objet "productPanierView".
            //this.commande = new Commande(this.products).post(); ////////////////////////// a supp ???
        }).catch(()=>{
            console.log("erreur de chargement");// on affiche une erreur en cas d'erreur sur la promesse get()
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
        const price = new ConvertToPrice(this.product.price).render(); // formatage du prix
        const productContainer = document.createElement("div"); // création d'un conteneur
        productContainer.innerHTML = `<p>${this.product.name} (${price} €)</p>`;  // ajout d'un contenu html à ce conteneur
       
        // bouton de suppression de l'article
        const boutonSuppPanier = document.createElement("button"); // création du bouton
        boutonSuppPanier.setAttribute("class", "btn btn-sm btn-outline-primary w-25");// un peu de style
        boutonSuppPanier.textContent = "Retirer cet article"; // du texte
        productContainer.appendChild(boutonSuppPanier); // on l'ajoute au conteneur
        const productId = this.product._id; // on récupère son id
        boutonSuppPanier.addEventListener("click", function(event){ // à l'évènement "click"...
            localStorage.removeItem(productId); // on supprime l'article du local storage à partir de son id
            window.history.go(); // on raffraichi la page pour supprimer le produit de l'affichage
            event.stopPropagation();
            });

        return productContainer; // on retourne l'élément du DOM "productContainer" 
    } 
}

// 1 : COMPOSANT DE GÉNÉRATION DE LA VUE DE LA LISTE DE(S) PRODUIT(S) DU PANIER A INTEGRER AU AU DOM

class ProductPanierView {
    constructor(listeCommande, onSubmit=()=>{}) { // le constructeur contiens le tableau de produits et une fonction onSubmit
        this.listeCommande = listeCommande;
        this.form = document.getElementById("form"); // récupération du formulaire de contact
        this.form.addEventListener("submit" , function(event){ // récupération des valeurs à la soumission
            const contact= {};
            contact.firstName = form.elements.firstName.value;
            contact.lastName = form.elements.lastName.value;
            contact.address = form.elements.address.value;
            contact.city = form.elements.city.value;
            contact.email = form.elements.email.value;
            event.preventDefault(); // on empêche l'action par défaut du bouton de soumission
            event.stopPropagation();
            onSubmit(contact); // on utilise la fonction (en y ajoutant l'objet contact manquant)
        });
    }
    render() { 
        const productPanierContainer = document.createElement("div"); // on crée un conteneur pour la liste de produits
        productPanierContainer.setAttribute("class", "card mb-3 text-center panier"); //  on y ajoute un peu de style
        const prixTotalPanierContainer = document.createElement("div"); // on crée un conteneur pour le prix total
        prixTotalPanierContainer.setAttribute("class", "mb-3 text-center"); //  on y ajoute un peu de style
        const prixTotal = []; // on crée le tableau qui contiendra le prix total
        for (let product of this.listeCommande){ // pour chaque produits
            
                    productPanierContainer.appendChild(new ProductViewPanier(product).render()); // j'intègre le rendu du produit
                    prixTotal.push(product.price); // on enregistre le prix dans le tableau 
                    //console.log(articlesPanier);//TEST
               
            };
        if (prixTotal.length >0){
            const reducer = (accumulator, currentValue)=> accumulator + currentValue; // Fonction reduce()
            const totalCommande = prixTotal.reduce(reducer); // sur les valeurs du tableau de prix pour obtenir le total de la commande
            //console.log(prixTotal);//TEST
            //console.log(totalCommande);//TEST
            const totalPrice = new ConvertToPrice(totalCommande).render(); // formatage du prix
            prixTotalPanierContainer.innerHTML = `Total de la commande = ${totalPrice} €`; // insertion du code HTML
            productPanierContainer.appendChild(prixTotalPanierContainer); // intégration du contenu au DOM
        } else {
            productPanierContainer.textContent="Votre panier est vide"; // si le panier est vide on affiche un message
        };

        return productPanierContainer; // on retourne le conteneur <div> avec le(s) produit(s) et le prix total
    }

}


/* ########## CHARGEMENT DE LA LISTE COMPLÈTE DÈS LE CHARGEMENT COMPLET DE LA PAGE ########## */
window.onload = function() {  
    const panierProducts = new PanierProducts(); // Création d'un nouvel objet "panierProducts" à partir de la class "PanierProducts"
} 

