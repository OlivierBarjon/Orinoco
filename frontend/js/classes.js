
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





    