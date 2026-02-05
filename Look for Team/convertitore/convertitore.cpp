#include <iostream>
#include <fstream>
#include <cstring>
using namespace std;

struct Carriera{
    char idGiocatore[64];
    char idSquadra[64];
    char anno[64];
};

struct Giocatore{
    char idSquadra[64];
    char id[64];
    char nome[64];
    char cognome[64];
};

struct Squadra{
    char id[64];
    char nome[64];
};

int dividiCSV(const char* linea, char colonne[10][64]);

int main(){
    char linea[256];
    char colonne[10][64];
    Squadra s;
    Giocatore g;
    Carriera c;

    ifstream fileSquadre("squadre.csv");
    ofstream outSquadre("squadre.json");
    if (!fileSquadre || !outSquadre){
        cout << "Errore apertura file squadre\n";
        return 1;
    }

    outSquadre << "[\n";
    bool aCapo = true;

    while (fileSquadre.getline(linea, 256)){
        int n = dividiCSV(linea, colonne);
        if (n < 2) continue;

        strcpy(s.id, colonne[0]);
        strcpy(s.nome, colonne[1]);

        if (!aCapo) outSquadre << ",\n";
        outSquadre << "  {\"id\": \"" << s.id << "\", \"nome\": \"" << s.nome << "\"}";
        aCapo = false;
    }
    outSquadre << "\n]\n";
    fileSquadre.close();
    outSquadre.close();

    ifstream fileGiocatori("giocatori.csv");
    ofstream outGiocatori("giocatori.json");
    if (!fileGiocatori || !outGiocatori){
        cout << "Errore apertura file giocatori\n";
        return 1;
    }

    outGiocatori << "[\n";
    aCapo = true;

    while (fileGiocatori.getline(linea, 256)){
        int n = dividiCSV(linea, colonne);

        strcpy(g.idSquadra, colonne[0]);
        strcpy(g.id, colonne[1]);
        strcpy(g.nome, colonne[2]);
        strcpy(g.cognome, colonne[3]);

        if (!aCapo){
            outGiocatori << ",\n";
        }
        outGiocatori << "  {\"idSquadra\": \"" << g.idSquadra << "\", \"id\": \"" << g.id << "\", \"nome\": \"" << g.nome << "\", \"cognome\": \"" << g.cognome << "\"}";
        aCapo = false;
    }
    outGiocatori << "\n]\n";
    fileGiocatori.close();
    outGiocatori.close();

    ifstream fileCarriera("carriera.csv");
    ofstream outCarriera("carriera.json");
    if (!fileCarriera || !outCarriera){
        cout << "Errore apertura file carriera\n";
        return 1;
    }

    outCarriera << "[\n";
    aCapo = true;

    while (fileCarriera.getline(linea, 256)){
        int n = dividiCSV(linea, colonne);
        if (n < 3) continue;

        strcpy(c.idGiocatore, colonne[0]);
        strcpy(c.idSquadra, colonne[1]);
        strcpy(c.anno, colonne[2]);

        if (!aCapo) outCarriera << ",\n";
        outCarriera << "  {\"idGiocatore\": \"" << c.idGiocatore
                    << "\", \"idSquadra\": \"" << c.idSquadra
                    << "\", \"anno\": \"" << c.anno << "\"}";
        aCapo = false;
    }
    outCarriera << "\n]\n";
    fileCarriera.close();
    outCarriera.close();

    cout << "Conversione completata! Creati: squadre.json, giocatori.json, carriere.json\n";
    return 0;
}

int dividiCSV(const char* linea, char colonne[10][64]){
    int colonna = 0;
    int posCarattere = 0;
    for (int i = 0; linea[i] != 0 && colonna < 10; i++){
        if (linea[i] == ';' || linea[i] == '\n' || linea[i] == '\r'){
            colonne[colonna][posCarattere] = 0;
            colonna++;
            posCarattere = 0;
        } else {
            if (posCarattere < 63){
                colonne[colonna][posCarattere] = linea[i];
                posCarattere++;
            }
        }
    }
    colonne[colonna][posCarattere] = 0;
    return colonna + 1;
}