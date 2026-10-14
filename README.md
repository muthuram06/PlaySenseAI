
# PlaySense AI

**Every player has a story. Every moment has a meaning.**

PlaySense AI is an AI-powered sports companion designed to help fans understand cricket matches, explore player statistics, and discover insights behind match situations through a conversational interface.

## Features

- **Match Center:** View the fictional match score, wickets, overs, current run rate, and remaining overs.
- **Player Explorer:** Explore player statistics, runs, balls faced, and strike rates.
- **Match Insights:** Understand scoring patterns and possible match strategies.
- **AI Companion:** Ask cricket-related questions using a Gemini-powered backend.
- **Fallback Responses:** Keep the chat usable when the AI service is temporarily unavailable.
- **Responsive Dashboard:** Navigate the application through a modern dark-themed interface.
- **Demo Data Transparency:** Clearly identify fictional match information.

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Node.js and Express backend
- Google Gemini API

## Project Repositories

- Frontend: https://github.com/muthuram06/PlaySenseAI
- Backend: https://github.com/muthuram06/PlaySenseAI-Backend

## Run Locally

### Prerequisites

- Node.js and npm
- The PlaySense AI frontend and backend repositories

### 1. Start the backend

Open a terminal:

```bash
cd C:\PlaySenseAI-Backend
npm install
npm run dev
```

The backend runs at `http://localhost:5000`.

### 2. Start the frontend

Open a second terminal:

```bash
cd C:\PlaySenseAI
npm install
npm run dev
```

Open the local URL displayed by Vite, normally `http://localhost:5173`.

## Backend Integration

The frontend communicates with the backend through the `/api` endpoints, including the chat API.

The current local configuration uses:

`http://localhost:5000/api`

For production deployment, configure the frontend to use the deployed backend URL.

## Environment Variables

The Gemini API key belongs in the backend's environment configuration. Never place API keys in frontend code or commit `.env` files to GitHub.

## Important Note

The current match, teams, and player statistics are fictional demonstration data. They do not represent live cricket scores or actual player records.

## Future Improvements

- Live cricket score integration
- Match-specific AI insights
- Player comparison tools
- Improved error handling and loading states
- Production deployment and monitoring

## License

This project is intended for demonstration and educational purposes. Add a license if you plan to distribute it under specific reuse terms.
