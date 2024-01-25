import {  writeFileSync } from 'node:fs';
import { PDFDocument } from 'pdf-lib';


export const writeFile = async (name) => {
    
    try{
        const formPdfBytes = await fetch("https://drive.google.com/uc?export=download&id=1XcoQZKgkg6WNm4eUKjM8y0aWrSDrdZVT").then(res => res.arrayBuffer())
        const pdfDoc = await PDFDocument.load(formPdfBytes)
        const form = pdfDoc.getForm()
        const studentNameField = form.getTextField('studentName')
        studentNameField.setText(name)
        const pdfBytes = await pdfDoc.save()
        writeFileSync(process.cwd()+'/' + name + " - output.pdf", pdfBytes)
    }
    catch(ex){
        console.error("Error~",ex)
    }
}

//"https://drive.google.com/uc?export=download&id=1XcoQZKgkg6WNm4eUKjM8y0aWrSDrdZVT"