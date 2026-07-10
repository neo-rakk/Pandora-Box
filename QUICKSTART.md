# PANDORA BOX - Quick Start

Get up and running in 5 minutes!

## 1. Installation (1 min)

```bash
# Clone and install
git clone <your-repo-url>
cd pandora-box
pnpm install

# Initialize data
node scripts/init-data.mjs
```

## 2. Configuration (1 min)

```bash
# Copy environment template
cp .env.example .env.local

# Edit and add your admin password
# NEXT_PUBLIC_ADMIN_PASSWORD=YourSecurePassword123
```

## 3. Start Development (1 min)

```bash
pnpm dev
```

Visit:
- **Public Site**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/dashboard
- **Admin Password**: (from your .env.local)

## 4. Edit Content (1 min)

1. Go to http://localhost:3000/dashboard
2. Enter your admin password
3. Edit any section (Hero, About, Services, etc.)
4. Click "Save Changes"
5. Changes appear instantly on the public site!

## 5. Deploy to Vercel (1 min)

```bash
# Push to GitHub
git add .
git commit -m "Initial setup"
git push origin main

# Then in Vercel dashboard:
# 1. Import repository
# 2. Add environment variables
# 3. Deploy
```

---

## Useful Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Run production build

# Maintenance
node scripts/init-data.mjs    # Reset data to defaults
pnpm lint             # Check for linting errors
```

## Key Files to Know

- `app/page.tsx` - Home page layout
- `components/sections/` - Content sections
- `app/api/data/route.ts` - API endpoints
- `app/dashboard/page.tsx` - Admin panel
- `app/globals.css` - Design system & theme
- `data.json` - Content database

## Next Steps

1. **Customize Colors**: Edit `/app/globals.css` color values
2. **Change Fonts**: Update `/app/layout.tsx` font imports
3. **Add Sections**: Create new components in `/components/sections/`
4. **Connect Database**: Replace `data.json` with production database
5. **Deploy**: Follow `DEPLOY.md` for Vercel deployment

## Common Issues

### Admin won't load
- Clear browser cache (Ctrl+Shift+Delete)
- Check that env vars are set

### Changes don't save
- Check network tab in browser DevTools (F12)
- Verify admin password is correct
- Try logging out and back in

### Build fails locally
- Run `pnpm install` again
- Delete `.next` folder: `rm -rf .next`
- Run `pnpm build` again

---

## Live on Vercel?

Visit your site at `https://your-project.vercel.app`

Admin dashboard: `https://your-project.vercel.app/dashboard`

For full deployment guide, see `DEPLOY.md`

---

**Tip**: Edit the admin password in `NEXT_PUBLIC_ADMIN_PASSWORD` before sharing your site publicly!
