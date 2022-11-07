
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;
// enabling CORS for all requests
app.use(cors());
// using bodyParser to parse JZON bodies into js objects
app.use(bodyParser.json())
// etape 4 
app.get("/", function (request, response) {
    response.send("Bonjour le monde<br/> Utilisation du serveur Express");
});

app.listen(port);



//inscrire un nouveau client 
//methode : createClient
/* entree 
{
"nom" : "Pierre",
"prenom" : "Dube",
"password" : "Password",
"courriel" : "pierreDube@cgodin.ca",
"addresse" : "123 Rue Quebec"

} */

// sortie Message de confirmation

app.post("/createClient", function (request, response) {
    const client = request.body;
    console.log(client.nom + " " + client.prenom + " " + client.password + " " + client.courriel + "" + client.addresse);
    console.log(JSON.stringify(client));
    // connection avec la base de donnees
    const con = connecterDatabase()

    // les donnees doivent etre inserees dans la table utilisateur et client au meme moment
    con.connect(function (err) {
        if (err) throw err;
        // A modifier 
        con.query("INSERT INTO Utilisateur values(null,'" + client.nom + "','" + client.prenom +
            "', " + client.password + ",'" + client.courriel + "');", function (err, result, fields) {

            });

        con.query("INSERT INTO client VALUES (null,'" + client.addresse + "', (SELECT count(last_insert_id()) FROM Utilisateur));", function (err, result, fields) {
            if (err) throw err;
            response.status(200).send("votre inscription est completée");

        });

    });

});


app.put("/updateClient/:id", function (request, response) {
    const id = request.params.id
    const client = request.body;
    console.log(JSON.stringify(client));
    const con = connecterDatabase()

    con.connect(function (err) {
        if (err) throw err;
        con.query("UPDATE utilisateur set nom ='" + client.nom + "', prenom ='" + client.prenom + "',password =" + client.password + " , courriel ='" + client.courriel + "' where userID=" + id, function () {
            if (err) throw err;

        });
        con.query("UPDATE client set addresse = '" + client.addresse + "' where userID =" + id, function () {
            if (err) throw err;
            response.status(200).send("votre profil a été modifié");

        });
    });
});


// List des utlisateur 
// Tableau

app.get("/getAllUsers", function (request, response) {
    // var con = connectionDatabase();

    // connection mysql database
    const con = connecterDatabase();

    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM Utilisateur", function (err, result, fields) {
            if (err) throw err;
            // Json,stringiy transforme l,object javascript en json
            console.log(JSON.stringify(result));
            response.status(200).json(result);
        });

    });

});


// se connecter  

app.get("/getUser/:id", function (request, response) {
    const id = request.params.id
    //const utilisateur

    const con = connecterDatabase();

    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * utilisateur WHERE userID=" + id, function (err, result, fields) {
            if (err) throw err;
            if (result.length > 0) {
                console.log(JSON.stringify(result[0]));
                response.status(200).json({
                    message: "produit(s) trouve(s)",
                    data: result[0]
                });


            }
            else {
                console.log("Produit non trouve")
                response.status(200).json({
                    message: "Aucun produit trouve",
                    data: {}
                })
            }

        })
    })


});






// Tous les produits 
app.get("/getAllProducts", function (request, response) {
    // var con = connectionDatabase();
    // connection mysql database
    const con = connecterDatabase();

    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM Produit;", function (err, result, fields) {
            if (err) throw err;
            // Json,stringiy transforme l,object javascript en json
            console.log(JSON.stringify(result));
            response.status(200).json(result);
        });

    });

});







//  Afficher la liste des produits en magasin par  catégorie
app.get("/getProductSubCategorie/:subCategorie", function (request, response) {
    const subCategorie = request.params.subCategorie
    const con = connecterDatabase();

    con.connect(function (err) {
        if (err) throw err;
        con.query("select * from  viewAllproduct where sousCategorieID  = '" + subCategorie + "';", function (err, result, fields) {
            if (err) throw err;
            // Json,stringiy transforme l,object javascript en json
            console.log(JSON.stringify(result));
            response.status(200).json(result);
        });

    });

});



//  Afficher la liste des produits en magasin par  catégorie
app.get("/getProductCategorie/:categorieID", function (request, response) {
    const categorieID = request.params.categorieID
    const con = connecterDatabase();

    con.connect(function (err) {
        if (err) throw err;
        con.query("select * from  viewAllproduct where categorieID = '" + categorieID + "';", function (err, result, fields) {
            if (err) throw err;
            // Json,stringiy transforme l,object javascript en json
            console.log(JSON.stringify(result));
            response.status(200).json(result);
        });

    });

});


