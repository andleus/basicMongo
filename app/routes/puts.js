import { Router } from "express";
import { conn } from '../conn/conn.js';
const routerPuts = Router();

routerPuts.put('/update', async(req, res) => {

    try{
        const collection = await conn();
        // const collection = db.db('miodb').collection('mioCol');
        const { id }= req.body;
        const { filename, originalname, mimetype } = req.body;
        console.log({filename});
        const resultDel = await collection.updateOne(
            { _id: id },
            { $set: { filename, originalname, mimetype } }
        );
    
        if(resultDel.matchedCount > 0){
            res.json(`Se ha actualizado ${id}`);
        }else{
            res.status(404).json({error: 'Document not found'});
        }

    }catch(error){
        console.error(`No se pudo actualizar nada ${error}`);
        res.status(404).json({error : 'Unable to update nothing'});
    }


})


export default routerPuts;