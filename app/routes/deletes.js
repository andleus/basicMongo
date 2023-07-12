import { Router } from "express";
import { conn } from '../conn/conn.js';
const routerDeletes = Router();


routerDeletes.delete('/remove', async(req, res) => {
    try{

        const collection = await conn();
        // const collection = db.db('miodb').collection('mioCol');
        const { id } = req.body;
        const resultDel = await collection.deleteOne({_id: id});
        if(resultDel.deletedCount > 0){
            res.json(`Se ha eliminado la imagen ${id}}`);
        }else{
            res.status(404).json({error: 'Document not found'});
        }


    }catch(error){
        console.error(`No se pudo borrar nada ${error}`);
        res.status(404).json({error : 'Unable to remove nothing'});
    }
})

export default routerDeletes;