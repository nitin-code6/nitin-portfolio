# Nitin Kumar — Portfolio

Premium developer portfolio built with Next.js, Framer Motion, and Vanilla CSS.

## Features

- **Next.js App Router**: Modern server-first React architecture.
- **Dynamic GitHub Sync**: Automatically fetches and lists recent non-fork public repositories using the GitHub API.
- **Premium Aesthetics**: Dark theme, glassmorphism, responsive design, and smooth animations using Framer Motion.
- **Contact System**: Secure email delivery via Resend.
- **SEO Optimized**: Pre-configured metadata and semantic HTML.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** Vanilla CSS (CSS Modules) + Custom Variables
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Email API:** [Resend](https://resend.com/)

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Copy `.env.example` to `.env` and fill in your keys.
   ```bash
   cp .env.example .env
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

- `GITHUB_TOKEN` (Optional): Used to increase API rate limits when fetching repositories.
- `RESEND_API_KEY`: Required for the contact form to work.
- `CONTACT_EMAIL`: The destination address where contact form submissions will be sent.

## Deployment

The project is configured and ready to be deployed to **Vercel**.
Ensure you add the Environment Variables in the Vercel dashboard during deployment.

## Maintaining the Resume

Place your updated resume as `resume.pdf` in the `/public` directory. The "Download Resume" buttons are pre-configured to point to `/resume.pdf`.
