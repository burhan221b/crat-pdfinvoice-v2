import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


function pdfMakeDownload(docDefinition: any) {
    pdfMake.createPdf(docDefinition).download();
}

function pdfMakeOpen(docDefinition: any) {
    pdfMake.createPdf(docDefinition).open();
}

function pdfMakePrint(docDefinition: any) {
    pdfMake.createPdf(docDefinition).print();
}

export { pdfMakeDownload, pdfMakeOpen, pdfMakePrint };
