# CAPAS Creatives Hub - Netlify Deployment Guide

This guide provides step-by-step instructions for deploying the CAPAS Creatives Hub to Netlify.

## 🌐 Live URL
**Target**: [capas-creatives-hub.netlify.app](https://capas-creatives-hub.netlify.app)

## 📋 Prerequisites

- GitHub repository with latest changes pushed
- Netlify account
- Access to the tamarpinder/capas repository

## 🚀 Deployment Steps

### 1. Create New Netlify Site

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub repository: `tamarpinder/capas`
4. Select the repository from the list

### 2. Configure Build Settings

**Site Settings → Build & Deploy → Build settings:**

- **Base directory**: *(leave empty)*
- **Build command**: `npm install && npx turbo run build --filter=creatives-hub`
- **Publish directory**: `apps/creatives-hub/.next`

**OR** use the configuration file:

- **Configuration file**: `netlify-creatives-hub.toml`

### 3. Environment Variables

**Site Settings → Environment Variables:**

Add the following variables:

```
NODE_VERSION=18
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_APP_URL=https://capas-creatives-hub.netlify.app
NEXT_PUBLIC_API_URL=https://capas-creatives-hub.netlify.app/api
NEXT_PUBLIC_SCHOOL_PORTAL_URL=https://capas-school-portal.netlify.app
NEXT_PUBLIC_MAIN_WEBSITE_URL=https://capas.netlify.app
USE_MOCK_API=true
ENABLE_3D_FEATURES=false
```

### 4. Deploy Site

1. Click **"Deploy site"**
2. Wait for build to complete (typically 3-5 minutes)
3. Site will be available at generated URL

### 5. Set Custom Domain (Optional)

1. Go to **Site Settings → Domain management**
2. Add custom domain: `capas-creatives-hub.netlify.app`
3. Configure DNS if using custom domain

## 🔧 Configuration Details

### Build Configuration
The site uses the monorepo structure with Turborepo:
- **Build Command**: `npm install && npx turbo run build --filter=creatives-hub`
- **Publish Directory**: `apps/creatives-hub/.next`
- **Node Version**: 18

### Environment Variables Explained

| Variable | Description | Value |
|----------|-------------|--------|
| `NODE_VERSION` | Node.js version for build | `18` |
| `NEXT_TELEMETRY_DISABLED` | Disable Next.js telemetry | `1` |
| `NEXT_PUBLIC_APP_URL` | Base URL for the app | `https://capas-creatives-hub.netlify.app` |
| `NEXT_PUBLIC_API_URL` | API base URL | `https://capas-creatives-hub.netlify.app/api` |
| `NEXT_PUBLIC_SCHOOL_PORTAL_URL` | School portal URL | `https://capas-school-portal.netlify.app` |
| `NEXT_PUBLIC_MAIN_WEBSITE_URL` | Main website URL | `https://capas.netlify.app` |
| `USE_MOCK_API` | Use mock data instead of real API | `true` |
| `ENABLE_3D_FEATURES` | Enable 3D components | `false` |

## 🔗 Cross-App Navigation

The Creatives Hub integrates with other CAPAS applications:

### Navigation Links
- **Main Website**: https://capas.netlify.app
- **School Portal**: https://capas-school-portal.netlify.app
- **Creatives Hub**: https://capas-creatives-hub.netlify.app

### Header Integration
The header includes:
- **School Portal** button (external link)
- **Search functionality** across all content
- **User profile** with dropdown menu
- **Progress indicators** for learning

## 🔄 Deployment Workflow

### Continuous Deployment
1. Push changes to `main` branch
2. Netlify automatically detects changes
3. Build process runs automatically
4. Site updates within 3-5 minutes

### Manual Deployment
1. Go to **Site Settings → Build & Deploy**
2. Click **"Trigger deploy"**
3. Select **"Deploy site"**

## 🧪 Testing Deployment

### Pre-deployment Checklist
- [ ] All pages load correctly
- [ ] Navigation works between sections
- [ ] Search functionality works
- [ ] Mobile responsiveness verified
- [ ] User authentication flow tested
- [ ] Cross-app links work correctly

### Post-deployment Testing
1. **Homepage**: Verify modern header loads
2. **My Courses**: Check course data loads
3. **Forums**: Test forum navigation
4. **Resource Library**: Verify resource filtering
5. **Learning Center**: Test learning paths
6. **Policies**: Check FAQ and support sections
7. **Mobile**: Test responsive design
8. **Cross-links**: Verify School Portal link works

## 🚨 Troubleshooting

### Common Build Issues

#### Build Fails with "Module not found"
**Solution**: Check import paths and ensure all dependencies are in package.json

#### Build Fails with "TypeScript errors"
**Solution**: Run `npm run build` locally first to catch TypeScript issues

#### Environment Variables Not Working
**Solution**: Ensure variables are prefixed with `NEXT_PUBLIC_` for client-side access

#### 404 Errors on Direct URLs
**Solution**: Check that the SPA redirect is configured in netlify.toml

### Performance Issues
- Enable compression in Netlify settings
- Use Next.js Image optimization
- Check bundle size in build logs

## 📞 Support

For deployment issues:
- Check build logs in Netlify dashboard
- Verify environment variables are set correctly
- Test build commands locally before deploying
- Ensure all dependencies are properly installed

## 🔄 Future Enhancements

When implementing authentication:
1. Add `NEXTAUTH_URL` and `NEXTAUTH_SECRET` environment variables
2. Update authentication configuration
3. Set up proper session management

When connecting to real APIs:
1. Set `USE_MOCK_API=false`
2. Configure actual API endpoints
3. Add authentication tokens and credentials

## 📝 Notes

- The site currently uses mock data for development
- All 3D features are disabled for better performance
- Cross-app navigation is configured for production URLs
- Search functionality works across all content types
- Progress tracking is implemented for learning paths

This deployment provides a fully functional creative learning platform with modern design and comprehensive features.