
import { Router } from "express";
import { conn } from '../conn/conn.js';
const routerGets = Router();

console.log(conn());

routerGets.get('/personal', function(req, res){
    var nombre = req.query.nombre
    var apellido = req.query.apellido
    res.send("¡Cómo están ustedeeess! os saluda -> "+nombre+
        " "+apellido+" desde GET 2")

})

routerGets.get('/', function(req, res) {
    res.send("Hola * desde GET 3");
})


routerGets.get('/getImage/:id', async (req, res) => {


    try{

        const collection = await conn();
        const imageId = req.params.id;
        const document = await collection.findOne({ _id: imageId });
        if(document){
            res.json(document);
        }else{
            res.status(404).json({error: 'Document not found'});
        }


    }catch(error){
        console.error(`No se pudo buscar nada ${error}`);
        res.status(404).json({error : 'Unable to found nothing'});
    }


})


export default routerGets;