//  Afficher le stock des produits
app.get("/getStockProduit", function (request, response) {
    const con = connecterDatabase();

    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM invetaire", function (err, result, fields) {
            if (err) throw err;
            // Json,stringiy transforme l,object javascript en json
            console.log(JSON.stringify(result));
            response.status(200).json(result);
        });

    });

});


// Écrire la fonction permettant de  récupérer un produit dont id est donné

app.get("/getProduct/:id", function (request, response) {
    const id = request.params.id

    const con = connecterDatabase();

    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM produit WHERE produitID=" + id, function (err, result, fields) {
            if (err) throw err;
            if (result.length > 0) {
                console.log(JSON.stringify(result[0]));
                response.status(200).json({
                    message: "produit(s) trouve(s)",
                    data: result[0]
                });


            }
            else {
                console.log("Produit non trouve")
                response.status(200).json({
                    message: "Aucun produit trouve",
                    data: {}
                })
            }

        })
    })


});







//inscrire un nouveau produit 
//methode : createProduct
/* entree 


{  
    "titre" : "Call me by your Name 2017",
    "image": "image.pg",
    "prix":25.89,
    "description":"American coming-of-age comedy-drama" ,
    "sousCategorie":"INF",
    "dateParution":"2000"
}
// sortie :  Message de confirmation

*/
app.post("/createProduct", function (request, response) {
    const produit = request.body;
    //console.log(produit.description + " " + produit.image + " " + produit.prix + " " + produit.details) ;
    //console.log(JSON.stringify(produit));
    // connection avec la base de donnees
    const con = connecterDatabase()

    con.connect(function (err) {
        if (err) throw err;
        // A modifier 
        con.query("INSERT INTO Produit values(null,'" + produit.titre + "','" + produit.image +
            "', " + produit.prix + ",'" + produit.description + "' ,'" + produit.sousCategorie + "' , '" + produit.dateParution + "');", function (err, result, fields) {
                if (err) throw err;
                response.status(200).send("Le produit a été ajouté");

            });
    });




});

// Écrire la fonction permettant de  récupérer un produit dont id est donné

app.get("/getProduct/:id", function (request, response) {
    const id = request.params.id

    const con = connecterDatabase();

    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM produit WHERE produitID=" + id, function (err, result, fields) {
            if (err) throw err;
            if (result.length > 0) {
                console.log(JSON.stringify(result[0]));
                response.status(200).json({
                    message: "produit(s) trouve(s)",
                    data: result[0]
                });


            }
            else {
                console.log("Produit non trouve")
                response.status(200).json({
                    message: "Aucun produit trouve",
                    data: {}
                })
            }

        })
    })


});






//Étape 11 – Ajouter la méthode pour modifier un produit
app.put("/updateProduct/:id", function (request, response) {
    const id = request.params.id
    const produit = request.body;
    //console.log(produit.description + " " + produit.image + " " + produit.prix + " " + produit.details) ;
    console.log(JSON.stringify(produit));
    const con = connecterDatabase()

    con.connect(function (err) {
        if (err) throw err;
        con.query("UPDATE Produit set titre ='" + produit.titre + "', image ='" + produit.image + "',prix =" + produit.prix + " , description ='" + produit.description + "', sousCategorieID ='" + produit.sousCategorie + "', dateParution ='" + produit.dateParution + "' where produitID=" + id, function () {
            if (err) throw err;
            response.status(200).send("produit modifie");
        });
    });
});

//Étape 12 – Ajouter la méthode pour  supprimer un produit
app.delete("/deleteProduct/:id", function (request, response) {
    const id = request.params.id
    const con = connecterDatabase()

    con.connect(function (err) {
        if (err) throw err;
        con.query("DELETE FROM Produit where id=" + id, function () {
            if (err) throw err;
            response.status(200).send("produit supprime");
        });
    });
});



// Les services Web pour lister les produits commandés


//  Afficher la liste des commandes des clients
app.get("/getAllOrders", function (request, response) {
    // var con = connectionDatabase();

    // connection mysql database
    const con = connecterDatabase();

    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM viewAllOrderProducts;", function (err, result, fields) {
            if (err) throw err;
            // Json,stringiy transforme l,object javascript en json
            console.log(JSON.stringify(result));
            response.status(200).json(result);
        });

    });

});


// Afficher tous les commandes;

