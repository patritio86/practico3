function validarUsuario() {
    // Obtener los datos del localStorage
    const datosGuardados = JSON.parse(localStorage.getItem("datosFormulario")) || [];
    
    // Obtener los valores de los campos de usuario y contraseña
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
  
    // Iterar sobre el array de objetos y buscar coincidencias
    for (const { usuario: usuarioActual, password: passwordActual } of datosGuardados) {
      if (usuario === usuarioActual && password === passwordActual) {
        // Si se encuentra una coincidencia, redireccionar al usuario a la página de inicio
        window.location.href = "../html/pagina.html";
        return;
      }
    }
  
    // Si no se encuentra ninguna coincidencia, mostrar un mensaje de error
    swal({
        title: "Usuario o contraseña incorrecta!",
        text: "..Intentelo nuevamente gracias..",
        icon: "error",
        button: "OK"
      });
  }
  