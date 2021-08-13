/*jshint esversion: 6 */ 

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const config = require('./config');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{

    console.log(`Nuestra pagina esta corriendo en el puerto ${ PORT }`);

});

// Conexion Base de Datos 

const user ='Herramientas-Andres';
const password ='OrdinarioAndres';
const bd='HerramientasAndres';
const uri =`mongodb+srv://${user}:${password}@cluster0.mhnst.mongodb.net/${bd}?retryWrites=true&w=majority`;


mongoose.connect(uri, 
{useNewUrlParser: true, useUnifiedTopology: true}
)

.then(()=> console.log('Conexión exitosa a MongoDB')) 
.catch(e => console.log('Error de conexión', e))

// Configuracion para Body Parser

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

//$ npm i -S method-override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


// Configurar el motor de vistas HBS

app.engine('.hbs', hbs({

    defaultLayout : 'index',
    extname: 'hbs'

}));

app.set('view engine', '.hbs');

// Declaracion de carpeta STATIC

app.use(express.static('public'));

// Route our App

const router = require('./routes/routes');

app.use('/', router);

/*
// Conexion a BD y levantar Servidor

mongoose.connect(config.db,config.urlParser, ( err, res ) => {

    if(err){

        return console.log(`Error al conectar la bd ${err}`);
    }

    console.log('Conexion a la BD exitosa');

    app.listen(config.port, () => {

        console.log(`API-REST  yeiii ejecutando en locahost:${config.port}`);

    });
});
*/