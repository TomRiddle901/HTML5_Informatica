var categorie = [];

function caricaJson(){
    fetch('paniere_istat.json')
    .then(r => r.json())
    .then(data => {
        categorie = data.categorie;
        popolaSelectCategorie();
    })
}

function popolaSelectCategorie(){
    var selectCategoria = document.getElementById("categoria_select");
    selectCategoria.innerHTML = "";

    var optDefault = document.createElement("option");
    optDefault.text = "Seleziona categoria";
    optDefault.value = "seleziona";
    selectCategoria.add(optDefault);

    for (var i = 0; i < categorie.length; i++){
        var elOption = document.createElement("option");
        elOption.text = categorie[i].nome;
        elOption.value = i.toString();
        selectCategoria.add(elOption);
    }
}

function creaGraficoCategoria(indice){
    if (indice === ""){
        console.error("Indice categoria non valido");
        return;
    }

    const sottocat = categorie[indice].sottocategorie;
    const labels = sottocat.map(s => s.nome);
    const dati = sottocat.map(s => s.spesa_media);

    const context = document.getElementById("grafico").getContext("2d");

    if (chart){
        chart.destroy();
    }

    chart = new Chart(context, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: categorie[indice].nome + " (€)",
                data: dati
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    caricaJson();

    document.getElementById("categoria_select").addEventListener("change", function(){
        creaGraficoCategoria(this.value);
    });
});