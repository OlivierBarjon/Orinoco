// RECUPERATION DES ELEMENTS DU DOM
const nomModele1 = document.getElementById ("nomModele1");
const prixModele1 = document.getElementById ("prixModele1");
const descripModele1 = document.getElementById ("descripModele1");
const imageModele1 = document.getElementById ("imageModele1");
const ButtonModele1 = document.getElementById ("ButtonModele1");

const nomModele2 = document.getElementById ("nomModele2");
const prixModele2 = document.getElementById ("prixModele2");
const descripModele2 = document.getElementById ("descripModele2");
const imageModele2 = document.getElementById ("imageModele2");
const ButtonModele2 = document.getElementById ("ButtonModele2");

const nomModele3 = document.getElementById ("nomModele3");
const prixModele3 = document.getElementById ("prixModele3");
const descripModele3 = document.getElementById ("descripModele3");
const imageModele3 = document.getElementById ("imageModele3");
const ButtonModele3 = document.getElementById ("ButtonModele3");

const nomModele4 = document.getElementById ("nomModele4");
const prixModele4 = document.getElementById ("prixModele4");
const descripModele4 = document.getElementById ("descripModele4");
const imageModele4 = document.getElementById ("imageModele4");
const ButtonModele4 = document.getElementById ("ButtonModele4");

const nomModele5 = document.getElementById ("nomModele5");
const prixModele5 = document.getElementById ("prixModele5");
const descripModele5 = document.getElementById ("descripModele5");
const imageModele5 = document.getElementById ("imageModele5");
const ButtonModele5 = document.getElementById ("ButtonModele5");

// AJOUT DES ELEMENTS DE LA BDD A LA PAGE
var request = new XMLHttpRequest(); 
request.onreadystatechange = function () { 
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { 
        const response = JSON.parse(this.responseText); 

        nomModele1.textContent=`${response[0].name}`;
        nomModele2.textContent=`${response[1].name}`;
        nomModele3.textContent=`${response[2].name}`;
        nomModele4.textContent=`${response[3].name}`;
        nomModele5.textContent=`${response[4].name}`;

        prixModele1.textContent=`${response[0].price}`;
        prixModele2.textContent=`${response[1].price}`;
        prixModele3.textContent=`${response[2].price}`;
        prixModele4.textContent=`${response[3].price}`;
        prixModele5.textContent=`${response[4].price}`;

        descripModele1.textContent=`${response[0].description}`;
        descripModele2.textContent=`${response[1].description}`;
        descripModele3.textContent=`${response[2].description}`;
        descripModele4.textContent=`${response[3].description}`;
        descripModele5.textContent=`${response[4].description}`;

        imageModele1.innerHTML=`<img class="card-img-top card__body--image" src="${response[0].imageUrl}" alt="${response[0].name}"/>`;
        imageModele2.innerHTML=`<img class="card-img-top card__body--image" src="${response[1].imageUrl}" alt="${response[1].name}"/>`;
        imageModele3.innerHTML=`<img class="card-img-top card__body--image" src="${response[2].imageUrl}" alt="${response[2].name}"/>`;
        imageModele4.innerHTML=`<img class="card-img-top card__body--image" src="${response[3].imageUrl}" alt="${response[3].name}"/>`;
        imageModele5.innerHTML=`<img class="card-img-top card__body--image" src="${response[4].imageUrl}" alt="${response[4].name}"/>`;

        ButtonModele1.innerHTML=`<a href="produit.html?ID=${response[0]._id}" type="button" class="btn btn-lg btn-outline-primary">Fiche produit ${response[0].name} </a>`;
        ButtonModele2.innerHTML=`<a href="produit.html?ID=${response[1]._id}" type="button" class="btn btn-lg btn-outline-primary">Fiche produit ${response[1].name} </a>`;
        ButtonModele3.innerHTML=`<a href="produit.html?ID=${response[2]._id}" type="button" class="btn btn-lg btn-outline-primary">Fiche produit ${response[2].name} </a>`;
        ButtonModele4.innerHTML=`<a href="produit.html?ID=${response[3]._id}" type="button" class="btn btn-lg btn-outline-primary">Fiche produit ${response[3].name} </a>`;
        ButtonModele5.innerHTML=`<a href="produit.html?ID=${response[4]._id}" type="button" class="btn btn-lg btn-outline-primary">Fiche produit ${response[4].name} </a>`;

        //TEST
        console.table(response);
        console.log(response.length);

         };
    }
request.open("GET","http://localhost:3000/api/cameras");
request.send();
