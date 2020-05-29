
/* ########## COMPOSANT DE RECUPERATION DE L'IDENTIFIANT DU PRODUIT A PARTIR DES PARAMETRES DE L'URL ########## */

class Identifiant {
    constructor(paramUrl){
        this.paramUrl = paramUrl; // on récupère un paramètre d'url
    }
    determinId () {
        const id = this.paramUrl.split("="); // On split le paramètre d'url en utilisant "=" comme séparateur
        return id[1]; // on retourne l'id qui se situe après le "="
    }
}

/* ########## COMPOSANT DE FORMATAGE DES TARIFS ########## */

class ConvertToPrice {
    constructor (number) {
        this.number = number; // On récupère un nombre
    }
    render(){
        const num = this.number;
        const numberToString = num.toString(); //convertion en string
        const price = numberToString.replace("00", ",00"); // ajout d'une virgule avant les centimes
        return price;
    }
}

