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

// Function som water
function somWater(acqua) {
    return count += parseInt(acqua);
}

function update() {
    // Fetch file json
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
}

// Inserisci dati nell'array json
document.querySelector("#submit").addEventListener("click", function () {
    var name = document.querySelector("#name").value;
    var room = document.querySelector("#Number_room").value;
    var water = document.querySelector("#Number_water").value;

    fetch('./db/lista.json')
        .then(response => response.json())
        .then(data => {
            // Se l'array è vuoto, inizializzalo con un nuovo elemento
            if (data.length === 0) {
                data = [{
                    id: 0,
                    stanza: room,
                    name: name,
                    nCasse: water
                }];
            } else {
                // Trova l'ID massimo attuale
                const maxId = Math.max(...data.map(item => item.id));

                // Aggiungi un nuovo elemento con un ID automatico
                const nuovoElemento = {
                    id: maxId + 1,
                    stanza: room,
                    name: name,
                    nCasse: water
                };

                // Aggiungi il nuovo elemento all'array
                data.push(nuovoElemento);
            }

            // Salva l'array aggiornato nel tuo file JSON
            const jsonString = JSON.stringify(data, null, 2);

            // Effettua una richiesta per scrivere il file JSON sul server
            fetch('./db/lista.json', {
                method: 'POST', // o 'PUT' a seconda della tua API
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonString
            })
                .then(response => response.json())
                .then(updatedData => {
                    // Logga eventuali dati aggiornati
                    console.log(updatedData);

                    // Esegui l'aggiornamento nell'interfaccia dopo che il file è stato modificato
                    update();
                })
                .catch(error => console.error('Errore nella scrittura del file JSON:', error));
        })
        .catch(error => console.error('Errore nel caricamento del file JSON:', error));
        update();
});