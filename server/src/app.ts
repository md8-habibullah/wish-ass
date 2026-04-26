import express, { type Application } from 'express';
import cors from 'cors';
import { toNodeHandler } from "better-auth/node";
import { medicineRouter } from './modules/medicine/medicine.router';
import { orderRouter } from './modules/order/order.router';
import { auth } from '../lib/auth';
import { reviewRouter } from './modules/review/review.router';
import { userRouter } from './modules/user/user.router';
import { categoryRouter } from './modules/category/category.router';
import { announcementRouter } from './modules/announcement/announcement.router';

const app: Application = express();

const allowedOrigins = [
    process.env.FRONTEND_APP_URL,
    'http://localhost:3000',
    'https://wish-ass-client.vercel.app',
    'https://medisync-client.vercel.app'
].filter(Boolean) as string[];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
// mount the auth router to handle all authentication-related routes
app.use("/api/auth", toNodeHandler(auth));

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "MediSync API | Central Control System Active",
        engineer: "Habibullah",
        status: "Online"
    });
});

app.use("/medicine", medicineRouter);
app.use("/orders", orderRouter);


app.use("/reviews", reviewRouter);
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/announcements", announcementRouter);


export default app;