# PANDORA BOX - Setup & Deployment Guide

## Project Overview

PANDORA BOX is a premium marketing website for a 360° communication agency built with Next.js 16, featuring a public marketing site and a password-protected admin dashboard for real-time content management.

### Key Features

- **Public Marketing Site**: Premium dark-themed landing page with 6 sections (Hero, About, Services, Innovation, Approach, Contact)
- **Admin Dashboard**: Password-protected content management system at `/dashboard`
- **API Routes**: RESTful endpoints for content retrieval and updates
- **Real-time Updates**: Changes in the dashboard immediately reflect on the public site
- **Production Ready**: Optimized for deployment on Vercel

## Project Structure

```
/app
  /api
    /data/route.ts          # Content API endpoints
  /dashboard
    /page.tsx               # Admin dashboard login & content editor
  /layout.tsx               # Root layout with design system
  /page.tsx                 # Marketing homepage
  /globals.css              # Dark theme design system

/components
  /Header.tsx               # Navigation header
  /Footer.tsx               # Footer
  /admin
    /AdminHeader.tsx        # Admin dashboard header
    /ContentEditor.tsx      # Content editing component
  /sections
    /Hero.tsx               # Hero section
    /About.tsx              # About section
    /Services.tsx           # Services section
    /Innovation.tsx         # Tech innovation section
    /Approach.tsx           # Our approach section
    /Contact.tsx            # Contact form section

/scripts
  /init-data.mjs            # Data initialization script

data.json                   # Content database (auto-created)
```

## Setup Instructions

### 1. Installation

Clone and install dependencies:

```bash
git clone <your-repo>
cd pandora-box
npm install  # or pnpm install / yarn install
```

### 2. Initialize Data

Create the default `data.json` file:

```bash
node scripts/init-data.mjs
```

This creates a `data.json` file with all default content.

### 3. Environment Variables

Create a `.env.local` file from the example:

```bash
cp .env.example .env.local
```

Update the values:

```
# .env.local
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
ADMIN_TOKEN=your_admin_token
```

**Important**: Use a strong password in production.

### 4. Running Locally

```bash
npm run dev
# or
pnpm dev
```

Visit:
- **Public Site**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/dashboard
- **Admin Password**: (use the value from `NEXT_PUBLIC_ADMIN_PASSWORD`)

## Admin Dashboard

### Accessing the Dashboard

1. Navigate to `/dashboard`
2. Enter the admin password
3. You'll see the content editor

### Editing Content

The dashboard allows you to edit:

- **Hero**: Title, subtitle, CTA button text
- **About**: Description, mission, values
- **Services**: Service names and descriptions
- **Innovation**: Title, subtitle, features list
- **Approach**: Steps with titles and descriptions
- **Contact**: Email, phone, title, subtitle

All changes are saved to `data.json` and immediately visible on the public site.

## Deployment on Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial PANDORA BOX deployment"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Vercel will auto-detect Next.js settings

### Step 3: Set Environment Variables

In Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add:
   - `NEXT_PUBLIC_ADMIN_PASSWORD` = your secure password
   - `ADMIN_TOKEN` = your admin token

### Step 4: Initial Deployment

1. Click "Deploy"
2. Vercel will build and deploy your site
3. Your site will be live at `your-project.vercel.app`

### Step 5: Initialize Production Data

After deployment, the API will auto-create `data.json` with default content on first request.

To ensure data persists, you have two options:

**Option A: Use Vercel KV for Production** (Recommended for persistent storage)
- Connect Vercel KV to your project
- Update `/app/api/data/route.ts` to use Vercel KV instead of file system

**Option B: Pre-commit data.json**
```bash
# After local setup
git add data.json
git commit -m "Add initial data"
git push origin main
```

## Important Notes

### File-System Storage Limitations

Currently, the project uses the file system (`data.json`) for storage, which works on Vercel but:
- Changes may not persist after cold starts in some scenarios
- For production use, migrate to a database (MongoDB, PostgreSQL, etc.)

### Security Considerations

1. **Change the default admin password** before deploying
2. **Use environment variables** for sensitive data
3. **Implement proper authentication** for production (consider auth.js or similar)
4. **Add rate limiting** to API endpoints
5. **Use HTTPS** (automatic on Vercel)
6. **Validate all user inputs** on the backend

### Recommended Enhancements

For production use, consider adding:

- **Database Integration**: Supabase, MongoDB, or PostgreSQL instead of file storage
- **Authentication**: Auth.js or Similar for secure admin access
- **Email Service**: SendGrid or similar for contact form submissions
- **Analytics**: Vercel Analytics or Google Analytics
- **CDN Images**: Optimize and serve images from Vercel Blob or similar
- **Rate Limiting**: Protect API endpoints from abuse

## Customization

### Changing Colors

Edit `/app/globals.css` to modify the design tokens:

```css
:root {
  --background: #0a0a0a;
  --foreground: #f5f5f5;
  --primary: #6366f1;
  --accent: #8b5cf6;
  /* ... more colors ... */
}
```

### Adding New Sections

1. Create a new component in `/components/sections/`
2. Add to the homepage in `/app/page.tsx`
3. Add section data to `/scripts/init-data.mjs` and the API route
4. The admin dashboard will automatically include it

### Custom Fonts

Fonts are already set up in `layout.tsx`:
- **Display Font**: Space Grotesk
- **Body Font**: Inter

To change, update the imports in `/app/layout.tsx`.

## Troubleshooting

### API Returns Default Data

- Check that `data.json` exists in the project root
- Run `node scripts/init-data.mjs` to create it

### Admin Dashboard Won't Save

- Verify `ADMIN_TOKEN` environment variable is set
- Check browser console for error messages
- Ensure the password is correct

### Build Fails on Vercel

- Check Vercel build logs for specific errors
- Ensure all environment variables are set
- Verify TypeScript types are correct

## Support & Next Steps

For questions or issues:
1. Check the troubleshooting section above
2. Review Vercel documentation: https://vercel.com/docs
3. Check Next.js documentation: https://nextjs.org/docs

## License

This project is proprietary. All rights reserved.
