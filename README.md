# DebateArena

Challenge your ideas against AI opponents that refuse to agree with you.

DebateArena is an AI-powered debate platform where users can engage in structured discussions with different AI personalities, receive detailed performance analysis, and track their progress over time.

## Features

* Multiple AI debate opponents

  * Professional Debater
  * Lawyer
  * Philosopher
  * Devil's Advocate
  * Aggressive Challenger
  * Job Interviewer
  * Twitter Troll

* Real-time AI debates

* AI-generated debate reports

* Performance scoring

  * Persuasion Score
  * Logic Score
  * Overall Score

* Detailed feedback

  * Strongest Argument
  * Weakest Argument
  * Improvement Tips

* Debate history tracking

* User authentication

* Responsive design for desktop and mobile

## Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS
* Framer Motion

### Backend & Database

* Supabase

### AI

* Google Gemini API

### Deployment

* Netlify

## Screenshots

## Home Page

![Home Page](./debatetrainer/screenshots/home.png)

## Debate Chat

![Debate Chat](./debatetrainer/screenshots/chat.png)


## Debate Report

![Debate Report](./debatetrainer/screenshots/report.png)

## Installation

Clone the repository:

```bash
git clone <repo-url>
cd DebateArena
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Future Improvements

* Public debate sharing
* Leaderboards
* Additional debate styles
* Debate analytics
* User profiles
* Debate replay system

## License

MIT
