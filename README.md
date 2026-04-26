# 🚀 Wish Ass: Clinical Procurement & Logistics Intelligence

[![Project Status: Active](https://img.shields.io/badge/Project%20Status-Active-brightgreen)](https://wish-ass-client.vercel.app)
[![Tech Stack: Next.js + Node.js](https://img.shields.io/badge/Stack-Next.js%20%7C%20Node.js-blue)](https://wish-ass-client.vercel.app)
[![Powered by Gemini](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-orange)](https://wish-ass-client.vercel.app)

**Wish Ass** is a high-performance, clinical-grade medical procurement platform designed to streamline pharmaceutical logistics for hospitals, pharmacies, and medical logistics officers. Formerly known as MediSync, it has been re-engineered for "Zero Lag, Zero Errors" with an integrated AI Clinical Intelligence.

---

## 🌐 Live Deployments

- **Frontend Application**: [wish-ass-client.vercel.app](https://wish-ass-client.vercel.app)
- **Backend API**: [wish-ass-server.vercel.app](https://wish-ass-server.vercel.app)

---

## ✨ Key Features

### 🧠 WACI: Clinical Intelligence
Integrated with **Google Gemini 1.5 Flash**, the Wish Ass Clinical Intelligence (WACI) assistant helps logistics officers navigate inventory, understand procurement best practices, and optimize supply chains with professional, medical-grade precision.

### 🔐 Multi-Tier RBAC (Role-Based Access Control)
- **Medical Staff (Customer)**: Browse inventory, place standard or emergency requisitions, and review clinical supplies.
- **Pharmacist Controller (Seller)**: Manage medicine inventory, process orders, and track sales metrics.
- **System Admin**: Complete oversight of users, roles, categories, and system-wide announcements.

### 📦 Smart Procurement System
- **Dynamic Inventory**: Real-time stock tracking with "CRITICAL STOCK" alerts.
- **Priority Requisitions**: Support for **EMERGENCY** and **STANDARD** order priorities with specialized processing queues.
- **Clinical Reviews**: Authenticated review system for medical professionals to share feedback on supplies.

### 🎨 Premium User Experience
- **Futuristic UI**: Built with a sleek dark-mode aesthetic using Glassmorphism, tailored HSL color palettes, and Framer Motion animations.
- **Responsive Engineering**: Fully optimized for desktops, tablets, and mobile devices.
- **Secure Authentication**: Powered by **Better Auth** with support for Google Social login and email verification.

---

## 🛠️ Technology Stack

### Frontend Core
- **Next.js 15+** (App Router)
- **Tailwind CSS** (Advanced styling & animations)
- **Framer Motion** (Micro-interactions)
- **TanStack Query** (State management & data fetching)
- **Lucide React** (Clinical iconography)

### Backend Infrastructure
- **Node.js & Express**
- **TypeScript** (Strict type safety)
- **Prisma ORM** (Data modeling & PostgreSQL adapter)
- **Better Auth** (Session-based authentication)
- **Nodemailer (Brevo)** (Reliable clinical email dispatch)

### Database & Intelligence
- **PostgreSQL**: Robust relational data storage.
- **Google Gemini 1.5 Flash**: Powering the WACI intelligence module.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm (Recommended)
- PostgreSQL Database

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/md8-habibullah/wish-ass.git
   cd wish-ass
   ```

2. **Setup Backend**:
   ```bash
   cd server
   pnpm install
   # Configure .env based on .env.example
   pnpm build
   pnpm run seed # To initialize admin and categories
   pnpm start
   ```

3. **Setup Frontend**:
   ```bash
   cd client
   pnpm install
   # Configure .env based on .env.example
   pnpm run dev
   ```

---

## 📁 Project Structure

```text
wish-ass/
├── client/           # Next.js frontend application
│   ├── src/app/      # App router pages
│   ├── src/lib/      # Auth client & API utilities
│   └── src/components/ # Shadcn & Custom UI components
└── server/           # Express backend API
    ├── src/modules/  # Feature-based modular logic
    ├── lib/          # Database & Auth initialization
    ├── prisma/       # Schema & Migrations
    └── api/          # Production-ready built code
```

---

## 👨‍💻 Engineering
Built with 💙 by **Habibullah** as a production-grade full-stack engineering project.

---

## ⚖️ License
This project is licensed under the ISC License.
