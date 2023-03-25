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
fetch('../json/data.json')
  .then(response => response.json())
  .then(data => {
    jsonData = data;
    jsonData.forEach((prod) => {
  // código para mostrar los productos   
  jsonData.forEach((prod) => {
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
    });
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
      //agrego de la libreria sweet alert como un objeto.
      swal({
        title: "Producto Agregado!",
        text: `${prod.nombre}`,
        icon: "success",
        button: "OK"
      });
    });
  }else{
    const item=jsonData.find((element)=>element.id===id)
    //envio al carrito 
    carrito.push(item);
    swal({
      title: "Producto Agregado!",
      text: `${item.nombre}`,
      icon: "success",
      button:"OK"
    });
  }
  mostrarCarrito();
}

function eliminarProducto(id){
    const guitarraId=id;
    carrito=carrito.filter((guitar)=>guitar.id!==guitarraId)
    mostrarCarrito()
    
}


// creo el boton comprar y agrego un alert que dice compra exitosa.
document.getElementById("btnComprar").addEventListener("click",function(){
  swal({title: "compra exitosa!",
        icon: "success",
        });
        then(function(){
          vaciarCarrito();
        })
}) 
 


//funcion que gurda en el localStorage
function gaurdarStorage(){
    localStorage.setItem("carrito",JSON.stringify(carrito));
}
