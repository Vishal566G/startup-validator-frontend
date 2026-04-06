# Startup Idea Validator — Frontend

React-based frontend for the AI-powered Startup Idea Validator.

## Tech Stack

- React (Vite)
- React Router DOM
- Axios

## Setup

### Prerequisites

- Node.js v18+
- Backend server running

### Installation

```bash
npm install
```

Create a `.env` file in `/client`:

```
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

Visit `http://localhost:5173`

## Pages

| Route        | Description                      |
| ------------ | -------------------------------- |
| `/`          | Submit a new startup idea        |
| `/dashboard` | View all submitted ideas         |
| `/ideas/:id` | View full AI report + export PDF |

## Deployment

Deployed on Vercel. Set `VITE_API_URL` to your backend URL in Vercel environment variables.
