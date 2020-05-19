class Request { 
    constructor() {
        this.request = new XMLHttpRequest;

    }

    get(url) {
        this.request.open("GET", url, true);
        const promise = new Promise((resolve, reject) =>{
            this.request.onreadystatechange = function(){
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    resolve(this.responseText)
                }
                if (this.status >399) {
                    reject();
                }
            };
        });
        this.request.send();
        return promise
    }
}


