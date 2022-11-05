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

function validerForme() {

  //document.oneInscription.visibility=false
  var login = document.forms["frmIdentification"].elements["txtLogin"];
  var pw = document.forms["frmIdentification"].elements["txtPass"];
  var formNomPrenom = document.forms["frmIdentification"];
  var nomPrenomTxt = formNomPrenom.querySelector("#idNomPrenom");

  if (login.value != "user" && login.value != "") {
    document.getElementById("blankMsgLogin").innerHTML = "login non valide";
  }
  //else document.getElementById("blankMsgLogin").innerHTML = "";  


  if (pw.value != "1234" && pw.value != "") {
    document.getElementById("blankMsgPw").innerHTML = "Mot de passe non valide";
  }


  if (login.value == "user" && pw.value == "1234") { //alert("Connection reussie")
    document.getElementById("zoneLogin").style.display = "none";

    document.getElementById("btnInscription").style.display = "none";
    document.getElementById("btnSubmit").style.display = "none";
    document.getElementById("zoneAcceuil").style.display = "block";

    //document.getElementById("zoneInscription").style.display="block";

    // document.oneInscr iption.visibility=true
  }


}


















function inscriptionBlock() {
  document.getElementById("zoneLogin").style.display = "none";
  document.getElementById("btnSubmit").style.display = "none";
  document.getElementById("btnInscription").style.display = "none";
  document.getElementById("zoneInscription").style.display = "block";

}

function validerInscription() {

  var login = document.forms["frmInfo"].elements["txtLogin"];
  var pw = document.forms["frmInfo"].elements["psw"];
  var nom = document.forms["frmInfo"].elements["txtNom"];
  var prenom = document.forms["frmInfo"].elements["txtPrenom"];

  if (login.value != "" && pw.value != "" && nom.value != "" && prenom.value != "") {
    document.getElementById("zoneInscription").style.display = "none";
    document.getElementById("zoneLogin").style.display = "block";
    document.getElementById("btnSubmit").style.display = "block";
    document.getElementById("btnInscription").style.display = "block";

  }
}





function ajouterItem(produit, quantite, prix) {

  let nouvelleLigne = "<tr onclick=\"javascript:selectionnerProduit(this);\">"
    + "<td>" + produit + "</td>" + "<td>" + quantite + "</td>" + "<td>" + prix + "</td>"
    + "<th> <i onclick=\"javascript:supprimer(this);\" class=\"bi bi-trash\"></i></th>";

  var ancienContenu = document.getElementById("corpsTableau").innerHTML;
  var nouveauContenu = ancienContenu + nouvelleLigne;
  document.getElementById("corpsTableau").innerHTML = nouveauContenu;
  var nombreIemPanier = parseInt(document.getElementById("idNombreItemsPanier").innerHTML);
  updateTable();
  nombreIemPanier += parseInt(quantite);
  document.getElementById("idNombreItemsPanier").innerHTML = nombreIemPanier;
}


function panierClick() {

  document.getElementById("zoneLogin").style.display = "none";
  document.getElementById("btnSubmit").style.display = "none";
  document.getElementById("btnInscription").style.display = "none";


  document.getElementById("zoneAcceuil").style.display = "none";
  document.getElementById("zonePanier").style.display = "block";

}

function afficherFacture() {

  document.getElementById("idZoneAffichage").style.display = "block";
}

function initialiserCarte() {
  if (!navigator.geolocation) {

    return false;
  }


  var centreGoogleMap = new google.maps.LatLng(45.483294, -73.868898);
  var optionsGoogleMap = {
    //fateur de zoom
    zoom: 15,
    //point de centrage 
    center: centreGoogleMap,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var maCarte = new google.maps.Map(document.getElementById("maCarte"), optionsGoogleMap);
  var markerGG = new google.maps.Marker({
    position: { lat: 45.483294, lng: -73.868898 },
    map: maCarte,
    title: "College GeraldGodin"
  });
  var commentaireGG = "<div>";
  commentaireGG += " <h1> College GG </h1>"
  commentaireGG += "Le seul CGEP francophone a l'ouest de Montréal";
  commentaireGG += "</div>";
  var fenetreGG = new google.maps.InfoWindow({ content: commentaireGG });

  google.maps.event.addListener(markerGG, "click", function () {
    fenetreGG.open(maCarte, markerGG)
  });

}



function factureOn() {
  document.getElementById("zoneAcceuil").style.display = "none";
  document.getElementById("zoneContenuFacture").style.display = "block";

}



var elementActif;

function selectionnerProduit(elementTr) {
  var listTd = elementTr.getElementsByTagName("td");
  document.formulaire.txtProduit.value = listTd[0].innerHTML;
  document.formulaire.txtQuantite.value = listTd[1].innerHTML;
  document.formulaire.txtPrix.value = listTd[2].innerHTML;
  elementActif = elementTr;
  document.formulaire.txtProduit.disabled = false;
  document.formulaire.txtQuantite.disabled = false;
  document.formulaire.txtPrix.disabled = false;
  document.formulaire.btnModifier.disabled = false;
}

function nettoyer() {
  elementActif = undefined;
  document.formulaire.txtProduit.value = "";
  document.formulaire.txtQuantite.value = "";
  document.formulaire.txtPrix.value = "";
  document.formulaire.txtProduit.disabled = true;
  document.formulaire.txtQuantite.disabled = true;
  document.formulaire.txtPrix.disabled = true;
  document.formulaire.btnModifier.disabled = true;
}

function modifier() {
  var produit = document.formulaire.txtProduit.value;
  var quantite = document.formulaire.txtQuantite.value;
  var prix = document.formulaire.txtPrix.value;
  var listTd = elementActif.getElementsByTagName("td");
  listTd[0].innerHTML = produit;
  listTd[1].innerHTML = quantite;
  listTd[2].innerHTML = prix;
  updateTable()
  elementActif = undefined;
  nettoyer();
}

function updateTable() {
  var tablePanier = document.getElementById("corpsTableau");
  var sommeTD = document.getElementById("total");
  var sommePanier = 0.0;
  for (var i = 0, row; row = tablePanier.rows[i]; i++) {
    //iterate through rows

    var listTd = row.getElementsByTagName("td");
    var quantite = listTd[1].innerHTML;
    var prix = listTd[2].innerHTML;
    prix = prix.replace('$', '');
    sommePanier += (parseFloat(prix) * parseInt(quantite));
    // document.formulaire.txtProduit.value = listTd[0].innerHTML;
    // document.formulaire.txtQuantite.value = listTd[1].innerHTML;
    //  document.formulaire.txtPrix.value = listTd[2].innerHTML;


  }
  sommeTD.innerHTML = sommePanier;
  sommeTD.innerHTML += '$'
}

function supprimer(elementLien) {
  var elementTd = elementLien.parentNode;
  var elementLigne = elementTd.parentNode;
  elementLigne.parentNode.removeChild(elementLigne);
  updateTable()
  nettoyer();
}

