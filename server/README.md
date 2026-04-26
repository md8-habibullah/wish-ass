# 📡 Wish Ass Server: Logistics Backend

The central data layer and logistics engine for the **Wish Ass** medical procurement platform. Engineered for stability, security, and high-concurrency clinical transactions.

## 🚀 Tech Stack
- **Node.js & Express**: Modular backend architecture.
- **TypeScript**: Strict type safety for medical data.
- **Prisma ORM**: Efficient PostgreSQL data management.
- **Better Auth**: Advanced authentication plugin system.
- **Google Gemini**: Clinical intelligence via WACI.

## 🛠️ Features
- **Modular Routing**: Clean separation of medicine, orders, reviews, and user logic.
- **RBAC**: Strict role-based protection for all clinical endpoints.
- **SSL Support**: Ready for production deployments on Vercel/Neon.
- **Priority Queues**: specialized logic for Emergency vs Standard requisitions.

## 🏁 Getting Started
1. **Install Dependencies**:
   ```bash
   pnpm install
   ```
2. **Setup Environment**:
   Copy `.env.example` to `.env` and configure `DATABASE_URL` and `BETTER_AUTH_SECRET`.
3. **Database Setup**:
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   pnpm run seed
   ```
4. **Run Server**:
   ```bash
   pnpm run dev
   ```

Central control system for **Wish Ass**.
