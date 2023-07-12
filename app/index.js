import express from 'express';
import routesIndex from './routes/gets.js';
import routesPosts from './routes/posts.js';
import routesPuts from './routes/puts.js';
import routesDeletes from './routes/deletes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routesIndex);
app.use(routesPosts);
app.use(routesPuts);
app.use(routesDeletes);


app.listen(port);
console.log("Puerto de de embarque -> "+port);