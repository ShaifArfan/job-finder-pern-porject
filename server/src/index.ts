import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import allRoutes from './routers';

import { errorHandler } from './middlewares/errorHandler';

const app = express();
const port = process.env.PORT;

app.use(morgan('tiny'));
app.use(express.json());

// routes
app.use('/api/v1', allRoutes);

// error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
