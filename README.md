# VibeZ
Next.js web application developed for web-app project in Duke CS 316 Databases course. VibeZ recommends new, unexplored music to Spotify users based on the vibes they want to listen to.

VibeZ has been deployed on Vercel. You can check out https://vibe-z.vercel.app/ to see the web app in action.

## Run Development Server Locally

Before you run the development server, you need to create a `.env` and `.env.local` file with the following variables:
- `DATABASE_URL`: URL of your database for your web app to connect to.
- `NEXT_PUBLIC_CLIENT_ID`: Client ID from your generated application in Spotify Developers website.
- `NEXT_PUBLIC_CLIENT_SECRET`: Client Secret from your generated application in Spotify Developers website.
- `JWT_SECRET`: Can take any value, defined to fix NO_SECRET warning thrown by NextAuth.js

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
