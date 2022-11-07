var isInit = true;

$(document).ready(function () {


  if (isInit) {
    $(init);

    function init() {

      $("#zoneLogin").show();
      $("#zoneAdministrateur").hide();
      $("#zoneInscription").hide();
      $("#idZoneAffichage").hide();
      $("#zoneAcceuil").hide();
      $("#zonePanier").hide();

      //Gestion produit
      $("#zoneModificationProduit").hide();
      $("#zoneSuppressionProduit").hide();
      $("#zoneListeProduit").hide();
      $("#zoneNouveauProduit").hide();
      $("#zoneMenuProduit").hide();



    }
    isInit = false;
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

        $("#zoneLogin").hide();
        $("#zoneAdministrateur").show();

      }

    }

  });







  $("#menu").on('menuselect', function () {
    alert('Select event Triggered!');
  });


  $(".submenu").menu({
    blur: function (event, ui) {
      $('#display').html(" <b>Moved From: </b>"
        + ui.item.text());
    }
  });


  $("#newProduct").click(function () {
    $("#zoneNouveauProduit").show();
  });


  $("#zoneNouveauProduitBtn").click(function () {

    var descriptionProduit = $("#txtDescriptionN").val();
    var imageProduit = $("#txtImageN").val();
    var prixProduit = $("#txtPrixN").val();
    var detailProduit = $("#txtDetailN").val();
    alert(descriptionProduit + " " + imageProduit + " " + prixProduit + " " + detailProduit)
    $.ajax({
      contentType: "application/json; charset =utf-8",
      processData: false,
      url: "http://localhost:3000/createProduct",

      data: JSON.stringify({
        description: descriptionProduit,
        image: imageProduit,
        prix: prixProduit,
        details: descriptionProduit
      }),
      method: "post",
      dataType: "json",

      success: function (data) {
        $("#txtDescriptionN").val("");
        $("#txtImageN").val("");
        $("#txtPrixN").val("");
        $("#txtDetailN").val("");
        alert("Produit enregistré");
      },
      error: function (error) {
        alert("Error: Produit non enregistré" + error);
      }
    });




  });







});