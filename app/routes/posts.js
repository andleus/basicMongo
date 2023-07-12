
import { Router } from 'express';
import { conn } from '../conn/conn.js';
import multer from 'multer';
import path from 'path';
const routerPosts = Router();



function getRealDate(dt){
    const newDate = new Date(dt);
    var textDate = `${newDate.getFullYear()}::${newDate.getMonth()+1}::${newDate.getDay()+9}--${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`; 
    console.log(textDate);
    return textDate; 

}



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.env.PWD, 'imagesUp/'));
    },
    filename: (req, file, cb) => {
        const uniqueDateSuffix = getRealDate(Date.now());
        cb(null, `${file.originalname.split('.').shift()}-${uniqueDateSuffix}.${file.originalname.split('.').pop()}` );
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.originalname.match(/\.(jpeg|jpg|png)$/)){
            cb(null, true);
        }else{
            cb(null, false);
        }
    }

});



routerPosts.post('/saveImage', async(req, res) => {

    try{
        const collection = await conn();
        // const collection = db.db('miodb').collection('mioCol');
        const { id } = req.body;
        const  { desc: des } = req.body;
        const document = { _id: id, description: des}
        const result = await collection.insertOne(document);
        console.log(`Se insertó el documento  ${result.insertedId}`)
        res.send(`Se guarda una nueva imagen con id -> ${id} y descripción '${des}'`)

    }catch(error){
        console.error(`No se pudo insertar el documento ${error}`);
        res.status(500).json({error: 'Failed to insert document'});
    }

})


routerPosts.post('/uploadImage', upload.array('images'), async(req, res) => {

    try{

        const files = req.files;
        if(!files){
            res.status(400).json({error: 'The file hasn\'t been uploaded'});
            return;
        }

        for(const file of files){
            const collection = await conn();
            // const collection = db.db('miodb').collection('mioCol');
            const { id } = req.body;
            const document = { 
                _id: id,
                filename: file.filename, 
                originalname: file.originalname, 
                mimetype: file.mimetype
            };
            const result = await collection.insertOne(document);
            console.log(`Se ha subido la imagen  ${result.insertedId}`);
        }

        
        res.send(`Se ha(n) guardado la(s) nueva(s) imagen(es) `);

    }catch(error){
        console.error(`No se pudo subir la imagen ${error}`);
        res.status(500).json({error: 'Failed to upload the image'});
    }

})

export default routerPosts;