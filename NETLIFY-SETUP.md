# Netlify Deployment Setup for CAPAS School Portal

## Environment Variables Required

### In Netlify Dashboard (Site Settings > Environment Variables):

1. **NEXTAUTH_URL**
   - Set to your Netlify site URL
   - Example: `https://your-site-name.netlify.app`
   - **IMPORTANT**: Replace `your-site-name` with your actual Netlify site name

2. **NEXTAUTH_SECRET**
   - Generate a secure random string for production
   - You can generate one at: https://generate-secret.vercel.app/32
   - **IMPORTANT**: Replace the placeholder in `netlify.toml` or set in Netlify UI

## Setup Steps:

### 1. Update netlify.toml
- Update the `NEXTAUTH_URL` in `netlify.toml` to match your actual Netlify domain
- Update the `NEXTAUTH_SECRET` to a secure production value

### 2. Alternative: Set via Netlify UI
Instead of storing secrets in `netlify.toml`, you can set them securely in Netlify:
- Go to Site Settings > Environment Variables
- Add `NEXTAUTH_URL` with your site URL
- Add `NEXTAUTH_SECRET` with a secure random string
- Remove these from `netlify.toml` if set in UI

### 3. Demo Accounts
The following demo accounts are available:
- **Email**: Use any email from the demo user selection page
- **Password**: `capas123` (for all demo accounts)

## Troubleshooting

### If demo login doesn't work:
1. Check browser console for errors
2. Verify `NEXTAUTH_URL` matches exactly (no trailing slash)
3. Ensure `NEXTAUTH_SECRET` is set and not the placeholder value
4. Try clearing browser cookies and local storage

### If "Back to Main Site" gives 404:
This has been fixed to point to `https://capas.edu.bs` instead of relative paths.

### Build fails:
- Ensure all environment variables are properly set
- Check that the build command targets `school-portal` filter
- Verify Node.js version is 18 or higher