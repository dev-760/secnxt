# SecNXT

SecNXT is an all-in-one AI-powered cybersecurity SaaS platform developed by **NXT Lap**, a Moroccan startup. It provides **threat detection, vulnerability scanning, incident response, and identity management**, with a zero-click client agent and AI-assisted insights.

This repository contains the **frontend web application**, built with modern React technologies and designed to be responsive, performant, and scalable for SMBs, enterprises, and government clients.

---

## 🚀 Features

- **React 18** – Modern React with concurrent features
- **Vite** – Fast build tool and development server
- **Redux Toolkit** – Simplified state management
- **TailwindCSS** – Utility-first, fully responsive styling
- **React Router v6** – Declarative routing
- **Data Visualization** – D3.js and Recharts for charts and dashboards
- **Form Handling** – React Hook Form for efficient forms

---

## 📋 Prerequisites

- Node.js 
- npm 

---

## 🛠️ Installation

1. Clone the repository and install dependencies:

```bash
npm install

Start the development server:

```bash
npm start

Open your browser at http://localhost:5173 (Vite default).


📁 Project Structure

secnxt_frontend/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level components
│   ├── styles/           # Global styles & Tailwind config
│   ├── App.jsx           # Main application component
│   ├── Routes.jsx        # Application routes
│   └── index.jsx         # Entry point
├── .env                  # Environment variables
├── index.html            # HTML template
├── package.json          # Project dependencies & scripts
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js        # Vite configuration


🧩 Adding Routes
To add a new page, update Routes.jsx:

import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import DashboardPage from "pages/DashboardPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/dashboard", element: <DashboardPage /> },
    // Add more routes here
  ]);

  return element;
};


🔒 Security Considerations
Designed for Moroccan SMBs, enterprises, and government clients.

Frontend communicates with the SecNXT backend over secure APIs.

All sensitive operations handled on the server or zero-click agent; frontend only handles visualization and interactions.


🙏 Acknowledgments
Developed by NXT Lap, Moroccan cybersecurity startup

Powered by React, Vite, Tailwind CSS, Redux Toolkit, Framer Motion

Built with ❤️ by NXT Lap
