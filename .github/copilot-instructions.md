# Copilot Instructions

## Project Overview
This repository contains:
- A **backend** built with **Fastify** (located in the root directory).
- A **frontend** application using **Vite** and **React** (located in the `frontend` directory).

Your focus should be **exclusively on the frontend**. Please refrain from making changes to the backend.

## Frontend Technologies
- **React 19** and **React DOM**
- **TypeScript** for type safety
- **Vite** for bundling and development
- **React Router DOM** for routing
- **React Hook Form** with **@hookform/resolvers** for form handling and validation
- **Zod** for schema validation
- **TanStack React Query** and **React Query Devtools** for data fetching and caching
- **Axios** for HTTP requests
- **TailwindCSS** and **PostCSS** for styling
- **Lucide-React** for icons
- **Sonner** for notifications
- **Clsx** for conditional classNames
- **Date-fns** for date handling

## Development Setup
- **Vite** for bundling and development server
- **ESLint** with `@eslint/js` and plugins `react-hooks` and `react-refresh`
- **TypeScript** for type safety
- **@vitejs/plugin-react** for React support in Vite

## Coding Guidelines
- Always use **TypeScript types** wherever possible.
- Prefer **functional components** and **hooks**.
- Use **React Query** for fetching data and managing server state.
- Use **Zod** schemas to validate forms and API responses.
- Follow **TailwindCSS utility classes** for styling.
- Use **React Router DOM** for navigation between pages.

## Tasks & Issues
- When generating new features, bug fixes, or improvements, only create or modify files inside the `frontend` folder.
- Include type-safe and maintainable code.
- Ensure proper form validation and state management using the mentioned libraries.
- Suggest clear, user-friendly UI improvements if applicable.

## Notes
- Do not modify backend code or server logic.
- Keep frontend modular and maintainable.
- Pay attention to UX patterns in React and TailwindCSS.
- Ensure all API interactions are handled via Axios with proper error handling.