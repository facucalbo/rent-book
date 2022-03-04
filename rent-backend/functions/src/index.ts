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
app.get('/user/:dni', async (req, res) => {
  const email = req.params.dni;
  const userRef = db.collection('user').doc( email );
  const docsSnap = await userRef.get();
  const user = docsSnap.data();

  if ( !docsSnap.exists ) {
    res.status(404).json({
      message: 'User not exists'
    })
  } else {
    res.status(200).json( user )
  }

  return res.status(200).json( user );
});

// POST request
app.post('/user/:email', async (req, res) => {
  const email = req.params.email;
  const userRef = db.collection('user').doc( email );
  const userSnap = await userRef.get();

  if ( !userSnap.exists ) {
    res.status(404).json({
      ok: false,
      message: `Book id: ${email} not exists`,
    });
  } else {
    res.json('Book exists');
  }
});

// test post method
app.post('/user/add', async (req, res) => {

  const userRef = db.collection('user').doc();

  const data = {
    apellido: 'messi',
    dni: '222211113',
    id: userRef.id,
    localidad: 'rosario',
    mail: 'messi@mgial.com',
    name: 'lionel',
    telefono: '123123123',
    username: 'leomessi'
  }

  const request = await userRef.set(data);

  res.json({
    ok: true,
    message: 'Request ok',
    request
  })
});

// server running
export const api = functions.https.onRequest( app );
