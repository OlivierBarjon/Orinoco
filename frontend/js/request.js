class Request { 
    constructor() {
        this.request = new XMLHttpRequest;
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
}


