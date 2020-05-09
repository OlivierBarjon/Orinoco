const nomModele1 = document.getElementById ("nomModele1");
const prixModele1 = document.getElementById ("prixModele1");
const descripModele1 = document.getElementById ("descripModele1");
const imageModele1 = document.getElementById ("imageModele1");
const lensOption1 = document.getElementById ("lensOption1");


const nomModele2 = document.getElementById ("nomModele2");
const prixModele2 = document.getElementById ("prixModele2");
const descripModele2 = document.getElementById ("descripModele2");
const imageModele2 = document.getElementById ("imageModele2");
const lensOption2 = document.getElementById ("lensOption2");

const nom = [];
const prix = [];
const description = [];
const image = [];
const lentilles = [];
const lentilles1 = [];
const lentilles2 = [];



var request = new XMLHttpRequest(); 
request.onreadystatechange = function () { 
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { 
        const response = JSON.parse(this.responseText); 

        for (let objet of response) {
            nom.push(objet.name);
            prix.push(objet.price);
            description.push(objet.description);
            image.push(objet.imageUrl);
            lentilles.push(objet.lenses);
        }

        nomModele1.textContent=`${nom[0]}`;
        nomModele2.textContent=`${nom[1]}`;

        prixModele1.textContent=prix[0];
        prixModele2.textContent=prix[1];

        descripModele1.textContent=description[0];
        descripModele2.textContent=description[1];

        imageModele1.innerHTML=`<img class="card__body--image" src="${image[0]}" alt="nom[0]"/>`;
        imageModele2.innerHTML=`<img class="card__body--image" src="${image[1]}" alt="nom[1]"/>`;

        



    };
}
request.open("GET","http://localhost:3000/api/cameras");
request.send();


//TEST
//console.log(nom);
//console.log(prix);
//console.log(description);
//console.log(lentilles1);


