// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
const jwt = localStorage.getItem("jwt");

if (!jwt) {
  // usamos el replace para no guardar en el historial la url anterior
  location.replace("/");
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener("load", function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */
  let btnCerrarSesion = document.getElementById("closeApp")
  let user

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    localStorage.removeItem("jwt")
    location.replace("index.html")
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  async function obtenerNombreUsuario() {
    let user;
    const apiURL = "https://ctd-todo-api.herokuapp.com/v1/users/getMe"

    const myHeader = new Headers({
      'Authorization': jwt
    });

    console.log(jwt)

    const settings = {
      method: 'GET',
      headers: myHeader,
      mode: 'cors',
      cache: 'default'
    };

    const myRequest = new Request(apiURL, settings);

    const res = await fetch(myRequest)
      .then(response => response.json())
      .then(data => {
        user = JSON.stringify(data.firstName)
        document.getElementById("userName").innerText = user
      })
  }

  obtenerNombreUsuario();


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    const url = "https://ctd-todo-api.herokuapp.com/v1/tasks",
      configuraciones = {
        method: "GET",
        headers: {
          authorization: jwt,
        },
      };

    fetch(url, configuraciones)
      .then((respuesta) => respuesta.json())
      .then((tareas) => renderizarTareas(tareas));
  }
  consultarTareas();

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  const formCrearTarea = document.forms[0];
  formCrearTarea.addEventListener("submit", function (event) {
    event.preventDefault();
    const url = "https://ctd-todo-api.herokuapp.com/v1/tasks";
    const inputDescription = document.getElementById("nuevaTarea");

    configuraciones = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: jwt,
      },
      body: JSON.stringify({
        description: inputDescription.value,
        completed: false,
      }),
    };

    inputDescription.value = "";
    inputDescription.focus();

    fetch(url, configuraciones)
      .then((response) => response.json())
      .then((data) => {
        consultarTareas();
      });
  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {

    const listadoTareasPendientes = listado.filter((item) => !item.completed)
    const listadoTareasCompletadas = listado.filter((item) => item.completed)

    listadoTareasPendientes.forEach(function (element, index) {
      const nuevoItemPendiente = document.createElement("li")
      const lista = document.getElementsByClassName("tareas-pendientes")
      lista[0].appendChild(nuevoItemPendiente)
      nuevoItemPendiente.classList.add("tarea")
      nuevoItemPendiente.innerHTML = `
      <div class="descripcion">
        <p class="nombre">${element.description}</p>
        <div class="cambios-estados">
          <button class="change completa" id="${element.id}"><i
              class="fa-solid fa-rotate-left"></i></button>
          <button class="borrar" id = "${element.id}"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      </div>
    `
      document.getElementById("cantidad-pendientes").textContent = index + 1;

    })

    listadoTareasCompletadas.forEach(function (element, index) {
      const nuevoItemTerminado = document.createElement("li")
      const lista = document.getElementsByClassName("tareas-terminadas")
      lista[0].appendChild(nuevoItemTerminado)
      nuevoItemTerminado.classList.add("tarea")
      nuevoItemTerminado.innerHTML = `
          <div class="hecha">
          <i class="fa-regular fa-circle-check"></i>
      </div>
      <div class="descripcion">
        <p class="nombre">${element.description}</p>
        <div class="cambios-estados">
          <button class="borrar" id = "${element.id}"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      </div>
    `
      document.getElementById("cantidad-finalizadas").textContent = index + 1;

    })
  }

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function cambiarEstado() {


  }

cambiarEstado(22503);



  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() { }
});
