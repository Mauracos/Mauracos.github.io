function filtrarTabla() {
    const input = document.getElementById('busqueda').value.toLowerCase();
    const table = document.getElementById('datosTabla');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const dataCells = rows[i].getElementsByTagName('td');
        let found = false;

        for (let j = 0; j < dataCells.length; j++) {
            const cellValue = dataCells[j].textContent || dataCells[j].innerText;

            if (cellValue.toLowerCase().indexOf(input) > -1) {
                found = true;
                break;
            }
        }

        if (found) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

function dividirTexto() {
    const table = document.getElementById('datosTabla');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const dataCells = rows[i].getElementsByTagName('td');

        for (let j = 0; j < dataCells.length; j++) {
            const cellValue = dataCells[j].textContent || dataCells[j].innerText;

            // Divide el texto en líneas de máximo 14 caracteres
            const words = cellValue.split(' ');
            let line = '';
            let dividedText = '';

            for (const word of words) {
                if ((line + word).length <= 25) {
                    line += (line === '' ? '' : ' ') + word;
                } else {
                    dividedText += line + '<br>';
                    line = word;
                }
            }

            // Añade la última línea si es necesario
            if (line.length > 0) {
                dividedText += line;
            }

            // Establece el ancho de la celda al doble del ancho actual
            dataCells[j].style.width = (dataCells[j].offsetWidth * 2) + 'px';

            dataCells[j].innerHTML = dividedText;
        }
    }
}

window.addEventListener('load', () => {
    const table = document.getElementById('datosTabla');

    // URL de la hoja de cálculo pública
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRHXRD4APoxsI6iABawsJirCCZDPnS599d7NFf0GEPDr8JhUenwljT2nxwbhvhyB8X6trPV3xIQYAln/pubhtml';

    // Fetch de los datos de la hoja de cálculo
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const tableData = doc.querySelector('table');

            if (tableData) {
                // Elimina la primera columna (índice 0) antes de mostrar los datos
                const rows = tableData.rows;
                for (let i = 0; i < rows.length; i++) {
                    rows[i].deleteCell(0);
                }

                table.innerHTML = tableData.outerHTML;
            } else {
                table.innerHTML = '<p>No se pudo cargar la tabla de datos.</p>';
            }

            // Llama a la función para dividir el texto y ajustar el ancho de la columna
            dividirTexto();
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            table.innerHTML = '<p>Ocurrió un error al obtener los datos.</p>';
        });
});


// Función para agregar etiquetas a la búsqueda
function agregarEtiqueta(etiqueta) {
    const busquedaInput = document.getElementById('busqueda');
    busquedaInput.value = etiqueta;
    filtrarTabla();
}

window.addEventListener('load', () => {
    // Resto del código...

    // Llama a la función para dividir el texto y ajustar el ancho de la columna
    dividirTexto();

    // Agrega etiquetas de ejemplo
    const etiquetasContainer = document.getElementById('etiquetas');
    const etiquetasEjemplo = ['', '', ''];
    etiquetasEjemplo.forEach(etiqueta => {
        const etiquetaElement = document.createElement('a');
        etiquetaElement.href = '#';
        etiquetaElement.classList.add('etiqueta');
        etiquetaElement.textContent = etiqueta;
        etiquetaElement.addEventListener('click', () => agregarEtiqueta(etiqueta));
        etiquetasContainer.appendChild(etiquetaElement);
    });
});

const container = document.getElementById('container');
const backgroundImage = document.getElementById('backgroundImage');

container.addEventListener('scroll', () => {
    const scrollValue = container.scrollTop;
    const backgroundScrollSpeed = 0.3; // Puedes ajustar la velocidad según tu preferencia

    // Calcula la posición de fondo en base al scroll y la velocidad
    const backgroundPosition = `center ${scrollValue * backgroundScrollSpeed}px`;
    backgroundImage.style.backgroundPosition = backgroundPosition;
});

