var categorie = [];
var sottocategorie = [];

function caricaJson(){
    fetch('paniere_istat.json')
    .then(r => r.json())
    .then(data => {
        categorie = data.categorie;
        sottocategorie = data.sottocategorie;
        popolaSelectCategorie();
    })
}

function popolaSelectCategorie(){
    var selectCategoria = document.getElementById("categoria");
    selectCategoria.innerHTML = "";

    var optDefault = document.createElement("option");
    optDefault.text = "Seleziona categoria";
    optDefault.value = "seleziona";
    selectCategoria.add(optDefault);

    for (var i = 0; i < categorie.length; i++){
        var elOption = document.createElement("option");
        elOption.text = categorie[i].nome;
        elOption.value = categorie[i].nome;
        selectCategoria.add(elOption);
    }
}