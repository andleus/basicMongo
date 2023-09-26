import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27018/miodb';

export async function conn() {
    try {
        const client = await MongoClient.connect(
            'mongodb://localhost:27018/',
            { useNewUrlParser: true, useUnifiedTopology: true }
          );

        const collection = client.db('miodb').collection('mioCol');
        return collection;
        
    } catch (error) {
        throw new Error('error en la conexión');
    }
}