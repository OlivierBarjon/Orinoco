
/* ########## COMPOSANT DE RECUPERATION DE L'IDENTIFIANT DU PRODUIT A PARTIR DE LA CHAINE DES PARAMETRES DE L'URL ########## */

class Identifiant {
    constructor(paramUrl){
        this.paramUrl = paramUrl;
    }
    determinId () {
        const id = this.paramUrl.split("="); // On split ce paramètre d'url en utilisant le "=" comme séparateur
        return id[1]; // on retourne l'id qui se situe après le "="
    }
}

/* ########## FONCTION D'ENVOIE DE LA COMMANDE VIA LE FORMULAIRE ########## */


/* class Commande {
    constructor(products) {
        this.products = products;
    }
    
    post() { 
        const products = [];
        if (localStorage.length >0) {
            for (let product of this.products){ // pour chaque produits
                if (localStorage.getItem(product.name)){ // si le produit est dans le localStorage
                    products.push(product._id);
                }
            };
        } 
        const contact = {
            firstName : "",
            lastName : "",
            adresse : "",
            city : "",
            email : ""
        };
        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const adresse = document.getElementById("adresse");
        const city = document.getElementById("city");
        const email = document.getElementById("email");
        const submitBtn = document.getElementById("submitBtn");
    
        fistName.addEventListener("change", (event) =>{
            contact.firstName = event.target.value;
        });
        lastName.addEventListener("change", (event) =>{
            contact.lasttName = event.target.value;
        });
        adresse.addEventListener("change", (event) =>{
            contact.adresse = event.target.value;
        });
        city.addEventListener("change", (event) =>{
            contact.city = event.target.value;
        });
        email.addEventListener("change", (event) =>{
            contact.email = event.target.value;
        });

        const data = {
            products : products,
            contact : contact
        };

        submitBtn.addEventListener("click", (event) => {
            var request = new XMLHttpRequest();
            request.open("POST", "http://localhost:3000/api/cameras");
            request.send(products, contact);
        });
    }
} */

