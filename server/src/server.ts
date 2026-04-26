import { prisma } from "../lib/prisma"
import app from "./app";

const port = process.env.PORT ?? 5050;

// Connect to database
prisma.$connect()
    .then(() => console.log('Database connected successfully.'))
    .catch((error) => console.error('Error connecting to database:', error));

// Export app for Vercel
export default app;

// Only listen if not running on Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(port, () => {
        console.log('Wish Ass Backend Protocol Active on port :', port);
    });
}