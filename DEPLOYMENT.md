# Deployment Guide for AuroWeather

This guide will help you deploy AuroWeather to production with Google AdSense monetization.

## Prerequisites

- Node.js 18.x or higher
- OpenWeatherMap API key
- Google AdSense account (for monetization)
- Git repository
- Hosting platform account (Vercel recommended)

## Step 1: Prepare Your Environment Variables

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Get your OpenWeatherMap API key:
   - Visit https://openweathermap.org/api
   - Sign up for a free account
   - Navigate to API keys section
   - Copy your API key
   - Note: New API keys can take up to 2 hours to activate

3. Add your OpenWeatherMap API key to `.env.local`:
   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

## Step 2: Set Up Google AdSense (Optional)

If you want to monetize your app with ads:

1. Apply for Google AdSense:
   - Visit https://www.google.com/adsense
   - Sign up with your Google account
   - Complete the application process
   - Wait for approval (can take a few days)

2. Once approved, get your Publisher ID:
   - Go to AdSense dashboard
   - Navigate to Account > Settings
   - Copy your Publisher ID (format: ca-pub-XXXXXXXXXXXXXXXX)

3. Create ad units:
   - Go to Ads > By ad unit
   - Create 3 Display ads with these settings:
     - **Horizontal Banner**: Responsive, horizontal orientation
     - **Vertical Banner**: Responsive, vertical orientation (optional)
     - **Square Banner**: Responsive, square/rectangle orientation (optional)
   - Copy each Slot ID (10-digit number)

4. Add AdSense credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-1234567890123456
   NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL=1234567890
   NEXT_PUBLIC_ADSENSE_SLOT_VERTICAL=0987654321
   NEXT_PUBLIC_ADSENSE_SLOT_SQUARE=1122334455
   ```

## Step 3: Test Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Test your app at http://localhost:3000
   - Test weather search functionality
   - Visit `/test-api` to verify your API key works
   - Check that ads appear (they may show as blank placeholders in dev mode)

4. Build for production:
   ```bash
   npm run build
   ```

5. Test production build locally:
   ```bash
   npm start
   ```

## Step 4: Deploy to Vercel (Recommended)

### Option A: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Add environment variables:
   ```bash
   vercel env add NEXT_PUBLIC_OPENWEATHER_API_KEY
   vercel env add NEXT_PUBLIC_ADSENSE_PUBLISHER_ID
   vercel env add NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL
   vercel env add NEXT_PUBLIC_ADSENSE_SLOT_VERTICAL
   vercel env add NEXT_PUBLIC_ADSENSE_SLOT_SQUARE
   ```

5. Redeploy with environment variables:
   ```bash
   vercel --prod
   ```

### Option B: Using Vercel Dashboard

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "feat: Prepare for production deployment"
   git push origin main
   ```

2. Go to https://vercel.com and sign in

3. Click "Add New Project"

4. Import your GitHub repository

5. Configure project:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

6. Add Environment Variables:
   - Click "Environment Variables"
   - Add each variable from your `.env.local` file:
     - `NEXT_PUBLIC_OPENWEATHER_API_KEY`
     - `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID`
     - `NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL`
     - `NEXT_PUBLIC_ADSENSE_SLOT_VERTICAL`
     - `NEXT_PUBLIC_ADSENSE_SLOT_SQUARE`
   - Select "Production", "Preview", and "Development" for each

7. Click "Deploy"

## Step 5: Deploy to Other Platforms

### Netlify

1. Push code to GitHub
2. Go to https://netlify.com
3. Click "Add new site" > "Import an existing project"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables in Site settings > Environment variables
7. Deploy

### Cloudflare Pages

1. Push code to GitHub
2. Go to https://dash.cloudflare.com
3. Navigate to Pages > Create a project
4. Connect to your Git repository
5. Build settings:
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Build output directory: `.next`
6. Add environment variables
7. Deploy

## Step 6: Post-Deployment Configuration

### Update Google AdSense

1. Add your production domain to AdSense:
   - Go to AdSense > Sites
   - Add your new domain (e.g., auroweather.vercel.app)
   - Verify the site when prompted

2. Wait for AdSense approval for your site (can take 1-2 days)

### Update Metadata

Update the metadata in `src/app/layout.tsx` with your actual domain:

```typescript
export const metadata: Metadata = {
  title: "AuroWeather - Beautiful Weather Dashboard",
  description: "...",
  // ... other metadata
  metadataBase: new URL('https://your-actual-domain.com'),
};
```

### Set Up Analytics (Optional)

Consider adding:
- Google Analytics
- Vercel Analytics
- Plausible Analytics

## Step 7: Testing in Production

1. Visit your deployed site
2. Test all features:
   - Weather search
   - Location detection
   - Forecast display
   - Responsive design on mobile
3. Check ads are displaying (may take 24-48 hours after deployment)
4. Test API key at `/test-api` route
5. Check browser console for errors
6. Test on multiple devices and browsers

## Troubleshooting

### OpenWeatherMap API Issues

- **Error 401**: API key not activated yet (wait up to 2 hours)
- **Error 404**: City not found (try different spelling)
- **Rate limits**: Free tier allows 60 calls/minute, 1,000,000 calls/month

### AdSense Issues

- **Ads not showing**: 
  - Check that Publisher ID and Slot IDs are correct
  - Verify domain is added in AdSense
  - Wait 24-48 hours after deployment
  - Check browser ad blockers are disabled
- **"Ad slot empty"**: 
  - Normal in development mode
  - May show in production until AdSense approves the site

### Build Errors

- **Module not found**: Run `npm install` again
- **Environment variables not found**: Ensure variables are added to your hosting platform
- **Type errors**: Run `npm run lint` to check for issues

## Security Checklist

- [ ] Never commit `.env.local` to Git (already in `.gitignore`)
- [ ] Use environment variables for all sensitive data
- [ ] API keys are prefixed with `NEXT_PUBLIC_` for client-side access
- [ ] Test that `.env.example` has placeholder values only
- [ ] Verify `.gitignore` includes `.env*` files

## Performance Optimization

After deployment:
- Run Lighthouse audit on your production site
- Check Core Web Vitals in Google Search Console
- Monitor bundle size with Vercel Analytics
- Consider adding a CDN for static assets

## Maintenance

Regular tasks:
- Monitor API usage in OpenWeatherMap dashboard
- Check AdSense earnings and performance
- Update dependencies monthly: `npm update`
- Monitor error logs in your hosting platform
- Review and respond to user issues on GitHub

## Support

If you encounter issues:
- Check the [main README](./README.md)
- Review [Next.js documentation](https://nextjs.org/docs)
- Open an issue on [GitHub](https://github.com/Sasori17/auroweather/issues)

---

**Ready to deploy?** Start with Step 1 and follow each step carefully. Good luck!
