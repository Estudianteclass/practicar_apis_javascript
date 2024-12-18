/*const promise = (num) => {

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
    .then((num) => console.log(num));*/
///////////////////////////////////////////////////////
function crearElemento(elemento) {
    return document.createElement(elemento);

}
let grid = document.getElementById("grid");
let contenido = document.getElementById("contenido");
function generarTarjeta(nombre, foto, numero) {
    let col = document.createElement("div");
    col.setAttribute("class", "col");
    let contenedor = document.createElement("div");
    contenedor.setAttribute("class", "card shadow-lg bg-dark text-white border-bottom");
    contenedor.style.width = "18:rem";
    let img = document.createElement("img");
    img.setAttribute("class", "card-img-top");
    img.setAttribute("src", foto);

    let cajaTexto = document.createElement("div");
    cajaTexto.setAttribute("class", "card-body d-flex flex-column");
    let titulo = document.createElement("h5");
    titulo.setAttribute("class", "card-title");
    titulo.innerText = nombre;
    let texto = document.createElement("p");
    texto.setAttribute("class", "card-text");
    texto.innerText = "Código: " + numero;
    let boton = document.createElement("input");
    boton.setAttribute("type", "button");
    boton.setAttribute("class", "btn btn-dark mt-auto align-self-start btn-outline-danger text-white");
    boton.value = "Añadir pedido";
    cajaTexto.appendChild(titulo);
    cajaTexto.appendChild(texto);
    cajaTexto.appendChild(boton);
    boton.addEventListener('click', (e) => {
        if (!localStorage.getItem("listaCompras")) {
            let lista = [];
            let producto = nombre;
            let codProducto = numero;
            let bebida = {
                nom: producto,
                codigo: codProducto
            }
            lista.push(bebida);
            localStorage.setItem("listaCompras", JSON.stringify(lista));
        
        } else {

            let lista = JSON.parse(localStorage.getItem("listaCompras"));
            let producto = nombre;
            let codProducto = numero;
            let bebida = {
                nom: producto,
                codigo: codProducto
            }
            lista.push(bebida);
            localStorage.setItem("listaCompras", JSON.stringify(lista));
        }

    });
    contenedor.appendChild(img);
    contenedor.appendChild(cajaTexto);
    col.appendChild(contenedor);
    return col;
}

if(localStorage.getItem("listaCompras")){
console.log("lista creada")
let arr=JSON.parse(localStorage.getItem("listaCompras"));
    console.log(arr);
}else{
    console.log("lista vacia")
}

const url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum";
const promesa = fetch(url)
promesa.then((response) => response.text())
    .then(data => {
        //instrucciones


        let json = JSON.parse(data);
        console.log(json);
        console.log(json.drinks[2].strDrink);
        for (const element of json.drinks) {

            let tarjeta = generarTarjeta(element.strDrink, element.strDrinkThumb, element.idDrink);
            grid.appendChild(tarjeta);
        }
    });

let offCanvas=document.getElementById("contenidoCarro");
if(localStorage.getItem("listaCompras")){
    console.log("lista creada")
    let arr=JSON.parse(localStorage.getItem("listaCompras"));
       for (const element of arr) {
      let parrafo1=document.createElement("p");
      let parrafo2=document.createElement("p");
      parrafo1.innerText="Producto: "+element.nom+", Codigo: "+element.codigo;
      //parrafo2.innerText=element.codigo;
      offCanvas.append(parrafo1);
       }
    }else{
        console.log("lista vacia")
    }