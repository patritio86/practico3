//validacion del ingreso a la pagina de compras.
function login(){
    let user,pass;
    user= document.getElementById("name").value;
    pass=document.getElementById("password").value;

    if(user=="patricio" && pass== "1986pato"){
        window.location="../html/pagina.html";
    } else{
        //swal ( "¡ Usuario o contaseña incorrecta ! " , " ...¡Intentelo nuevamente gracias! " )  ;
        swal({
            title: "Usuario o contraseña incorrecta!",
            text: "..Intentelo nuevamente gracias..",
            icon: "error",
            button: "OK"
          });
    }
}
// uso de Storage
class Guitarra{
    constructor(guitarra){
        this.id= guitarra.id;
        this.marca=guitarra.marca;
        this.precio=guitarra.precio;
        this.cantidad=guitarra.cantidad;
        this.precioTotal=guitarra.precio;
    }
    addUnit(){
        this.cantidad++;
    }
    deleteUnit(){
        this.cantidad--;
    }
    updatePrecioTotal(){
        this.precioTotal=this.precio*this.cantidad;
    }
}


