import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import * as QRCode from 'qrcode';
import autoTable, { CellInput } from 'jspdf-autotable';
import { Facture, LigneAbonnement, Panneau, PanneauResponse, User, UserResponse } from '../../openapi/services/models';

@Injectable({
  providedIn: 'root'
})



export class InvoiceService {

  constructor() { }
  public lignAbn : Array<LigneAbonnement> | undefined =[]
  public panneau : Set<Panneau>= new Set()
  public lesPanneau : Array<Panneau> = []

  public rows: CellInput[][] = [];




  async generateInvoice(user : UserResponse, facture : Facture, abnId : number) {

    const doc = new jsPDF();
    console.log(facture)
    console.log(user)
    console.log(facture)

    // this.lignAbn = facture.abonnement.ligneAbonnements
    this.lignAbn?.forEach((item)=>{
      if (
        item.panneau &&
        typeof item.panneau.id === "number" &&
        typeof item.panneau.taille === "string"
      ) {
        this.panneau.add(item.panneau); // Ajouter uniquement des objets valides

      }
    })

    // this.panneau.forEach((item) => {
    //   if (item) {
    //     this.lesPanneau.push(item); // Ajouter chaque élément au tableau
    //   }
    // });
    this.rows = []; // Initialiser avant la boucle

    this.lesPanneau = Array.from(this.panneau);


// texte de font arrière plan
    doc.setFontSize(60);                // Définit une grande taille de police pour "FACTURE".
    doc.setTextColor(200, 200, 200);    // Définit une couleur gris clair (200, 200, 200).
    doc.text("FACTURE", 105, 150, {     // Dessine le texte "FACTURE".
      align: "center",                  // Centré horizontalement.
      angle: 45                         // Incliné à 45° pour un effet diagonal.
    });

    doc.setGState({ opacity: 0.2 });    // Réduit l'opacité à 20%.
    doc.setFontSize(60);                // Conserve la taille de police précédente pour cohérence.
    doc.setTextColor(200, 200, 200);    // Réutilise la couleur gris clair pour "FACTURE".
    doc.text("FACTURE", 105, 150, {     // Dessine à nouveau le texte "FACTURE" en semi-transparent.
      align: "center",                  // Centré comme avant.
      angle: 45                         // Même angle pour une apparence identique.
    });
    doc.setGState({ opacity: 1 });      // Réinitialise l'opacité pour le reste du contenu.

    doc.setFontSize(18);                // Définit une taille de police normale pour les autres textes.
    doc.setTextColor(0, 0, 0);          // Change la couleur à noir.
    doc.text("Udacity", 10, 10);        // Dessine le texte "Udacity" par-dessus.



  // Header
  doc.setFontSize(18);
  doc.text("All-Communication", 10, 10);
  doc.setFontSize(10);
  doc.text("15 Rue de France, Dékon", 10, 15);

  doc.setFontSize(16);
  doc.setTextColor(0, 150, 0);
  doc.text("FACTURE", 105, 30, { align: "center" });

  // Customer Details
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text("Information du client", 10, 40);

  doc.setFontSize(10);
  doc.text(user.nonUtilisateur, 10, 45);
  doc.text(user.email, 10, 55);
  doc.text(user.numero, 10, 60);

  doc.text("Date", 140, 40);
  doc.text(facture.datePayment, 170, 40);

  doc.text("N° Facture", 140, 45);
  doc.text(facture.reference, 170, 45);

  // doc.text("", 140, 50);
  // doc.text("John Doe", 170, 50);

  doc.text("Payer le :", 140, 55);
  doc.text(facture.datePayment, 170, 55);

  // Order Details Header
  doc.setFontSize(12);
  doc.text("Liste des panneaux", 10, 70);

  // Table
  const tableStartY = 75;
  doc.setFontSize(10);
  doc.setDrawColor(0, 0, 0);

  // const headers = ["Boulevards", "Panneaux", "Emplacement", "Prix"];
  // const row = ["PoutineVille", "John Doe", "7", "120", "1", "120.00"];

  // Draw table header
  let startX = 10;
  let startY = tableStartY;
  // headers.forEach((header, index) => {
  //   doc.text(header, startX + index * 30, startY);
  // });
  // doc.line(10, startY + 2, 200, startY + 2); // Header bottom border

  // // Draw table row
  // startY += 7;
  // row.forEach((cell, index) => {
  //   doc.text(cell, startX + index * 30, startY);
  // });
  // doc.line(10, startY + 2, 200, startY + 2); // Row bottom border

  // Table Data

  const headers = [["Boulevards", "Panneaux", "Emplacement", "Prix","Imprssion"]];


  // this.lesPanneau.forEach((item)=>{
  //    this.rows = [
  //     [
  //     item.boulevard?.name || "N/A",
  //     item.id || 0,
  //     item.localisation || "N/A",
  //     item.prixMensuel || 0,
  //     item.printPrice??0
  //   ]
  //   ];
  // })

  this.lesPanneau.forEach((item) => {
    this.rows.push([
      item.boulevard?.name || "N/A",
      item.id || 0,
      item.localisation || "N/A",
      item.prixMensuel || 0,
      item.printPrice ?? 0
    ]);
  });

  // Add table using autoTable
  autoTable(doc, {
    head: headers,
    body: this.rows,
    startY: 70, // Position of the table
    theme: "grid", // Add grid lines
    headStyles: {
      fillColor: [0, 150, 0], // Green header background
      textColor: [255, 255, 255], // White text
    },
    bodyStyles: {
      fillColor: [245, 245, 245], // Light gray rows
      textColor: [0, 0, 0], // Black text
    },
    alternateRowStyles: {
      fillColor: [255, 255, 255], // Alternate rows white
    },
    columnStyles: {
      0: { halign: "left" }, // Align first column left
      3: { halign: "right" }, // Align last column right
    },
  });

  // Total Amount
  startY += 10;
  doc.setFontSize(12);
  doc.text("Total Amount", 140, startY);
  doc.text("120.00", 170, startY);

  // Additional Details
  startY += 20;
  doc.setFontSize(12);
  doc.text("Additional Details", 10, startY);

  startY += 5;
  doc.setFontSize(10);
  doc.text("The product will be there soon!", 10, startY);

  // QR Code
  doc.setTextColor(0, 0, 255);
  const qrCodeData = "https://www.example.com/invoice/REF-JR9BY";
  const qrCodeCanvas = document.createElement("canvas");
  await QRCode.toCanvas(qrCodeCanvas, qrCodeData,{
    color: {
      dark: ("#009600"), // Blue color for the QR code
      light: "#FFFFFF", // White background
    },
  });
  const qrCodeImage = qrCodeCanvas.toDataURL("image/png");
  doc.addImage(qrCodeImage, "PNG", 10, startY + 5, 30, 30);

  // Terms and Conditions
  doc.setFontSize(12);
  doc.text("Terms and Conditions", 60, startY + 5);

  doc.setFontSize(10);
  // const terms = [
  //   "Order can be return in max 10 days.",
  //   "Warranty of the product will be subject to the manufacturer's terms and conditions.",
  //   "This is a system-generated invoice."
  // ];
  // terms.forEach((term, index) => {
  //   doc.text(term, 60, startY + 12 + index * 5);
  // });

  // Footer
  doc.setFontSize(10);
  doc.text("Rockstar", 10, 270);
  doc.text("505 St Catherine St E, Montreal", 10, 275);
  doc.text("Quebec H2L 2C9", 10, 280);
  doc.text("Email: info@rockstar.cd", 150, 270);
  doc.text("Phone: +243 975 600 109", 150, 275);
  doc.text("Web: www.rockstar.cd", 150, 280);



  const totalPages = doc.getNumberOfPages();
for (let i = 1; i <= totalPages; i++) {
  doc.setPage(i); // Définir la page actuelle
  doc.text(`Page ${i} sur ${totalPages}`, 105, 290, { align: "center" }); // Pied de page
}
    // Sauvegarder le PDF
    doc.save('facture.pdf');

  }




}
