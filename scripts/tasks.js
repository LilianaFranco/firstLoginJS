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
        console.log(user)
        document.getElementById("userName").innerText = user
        console.log(user.type)
      })
  }

  obtenerNombreUsuario();


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  const btnCrearTarea = document.getElementById("crearTarea");
  btnCrearTarea.addEventListener("click", function (event) { 
    
    const apiURL = "https://ctd-todo-api.herokuapp.com/v1/tasks";
    const task = JSON.stringify(document.getElementById("nuevaTarea").value)
    console.log(jwt)

    const configuraciones = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpbGlhbmFAbGlsaWFuYS5jb20iLCJpZCI6Njg0MiwiaWF0IjoxNjYzMjk3NTExfQ.2rZCRhr5yIovWAF7OactDI1sofqFaLY-8aaEPdnriZE"
      },
      body: JSON.stringify({
        description: "Aprender Javascript",
        completed: false
      })
    };
    
    const repsuestas = fetch(apiURL, configuraciones)
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        console.log(respuesta)
      });

  });

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) { }

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() { }

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() { }
});
