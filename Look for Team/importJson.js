var squadre = [];
var giocatori = [];
var carriera = [];

function caricaJSON() {
    fetch('squadre.json')
        .then(r => r.json())
        .then(dataSquadre => {
            squadre = dataSquadre;
            return fetch('giocatori.json');
        })
        .then(r => r.json())
        .then(dataGiocatori => {
            giocatori = dataGiocatori;
            return fetch('carriera.json');
        })
        .then(r => r.json())
        .then(dataCarriera => {
            carriera = dataCarriera;
            popolaSelectSquadra();
        });
}

function popolaSelectSquadra() {
    var select = document.getElementById("selectSquadra");
    select.innerHTML = "";

    var optDefault = document.createElement("option");
    optDefault.text = "Seleziona giocatore";
    optDefault.value = "";
    select.add(optDefault);

    for (var i = 1; i < squadre.length; i++) {
        var elOption = document.createElement("option");
        elOption.text = squadre[i].nome;
        elOption.value = squadre[i].id;
        select.add(elOption);
    }

    aggiornaGiocatori();
}

function aggiornaGiocatori() {
    var idS = document.getElementById("selectSquadra").value;
    var selectG = document.getElementById("selectGiocatore");
    selectG.innerHTML = "";

    var optDefault = document.createElement("option");
    optDefault.text = "Seleziona giocatore";
    optDefault.value = "";
    selectG.add(optDefault);

    for (var i = 0; i < giocatori.length; i++) {
        if (giocatori[i].idSquadra === idS) {
            var elOption = document.createElement("option");
            elOption.text = giocatori[i].nome + " " + giocatori[i].cognome;
            elOption.value = giocatori[i].id;
            selectG.add(elOption);
        }
    }
}

function mostraCarriera() {
    var idG = document.getElementById("selectGiocatore").value;
    var div = document.getElementById("carrGiocatore");
    div.innerHTML = "";

    var carrieraGiocatore = [];

    for (var i = 0; i < carriera.length; i++) {
        if (carriera[i].idGiocatore === idG) {
            var nomeSquadra = "";
            for (var j = 0; j < squadre.length; j++) {
                if (squadre[j].id === carriera[i].idSquadra) {
                    nomeSquadra = squadre[j].nome;
                    break;
                }
            }
            carrieraGiocatore.push({
                squadra: nomeSquadra,
                anno: carriera[i].anno
            });
        }
    }

    if (carrieraGiocatore.length === 0) {
        div.innerHTML = "<p>Nessuna informazione trovata.</p>";
    } else {
        var html = "<ul>";
        for (var k = 0; k < carrieraGiocatore.length; k++) {
            html += "<li>" + carrieraGiocatore[k].squadra + " - " + carrieraGiocatore[k].anno + "</li>";
        }
        html += "</ul>";
        div.innerHTML = html;
    }
}