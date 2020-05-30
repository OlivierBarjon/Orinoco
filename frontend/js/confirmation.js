/* ########## RÉCUPERATION D'UN EMPLACEMENT DU DOM POUR Y INJECTER TOUT NOTRE CONTENU DYNAMIQUEMENT ########## */

const appContainer = document.getElementById("app");
//console.log(appContainer); // TEST

/* ########## COMPOSANT DE RECUPERATION DES [OBJETS JSON] ET D'INTEGRATION DE LEUR INTEGRATION (APRÈS TRAITEMENT) AU DOM ########## */

class Confirmation { 
    constructor() {
        new Request().get("http://localhost:3000/api/cameras").then((result)=>{ // création d'un nouvel objet à partir de la classe Request auquel on transmet une url à sa méthode get() et un paramètre contenant le résultat de la résolution de la promesse utilisée dans cet même méthode get()
            const response = JSON.parse(result);// on transforme le résultat en [objets JSON]
            this.products= response;  // on transmet les [objets JSON] à une propriété "products"
            const articlesPanier = [];//on crée un tableau qui recevra la liste des produits commandés
            if (localStorage.length > 0) { // si des produits sont présents dans le local storage
                for(let product of this.products) { // pour chaque produit présent
                    if (localStorage.getItem(product._id)){ //si le produit est dans le local storage
                        articlesPanier.push(product); // on l'ajoute au tableau listant les produits commandés
                        }
                    }
                };
            this.listeCommande = articlesPanier; //on transmet les [objets du LocalStorage] à une propriété listeCommande
            this.confirmationView = new ConfirmationView(this.listeCommande); // on  crée un objet "confirmationView" à partir de la classe "ConfirmationView" en lui fournissant comme paramètre les produits commandés
            appContainer.appendChild(this.confirmationView.render()); // et on ajoute à l'élément "app" du DOM, un élément enfant qui sera le retour du rendu de cet objet "productListView".
        }).catch(()=>{
            console.log("erreur de chargement");
        })
    }
}


/* ########## COMPOSANTS DE TRAITEMENT DES OBJETS JSON POUR LA PAGE CONFIRMATION ########## */

/* - 1 : COMPOSANT DE GÉNÉRATION DU CONTENEUR A INTEGRER AU AU DOM ##### */

class ConfirmationView { 
    constructor(listeCommande){ 
        this.listeCommande = listeCommande; // On récupère les produits commandé
        this.orderId = JSON.parse(localStorage.getItem("orderId")); //on parse les valeurs du local Storage pour supprimer les guillemets
        this.firstName = JSON.parse(localStorage.getItem("firstName")); //on parse les valeurs du local Storage pour supprimer les guillemets
        this.lastName = JSON.parse(localStorage.getItem("lastName")); //on parse les valeurs du local Storage pour supprimer les guillemets
    }
    render() { 
        const productPanierContainer = document.createElement("div"); // on crée un élément <div> du DOM qui s'appelle "productDetailContainer"
        productPanierContainer.setAttribute("class", "card-deck mb-3 text-center"); // un peu de style

        // récupération du prix total
        const prixTotal = []; // on crée le tableau qui contiendra le prix total
        for (let product of this.listeCommande){ // pour chaque produits
                    prixTotal.push(product.price); // on enregistre le prix dans le tableau 
                    //console.log(articlesPanier);//TEST 
            };
        const reducer = (accumulator, currentValue)=> accumulator + currentValue; // on crée une fonction reduce()
        const totalCommande = prixTotal.reduce(reducer); // on applique cette fonction sur les valeurs du tableau de prix pour obtenir le total de la commande
        const totalPrice = new ConvertToPrice(totalCommande).render(); // on formate le nombre obtenu en euros avec le composant ConvertToPrice


        //message de confirmation de commande
        const contactContainer = document.createElement("div"); // on crée un élément du DOM de type <div> : "contactContainer"
        contactContainer.innerHTML = `<div class="card-body"><p class="text-center">Merci ${this.firstName} ${this.lastName} pour votre commande</p><p>Identifiant à conserver:<br /> ${this.orderId} </p><p>Montant total de ${totalPrice} €</p></div>`; // cette <div> contiendra les éléments HTML remplis par les valeurs du localStorage
        contactContainer.setAttribute("class", "card mb-4 shadow-sm");// on ajoute un peu de style
        productPanierContainer.appendChild(contactContainer); // on ajoute notre message au conteneur
        
        return productPanierContainer; // on retourne le conteneur <div> avec le message complet
    }
}


/* ########## CHARGEMENT DE LA LISTE DES PRODUITS AU CHARGEMENT COMPLET DE LA PAGE ########## */

window.onload = function() {  
    const confirmation = new Confirmation(); // Création d'un nouvel objet "confirmation" à partir de la class "Confirmation"
} 