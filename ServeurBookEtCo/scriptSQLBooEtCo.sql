DROP DATABASE IF EXISTS BookEtCoDatabaseFinal;
create database BookEtCoDatabaseFinal;
use BookEtCoDatabaseFinal;

-- creation table categorie
Drop table if exists Categorie;
CREATE TABLE Categorie(
 categorieID varchar(8) primary key,
 nomCategorie varchar(16)
 );
 
 -- Insertion des données dans la tables categorie
insert into Categorie values
	      ("F001", "Film"),
		  ("L002", "Livre"),
		  ("J003","Jeux Video");
		  
		  
		  


-- creation table Sous-categorie
drop table if exists SousCategorie;
CREATE TABLE SousCategorie(
 sousCategorieID varchar(16) primary key,
 nomSousCategorie varchar(64),
 categorieID varchar(8),
 FOREIGN KEY (categorieID) REFERENCES Categorie(categorieID));
 
 
 insert into SousCategorie values
	      ("INF", "Informatique","L002"),
		  ("LIT", "Littérature","L002"),
		  ("GEO", "Géographie","L002"),
		  ("SCF", "Sciences Fictions,","F001"),
		  ("COM", "Comédie","F001"),
		  ("DRA", "Drame et Action","F001"),
		  ("PLA", "Playstation","J003"),
		  ("XBO", "Xbox","J003"),
		  ("NIN", "Nintendo Wii U","J003");



drop table if exists Produit;
create table Produit(
	produitID int(10) primary key auto_increment,
	titre VARCHAR(50),
	image varchar(30),
	prix decimal(10,2),
	description varchar(200),
	sousCategorieID varchar(16),
	dateParution varchar(30),
	FOREIGN KEY (sousCategorieID) REFERENCES SousCategorie(sousCategorieID)	
	
);


insert into Produit values
	(null, "Java Comment programmer", "LivreInfo2.jpg",89.95, "4ieme Edition ISBN-289377-254-4", "INF","2015"),
	(null, "La pensée informatique", "LivreInfo2.jpg",100.95, "4ieme Edition ISBN-289377-254-4", "INF","2015"),
	(null, "Introduction à l'informatique", "LivreInfo3.jpg",60.95, "Printed Books, 230 p. ; 31 cm, Publication:Montréal : Chenelière/McGraw-Hill, cop. 2004", "INF","2004"),
	(null, "cipline carriere informatique", "img3.jpg",140.95, "appele offre informatique", "INF","2015"),
	(null, "Geology", "img4.jpg",89.95, "Geology", "GEO","2015"),
	(null, "le littoral", "img5.jpg",89.95, "Le littoral", "GEO","2015"),
	(null, "continent et ocean", "portable2.jpg",89.95, "4ieme Edition ISBN-289377-254-4", "INF","2015"),
	(null, "Java Comment programmer", "portable2.jpg",89.95, "4ieme Edition ISBN-289377-254-4", "INF","2015"),
	(null, "Java Comment programmer", "portable2.jpg",89.95, "4ieme Edition ISBN-289377-254-4", "INF","2015"),
	(null, "C++", "portable2.jpg",89.95, "4ieme Edition ISBN-289377-254-4", "INF","2015"),
	(null, "Lady Bird", "Film2.jfif",89.95, "Lady Bird is a 2017 American coming-of-age comedy", "COM","2017"),
	(null, "Tunic", "img7.jpg",89.95, "UNIC jeux enthausiasme", "COM","2017");
	

SELECT * from produit;


DROP View IF EXISTS viewAllproduct;
CREATE View viewAllproduct as 
	SELECT produit.produitID , produit.titre ,produit.image, produit.prix ,produit.description , produit.sousCategorieID, produit.dateParution ,sousCategorie.nomSousCategorie, categorie.nomCategorie,categorie.categorieID
	FROM  Produit 
	join sousCategorie  ON produit.sousCategorieID  = sousCategorie.sousCategorieID 
	join categorie  ON categorie.categorieID  = sousCategorie.categorieID;

DROP TABLE IF EXISTS LIVRE;
CREATE TABLE Livre(
LivreID int(10) PRIMARY key auto_increment,
produitID int(10),
auteur VARCHAR(32),
FOREIGN KEY (produitID) REFERENCES Produit(produitID)	
);
insert into LIVRE values
	(null, 1, "Deilter"),
	(null,2, "Berry, Gérard"),
	(null,3, "Norton, Peter");
	
	



DROP TABLE IF EXISTS Film;
CREATE TABLE Film(
fimlID int(10) PRIMARY key auto_increment,
produitID int(10),
auteur VARCHAR(32),
resumer VARCHAR(500),
FOREIGN KEY (produitID) REFERENCES Produit(produitID)	
);
insert into Film values
	(null, 3, "Greta Gerwig","Lady Bird is a 2017 American coming-of-age comedy-drama film written and directed by Greta Gerwig in her solo directorial debut. Set in Sacramento, California from fall 2002 to fall 2003, it is a story of a high school senior and her strained");




DROP TABLE IF EXISTS jeuxVideo;
CREATE TABLE jeuxVideo(
jeuxVideoID int(10) PRIMARY key auto_increment,
produitID int(10),
resumer VARCHAR(220),
FOREIGN KEY (produitID) REFERENCES Produit(produitID)	
);
insert into Film values
	(null, 3, "Jeux-Vide0","Lady Bird is a 2017 American coming-of-age comedy-drama film written and directed by Greta Gerwig in her solo directorial debut. Set in Sacramento, California from fall 2002 to fall 2003, it is a story of a high school senior and her strained");


