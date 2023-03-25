const form = document.getElementById('form');
const enviarBtn = document.getElementById('enviar');

enviarBtn.addEventListener('click', function(e) {
    e.preventDefault(); // prevenir que se envíe el formulario automáticamente

    // verificar si todos los campos obligatorios están completos
    const nombreInput = document.getElementById('nameInput');
    const apallidoInput = document.getElementById('lastNameInput');
    const dateInput = document.getElementById('dateInput');
    const direccionInput = document.getElementById('inputAddress');
    const ciudadInput = document.getElementById('cityImput');
    const paisInput = document.getElementById('countryInput');
    const emailInput = document.getElementById('emailInput');
    const usuarioInput = document.getElementById('userInput');
    const passInput = document.getElementById('passInput');
    const passcopyInput=document.getElementById('passCopyInput')
    const checkTerms=document.getElementById('checkTerms')

    
    if (nombreInput.value === '' || apallidoInput.value === '' || dateInput.value === ''||
        direccionInput.value === '' ||ciudadInput.value === '' ||paisInput.value === '' ||
        emailInput.value === '' ||usuarioInput.value === '' ||passInput.value === '' ||
        passcopyInput.value === ''||checkTerms.value === ''){

        alert('Por favor complete todos los campos obligatorios.');
        
    } else {
    window.location.href="../html/index.html"; 
    guardarFormulario();
    }
});


function guardarFormulario() {
    // Obtener el formulario por su identificador
    var formulario = document.getElementById("form");

    // Obtener los valores de los campos del formulario
    var nombre = formulario.elements["nombre"].value;
    var apellido = formulario.elements["apellido"].value;
    var fecha = formulario.elements["fecha"].value;
    var direccion = formulario.elements["direccion"].value;
    var ciudad = formulario.elements["ciudad"].value;
    var pais = formulario.elements["pais"].value;
    var email = formulario.elements["email"].value;
    var usuario = formulario.elements["usuario"].value;
    var password = formulario.elements["password"].value;

    // Crear un objeto con los valores del formulario
    var datosFormulario = {
        nombre: nombre,
        apellido:apellido,
        fecha:fecha,
        direccion:direccion,
        ciuidad:ciudad,
        pais:pais,
        email:email,
        usuario:usuario,
        password:password

    };
  
    // Obtener los datos del localStorage o inicializar un nuevo array
    var datosGuardados = JSON.parse(localStorage.getItem("datosFormulario")) || [];
  
    // Agregar los nuevos datos al array
    datosGuardados.push(datosFormulario);
  
    // Convertir el array en una cadena JSON y almacenarla en localStorage
    localStorage.setItem("datosFormulario", JSON.stringify(datosGuardados));
  }
  