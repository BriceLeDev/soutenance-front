// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class PrintTableService {

//   constructor() { }


//     async generateInvoice(
//       user: UserResponse,
//       facture: Facture,
//       boulevards: BoulevardResponse[],
//       lignAbnne: LigneAbonnementResponse[]
//     ) {
//       const doc = new jsPDF();

//       // methode pour les boulevard

//       // texte de font arrière plan
//       doc.setFontSize(60); // Définit une grande taille de police pour "FACTURE".
//       doc.setTextColor(200, 200, 200); // Définit une couleur gris clair (200, 200, 200).
//       doc.text('ALL COMMUNICATION', 155, 150, {
//         // Dessine le texte "FACTURE".
//         align: 'center', // Centré horizontalement.
//         angle: 50, // Incliné à 45° pour un effet diagonal.
//       });

//       // doc.setGState({ opacity: 0.2 });    // Réduit l'opacité à 20%.
//       // doc.setFontSize(60);                // Conserve la taille de police précédente pour cohérence.
//       // doc.setTextColor(200, 200, 200);    // Réutilise la couleur gris clair pour "FACTURE".
//       // doc.text("FACTURE", 105, 150, {     // Dessine à nouveau le texte "FACTURE" en semi-transparent.
//       //   align: "center",                  // Centré comme avant.
//       //   angle: 45                         // Même angle pour une apparence identique.
//       // });
//       // doc.setGState({ opacity: 1 });      // Réinitialise l'opacité pour le reste du contenu.

//       // doc.setFontSize(18);                // Définit une taille de police normale pour les autres textes.
//       // doc.setTextColor(0, 0, 0);          // Change la couleur à noir.
//       // doc.text("Udacity", 10, 10);        // Dessine le texte "Udacity" par-dessus.

//       // --- En-tête ---
//       doc.setFontSize(18);
//       doc.text('All-Communication', 10, 10);
//       doc.setFontSize(10);
//       doc.text('15 Rue de France, Dékon', 10, 15);

//       doc.setFontSize(16);
//       doc.setTextColor(0, 150, 0);
//       doc.text('FACTURE', 105, 30, { align: 'center' });

//       // --- Informations client ---
//       doc.setTextColor(0, 0, 0);
//       doc.setFontSize(12);
//       doc.text('Information du client', 10, 40);

//       doc.setFontSize(10);
//       doc.text(user.nonUtilisateur, 10, 45);
//       doc.text(user.email, 10, 55);
//       doc.text(user.numero, 10, 60);

//       doc.text('Date ', 140, 40);
//       doc.text(facture.datePayment, 170, 40);

//       doc.text('Référence', 140, 45);
//       doc.text(facture.reference, 170, 45);

//       doc.text('Payer le :', 140, 55);
//       doc.text(facture.datePayment, 170, 55);

//       // --- Tableau ---
//       let startY = 70; // Position initiale du tableau
//       const pageHeight = doc.internal.pageSize.height; // Hauteur de la page

//       // Entête du tableau
//       const headers = ['Boulevards','Panneaux','Emplacement','Face','Prix','Impression'];
//       doc.setFontSize(12);
//       doc.setFont('helvetica', 'bold');

//       const pageWidth = doc.internal.pageSize.getWidth(); // Largeur de la page
//       const margin = 10; // Marge de chaque côté
//       const columnWidth = (pageWidth - margin * 2) / headers.length; // Largeur dynamique pour chaque colonne

//       const columnWidths = [50, 20, 60, 20, 20,20]; // Largeurs spécifiques pour chaque colonne
//       const totalWidth = columnWidths.reduce((a, b) => a + b, 0);
//       const startX = (pageWidth - totalWidth) / 2;
//       let xPosition = startX; // Position initiale pour les en-têtes

//       headers.forEach((header, index) => {
//         const textWidth = doc.getTextWidth(header);
//         const offset = (columnWidths[index] - textWidth) / 2; // Décalage pour centrer horizontalement
//         doc.text(header, xPosition + offset, startY);
//         xPosition += columnWidths[index];
//       });

//       startY += 10; // Passer à la ligne suivante

//       // Corps du tableau
//       doc.setFont('helvetica', 'normal');
//       doc.setFontSize(10);
//       lignAbnne.forEach((item, rowIndex) => {

//         // Vérifier si un saut de page est nécessaire
//         if (startY + 10 > doc.internal.pageSize.getHeight() - 30) {
//           doc.addPage();
//           startY = 20; // Recommencer en haut de la nouvelle page
//         }

//         xPosition = startX; // Réinitialiser la position horizontale pour chaque ligne

//         // Centrer chaque cellule horizontalement

//         // console.log(this.boulevard.name)
//         // console.log("this.boulevard.name")
//         const data = [
//           item.boulevardName || 'N/A',
//           (item.panneauId || 0).toString(),
//           item.emplacement || 'N/A',
//           (item.nbrFace || 0).toString(),
//           (item.price || 0).toString(),
//           (item.printPrice || 0).toString()
//         ];

//         data.forEach((cell, index) => {
//           const textWidth = doc.getTextWidth(cell);
//           const offset = (columnWidths[index] - textWidth) / 2; // Décalage pour centrer
//           doc.text(cell, xPosition + offset, startY);
//           xPosition += columnWidths[index];
//         });

//         startY += 10; // Passer à la ligne suivante
//       });

//       // --- Solde total ---
//       if (startY + 20 > pageHeight) {
//         doc.addPage();
//         startY = 20;
//       }


//       // --- Autres détails ---
//       startY += 20;
//       if (startY > pageHeight - 30) {
//         doc.addPage();
//         startY = 20;
//       }

//       doc.setFontSize(12);
//       doc.text('Autres détails', 10, startY);

//       startY += 10;
//       doc.setFontSize(10);
//       // doc.text('The product will be there soon!', 10, startY);

//       // --- Pied de page ---
//       const totalPages = doc.getNumberOfPages();
//       for (let i = 1; i <= totalPages; i++) {
//         doc.setPage(i);
//         doc.setFontSize(10);
//         doc.text(`Page ${i} sur ${totalPages}`, 105, pageHeight - 10, {
//           align: 'center',
//         });
//       }

//       // --- Sauvegarde ---
//       doc.save('facture.pdf');
//     }
// }
