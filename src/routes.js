import express from 'express';
import profile from './controllers/profile';

const app = express.Router();

app.get('/', (req, res) => res.status(200).send('Welcome People-Registry api'));
app.get('/people/:id', profile.get);
app.get('/people', profile.getAll);
app.post('/people', profile.create);
app.patch('/people/:id', profile.update);
app.delete('/people/:id', profile.delete);

export default app;
