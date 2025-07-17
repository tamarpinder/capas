# Netlify Multi-Deployment Setup for CAPAS Monorepo

This monorepo contains three Next.js applications that deploy to separate Netlify sites:

## 🌐 Live Deployments

- **Main Website**: [capas.netlify.app](https://capas.netlify.app)
- **School Portal**: [capas-school-portal.netlify.app](https://capas-school-portal.netlify.app)  
- **Creatives Hub**: [capas-creatives-hub.netlify.app](https://capas-creatives-hub.netlify.app) *(coming soon)*

## 📁 Configuration Files

Each application has its own Netlify configuration:

```
netlify-main-website.toml     → Main Website deployment
netlify-school-portal.toml    → School Portal deployment  
netlify-creatives-hub.toml    → Creatives Hub deployment
netlify.toml                  → Documentation/Template only
```

## 🚀 Deployment Setup

### For Each Application:

#### 1. Create Netlify Site
- Go to [Netlify Dashboard](https://app.netlify.com)
- Click "Add new site" → "Import an existing project"
- Connect to GitHub repository: `tamarpinder/capas`

#### 2. Configure Build Settings
**Site Settings → Build & Deploy → Build settings:**

**For Main Website (capas.netlify.app):**
- **Build command**: `npm install && npx turbo run build --filter=main-website`
- **Publish directory**: `apps/main-website/.next`
- **Base directory**: *(leave empty)*

**For School Portal (capas-school-portal.netlify.app):**
- **Build command**: `npm install && npx turbo run build --filter=school-portal`  
- **Publish directory**: `apps/school-portal/.next`
- **Base directory**: *(leave empty)*

**For Creatives Hub (capas-creatives-hub.netlify.app):**
- **Build command**: `npm install && npx turbo run build --filter=creatives-hub`
- **Publish directory**: `apps/creatives-hub/.next`  
- **Base directory**: *(leave empty)*

#### 3. Alternative: Use Config Files
Instead of manually setting build commands, you can reference the config files:

**Site Settings → Environment Variables:**
```
NETLIFY_CONFIG_PATH = netlify-main-website.toml     # For main website
NETLIFY_CONFIG_PATH = netlify-school-portal.toml    # For school portal
NETLIFY_CONFIG_PATH = netlify-creatives-hub.toml    # For creatives hub
```

## 🔐 Environment Variables

### School Portal Only
The School Portal requires authentication environment variables:

**Site Settings → Environment Variables:**

1. **NEXTAUTH_URL**
   - Value: `https://capas-school-portal.netlify.app`
   - ⚠️ No trailing slash, must match exact domain

2. **NEXTAUTH_SECRET**
   - Generate at: https://generate-secret.vercel.app/32
   - Keep secure, don't commit to repository

### Main Website & Creatives Hub
No additional environment variables required.

## 🔗 Cross-Application Navigation

The applications are configured to link to each other:

**Main Website links to:**
- School Portal: `https://capas-school-portal.netlify.app/`
- Creatives Hub: `https://capas-creatives-hub.netlify.app/`

**School Portal links to:**
- Main Website: `https://capas.netlify.app/`

**Creatives Hub links to:**
- Main Website: `https://capas.netlify.app/`
- School Portal: `https://capas-school-portal.netlify.app/`

## 🧪 Testing Deployments

### Local Testing
```bash
# Test specific app builds
npm run build --filter=main-website
npm run build --filter=school-portal  
npm run build --filter=creatives-hub

# Test with Netlify CLI
netlify build --config=netlify-main-website.toml
netlify build --config=netlify-school-portal.toml
```

### Demo Accounts (School Portal)
- **Email**: Use any email from the demo selection page
- **Password**: `capas123` (for all demo accounts)

## 🚨 Troubleshooting

### Build Fails
1. Check Node.js version is 18+ in build environment
2. Verify Turborepo filter names match package.json names
3. Ensure all dependencies are properly installed

### School Portal Auth Issues
1. Verify `NEXTAUTH_URL` matches exactly (no trailing slash)
2. Ensure `NEXTAUTH_SECRET` is set and not placeholder
3. Clear browser cookies and local storage
4. Check browser console for errors

### Wrong App Deploying
1. Verify correct config file is referenced
2. Check build command filter matches intended app
3. Ensure publish directory points to correct app

### Cross-App Navigation 404s
1. Verify target URLs are correct in code
2. Check that external links use full URLs, not relative paths
3. Ensure target sites are deployed and accessible

## 📞 Support

For deployment issues:
- Check Netlify build logs for detailed error messages
- Verify environment variables are set correctly
- Test build commands locally before deploying