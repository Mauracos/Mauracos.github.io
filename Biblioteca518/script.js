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
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            table.innerHTML = '<p>Ocurrió un error al obtener los datos.</p>';
        });
});