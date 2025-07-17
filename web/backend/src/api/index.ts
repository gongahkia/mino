// index.ts
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.use('/api', routes);

app.get('/', (_, res) => res.send('Mino Backend Running. Try /api/model'));

app.listen(port, () => {
    console.log(`Mino backend listening on port ${port}`);
});

export default app;