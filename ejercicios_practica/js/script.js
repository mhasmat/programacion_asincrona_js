"use strict";

console.log("----------------------------------------");
console.log("Fetch Poke JSON");

const pokeName = document.getElementById('pokeName');
const pokeTypes = document.getElementById('pokeTypes');
const pokeStats = document.getElementById('pokeStats');

// funcion para procesar la data
const procesarData = (data) => {

    pokeName.innerHTML = `<h1>${data.name.toUpperCase()}</h1>`;
    const types = data.types;
    const stats = data.stats;

    pokeTypes.innerHTML = 'Types:';
    types.forEach(tipo => {
        const typeTextElement = document.createElement('div');        
        typeTextElement.innerHTML = `<h4>${tipo.type.name}</h4>`;
        pokeTypes.appendChild(typeTextElement);
    });

    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement('span');

        const statElementName = document.createElement('th');
        statElementName.innerHTML = `<td>${stat.stat.name} ||</td>`;
        
        const statElementAmount = document.createElement('tr');
        statElementAmount.innerHTML = `<td>${stat.base_stat}</td>`;

        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

// acá va el fetch
fetch("./bulbasaur.json")
    .then(response => {
        if(response.ok) return response.json();
        return response.text().then(error => {
            throw new Error(error)
        })
    })
    .then(data => {
        procesarData(data);
    })
    .catch(error => console.log(error))
    .finally(() => console.log("Finished!"));

