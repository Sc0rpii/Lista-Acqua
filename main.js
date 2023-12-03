var count = 0;
const url = './db/lista.json';
const buttonSubmit = document.querySelector("#submit");

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

// Function som water
function somWater(acqua) {
    return count += parseInt(acqua);
}

// Inserisci dati nell'array json
buttonSubmit.addEventListener("click", function(){
    var name = document.querySelector("#name").value;
    var room = document.querySelector("#Number_room").value;
    var water = document.querySelector("#Number_water").value;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Trova l'ID massimo attuale
            const maxId = data.length > 0 ? Math.max(...data.map(item => item.id)) : -1;

            // Crea un nuovo oggetto con un ID incrementato automaticamente
            const nuovoElemento = {
                id: maxId + 1,
                name: name,
                room: room,
                water: water
            };

            // Aggiungi il nuovo oggetto all'array
            data.push(nuovoElemento);

            // Salva l'array aggiornato nel tuo file JSON
            const jsonString = JSON.stringify(data, null, 2);

            // Effettua una richiesta per scrivere il file JSON sul server
            fetch(url, {
                method: 'PUT', // o 'POST' a seconda della tua API
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonString
            })
                .then(response => response.json())
                .then(updatedData => {
                    // Logga eventuali dati aggiornati
                    console.log(updatedData);
                })
                .catch(error => console.error('Errore nella scrittura del file JSON:', error));
        })
        .catch(error => console.error('Errore nel caricamento del file JSON:', error));
    aggiungiRiga(room, name, water);
});

//Aggiorna la tabella
function update() {

    // Fetch file json
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
}