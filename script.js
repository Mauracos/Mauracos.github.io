// Configuración de Firebase
var firebaseConfig = {
    apiKey: "AIzaSyD_j2Jy6o4OmTsWmxLQs0NdCfTnDDxsMAw",
    authDomain: "mi-apk-f222c.firebaseapp.com",
    databaseURL: "https://mi-apk-f222c.firebaseio.com",
    projectId: "mi-apk-f222c",
    storageBucket: "mi-apk-f222c.appspot.com",
    messagingSenderId: "654476654154",
    appId: "1:654476654154:web:XXXXXXXXXXXXXXXXXX" // Este valor debe corresponder a tu App ID real
};

firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos
var database = firebase.database();

function checkEnter(event) {
    if (event.keyCode === 13) {
        // Captura el texto ingresado
        var dato = document.getElementById("datoInput").value;
        
        // Obtén la fecha y hora actual
        var currentDate = new Date();
        var formattedDate = currentDate.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        });
        var formattedTime = currentDate.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Guarda el dato en Firebase
        var newMessageRef = database.ref('mensajes').push();
        newMessageRef.set({
            texto: dato,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        // Limpia el campo de entrada
        document.getElementById("datoInput").value = "";
    }
}

// Recupera y muestra los datos de Firebase
var messagesRef = database.ref('mensajes');
messagesRef.orderByChild('timestamp').on('child_added', function(snapshot) {
    var message = snapshot.val();
    var messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.innerHTML = '<div class="text">' + message.texto + '</div>' +
                            '<div class="timestamp">' + formatTimestamp(message.timestamp) + '</div>';
    
    // Inserta los mensajes al principio de la lista
    var messagesContainer = document.getElementById("messages");
    messagesContainer.insertBefore(messageDiv, messagesContainer.firstChild);
});

function formatTimestamp(timestamp) {
    var date = new Date(timestamp);
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 al mes ya que en JavaScript los meses comienzan desde 0
    var year = date.getFullYear().toString().substring(2); // Obtenemos los últimos dos dígitos del año

    return hours + ':' + minutes + ' - ' + day + '-' + month + '-' + year;
}

// Esta función se ejecutará cuando el documento esté listo
document.addEventListener("DOMContentLoaded", function () {
    // Enfocar automáticamente el campo de ingreso de texto
    var datoInput = document.getElementById("datoInput");
    datoInput.focus();
});

function clearMessages() {
    var messagesContainer = document.getElementById("messages");
    while (messagesContainer.firstChild) {
        messagesContainer.removeChild(messagesContainer.firstChild);
    }

    // Elimina todos los datos de Firebase
    var messagesRef = database.ref('mensajes');
    messagesRef.remove();
}

function confirmClear() {
    var confirmed = confirm("¿Estás seguro de que deseas borrar los datos anteriores  de la base datos, esta accion es irreversible?");
    if (confirmed) {
        clearMessages();
    }
}

// esto es para buscar

function filterMessages() {
    var searchInput = document.getElementById("globalSearch");
    var keyword = searchInput.value.trim().toLowerCase();
    var messages = document.getElementsByClassName("message");

    for (var i = 0; i < messages.length; i++) {
        var message = messages[i];
        var messageText = message.querySelector(".text");
        var messageTextLower = messageText.textContent.toLowerCase();
        
        if (messageTextLower.includes(keyword)) {
            // Resaltar la palabra coincidente en amarillo
            var highlightedText = messageText.textContent.replace(
    new RegExp(keyword, 'gi'),
    '<span class="highlight">$&</span>'
);
messageText.innerHTML = highlightedText; // Asegúrate de que se actualice el contenido HTML del mensaje

            messageText.innerHTML = highlightedText;
            message.style.display = "block";
        } else {
            message.style.display = "none";
        }
    }
}


//exportar a excel
function exportToExcel() {
    var messages = document.getElementsByClassName("message");
    var data = [];

    for (var i = 0; i < messages.length; i++) {
        var messageText = messages[i].querySelector(".text").textContent;
        var currentDateTime = new Date();
        
        // Obtener hora y formatear como HH:MM
        var formattedTime = `${currentDateTime.getHours().toString().padStart(2, '0')}:${currentDateTime.getMinutes().toString().padStart(2, '0')}`;
        
        // Obtener fecha y formatear como DD-MM-AA
        var formattedDate = `${currentDateTime.getDate().toString().padStart(2, '0')}-${(currentDateTime.getMonth() + 1).toString().padStart(2, '0')}-${currentDateTime.getFullYear().toString().substr(-2)}`;
        
        data.push([messageText, formattedTime, formattedDate]);
    }

    var ws = XLSX.utils.aoa_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Mensajes");

    var currentDateTime = new Date();
    var formattedDate = `${currentDateTime.getDate().toString().padStart(2, '0')}-${(currentDateTime.getMonth() + 1).toString().padStart(2, '0')}-${currentDateTime.getFullYear().toString().substr(-2)}`;
    var formattedTime = `${currentDateTime.getHours().toString().padStart(2, '0')}:${currentDateTime.getMinutes().toString().padStart(2, '0')}`;
    var fileName = `Reservas_${formattedDate}--${formattedTime}.xlsx`;

    XLSX.writeFile(wb, fileName);
}