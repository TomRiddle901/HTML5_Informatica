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