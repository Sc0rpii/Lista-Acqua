var count = 0;

function aggiungiRiga(nStanza, nomeCognome, nCasse) {
    var table = document.getElementById("tabella").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);

    cell1.textContent = nStanza;
    cell2.textContent = nomeCognome;
    cell3.textContent = nCasse;

    count = somWater(nCasse);
    document.getElementById("counter").textContent = count; // Aggiorna il valore in HTML
}
//Function som water
function somWater(acqua){
    return count += parseInt(acqua);
}
//fetch file json
const url = './db/lista.json';

fetch(url)
    .then(response => {
    // Controlla se la risposta è positiva (status 200)
    if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
    }
    // Parsa la risposta JSON
    return response.json();
    })
    .then(data => {
    // Usa i dati ottenuti, ad esempio aggiungi elementi a una lista
    const listaDati = document.getElementById('lista-dati');
    data.forEach(item => {
        aggiungiRiga(`${item.stanza}`, `${item.name}`, `${item.n_acqua}`)   
    });
    })
    .catch(error => {
    console.error('Si è verificato un errore:', error);
    });
