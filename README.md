# Nitin Kumar — Full-Stack Developer Portfolio

Live Deployment: [https://nitincode.vercel.app/](https://nitincode.vercel.app/)

This is the source code for my personal portfolio, built with Next.js (App Router), Vanilla CSS, and Framer Motion. It's designed with a clean, academic-inspired layout focusing heavily on content, engineering depth, and professional presentation.

## Features

- **Academic CV Inspired Design**: Clean layout, highly readable typography, minimal visual noise.
- **Dynamic GitHub Integration**: Automatically fetches and displays my recent, active public repositories using the GitHub API, filtering out forks.
- **Secure Contact Form**: Uses Resend for server-side email delivery, keeping credentials entirely out of the client.
- **Framer Motion Animations**: Subtle, smooth entrance animations that enhance the user experience without being overwhelming.
- **Responsive & Accessible**: Fully optimized for mobile devices, high contrast, and screen readers.
- **High Performance**: 100% statically generated pages and highly optimized CSS modules.

## Architecture & Tech Stack

- **Framework**: Next.js (React)
- **Styling**: Vanilla CSS Modules (No Tailwind)
- **Animations**: Framer Motion
- **Icons**: Lucide React & React Icons
- **Email Service**: Resend API
- **Deployment**: Vercel

## Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nitin-code6/nitin-portfolio.git
   cd nitin-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment file and fill in the values:
   ```bash
   cp .env.example .env
   ```
   Required variables:
   - `GITHUB_TOKEN`: A GitHub Personal Access Token (for increasing API rate limits when fetching repos).
   - `RESEND_API_KEY`: Your Resend API key for the contact form.
   - `CONTACT_EMAIL`: The email address where messages should be sent.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This portfolio is optimized for Vercel. 
Simply push to the `main` branch, and Vercel will automatically trigger a build. Ensure all environment variables are securely added to your Vercel project settings.

## Security

- Do not commit your `.env` file. It is ignored by `.gitignore`.
- API calls to GitHub and Resend are executed server-side. No API keys are leaked to the client bundle.
