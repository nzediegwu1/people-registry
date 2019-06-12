import express from 'express';
import profile from './controllers/profile';
import { validateUser, validateId, handleValidation } from './middlewares/validator';

const app = express.Router();

app.get('/', (req, res) => res.status(200).send('Welcome People-Registry api'));
app.get('/people/:id', validateId, handleValidation, profile.get);
app.get('/people', profile.getAll);
app.post('/people', validateUser, handleValidation, profile.create);
app.patch('/people/:id', validateUser, handleValidation, profile.update);
app.delete('/people/:id', validateId, handleValidation, profile.delete);

export default app;
