/* ########## REQUETE PRINCIPALE ########## */

class Request { 
    constructor() {
        this.request = new XMLHttpRequest; // nouvel objet AJAX
    }

    get(url) {
        this.request.open("GET", url, true); // on paramètre la requête
        const promise = new Promise((resolve, reject) =>{// on crée une promesse de résultat 
            this.request.onreadystatechange = function(){// on exécute une condition sur le gestionnaire d'évènement de l'objet request :
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { // si l'opération est complète et que le code de status http = 200
                    resolve(this.responseText) // on récupère la réponse à traiter avec .then
                }
                if (this.status >399) { // si le code de status http = 400 ou plus...
                    reject(); // on traite avec .catch
                }
            };
        }); 
        this.request.send(); // on envoi de la requête
        return promise // on retourne cette promesse
    }

    post(url, body){
        this.request.open("POST", url); // on paramètre la requête
        this.request.setRequestHeader("Content-Type", "application/JSON"); // on crée l'entête (header)
        const promise = new Promise((resolve, reject) => { // on crée une promesse de résultat 
            this.request.onreadystatechange = function(){ // on exécute une condition sur le gestionnaire d'évènement de l'objet request :
                if (this.readyState == XMLHttpRequest.DONE && this.status >= 200 && this.status <= 300) { // si l'opération est complète et que le code de status http est du type 2XX ou 300
                    resolve(this.responseText) // on récupère la réponse à traiter avec .then
                }
                if (this.status >399) { // si le code de status http = 400 ou plus...
                    reject(); // on traite avec .catch
                }
            };
        });
        this.request.send(JSON.stringify(body)); //on envoi la requête avec notre body stringifié
        return promise // on retourne cette promesse
    } 
}
