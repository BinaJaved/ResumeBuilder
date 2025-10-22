# Resume Rewriter SaaS Application

## Overview

This is an AI-powered resume optimization tool that helps users rewrite their resume summary and headline to match specific job descriptions. The application uses OpenAI's GPT-5 model to analyze job descriptions and intelligently incorporate relevant keywords while maintaining a professional, recruiter-friendly tone. Built as a productivity-focused SaaS application, it emphasizes clarity, efficiency, and immediate functionality without marketing friction.

## Current Status

✅ **Production Ready** - The application is fully functional with:
- Complete frontend UI with form inputs and results display
- Backend API endpoint integrated with OpenAI GPT-5
- Comprehensive error handling with user-friendly messages
- Dark mode support
- Copy-to-clipboard functionality
- Input validation and loading states

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (October 22, 2025)

1. **OpenAI Integration** - Added GPT-5 API integration with structured prompt engineering
2. **Error Handling** - Implemented custom error class (ResumeRewriteError) that properly propagates HTTP status codes (429, 401, 503, 500)
3. **API Endpoint** - Created POST /api/resume/rewrite with request validation using Zod schemas
4. **Frontend Integration** - Connected React frontend to backend API with comprehensive error handling
5. **User Experience** - Added specific error messages for quota exhaustion, invalid API keys, and service unavailability

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript using Vite as the build tool
- Single-page application with client-side routing via Wouter
- Component-based architecture following modern React patterns with hooks

**UI Design System**
- shadcn/ui component library (New York style variant) for consistent, accessible UI components
- Tailwind CSS for utility-first styling with custom design tokens
- Radix UI primitives as the foundation for interactive components
- Design philosophy: Utility-focused SaaS inspired by Grammarly, Notion, and Linear
- Supports both light and dark modes with theme persistence

**State Management**
- TanStack Query (React Query) for server state management and API caching
- React Hook Form with Zod resolvers for form validation
- Local React state for UI-specific concerns
- Theme context provider for dark/light mode management

**Key Design Decisions**
- Professional blue primary color (HSL: 217 91% 60%) for trust and credibility
- Inter font family for clarity and readability
- Flat, minimal design with subtle shadows and borders
- Mobile-responsive layout with breakpoint at 768px

### Backend Architecture

**Server Framework**
- Express.js running on Node.js with TypeScript
- ESM module system for modern JavaScript practices
- Development server with Vite middleware integration for hot module replacement

**API Design**
- RESTful API endpoint: `POST /api/resume/rewrite`
- Request validation using Zod schemas defined in shared types
- Centralized error handling with appropriate HTTP status codes
- JSON request/response format

**Database & Storage**
- Drizzle ORM configured for PostgreSQL (via @neondatabase/serverless)
- Schema-first approach with TypeScript type generation
- Currently includes user storage interface (MemStorage) for in-memory storage during development
- Migration support via drizzle-kit

**Key Architectural Patterns**
- Monorepo structure with shared types between client and server (`/shared` directory)
- Separation of concerns: routes, OpenAI integration, and storage are modular
- Type safety enforced across the entire stack using TypeScript
- Environment-based configuration (development vs production)

### External Dependencies

**AI Service**
- OpenAI API integration using the official Node.js SDK
- Model: GPT-5 (released August 7, 2025)
- Structured prompt engineering for resume rewriting with JSON response format
- Processes: summary optimization, headline generation, keyword incorporation

**Database**
- Neon Serverless PostgreSQL for production database hosting
- Connection via `@neondatabase/serverless` driver
- Database URL configured via environment variable `DATABASE_URL`

**UI Component Libraries**
- Radix UI: Comprehensive set of unstyled, accessible component primitives
  - Dialog, Dropdown, Popover, Toast, Tooltip, and 20+ other interactive components
  - Full keyboard navigation and ARIA compliance
- shadcn/ui: Pre-configured Radix components with Tailwind styling
- Lucide React: Icon library for consistent iconography

**Development Tools**
- Replit-specific plugins for development (cartographer, dev-banner, runtime-error-modal)
- PostCSS with Tailwind CSS for processing styles
- ESBuild for production server bundling

**Third-Party Services**
- Google Fonts CDN for Inter font family
- Session management ready with connect-pg-simple (PostgreSQL session store)

**Key Integration Decisions**
- OpenAI API key required in environment variables
- Database provisioning required before deployment (validated in drizzle.config.ts)
- Static asset serving handled differently in development (Vite) vs production (Express)
- CORS and security headers to be configured based on deployment environment