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

let offCanvas = document.getElementById("contenidoCarro");
let grid = document.getElementById("grid");
let contenido = document.getElementById("contenido");

let compras = [];

//Funciones para utilizar
//innecesaria
function buscar(identificador, array) {
    if (array.length > 0 && array.find((producto) => producto.codigo == identificador)) {

        return true;
    } else {
        return false;
    }

}

function crearElemento(elemento) {
    return document.createElement(elemento);

}

//funcion innecesaria
function actualizaOffCanvas(compras) {
    for (const element of compras) {
        let parrafo1 = document.createElement("p");
        // let parrafo2 = document.createElement("p");
        parrafo1.innerText = "Producto: " + element.nom + ", Codigo: " + element.codigo + ", Cantidad: " + element.cantidad;
        //parrafo2.innerText=element.codigo;
        offCanvas.append(parrafo1);
    }


}


function generarTabla(array) {
    let tabla = document.createElement("table");
    tabla.innerHTML = "<thead><th>Código</th><th>Producto</th><th>Cantidad</th></thead>";
    tabla.setAttribute("class", "table text-center");
    for (const element of array) {
        let fila = document.createElement("tr");
        let codigo = document.createElement("td");
        let producto = document.createElement("td");
        let cantidad = document.createElement("td");
        codigo.textContent = element.codigo;
        producto.textContent = element.nom;
        cantidad.textContent = element.cantidad;
        fila.appendChild(codigo);
        fila.appendChild(producto);
        fila.appendChild(cantidad);
        tabla.appendChild(fila);
    }
    return tabla;
}


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
    boton.role = "button";
    boton.value = "Añadir pedido";
    cajaTexto.appendChild(titulo);
    cajaTexto.appendChild(texto);
    cajaTexto.appendChild(boton);
    boton.addEventListener('click', (e) => {
        let encontrado = compras.find((producto) => producto.codigo == numero);
        let bebida = {
            nom: nombre,
            codigo: numero,
            cantidad: 1
        }
        if (encontrado) {
            encontrado.cantidad++;
            offCanvas.innerHTML = "";
            let tabla = generarTabla(compras);
            offCanvas.appendChild(tabla);
        } else {
            compras.push(bebida);
            if (localStorage.getItem("listaCompras")) {
                offCanvas.innerHTML = "";
                for (const element of compras) {
                    offCanvas.innerHTML = "";
                    offCanvas.append(parrafo1);
                    let tabla = generarTabla(compras);
                    offCanvas.appendChild(tabla);

                }
            }

        }





        if (!localStorage.getItem("listaCompras")) {
            let lista = [];
            let producto = nombre;
            let codProducto = numero;
            let bebida = {
                nom: producto,
                codigo: codProducto,
                cantidad: 1
            }
            lista.push(bebida);
            localStorage.setItem("listaCompras", JSON.stringify(lista));

        } else {

            compras = JSON.parse(localStorage.getItem("listaCompras"));
            let producto = nombre;
            let codProducto = numero;
            let bebida = {
                nom: producto,
                codigo: codProducto,
                cantidad: 1
            }
            let encontrado = compras.find((producto) => producto.codigo == numero);
            if (encontrado) {
                encontrado.cantidad++;
            } else {
                compras.push(bebida);

            }

            localStorage.setItem("listaCompras", JSON.stringify(compras));
        }

    });
    contenedor.appendChild(img);
    contenedor.appendChild(cajaTexto);
    col.appendChild(contenedor);
    return col;
}

if (localStorage.getItem("listaCompras")) {
    console.log("lista creada")
    let arr = JSON.parse(localStorage.getItem("listaCompras"));
    console.log(arr);
} else {
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


if (localStorage.getItem("listaCompras")) {
    console.log("lista creada")
    compras = JSON.parse(localStorage.getItem("listaCompras"));


    let tabla = generarTabla(compras);
    offCanvas.appendChild(tabla);


} else {
    console.log("lista vacia")
}
//consultas para imprimir 

/* 
https://stackoverflow.com/questions/1247040/how-does-the-javascript-print-function-work-can-i-create-a-document-using-javas
https://developer.mozilla.org/en-US/docs/Web/API/Window/print
https://stackoverflow.com/questions/2255291/print-the-contents-of-a-div

*/
let botonFactura = document.getElementById("imprimir");
function imprimirFactura() {
let contenido=document.getElementById("contenidoCarro");
    let iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow.document || iframe.contentDocument;
    doc.open();
    doc.write(`
        <html>
            <head>
                <title>Factura</title>
                <style>
                
                    body { font-family: Arial, sans-serif; margin: 20px; }
                </style>
            </head>
            <body>
                ${contenido.innerHTML}
            </body>
        </html>
    `);
    doc.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    setTimeout(() => {
        document.body.removeChild(iframe);
    }, 1000);

}

botonFactura.addEventListener('click',imprimirFactura);