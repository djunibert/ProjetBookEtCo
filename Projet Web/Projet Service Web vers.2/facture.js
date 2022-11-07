var sitePersonel = {};
var employees = []
sitePersonel.employees = employees;

function formulaire() {
    //var nom = document.forms["frmInfo"].elements["txtNom"].value;

    var nom = document.frmInfo.txtNom.value;
    var prenom = document.frmInfo.txtPrenom.value;

    var app = document.frmInfo.app.value;
    var numero = document.frmInfo.numero.value;
    var rue = document.frmInfo.rue.value;

    var prov = document.frmInfo.prov.value;
    var codePostal = document.frmInfo.cp.value;

    var afficheAdresse = document.getElementById("idAdresse");

    var affichagenomPrenom = document.getElementById("idAffichagenomPrenom");
    affichagenomPrenom.innerHTML = nom + " " + prenom;
    afficheAdresse.innerHTML = app + ", " + numero + ", " + rue + ", " + prov + ", " + codePostal;
    document.getElementById("idZoneAffichage").style.display = "block"
    //alert(photo)
    writeJsonObject(affichagenomPrenom.innerHTML, afficheAdresse.innerHTML);
}

function writeJsonObject(firstname, adr) {




    var employee = {
        "firstName": firstname,
        "adresse": adr
    }
    sitePersonel.employees.push(employee);
    console.log(sitePersonel);

    var manager = "Jane Doe";
    sitePersonel.employees[0].manager = manager;

    var objUser = JSON.stringify(sitePersonel)
    console.log(JSON.stringify(sitePersonel));
}


function annuler() {

    document.getElementById("idfrmInfo").reset();

}