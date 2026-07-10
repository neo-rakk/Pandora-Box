# PANDORA BOX - Vercel Deployment Guide

## Quick Start Deployment

Follow these steps to deploy your PANDORA BOX application to Vercel.

## Prerequisites

- GitHub account with your project repository
- Vercel account (free at https://vercel.com)
- Project repository pushed to GitHub

## Step-by-Step Deployment

### 1. Prepare Your Project

Ensure your project is ready:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial PANDORA BOX setup"

# Add GitHub as remote and push
git remote add origin https://github.com/YOUR_USERNAME/pandora-box.git
git branch -M main
git push -u origin main
```

### 2. Import to Vercel

1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Paste your GitHub repository URL
5. Click **"Import"**

### 3. Configure Environment Variables

After importing, Vercel will show the configuration screen:

1. Scroll to **"Environment Variables"**
2. Add the following variables:

```
NEXT_PUBLIC_ADMIN_PASSWORD = your_secure_password_here
ADMIN_TOKEN = your_admin_token_here
```

**Example:**
```
NEXT_PUBLIC_ADMIN_PASSWORD = MySecurePassword123!
ADMIN_TOKEN = super_secret_admin_token_12345
```

### 4. Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (typically 1-2 minutes)
3. Once successful, you'll see a "Congratulations" message
4. Your site is now live at: `your-project.vercel.app`

## After Deployment

### Accessing Your Live Site

- **Public Site**: `https://your-project.vercel.app`
- **Admin Dashboard**: `https://your-project.vercel.app/dashboard`
- **Admin Password**: (use the value you set in environment variables)

### Initialize Production Data

1. Visit your live site: `https://your-project.vercel.app`
2. The API will automatically initialize with default content
3. Go to `/dashboard` and log in with your admin password
4. You can now edit all content in real-time

## Important Security Notes

### Before Going Live

1. **Change the Admin Password**
   - Use a strong, unique password (16+ characters recommended)
   - Example: `MyP@ssw0rd!Secure123ABC`

2. **Change the Admin Token**
   - Generate a secure random token
   - Use something like: `BspPb7aV8xK2mQ9wL5dR6jT1hU3sN4oE`

3. **Enable HTTPS**
   - Vercel provides SSL/TLS automatically
   - All traffic is encrypted

4. **Add Domain (Optional)**
   - In Vercel dashboard → Project Settings → Domains
   - Add your custom domain (e.g., `pandorabox.com`)

## Monitoring & Management

### Vercel Dashboard Features

- **Deployments**: View all past and current deployments
- **Analytics**: Monitor page performance and Web Vitals
- **Logs**: Check server-side errors and logs
- **Redirects**: Set up URL redirects if needed
- **Functions**: Monitor API route performance

### Check Deployment Status

1. Go to your Vercel project dashboard
2. View the latest deployment status
3. Click on a deployment to see build logs and details

## Redeploying After Changes

### Method 1: Automatic Deployment (Recommended)

Changes are automatically deployed when you push to GitHub:

```bash
# Make your changes
git add .
git commit -m "Update content management"
git push origin main
```

Vercel will automatically rebuild and deploy.

### Method 2: Manual Redeployment

1. Go to Vercel dashboard
2. Select your project
3. Click the **"Redeploy"** button
4. Or push the deployment from GitHub

## Troubleshooting

### Build Fails

**Check the build logs:**
1. Go to Vercel dashboard
2. Click on the failed deployment
3. Check the "Build Logs" tab for errors

**Common issues:**
- Missing environment variables
- TypeScript errors
- Dependency conflicts

**Solution:**
```bash
# Rebuild locally to verify
npm run build

# Check dependencies
npm install

# Push fixes to GitHub
git push origin main
```

### Admin Dashboard Not Loading

**If you see a blank page:**
1. Clear your browser cache (Ctrl+Shift+Delete)
2. Try incognito/private browsing
3. Check browser console for errors (F12)

**If login fails:**
1. Verify environment variables are set in Vercel
2. Check that `NEXT_PUBLIC_ADMIN_PASSWORD` matches what you're entering
3. Wait 1-2 minutes after setting env vars for changes to take effect

### API Returns 500 Error

**Check:**
1. API endpoint is being called correctly
2. No console errors in browser (F12)
3. Vercel function logs for backend errors

**View logs:**
1. Vercel Dashboard → Your Project
2. Click the latest deployment
3. Go to "Functions" tab
4. Select `/api/data` to view logs

### Content Changes Not Showing

**If changes don't appear on the public site:**
1. Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
2. Clear browser cache
3. Check that the save was successful in admin dashboard
4. Wait a few seconds (API calls might be queued)

## Production Optimization

### Enable Caching

The public site pages are already optimized for caching. For even better performance:

1. In Vercel Project Settings → **Headers**
2. Add cache headers for static assets:

```
/*
  Cache-Control: s-maxage=3600
```

### Enable Analytics

1. Vercel Dashboard → Project Settings → **Analytics**
2. Enable "Web Analytics"
3. Monitor performance metrics

## Backing Up Your Content

### Regular Backups

Since content is stored in `data.json`:

1. **Download from Vercel:**
   - Via Vercel CLI: `vercel env pull`
   - Via deployment artifacts

2. **Git-based backup:**
   ```bash
   # Commit data.json to track changes
   git add data.json
   git commit -m "Backup content changes"
   git push origin main
   ```

### Export Content

You can export your content by:
1. Going to `/dashboard`
2. Using browser DevTools to inspect the API response
3. Or accessing the API directly: `/api/data`

## Advanced: Production Database

For production use with more reliability, consider upgrading to a persistent database:

### Option 1: Supabase (Recommended for starters)

1. Create account at https://supabase.com
2. Create a new project
3. Get connection string
4. Update `/app/api/data/route.ts` to use Supabase

### Option 2: MongoDB

1. Create account at https://www.mongodb.com
2. Create cluster
3. Get connection string
4. Update `/app/api/data/route.ts` to use MongoDB

### Option 3: PostgreSQL (AWS RDS, Railway, etc.)

1. Set up PostgreSQL instance
2. Get connection string
3. Update `/app/api/data/route.ts` to use PostgreSQL

## Support

### Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Actions**: https://docs.github.com/en/actions

### Contact Support

- **Vercel Support**: https://vercel.com/support
- **Next.js Community**: https://nextjs.org/community

## Next Steps

1. Test your site thoroughly before sharing publicly
2. Set up a custom domain
3. Monitor analytics and performance
4. Plan database upgrade for production
5. Implement advanced security measures

Congratulations! Your PANDORA BOX site is now live on Vercel!
