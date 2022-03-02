/* eslint-disable max-len */
/* eslint-disable quotes */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// import express para correr un servidor express
import * as express from 'express';
import * as cors from 'cors';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// Express server
const app = express();
app.use( cors({origin: true})); // con cors le damos acceso a otros dominio para acceder a nuestro servicio (firebase), esto es para que no tire error al hacer la peticion

// GET request
app.get('/user', async (req, res) => {
  const userRef = db.collection('user');
  const docsSnap = await userRef.get();
  const users = docsSnap.docs.map( (d) => d.data());

  res.json( users );
});

// POST request
app.post('/librosIngresados/:id', async (req, res) => {
  const id = req.params.id;
  const bookRef = db.collection('librosIngresados').doc( id );
  const bookSnap = await bookRef.get();

  if ( !bookSnap.exists ) {
    res.status(404).json({
      ok: false,
      message: `Book id: ${id} not exists`,
    });
  } else {
    res.json('Book exists');
  }
});

// server running
export const api = functions.https.onRequest( app );
