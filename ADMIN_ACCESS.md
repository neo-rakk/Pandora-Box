# PANDORA BOX - Admin Dashboard Access Guide

## Hidden Admin Entry Point

The admin dashboard has been intentionally hidden from the public interface to maintain a clean, minimalist marketing site aesthetic. The admin panel is only accessible through **direct URL entry**.

## Accessing the Admin Dashboard

### Step 1: Navigate to the Dashboard URL
Enter the following URL in your browser address bar:
```
http://localhost:3000/dashboard
```

Or for production (Vercel):
```
https://your-domain.com/dashboard
```

### Step 2: Enter Your Admin Password
When you access `/dashboard`, you'll be prompted to enter your admin password. The default password is set via environment variable `NEXT_PUBLIC_ADMIN_PASSWORD`.

### Default Credentials
- **Path**: `/dashboard`
- **Password**: As configured in `.env.local` or environment variables

## Security Features

- **Hidden Entry Point**: No visible link in navigation
- **Password Protected**: Requires authentication
- **Token-Based**: Uses secure session tokens
- **Environment Variables**: Password is never hardcoded

## Setting Your Admin Password

### Local Development
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and set your admin password:
   ```
   NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
   ADMIN_TOKEN=your_token_here
   ```

### Production (Vercel)
1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   - `NEXT_PUBLIC_ADMIN_PASSWORD`: Your admin password
   - `ADMIN_TOKEN`: Your API token for authentication

## Admin Dashboard Features

Once logged in, you can:

- Edit all homepage sections:
  - Hero (title, subtitle, CTA)
  - About (description, mission, values)
  - Services (service list with descriptions)
  - Innovation (features and tech info)
  - Approach (methodology steps)
  - Contact (email, phone, response info)

- Real-time updates:
  - Changes appear immediately on the public site
  - No need to rebuild or redeploy
  - File-based persistence

- Form-based interface:
  - Auto-generated forms for each section
  - Easy drag-and-drop reordering (if enabled)
  - Validation on all inputs

## Why Hidden?

The admin dashboard is hidden from the public navigation to:

1. **Maintain Brand Aesthetics**: Keeps the public-facing site clean and minimalist
2. **Enhanced Security**: Reduces visibility of admin access
3. **Professional Appearance**: Agency clients don't see "admin" links
4. **Simple Access**: Power users know where to go
5. **Flexibility**: Easy to add public navigation later if needed

## Changing the Admin Password

To change your admin password:

1. **Local**: Edit `.env.local` and restart the dev server
2. **Production**: Update the environment variable in Vercel dashboard

## Forgot Your Password?

To reset the admin password:

1. **Local Development**:
   ```bash
   # Edit .env.local with new password
   NEXT_PUBLIC_ADMIN_PASSWORD=new_password_here
   
   # Restart development server
   pnpm dev
   ```

2. **Production**:
   - Go to Vercel project settings
   - Update `NEXT_PUBLIC_ADMIN_PASSWORD`
   - Changes take effect on next deployment

## Security Best Practices

- Use a strong, unique password (12+ characters)
- Include numbers, symbols, and mixed case
- Change password regularly
- Use different password for dev and production
- Store credentials securely
- Never commit `.env.local` to Git (already in `.gitignore`)

## Troubleshooting

### Can't Access Dashboard?
- Verify you're using correct URL: `/dashboard`
- Check that development server is running
- Ensure password is correctly set in environment variables
- Try clearing browser cache and cookies

### Password Not Working?
- Verify password in `.env.local` matches exactly (case-sensitive)
- Ensure `.env.local` file is saved
- Restart development server: `pnpm dev`
- Check for extra spaces in password

### Changes Not Saving?
- Verify the `data.json` file has correct permissions
- Check browser console for error messages
- Ensure API endpoint is accessible
- Verify `ADMIN_TOKEN` is properly set

## API Access

The admin dashboard uses these API endpoints:

- `GET /api/data` - Retrieve all content
- `GET /api/data?section=X` - Get specific section
- `POST /api/data` - Save updates (requires admin token)

## Future Enhancements

Potential improvements to admin dashboard:

- [ ] Multi-user authentication system
- [ ] Role-based access control
- [ ] Audit logs and version history
- [ ] Media upload integration
- [ ] Scheduled publishing
- [ ] Preview before publishing
- [ ] Undo/redo functionality
- [ ] Content backup automation

---

**Remember**: The hidden admin URL maintains PANDORA BOX's clean, avant-garde aesthetic while providing full content management capabilities.
