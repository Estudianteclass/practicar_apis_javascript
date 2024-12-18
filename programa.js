const promise = (num) => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(num);
        }, 2000);
    });
};

promise(7)
    .then((num) => {
        return promise(3 + num);
    })
    .then((num) => console.log(num));
///////////////////////////////////////////////////////
function crearElemento(elemento) {
    return document.createElement(elemento);

}

let caja = document.getElementById("contenido");
const url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum";
const promesa = fetch(url)
promesa.then((response) => response.text())
    .then(data => {


        let json = JSON.parse(data);
        console.log(json);
        console.log(json.drinks[2].strDrink);
        for (const element of json.drinks) {
            let title = crearElemento("h3");
            title.innerText = element.strDrink;
            caja.appendChild(title)
            let foto = crearElemento("img");
            foto.setAttribute("src", element.strDrinkThumb);
            caja.appendChild(foto);
        }
    });

