# 📝 Task Manager App

A full-stack Task Management application built with modern technologies like Next.js, TailwindCSS, Drizzle ORM, and Google Gemini AI — enabling users to manage their personal tasks efficiently with real-time AI-powered task generation.

---

## 🚀 Features

- 🔐 **Authentication** with Clerk.com (or Firebase Auth)
- ✅ Create, edit, delete, and mark tasks as complete
- 🤖 Generate smart task suggestions using **Google Gemini API**
- 🧠 Per-user task management with proper state handling
- 🌐 Fully responsive UI with **Tailwind CSS** and **ShadCN UI**
- 📦 Clean, scalable architecture following best practices

---

## 🛠️ Tech Stack

### 🔧 Backend

- ⚙️ **Node.js** with alternative frameworks like:
  - [Hono](https://hono.dev)
  - [Deno Fresh](https://fresh.deno.dev/)
  - [Next.js API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
- 🧬 **Drizzle ORM** for database queries
- 🐘 **PostgreSQL** hosted via:
  - [Neon.tech](https://neon.tech) (recommended for free hosting)
  - Or run locally via Docker

### 🎨 Frontend

- ⚛️ **Next.js (v14.5 or higher)**
- 🎨 **Tailwind CSS** with **ShadCN UI** for modern, responsive styling
- 🔁 **Axios** for API communication
- 🗃️ **State Management** using hooks.

---

## 🔑 Authentication

Implemented with [Clerk.com](https://clerk.com) (or Firebase Auth) to support:

- User signup/login
- Session management
- Per-user task data isolation

---

## 🤖 AI Task Generator

The app uses **Google Gemini API** to generate task ideas based on user input or categories, making planning faster and more intelligent.

---

## 🧪 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/ai-task-manager.git
cd ai-task-manager
