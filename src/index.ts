    import 'dotenv/config';
    import express, { Request, Response } from 'express';
    import cors from 'cors';
    import { connectDB } from './config/db';
    import authRouters from './routes/authRoutes';
    
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/api/auth', authRouters);

    app.get('/health', (req: Request, res:
    Response) => {
        res.json({ status: 'ok' });
    });

    const PORT = process.env.PORT || 5000;

    connectDB().then(() => {
        app.listen(PORT, () =>
    console.log(`Server running on port
    ${PORT}`));
    });