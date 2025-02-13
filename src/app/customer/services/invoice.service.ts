import { Boulevard } from './../../model/Boulevard';
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import * as QRCode from 'qrcode';
import autoTable, { CellInput } from 'jspdf-autotable';
import {
  BoulevardResponse,
  Facture,
  LigneAbonnement,
  LigneAbonnementResponse,
  Panneau,
  PanneauResponse,
  User,
  UserResponse,
} from '../../openapi/services/models';
import { BoulevardService } from '../../openapi/services/services';
import { publicDecrypt } from 'crypto';

// http://localhost:4200/customer/abonnement?abonnement=102&transactionId=6b7bf32d-985a-48de-bea1-e821bae930bf-1737691913545

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private boilevardService: BoulevardService) {}
  public lignAbn: Array<LigneAbonnement> | undefined = [];
  public panneau: Set<Panneau> = new Set();
  public lesPanneau: Array<LigneAbonnementResponse> = [];
  private boulevard: BoulevardResponse = {
    id: 0,
    name: '',
    nombreDePanneau: 0,
  };

  public rows: CellInput[][] = [];



  //   async generateInvoice(user : UserResponse, facture : Facture, abnId : number,lignAbnne : LigneAbonnementResponse[]) {

  //     const doc = new jsPDF();
  //     console.log(facture)
  //     console.log(user)
  //     console.log(facture)

  //     // this.lignAbn = facture.abonnement.ligneAbonnements
  //     // this.lignAbn?.forEach((item)=>{
  //     //   if (
  //     //     item.panneau &&
  //     //     typeof item.panneau.id === "number" &&
  //     //     typeof item.panneau.taille === "string"
  //     //   ) {
  //     //     this.panneau.add(item.panneau); // Ajouter uniquement des objets valides

  //     //   }
  //     // })

  //     // this.panneau.forEach((item) => {
  //     //   if (item) {
  //     //     this.lesPanneau.push(item); // Ajouter chaque élément au tableau
  //     //   }
  //     // });
  //     this.rows = []; // Initialiser avant la boucle

  //     // this.lesPanneau = lignAbnne.panneau;

  // // texte de font arrière plan
  //     doc.setFontSize(60);                // Définit une grande taille de police pour "FACTURE".
  //     doc.setTextColor(200, 200, 200);    // Définit une couleur gris clair (200, 200, 200).
  //     doc.text("FACTURE", 105, 150, {     // Dessine le texte "FACTURE".
  //       align: "center",                  // Centré horizontalement.
  //       angle: 45                         // Incliné à 45° pour un effet diagonal.
  //     });

  //     // doc.setGState({ opacity: 0.2 });    // Réduit l'opacité à 20%.
  //     // doc.setFontSize(60);                // Conserve la taille de police précédente pour cohérence.
  //     // doc.setTextColor(200, 200, 200);    // Réutilise la couleur gris clair pour "FACTURE".
  //     // doc.text("FACTURE", 105, 150, {     // Dessine à nouveau le texte "FACTURE" en semi-transparent.
  //     //   align: "center",                  // Centré comme avant.
  //     //   angle: 45                         // Même angle pour une apparence identique.
  //     // });
  //     // doc.setGState({ opacity: 1 });      // Réinitialise l'opacité pour le reste du contenu.

  //     // doc.setFontSize(18);                // Définit une taille de police normale pour les autres textes.
  //     // doc.setTextColor(0, 0, 0);          // Change la couleur à noir.
  //     // doc.text("Udacity", 10, 10);        // Dessine le texte "Udacity" par-dessus.

  //   // Header
  //   doc.setFontSize(18);
  //   doc.text("All-Communication", 10, 10);
  //   doc.setFontSize(10);
  //   doc.text("15 Rue de France, Dékon", 10, 15);

  //   doc.setFontSize(16);
  //   doc.setTextColor(0, 150, 0);
  //   doc.text("FACTURE", 105, 30, { align: "center" });

  //   // Customer Details
  //   doc.setTextColor(0, 0, 0);
  //   doc.setFontSize(12);
  //   doc.text("Information du client", 10, 40);

  //   doc.setFontSize(10);
  //   doc.text(user.nonUtilisateur, 10, 45);
  //   doc.text(user.email, 10, 55);
  //   doc.text(user.numero, 10, 60);

  //   doc.text("Date", 140, 40);
  //   doc.text(facture.datePayment, 170, 40);

  //   doc.text("N° Facture", 140, 45);
  //   doc.text(facture.reference, 170, 45);

  //   // doc.text("", 140, 50);
  //   // doc.text("John Doe", 170, 50);

  //   doc.text("Payer le :", 140, 55);
  //   doc.text(facture.datePayment, 170, 55);

  //   // Order Details Header
  //   doc.setFontSize(12);
  //   doc.text("Liste des panneaux", 10, 70);

  //   // Table
  //   const tableStartY = 75;
  //   doc.setFontSize(10);
  //   doc.setDrawColor(0, 0, 0);

  //   // const headers = ["Boulevards", "Panneaux", "Emplacement", "Prix"];
  //   // const row = ["PoutineVille", "John Doe", "7", "120", "1", "120.00"];

  //   // Draw table header
  //   let startX = 10;
  //   let startY = tableStartY;
  //   // headers.forEach((header, index) => {
  //   //   doc.text(header, startX + index * 30, startY);
  //   // });
  //   // doc.line(10, startY + 2, 200, startY + 2); // Header bottom border

  //   // // Draw table row
  //   // startY += 7;
  //   // row.forEach((cell, index) => {
  //   //   doc.text(cell, startX + index * 30, startY);
  //   // });
  //   // doc.line(10, startY + 2, 200, startY + 2); // Row bottom border

  //   // Table Data

  //   const headers = [["Boulevards", "Panneaux", "Emplacement", "Prix","Imprssion"]];

  //   // this.lesPanneau.forEach((item)=>{
  //   //    this.rows = [
  //   //     [
  //   //     item.boulevard?.name || "N/A",
  //   //     item.id || 0,
  //   //     item.localisation || "N/A",
  //   //     item.prixMensuel || 0,
  //   //     item.printPrice??0
  //   //   ]
  //   //   ];
  //   // })

  //   lignAbnne.forEach((item) => {
  //     this.rows.push([
  //       item.panneau.boulevard?.name || "N/A",
  //       item.panneau.id || 0,
  //       item.panneau.localisation || "N/A",
  //       item.panneau.prixMensuel || 0,
  //       item.panneau.nbreFace ?? 0
  //     ]);
  //   });

  //   // Add table using autoTable
  //   autoTable(doc, {
  //     head: headers,
  //     body: this.rows,
  //     startY: 70, // Position of the table
  //     theme: "grid", // Add grid lines
  //     headStyles: {
  //       fillColor: [0, 150, 0], // Green header background
  //       textColor: [255, 255, 255], // White text
  //     },
  //     bodyStyles: {
  //       fillColor: [245, 245, 245], // Light gray rows
  //       textColor: [0, 0, 0], // Black text
  //     },
  //     alternateRowStyles: {
  //       fillColor: [255, 255, 255], // Alternate rows white
  //     },
  //     columnStyles: {
  //       0: { halign: "left" }, // Align first column left
  //       3: { halign: "right" }, // Align last column right
  //     },
  //   });

  //   // Total Amount
  //   startY += 10;
  //   doc.setFontSize(12);
  //   doc.text("Total Amount", 140, startY);
  //   doc.text("120.00", 170, startY);

  //   // Additional Details
  //   startY += 20;
  //   doc.setFontSize(12);
  //   doc.text("Additional Details", 10, startY);

  //   startY += 5;
  //   doc.setFontSize(10);
  //   doc.text("The product will be there soon!", 10, startY);

  //   // QR Code
  //   // doc.setTextColor(0, 0, 255);
  //   // const qrCodeData = "https://www.example.com/invoice/REF-JR9BY";
  //   // const qrCodeCanvas = document.createElement("canvas");
  //   // await QRCode.toCanvas(qrCodeCanvas, qrCodeData,{
  //   //   color: {
  //   //     dark: ("#009600"), // Blue color for the QR code
  //   //     light: "#FFFFFF", // White background
  //   //   },
  //   // });
  //   // const qrCodeImage = qrCodeCanvas.toDataURL("image/png");
  //   // doc.addImage(qrCodeImage, "PNG", 10, startY + 5, 30, 30);

  //   try {
  //   const qrCodeData = "https://www.example.com/invoice/REF-JR9BY";
  //     const qrCodeCanvas = document.createElement("canvas");
  //     await QRCode.toCanvas(qrCodeCanvas, qrCodeData, {
  //       color: {
  //         dark: "#009600", // Couleur principale
  //         light: "#FFFFFF", // Couleur de fond
  //       },
  //     });
  //     const qrCodeImage = qrCodeCanvas.toDataURL("image/png");
  //     doc.addImage(qrCodeImage, "PNG", 10, startY + 5, 30, 30);
  //   } catch (error) {
  //     console.error("Erreur lors de la génération du QR code :", error);
  //   }

  //   // Terms and Conditions
  //   doc.setFontSize(12);
  //   doc.text("Terms and Conditions", 60, startY + 5);

  //   doc.setFontSize(10);
  //   // const terms = [
  //   //   "Order can be return in max 10 days.",
  //   //   "Warranty of the product will be subject to the manufacturer's terms and conditions.",
  //   //   "This is a system-generated invoice."
  //   // ];
  //   // terms.forEach((term, index) => {
  //   //   doc.text(term, 60, startY + 12 + index * 5);
  //   // });

  //   // Footer
  //   doc.setFontSize(10);
  //   doc.text("Rockstar", 10, 270);
  //   doc.text("505 St Catherine St E, Montreal", 10, 275);
  //   doc.text("Quebec H2L 2C9", 10, 280);
  //   doc.text("Email: info@rockstar.cd", 150, 270);
  //   doc.text("Phone: +243 975 600 109", 150, 275);
  //   doc.text("Web: www.rockstar.cd", 150, 280);

  //   const totalPages = doc.getNumberOfPages();
  // for (let i = 1; i <= totalPages; i++) {
  //   doc.setPage(i); // Définir la page actuelle
  //   doc.text(`Page ${i} sur ${totalPages}`, 105, 290, { align: "center" }); // Pied de page
  // }
  //     // Sauvegarder le PDF
  //     doc.save('facture.pdf');

  //   }

  async generateInvoice(
    user: UserResponse,
    facture: Facture,
    boulevards: BoulevardResponse[],
    lignAbnne: LigneAbonnementResponse[]
  ) {
    const doc = new jsPDF();

    // methode pour les boulevard

    // texte de font arrière plan
    doc.setFontSize(60); // Définit une grande taille de police pour "FACTURE".
    doc.setTextColor(200, 200, 200); // Définit une couleur gris clair (200, 200, 200).
    doc.text('ALL COMMUNICATION', 155, 150, {
      // Dessine le texte "FACTURE".
      align: 'center', // Centré horizontalement.
      angle: 50, // Incliné à 45° pour un effet diagonal.
    });

    // doc.setGState({ opacity: 0.2 });    // Réduit l'opacité à 20%.
    // doc.setFontSize(60);                // Conserve la taille de police précédente pour cohérence.
    // doc.setTextColor(200, 200, 200);    // Réutilise la couleur gris clair pour "FACTURE".
    // doc.text("FACTURE", 105, 150, {     // Dessine à nouveau le texte "FACTURE" en semi-transparent.
    //   align: "center",                  // Centré comme avant.
    //   angle: 45                         // Même angle pour une apparence identique.
    // });
    // doc.setGState({ opacity: 1 });      // Réinitialise l'opacité pour le reste du contenu.

    // doc.setFontSize(18);                // Définit une taille de police normale pour les autres textes.
    // doc.setTextColor(0, 0, 0);          // Change la couleur à noir.
    // doc.text("Udacity", 10, 10);        // Dessine le texte "Udacity" par-dessus.

    // --- En-tête ---
    doc.setFontSize(18);
    doc.text('All-Communication', 10, 10);
    doc.setFontSize(10);
    doc.text('15 Rue de France, Dékon', 10, 15);

    doc.setFontSize(16);
    doc.setTextColor(0, 150, 0);
    doc.text('FACTURE', 105, 30, { align: 'center' });

    // --- Informations client ---
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text('Information du client', 10, 40);

    doc.setFontSize(10);
    doc.text(user.nonUtilisateur, 10, 45);
    doc.text(user.email, 10, 55);
    doc.text(user.numero, 10, 60);

    doc.text('Date ', 140, 40);
    doc.text(facture.datePayment, 170, 40);

    doc.text('Référence', 140, 45);
    doc.text(facture.reference, 170, 45);

    doc.text('Payer le :', 140, 55);
    doc.text(facture.datePayment, 170, 55);

    // --- Tableau ---
    let startY = 70; // Position initiale du tableau
    const pageHeight = doc.internal.pageSize.height; // Hauteur de la page

    // Entête du tableau
    const headers = ['Boulevards','Panneaux','Emplacement','Face','Prix','Impression'];
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');

    const pageWidth = doc.internal.pageSize.getWidth(); // Largeur de la page
    const margin = 10; // Marge de chaque côté
    const columnWidth = (pageWidth - margin * 2) / headers.length; // Largeur dynamique pour chaque colonne

    const columnWidths = [50, 20, 60, 20, 20,20]; // Largeurs spécifiques pour chaque colonne
    const totalWidth = columnWidths.reduce((a, b) => a + b, 0);
    const startX = (pageWidth - totalWidth) / 2;
    let xPosition = startX; // Position initiale pour les en-têtes

    headers.forEach((header, index) => {
      const textWidth = doc.getTextWidth(header);
      const offset = (columnWidths[index] - textWidth) / 2; // Décalage pour centrer horizontalement
      doc.text(header, xPosition + offset, startY);
      xPosition += columnWidths[index];
    });

    startY += 10; // Passer à la ligne suivante

    // Corps du tableau
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    lignAbnne.forEach((item, rowIndex) => {

      // Vérifier si un saut de page est nécessaire
      if (startY + 10 > doc.internal.pageSize.getHeight() - 30) {
        doc.addPage();
        startY = 20; // Recommencer en haut de la nouvelle page
      }

      xPosition = startX; // Réinitialiser la position horizontale pour chaque ligne

      // Centrer chaque cellule horizontalement

      // console.log(this.boulevard.name)
      // console.log("this.boulevard.name")
      const data = [
        item.boulevardName || 'N/A',
        (item.panneauId || 0).toString(),
        item.emplacement || 'N/A',
        (item.nbrFace || 0).toString(),
        (item.price || 0).toString(),
        (item.printPrice || 0).toString()
      ];

      data.forEach((cell, index) => {
        const textWidth = doc.getTextWidth(cell);
        const offset = (columnWidths[index] - textWidth) / 2; // Décalage pour centrer
        doc.text(cell, xPosition + offset, startY);
        xPosition += columnWidths[index];
      });

      startY += 10; // Passer à la ligne suivante
    });

    // --- Solde total ---
    if (startY + 20 > pageHeight) {
      doc.addPage();
      startY = 20;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Montant total', 140, startY);
    doc.text(facture.mtnTotal.toFixed(2), 170, startY);
    startY += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Montant payé', 135, startY);
    doc.text(facture.mtnPayer.toFixed(2), 170, startY);

    startY += 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Montant restant', 135, startY);
    doc.text(facture.mtnRestant.toFixed(2), 170, startY);

    // --- Autres détails ---
    startY += 20;
    if (startY > pageHeight - 30) {
      doc.addPage();
      startY = 20;
    }

    doc.setFontSize(12);
    doc.text('Autres détails', 10, startY);

    startY += 10;
    doc.setFontSize(10);
    // doc.text('The product will be there soon!', 10, startY);

    try {
      const qrCodeData = 'Facture de Brice';
      const qrCodeCanvas = document.createElement('canvas');
      await QRCode.toCanvas(qrCodeCanvas, qrCodeData, {
        color: {
          dark: '#009600', // Couleur principale
          light: '#FFFFFF', // Couleur de fond
        },
      });
      const qrCodeImage = qrCodeCanvas.toDataURL('image/png');
      doc.addImage(qrCodeImage, 'PNG', 10, startY + 5, 30, 30);
    } catch (error) {
      console.error('Erreur lors de la génération du QR code :', error);
    }

    // --- Pied de page ---
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} sur ${totalPages}`, 105, pageHeight - 10, {
        align: 'center',
      });
    }

    // --- Sauvegarde ---
    doc.save('facture.pdf');
  }
}
