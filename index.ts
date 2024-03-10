import express, { Express } from 'express'
import path from 'path';
import dotenv from "dotenv"
import * as database from "./config/database";
import clientRouter from './routers/client/index.router';
import adminRouter from './routers/admin/index.router';
import { systemConfig } from './config/config';
import methodOverride  from "method-override"

dotenv.config();
database.connect();

const app: Express = express()
const port: string | number = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(methodOverride('_method'))

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

clientRouter(app);
adminRouter(app);

app.locals.prefixAdmin = systemConfig.prefixAdmin



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})