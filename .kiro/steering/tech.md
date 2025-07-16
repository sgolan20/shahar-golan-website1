# Technology Stack

## Core Technologies

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM
- **State Management**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation

## Key Libraries

- **Icons**: Lucide React
- **Date Handling**: date-fns
- **HTTP Client**: Axios
- **Rich Text**: React Quill, React Markdown
- **Payments**: PayPal React SDK
- **Firebase**: Authentication and data management
- **Charts**: Recharts
- **Notifications**: Sonner

## Development Tools

- **Linting**: ESLint with TypeScript support
- **Package Manager**: npm
- **Deployment**: Netlify with serverless functions
- **Development Server**: Vite dev server on port 8080

## Common Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Package management
npm install          # Install dependencies
npm ci              # Clean install from lock file
```

## Build Configuration

- **TypeScript**: Strict mode disabled, path aliases configured
- **Vite**: Custom alias `@/` pointing to `src/`
- **Tailwind**: Custom design system with brand colors and animations
- **Netlify**: SPA routing with function redirects