// Configuración de Firebase
var firebaseConfig = {
    apiKey: "AIzaSyD_j2Jy6o4OmTsWmxLQs0NdCtTnDDxsMAw",
    authDomain: "mi-apk-f222c.firebaseapp.com",
    databaseURL: "https://mi-apk-f222c.firebaseio.com",
    projectId: "mi-apk-f222c",
    storageBucket: "mi-apk-f222c.appspot.com",
    messagingSenderId: "654476654154",
    appId: "1:654476654154:web:...",
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var datosGuardadosDiv = document.getElementById("datosGuardados");
var inputDato = document.getElementById("inputDato");

// Función para mostrar la fecha en el formato deseado
function getFormattedDate() {
    var now = new Date();
    var day = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

// Escuchar el evento Enter en el input
inputDato.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        var datoIngresado = inputDato.value;
        var fechaHora = getFormattedDate();
        var nuevoDato = {
            dato: datoIngresado,
            fechaHora: fechaHora,
        };

        // Guardar el dato en Firebase
        var newDatoKey = database.ref().child("mensajes").push().key;
        var updates = {};
        updates["/mensajes/" + newDatoKey] = nuevoDato;
        database.ref().update(updates);

        inputDato.value = ""; // Limpiar el input

        // Mostrar el dato en la lista
        var datoElement = document.createElement("div");
        datoElement.textContent = `${datoIngresado} - ${fechaHora}`;
        datosGuardadosDiv.insertBefore(datoElement, datosGuardadosDiv.firstChild);
    }
});

// Obtener y mostrar datos almacenados en Firebase al cargar la página
database.ref("mensajes").on("child_added", function (snapshot) {
    var dato = snapshot.val().dato;
    var fechaHora = snapshot.val().fechaHora;
    var datoElement = document.createElement("div");
    datoElement.textContent = `${dato} - ${fechaHora}`;
    datosGuardadosDiv.appendChild(datoElement);
});
