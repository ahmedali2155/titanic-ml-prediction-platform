# Titanic ML Prediction Platform

A production-ready frontend for a deployed **FastAPI Machine Learning API**, built as a portfolio-grade demonstration of an end-to-end ML platform rather than a traditional CRUD application.

The platform provides real-time Titanic survival predictions, live system monitoring, Champion–Challenger model evaluation, feature drift visualization, and production metrics through a modern glassmorphism-inspired user interface.

---

## ✨ Features

- 🚢 Real-time Titanic survival prediction
- 🤖 Champion ML model prediction
- 🧪 Demo prediction endpoint
- 📊 Live monitoring dashboard
- 📈 Feature drift monitoring
- ⚖️ Champion vs Challenger A/B metrics
- ❤️ API health monitoring
- 🔄 Automatic metric polling
- 📱 Fully responsive design
- 🌊 Glassmorphism + sonar-inspired UI
- ⚡ Framer Motion animations
- 🔒 API key authentication
- 🛡️ Type-safe API layer
- ✅ Form validation with Zod
- 🚀 Production deployment ready

---

# Tech Stack

### Frontend

- React 19
- TypeScript
- Vite

### UI

- Tailwind CSS
- Framer Motion
- Lucide React Icons
- Recharts

### Forms & Validation

- React Hook Form
- Zod

### Networking

- Axios
- x-api-key Authentication

### Utilities

- React Router 7
- react-hot-toast

---

# Project Structure

```text
src/
│
├── api/
│   ├── client.ts
│   └── endpoints.ts
│
├── components/
│   ├── animations/
│   ├── cards/
│   ├── charts/
│   ├── common/
│   ├── forms/
│   └── layout/
│
├── hooks/
│
├── pages/
│
├── types/
│
├── utils/
│
├── App.tsx
└── main.tsx
```

---

# Screens

- Home
- Prediction
- Dashboard
- Documentation
- About
- 404

---

# API Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | `/health-check` | API health status |
| GET | `/metrics` | Production metrics |
| GET | `/metrics/drift` | Feature drift metrics |
| GET | `/ab/metrics` | Champion/Challenger metrics |
| POST | `/predict` | Production prediction |
| POST | `/demo/predict` | Demo prediction |

---

# Getting Started

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/titanic-ml-prediction-platform.git
```

Move into the project

```bash
cd titanic-ml-prediction-platform
```

Install dependencies

```bash
npm install
```

Create an environment file

```bash
cp .env.example .env
```

Run locally

```bash
npm run dev
```

---

# Environment Variables

Create a `.env` file.

```env
VITE_API_BASE_URL=https://prosensia-ml-api.onrender.com
VITE_API_KEY=YOUR_API_KEY
```

Never commit your real `.env` file.

---

# Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Preview the production build.

```bash
npm run lint
```

Run ESLint.

---

# Production Features

- Live FastAPI Integration
- Automatic Health Monitoring
- Automatic Metrics Polling
- API Authentication
- Loading States
- Error Handling
- Responsive Layout
- Production-ready Build
- Type-safe API Integration
- Glassmorphism UI

---

# Deployment

## Vercel

1. Push this repository to GitHub.

2. Import the repository into Vercel.

3. Framework Preset

```
Vite
```

4. Build Command

```bash
npm run build
```

5. Output Directory

```
dist
```

6. Add Environment Variables

```
VITE_API_BASE_URL
```

```
VITE_API_KEY
```

Deploy.

---

# Backend

The frontend communicates with a deployed FastAPI Machine Learning service hosted on Render.

If the backend is sleeping because of Render's free-tier cold start, the first request may take several seconds before the API wakes up.

---

# Future Improvements

- Complete Light Theme
- Historical Prediction Analytics
- User Authentication
- Export Prediction Reports
- Advanced Monitoring Dashboard
- Model Version Comparison
- Real-time Notifications

---

# Author

**Ahmed**

Machine Learning Platform Frontend

Built with ❤️ using React, TypeScript, FastAPI, and Tailwind CSS.