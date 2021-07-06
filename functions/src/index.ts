import * as functions from "firebase-functions";
import * as express from 'express';
var pdf = require('html-pdf');
//import { convert } from './convertPDF';
const app = express();
app.get('/', (req, res) => res.status(200).send('hello'));
app.post('/convertPDF', async (req, res) => {
    try {
        const { html } = req.body;
        await pdf.create(html).toBuffer(async function (err: any, buffer: any) {
            console.log('This is a buffer:', Buffer.isBuffer(buffer));
            if (Buffer.isBuffer(buffer)) {
                res.status(200).send({ message: buffer.toString('base64') });
            } else {
                res.status(500).send({ message: 'error' });
            }
        });
        return null;
    } catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.app = functions.https.onRequest(app);
 /*export const helloWorld = functions.https.onRequest((request, response) => {
functions.logger.info("Hello logs!", {structuredData: true});
response.send("Hello from Firebase!"y);
});*/