-- table utilisateur
Drop table if exists utilisateur;
CREATE TABLE Utilisateur(
 userID int(10) primary key auto_increment,
 nom varchar(32),
 prenom varchar(32),
 password varchar(32),
 courriel varchar(32));
 
 insert into Utilisateur values
	(null, "Jean", "Dupont","password","user@gmail.com"),
	(null, "Joseph", "Dupont","password","user@gmail.com");
	
 
 -- table Client
 Drop table if exists client;
CREATE TABLE client(
 clientID int(10) primary key auto_increment,
 addresse varchar(64),
 userID int(10),
 FOREIGN KEY (userID) REFERENCES Utilisateur(userID));
 
  insert into client values
	(null, "9999 rue Montreal",1);

 
 
 -- creation table GestionnaireStock
Drop table if exists GestionnaireStock;
CREATE TABLE GestionnaireStock(
 gestionnnaireID int(10) primary key auto_increment,
 userID int(10),
 FOREIGN KEY (userID) REFERENCES utilisateur(userID));

 insert into GestionnaireStock values
		(null,2);
		
-- creation table Fournisseur
 
 -- Fourniseur 
 Drop table if exists Fourniseur;
 CREATE TABLE Fourniseur(
  fourniseurID int(10) primary key auto_increment,
  nom VARCHAR(32),
  adresse VARCHAR(64),
  telephone VARCHAR(16),
  couriel  VARCHAR(16));
   insert into Fourniseur values
	(null, "CogecoMediateque", "150 rue Quebec ","234 567566","user@gmail.com"),
	(null, " WalmartMedia", "156 rue Quebec ","234 567566","user@gmail.com");
	
	
  --  Creation du table inventaire 
  
  Drop table if exists Inventaire;
 CREATE TABLE Inventaire(
  inventaireID int(10) PRIMARY key auto_increment,
  produitID int(10),
  quantiteStocke int(10),
  quantiteSeuil int(10),
  FOREIGN KEY (produitID) REFERENCES produit(produitID));
  
  
  -- insertion des donnees iventaire
        insert into inventaire values
	          (null, 2, 50, 10),
			  (null, 3, 50, 10),
			  (null, 4, 50, 10);
			  
   
  
 Drop table if exists Approvisionement;
 CREATE TABLE Approvisionement(
	ApprovisionementID int(10) primary key auto_increment,
	 gestionnnaireID int(10),
	 inventaireID int(10),
	 fourniseurID int(10),
	 dateApprov date,
	 quantiteApprov int(10),
	 FOREIGN KEY (inventaireID) REFERENCES inventaire(inventaireID),
	 FOREIGN KEY (fourniseurID) REFERENCES fourniseur(fourniseurID),
	 FOREIGN KEY (gestionnnaireID) REFERENCES GestionnaireStock(gestionnnaireID));
	 
	 
	 -- insertion des données dams Approvisionemment
	  insert into  Approvisionement values
	          (null, 1, 1, 1,"2015-11-27T18:40:00",300),
			  (null, 1, 2, 2,"2015-11-27T18:40:00",150),
			  (null, 1, 3, 2,"2015-11-27T18:40:00",100);
 

  
  -- creation table Commande
  CREATE TABLE Commande(
	 numeroCommande int(10)PRIMARY key auto_increment,
	 clientID int(10),
	 dateCommande date,
	 EtatCommande VARCHAR(16), 
	 FOREIGN KEY (clientID) REFERENCES client(clientID));	  
	  insert into Commande values
	(null, 1, "2015-11-27T18:40:00","complete"),
    (null, 1, "2015-11-27T18:40:00","complete");
	



 -- Creation Table LigneCommande

CREATE TABLE LigneCommande(
     ligneCommandeID int(10) PRIMARY key auto_increment,
	 ProduitID int(10),
	 QuantiteItem int(10), 
	 numeroCommande int(10),
	 FOREIGN KEY (numeroCommande) REFERENCES Commande(numeroCommande),
	 FOREIGN KEY (ProduitID) REFERENCES Produit(ProduitID));
	 	 
  insert into ligneCommande values
	(null, 1, 4,1),
	(null, 2, 10,1);
	
	
	
-- 	creation VIEWAll


CREATE View viewAllOrderProducts as 
	SELECT commande.numeroCommande ,LigneCommande.ligneCommandeID,client.clientID, produit.titre, produit.prix  ,commande.dateCommande, commande.EtatCommande , LigneCommande.QuantiteItem
	FROM  commande
	join client  ON client.clientID  = commande.clientID 
	join LigneCommande  ON LigneCommande.numeroCommande  = commande.numeroCommande
    join produit on produit.produitID = LigneCommande.produitID;


 

 CREATE TABLE Facture(
     numeroFacture int(10) PRIMARY key auto_increment,
	 numeroCommande int(10),
	 montantAvantTaxe decimal(10,2),
	 dateFactture DATE,
	 montantTPS decimal(10,2),
	 montantTVQ decimal(10,2),
	FOREIGN KEY (numeroCommande) REFERENCES Commande(numeroCommande));
	


   -- Insertion donnees  dans la table Facture 
	insert into Facture values
			(null, 1, 500.00,"2015-11-27T18:40:00",15.00,10.00),
			(null, 1, 500.00,"2015-11-27T18:40:00",12.00,12.00);
	
	
	
	-- Liste des approvissiononement 

Create View listeDesApprovissionement as 
SELECT I.inventaireID , I.produitID,P.titre ,p.image, I.quantiteStocke, I.quantiteSeuil, A.ApprovisionementID , A.gestionnnaireID , A.fourniseurID, A.dateApprov, A.quantiteApprov
from inventaire I
join Approvisionement A 
ON A.inventaireID = I.inventaireID
join produit P 
ON P.produitID = I.produitID; 