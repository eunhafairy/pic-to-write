import { writeFileSync } from "node:fs";
import { PDFDocument } from "pdf-lib";
import crypto from "crypto";
import { homedir } from "node:os";
export const writeFile = async (data, identifier, templateUrl) => {

    try{

        let url = templateUrl || process.env.URL_TO_TEMPLATE_PDF;
        if (!url){
            throw new Error(
                "Please set an environemnt variable called URL_TO_TEMPLATE_PDF and set the value as the url of your template pdf file, or add a params using --templateUrl"
            );
        }
        const formPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(formPdfBytes);
        const form = pdfDoc.getForm();
    
        Object.keys(data).forEach((key) => {
            const textField = form.getTextField(key);
            textField.setText(data[key]);
        });
        const pdfBytes = await pdfDoc.save();
        const fileName = `${
            identifier && data[identifier] ? data[identifier] : crypto.randomUUID()
        }_output.pdf`;
        writeFileSync(homedir() + "/" + fileName, pdfBytes);
        return fileName;
    }
    catch(ex){
        console.error("Something went wrong!", ex)
    }
    
    
};
