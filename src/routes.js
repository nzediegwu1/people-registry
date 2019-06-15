import express from 'express';
import contact from './controllers/contact';
import { validateUser, validateId, handleValidation } from './middlewares/validator';

const app = express.Router();

app.get('/', (req, res) => res.status(200).send('Welcome Contact-Registry api'));
app.get('/contacts/:id', validateId, handleValidation, contact.get);
app.get('/contacts', contact.getAll);
app.post('/contacts', validateUser, handleValidation, contact.create);
app.patch('/contacts/:id', validateUser, handleValidation, contact.update);
app.delete('/contacts/:id', validateId, handleValidation, contact.delete);

export default app;
