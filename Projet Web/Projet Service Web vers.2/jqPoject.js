/*
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


}*/





$(document).ready(function () {

  $(init);

  function init() {

    $("#zoneLogin").show();
    $("#zoneAdministrateur").hide();
    $("#zoneInscription").hide();
    $("#idZoneAffichage").hide();
    $("#zoneAcceuil").hide();
    $("#zonePanier").hide();



  }

  $("#btnSubmit").click(function () {


    var user = $("#idLogin").val();

    var pass = $("#idPass").val();

    var login = document.forms["frmIdentification"].elements["txtLogin"];
    var pw = document.forms["frmIdentification"].elements["txtPass"];
    var formNomPrenom = document.forms["frmIdentification"];
    var nomPrenomTxt = formNomPrenom.querySelector("#idNomPrenom");
    var isAdmin = $("#adminBox").is(':checked')
    if (!isAdmin) {
      if (user != "user" && pass != "") {
        alert("login not valid")
        $("#blankMsgLogin").text("Utilisateur non valide");
      }
      if (pass != "1234" && pass != "") {

        $("#blankMsgPw").text("Mot de passe non valide");
      }
      if (user == "user" && pass == "1234") {

        $("#zoneLogin").hide();
        $("#zoneAcceuil").show();
        $("#zoneInscription").hide();
      }
    }
    else {

      if (user == "admin" && pass == "admin") {
        alert("is a valid admin")
        $("#zoneLogin").hide();
        $("#zoneAdministrateur").show();

      }

    }

  });


  $("#bregisterbtn").click(function () {
    $("#zoneLogin").hide();
    $("#zoneInscription").show();
  })


});