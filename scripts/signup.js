window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const form = document.forms[0];

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    const inputNombre = document.getElementById("inputNombre");
    const inputApellido = document.getElementById("inputApellido");
    const inputEmail = document.getElementById("inputEmail");
    const inputPassword = document.getElementById("inputPassword");
    const inputPasswordRepetida = document.getElementById('inputPasswordRepetida');
    event.preventDefault();

    const usuario = {
      firstName: inputNombre.value,
      lastName: inputApellido.value,
      email: inputEmail.value,
      password: inputPassword.value,
    };

    realizarRegister(usuario)
    
  });


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(settings) {
    const apiURL = "https://ctd-todo-api.herokuapp.com/v1/users";

    const configuraciones = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    };
    
    fetch(apiURL, configuraciones)
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        if (respuesta.jwt) {
          localStorage.setItem("jwt", respuesta.jwt);
          location.replace("\index.html");
        }
      });
  }
});

