
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



    