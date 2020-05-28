// REQUETE PRINCIPALE

class Request { 
    constructor() {
        this.request = new XMLHttpRequest; // AJAX
    }

    get(url) {
        this.request.open("GET", url, true); 
        const promise = new Promise((resolve, reject) =>{// on crée une promesse de résultat 
            this.request.onreadystatechange = function(){// on exécute une condition sur le gestionnaire d'évènement de l'objet request
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    resolve(this.responseText) // (à traiter avec .then)
                }
                if (this.status >399) {
                    reject(); // (à traiter avec .catch)
                }
            };
        }); 
        this.request.send();
        return promise // on retourne cette promesse
    }

    post(url, body){
        this.request.open("POST", url);
        this.request.setRequestHeader("Content-Type", "application/JSON"); //Création de l'entête (header)
        const promise = new Promise((resolve, reject) => {// on crée une promesse de résultat
            this.request.onreadystatechange = function(){
                if (this.readyState == XMLHttpRequest.DONE && this.status >= 200 && this.status <= 300) {
                    resolve(this.responseText) // (à traiter avec .then)
                }
                if (this.status >399) {
                    reject(); // (à traiter avec .catch)
                }
            };
        });
        this.request.send(JSON.stringify(body)); //on envoi notre objet JS en chaîne JSON
        return promise // on retourne cette promesse
    } 
}
