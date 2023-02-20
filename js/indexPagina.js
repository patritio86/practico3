// cracion del array de stock de los productos
const stockProductos = [
    {
      id: 1,
      nombre: "Esp James Hetfield",
      cantidad: 1,
      desc: "Guitarra Esp metallica",
      precio: 1200,
      img: "../imagenes/esp.jpg",
    },
    {
      id: 2,
      nombre: "Esp Cola de tiburon",
      cantidad: 1,
      desc: "Guitarra modelo Kirk hammet",
      precio: 1500,
      img: "../imagenes/esp1.jpg",
    },
    {
      id: 3,
      nombre: "Gipson Les Paul",
      cantidad: 1,
      desc: "Guitarra de 6 cuerda ",
      precio: 1570,
      img: "../imagenes/gibson.jpg",
    },
    {
      id: 4,
      nombre: "Ibanez RG160",
      cantidad: 1,
      desc: "guitarra de 6 cuerdas con tremolo",
      precio: 1000,
      img: "../imagenes/ibanez.jpg",
    },
    {
      id: 5,
      nombre: "Ibanez RGAR42 ",
      cantidad: 1,
      desc: "Guitarra japoneza de 6 cuerdas con tremolo",
      precio: 1200,
      img: "../imagenes/ibanez1.jpg",
    },
    {
      id: 6,
      nombre: "jackson Esp",
      cantidad: 1,
      desc: "Guitarra 6 cuerdas negra ",
      precio: 1200,
      img: "../imagenes/jackson.jpg",
    },
    {
      id: 7,
      nombre: "jackson R-10",
      cantidad: 1,
      desc: "Guitarra de 6 con puete fijo",
      precio: 1400,
      img: "../imagenes/jackson2.jpg",
    },
    {
      id: 8,
      nombre: "stramberg boden",
      cantidad: 1,
      desc: "Guitarra ergonomica de 6 cuerdas",
      precio: 1200,
      img: "../imagenes/stramberg.jpg",
    },
    {
      id: 9,
      nombre: "Fender Stratocaster",
      cantidad: 1,
      desc: "Guitarra clasica",
      precio: 1400,
      img: "../imagenes/strato.jpg",
    },
    {
      id: 10,
      nombre: "Fender Telecaster",
      cantidad: 1,
      desc: "Guitarra clasica de 6 cuerdas",
      precio: 1200,
      img: "../imagenes/telecaster.jpg",
    },
  ];

// creo el carrito vacio
  let carrito=[];


const contenedor = document.querySelector("#contenedor");

//hace que el numero que esta en el icono del carrito incremente la cantidad de productos dentro del mismo
//y lo agrego en mostrar carrito. Este se encuentra en el html con el id= carritoContenedor.
const carritoContenedor=document.querySelector('#carritoContenedor');

//creamos la constante vaciar carrito y lo unimos con el id viciarCarrito del html.
const vaciarCarrito=document.querySelector("#vaciarCarrito")

//creamos la constate precioTotal 
const precioTotal=document.querySelector('#precioTotal')


stockProductos.forEach((prod) => {
    //realizo una desestructuracion de los objetos
    const {id, nombre, precio, desc, img, cantidad}= prod;
    //inyecto al html utilizo un bootstrap
    contenedor.innerHTML+=`
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `
});


//agrego un addlisener porque cuando actualizo pierdo la informacion del carrito.
// para no perder el contenido del carrito se dirige al storage 
//y trae la informacion que teniamos y lo muestra en un html. y si el usuario no cargo nada va ha mostar un null
// para solucionar ese problema se utiliza un array vacio al final.
document.addEventListener('DOMContentLoaded',()=>{
  carrito=JSON.parse(localStorage.getItem('carrito'))|| []
  mostrarCarrito();
})

// Creamos la funcion anonima vaciar carrito pero primero el evento.
vaciarCarrito.addEventListener('click',()=>{
  carrito.length=[];
  mostrarCarrito();
})



const mostrarCarrito=()=>{
    const modalBody = document.querySelector('.modal .modal-body')
    
    modalBody.innerHTML=''// es para poder actualizar el carrito y no repetir los productos
        carrito.forEach((prod)=>{
        const {id, nombre, img, desc, cantidad, precio}= prod
        //inyecto al html con bootstrap
        modalBody.innerHTML+=`
        <div class="modal-contenedor"> 
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
        `
    })
    if(carrito.length===0){
      //agreo un parrafo el html modalBody
      modalBody.innerHTML=`
      <p class="text-center text-primary parrofo">¡Carrito vacio!<p/>
      `
//console.log('no hay nada')lo utilizo para ver si esta funcionando cuando cargo y elimino el producto del carrito.
    }

    //carritoContenedor me hace funcionar la cantidad de productos que hay en el carrito.
    carritoContenedor.textContent=carrito.length;
    //utilizo el reduce para realizar el calculo del precio total siempre recordar de inicar el acumulador en cero.
    precioTotal.textContent= carrito.reduce((acc,prod)=>acc+prod.cantidad *prod.precio,0 )
    gaurdarStorage();
}


// corroboro que el agregar producto seleccione bien el id.
function agregarProducto(id){
  const existe=carrito.some(prod => prod.id===id);// lo que hace es verificar si el producto existe en el carrito o no por eso utilizo some.
  if(existe){
    // con el metodo map creo un nuevo array.
    const prod= carrito.map(prod=>{
      if(prod.id===id){
        prod.cantidad++
      }
    })
  }else{
    const item=stockProductos.find((element)=>element.id===id)
    //envio al carrito 
    carrito.push(item)
  }
  
  mostrarCarrito()
}

function eliminarProducto(id){
    const guitarraId=id;
    carrito=carrito.filter((guitar)=>guitar.id!==guitarraId)
    mostrarCarrito()
    
}

//funcion que gurda en el localStorage
function gaurdarStorage(){
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