app.get("/getOrder/:id", function (request, response) {
    const id = request.params.id

    const con = connecterDatabase();

    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM viewAllOrderProducts WHERE numeroCommande=" + id, function (err, result, fields) {
            if (err) throw err;
            if (result.length > 0) {
                console.log(JSON.stringify(result[0]));
                response.status(200).json({
                    message: "commande(s) trouve(s)",
                    data: result[0]
                });


            }
            else {
                console.log("Produit non trouve")
                response.status(200).json({
                    message: "Aucun produit trouve",
                    data: {}
                })
            }

        })
    })


});



//Étape 11 – Ajouter la méthode pour modifier une commande
app.put("/updateOrder/:id", function (request, response) {
    const id = request.params.id
    const commande = request.body;
    //console.log(produit.description + " " + produit.image + " " + produit.prix + " " + produit.details) ;
    console.log(JSON.stringify(commande));
    const con = connecterDatabase()

    con.connect(function (err) {
        if (err) throw err;
        con.query("UPDATE Produit set clientID ='" + commande.clientID + "', dateCommande ='" + commande.dateCommande + "', etatCommande ='" + commande.EtatCommande + "' where numeroCommande=" + id, function () {
            if (err) throw err;
            response.status(200).send("commande a approuvé");
        });
    });
});


// –  methode pour approuver une commande
app.put("/updateEtatCommmande/:id", function (request, response) {
    const id = request.params.id
    const commande = request.body;
    //console.log(produit.description + " " + produit.image + " " + produit.prix + " " + produit.details) ;
    console.log(JSON.stringify(commande));
    const con = connecterDatabase()

    con.connect(function (err) {
        if (err) throw err;
        con.query("UPDATE Produit set etatCommande ='" + commande.EtatCommande + "' where numeroCommande=" + id, function () {
            if (err) throw err;
            response.status(200).send("Commande approuve\n" + JSON.stringify(commande));
            //response.status(200).send("commande a approuvé");
        });
    });
 
});

app.post("/createStock", function (request, response) {
    const stock = request.body;
    //console.log(produit.description + " " + produit.image + " " + produit.prix + " " + produit.details) ;
    //console.log(JSON.stringify(produit));
    // connection avec la base de donnees
    const con = connecterDatabase()

    con.connect(function (err) {
        if (err) throw err;
        // A modifier 
        con.query("INSERT INTO inventaire values(null," + stock.produitID + "," + stock.quantiteStocke +
            ", " + stock.quantiteSeuil + ");", function (err, result, fields) {
                if (err) throw err;
                response.status(200).send("Le stock a été ajouté");

            });
    });




});
    
app.put("/updateStock/:id", function (request, response) {
    const id = request.params.id
    const stock = request.body;
    console.log(JSON.stringify(stock));
    const con = connecterDatabase()

    con.connect(function (err) {
        if (err) throw err;
        con.query("INSERT INTO Approvisionement values(null," + stock.gestionnnaireID + "," + id +
            ", " + stock.fourniseurID + ",'" + stock.dateApprov + "'," + stock.quantiteApprov + ");", function (err, result, fields) {
                if (err) throw err;
                // response.status(200).send("Approvissioné");  
            });
        /*
        con.query("UPDATE inventaire set QuantiteStocke='"+ (stock.quantiteApprov) +"' where inventaireID =" + id,function(){
            if(err) throw err;
             response.status(200).send("stock augmente");
        })*/

        /*
         con.query("UPDATE inventaire set quantiteStocke =" + ("(SELECT quantiteStocke from inventaire  where inventaireID =)" + id
             + stock.quantiteApprov) + " where inventaireID =" + id, function () {
                 if (err) throw err;
                 response.status(200).send("stock augmente");
             }) */

        var qteCurrent = 78;
        var  quantiteApprov = 0; 
        con.query("select QuantiteStocke from inventaire  where inventaireID =" + id, function (err , result , fields) {
            if (err) throw err;
            qteCurrent = response.quantiteStocke;
            if (result.length > 0) {
               // console.log(JSON.stringify(result[0].QuantiteStocke));
               // qteCurrent = JSON.stringify(result[0].QuantiteStocke) ;
                //console.log(stock.quantiteApprov);
               //console.log(parseInt(qteCurrent) +stock.quantiteApprov);
              // quantiteApprov = stock.quantiteApprov + parseInt(qteCurrent); 
               //console.log(quantiteApprov);


            }
        });


        con.query("UPDATE inventaire set QuantiteStocke='" + (stock.quantiteApprov + parseInt(qteCurrent)) + "' where inventaireID =" + id, function () {
            if (err) throw err;
            response.status(200).send("stock augmente");
            
        });
    });

});


    function connecterDatabase() {
        return mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Toscane2000**",
            database: "BookEtCoDatabaseFinal"
        });
    }

