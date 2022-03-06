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
});

// get book
app.get('/librosIngresados/:id', async( req, res ) => {
  
  try {
    const id = req.params.id;
    const bookRef = await db.collection('librosIngresados').doc( id );
    const bookSnap = await bookRef.get();

    if( !bookSnap.exists ){
      res.status(404).json({
        exist: false
      })
    } else {
      res.json({
        bookInfo: bookSnap.data()
      })
    }
  } catch( err ) {  }

  
})

//sumar la cantidad de prestados
app.post('/librosIngresados/:id', async ( req, res ) => {
  const id = req.params.id;
  const bookRef = await db.collection('librosIngresados').doc( id );
  const bookSnap = await bookRef.get();
  const data = bookSnap.data() || { cantPrestado: 0 };

  if( !bookSnap.exists ){
    res.status(404).json({
      exist: false
    })
    return 
  }

  if ( data.cantPrestado == 3 ) {
    res.status(200).json({
      exist: true,
      bookInfo: data,
      updated: false
    })
  } else{
    bookRef.update({
      cantPrestado: data.cantPrestado + 1
    })
    res.status(200).json({
      exist: true,
      bookInfo: data,
      updated: true
    })
  }
})

// add lending
app.post('/prestamos/:id', async ( req, res ) => {
  
  const id = req.params.id;
  const prestamoRef = await db.collection('prestamos').doc( id );
  const prestamoSnap = await prestamoRef.get();
  const data = prestamoSnap.data() || { usuarios: 0 };

  if( !prestamoSnap.exists ){
    res.status(404).json({
      exist: false
    })

    res.status(200).json({
      ok: true,
      prestamo: data
    })
  }

})
// POST request
// app.post('/user/:email', async (req, res) => {
//   const email = req.params.email;
//   const userRef = db.collection('user').doc( email );
//   const userSnap = await userRef.get();
//   const userData = userSnap.data();

//   if ( !userSnap.exists ) {
//     res.status(404).json({
//       ok: false,
//       message: `Book id: ${email} not exists`
//     });
//   } else {
//     res.status(200).json({
//       ok: true,
//       userData: userData
//     });
//   }
// });

// server running
export const api = functions.https.onRequest( app );
