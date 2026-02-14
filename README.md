This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

A brief overview of the project's main directories and files:

- **`/app`**: Contains the Next.js App Router structure.
  - `api/`: API routes for backend logic.
  - `dashboard/`: Dashboard pages and layout.
  - `page.tsx`: The main landing page.
  - `globals.css`: Global styles.
- **`/components`**: Reusable React components.
  - `ui/`: Shared UI components.
  - Feature-specific components like `AppHeader`, `AppSidebar`, `BookmarkCard`, etc.
- **`/lib`**: Utility functions, Redux store setup, and database clients.
  - `store/`: Redux store configuration.
  - `BookmarkSlice.ts`: Redux slice for bookmark management.
  - `supabase.ts`: Supabase client configuration.
  - `prisma/`: Prisma client and schema.
- **`/hooks`**: Custom React hooks.
  - `use-mobile.ts`: Hook for handling mobile responsiveness.
  - `use-redux.ts`: Custom hook for Redux usage.
- **`/prisma`**: Database schema and migrations.
- **`/public`**: Static assets.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Environment Variables
Store these in .env.local file

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_API_KEY=
NEXT_PUBLIC_CALLBACK_URL=http://localhost:3000/api/routes/auth/callback
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000/api/routes/

Store these in .env file 

DATABASE_URL= postgres database url 


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
