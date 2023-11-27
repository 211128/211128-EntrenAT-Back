import express from 'express';
import { Signale } from 'signale';
import { userRouter } from './src/usuarios/infrastructure/userRoutes';
import { armRouter } from './src/muscles/arm/infraestructure/armRoutes';

const app = express();
const signale = new Signale();

app.use(express.json());

// Rutas relacionadas con usuarios
app.use('/api/v1/', userRouter);
app.use('/api/v1/exercise', armRouter)


app.listen(3006, () => {
    signale.success("Server online in port 3006");
});

