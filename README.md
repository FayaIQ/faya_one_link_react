# faya-one-link

This project is a small Next.js application. The dashboard uploads images to a Supabase Storage bucket and stores the public URL in a database table. A slideshow on the landing page displays these saved images.

## Setup

Create a `.env.local` file and provide your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Install dependencies and run the development server:

```
npm install
npm run dev
```

The SQL file `sql/dashboard_images.sql` contains the table definition used for storing uploaded images.
