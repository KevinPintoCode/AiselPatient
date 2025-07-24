# Patients Frontend (Next.js + Tailwind + RTK Query)

## Quickstart

### Clone & install
```bash
git clone https://github.com/your-user/aisel-case.git
cd aisel-case
npm install   # installs dependencies for **all** workspaces
```

### Environment
Create a `.env.local` inside `frontend/` (and on Vercel) with:
```
NEXT_PUBLIC_API_URL=https://patients-api.onrender.com  # change to your backend URL
```
If you are working locally keep it as:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Development
```bash
# from repo root
pm run dev  # runs backend + frontend concurrently
# or only the UI
npm run dev:frontend
```
App will be available at `http://localhost:3001`.

### Production build / preview
```bash
npm run build -w frontend
npm run start -w frontend
```

### Deploy
1. Deploy the backend first (see backend README).  Note the public URL.
2. Push this repo to GitHub then import it in Vercel.
3. Add the env variable `NEXT_PUBLIC_API_URL` in the Vercel dashboard pointing to your backend.
4. Hit *Deploy* – your app will be live, e.g.:
   https://aisel-case.vercel.app

---

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
