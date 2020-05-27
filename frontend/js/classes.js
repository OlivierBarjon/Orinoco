
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

/* ########## COMPOSANT DE FORMATAGE DES TARIFS ########## */

class ConvertToPrice {
    constructor (number) {
        this.number = number;
    }
    render(){
        const num = this.number;
        const numberToString = num.toString(); //convertion en string
        const price = numberToString.replace("00", ",00"); // ajout d'une virgule avant les centimes
        return price;
    }
}

/* ########## COMPOSANT DE GENERATION DE LA LISTE DES ID PRODUITS A ENVOYER VIA LE FORMULAIRE ########## */

/* class ProductListId {
    constructor(listeCommande) {
        this.listeCommande = listeCommande; // a partir de la liste de produit
    }
    render(){
        const productsIdList = [];
        for (let product of this.listeCommande) {
            productsIdList.push(product._id);
         } 
         return productsIdList; // on retourne un tableau d'ids
    }
} */
