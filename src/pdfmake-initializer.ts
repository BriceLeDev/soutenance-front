import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
export const initializePdfMake = () => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  return pdfMake;
};
