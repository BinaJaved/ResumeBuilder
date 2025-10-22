# Resume Rewriter - AI-Powered Resume Optimization

An intelligent SaaS application that uses OpenAI's GPT-5 to rewrite your resume summary and headline to perfectly match any job description. Get professional, recruiter-friendly content with relevant keywords in seconds.

## Features

- **AI-Powered Rewriting**: Uses GPT-5 to analyze job descriptions and optimize your resume content
- **Keyword Optimization**: Automatically incorporates relevant keywords from job postings
- **Professional Tone**: Maintains a recruiter-friendly, achievement-focused writing style
- **Smart Limits**: Keeps summaries under 120 words and headlines under 15 words
- **Dark Mode**: Full support for light and dark themes
- **Copy to Clipboard**: Easy one-click copying of rewritten content
- **Error Handling**: Clear, actionable error messages for all scenarios

## How It Works

1. **Enter Your Current Content**: Paste your existing resume summary and headline
2. **Add Job Description**: Copy the job posting you're targeting
3. **AI Optimization**: Click "Rewrite Resume" and let GPT-5 analyze and optimize
4. **Review & Copy**: Get your rewritten content with relevant keywords incorporated

## Setup Instructions

### Prerequisites

- OpenAI API key with available credits
- Node.js 20 or higher

### Getting Your OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Create a new API key
4. Add credits to your account at [Billing](https://platform.openai.com/account/billing)

### Installation

The application is already set up and running on Replit. To use it:

1. Add your OpenAI API key as the `OPENAI_API_KEY` secret (already configured)
2. Ensure you have credits in your OpenAI account
3. The app is ready to use!

## Technology Stack

**Frontend**
- React 18 with TypeScript
- Tailwind CSS + shadcn/ui components
- TanStack Query for state management
- Wouter for routing

**Backend**
- Express.js with TypeScript
- OpenAI GPT-5 API integration
- Zod for request validation

**Development**
- Vite for fast development and building
- ESM modules throughout
- Hot module replacement

## API Reference

### POST `/api/resume/rewrite`

Rewrites a resume summary and headline to match a job description.

**Request Body**
```json
{
  "summary": "Your current resume summary",
  "headline": "Your current headline",
  "jobDescription": "The target job description"
}
```

**Success Response (200)**
```json
{
  "rewrittenSummary": "Optimized summary with keywords",
  "rewrittenHeadline": "Optimized headline"
}
```

**Error Responses**
- `400`: Validation error (missing or invalid fields)
- `401`: Invalid OpenAI API key
- `429`: OpenAI quota exceeded (need to add credits)
- `500`: Internal server error
- `503`: OpenAI service temporarily unavailable

## Common Issues

### "API Quota Exceeded" Error
You need to add credits to your OpenAI account. Visit the [billing page](https://platform.openai.com/account/billing) to add funds.

### "Invalid API Key" Error
Check that your OpenAI API key is correctly set in the Replit Secrets.

### Slow Response Times
GPT-5 API calls can take 3-10 seconds depending on content length and server load. This is normal.

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── lib/           # Utilities and query client
├── server/                # Backend Express application
│   ├── openai.ts         # OpenAI integration
│   └── routes.ts         # API routes
├── shared/               # Shared TypeScript types
│   └── schema.ts        # Zod schemas and types
└── design_guidelines.md # Design system documentation
```

## Development

The application runs in development mode with hot module replacement:

```bash
npm run dev
```

Server runs on port 5000 with both API and frontend served together.

## Production Deployment

The application is ready to be published on Replit. All environment variables and secrets are properly configured for production use.

## License

This project is created as a demonstration of AI-powered SaaS development.
