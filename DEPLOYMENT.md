# SkeTools - Installation & Deployment Guide

## Prerequisites

Before installing SkeTools, ensure you have the following installed on your system:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** / **pnpm**
- **Git** - [Download here](https://git-scm.com/)
- A code editor (VS Code recommended)

---

## Local Installation

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd sketools
```

### Step 2: Install Dependencies

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.example .env.local
```

Or create it manually with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# YouTube API (for auto-upload feature)
YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret
YOUTUBE_REDIRECT_URI=http://localhost:3000/api/youtube/callback

# TikTok API (for auto-upload feature)
TIKTOK_CLIENT_KEY=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
TIKTOK_REDIRECT_URI=http://localhost:3000/api/tiktok/callback

# Redis (for job queue - optional for MVP)
REDIS_URL=redis://localhost:6379

# Storage
STORAGE_BUCKET=sketools-videos
```

### Step 4: Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable **Firestore Database**
4. Enable **Authentication** (Email/Password)
5. Enable **Storage** (for video files)
6. Go to Project Settings → General → Your apps → Web app
7. Copy the configuration values to your `.env.local`

### Step 5: Set Up Supabase (Optional)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Go to Settings → API
4. Copy the URL and anon key to your `.env.local`
5. Generate a service role key for server-side operations

### Step 6: Set Up YouTube API (Optional - for auto-upload)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **YouTube Data API v3**
4. Go to Credentials → Create Credentials → OAuth client ID
5. Select "Web application"
6. Add authorized redirect URI: `http://localhost:3000/api/youtube/callback`
7. Copy Client ID and Client Secret to your `.env.local`

### Step 7: Set Up TikTok API (Optional - for auto-upload)

1. Go to [TikTok for Developers](https://developers.tiktok.com/)
2. Apply for developer access
3. Create a new app
4. Add redirect URI: `http://localhost:3000/api/tiktok/callback`
5. Copy Client Key and Client Secret to your `.env.local`

### Step 8: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest and most recommended option for Next.js applications.

#### Deploy to Vercel via CLI

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Login to Vercel:

```bash
vercel login
```

3. Deploy:

```bash
vercel
```

4. Deploy to production:

```bash
vercel --prod
```

#### Deploy to Vercel via Dashboard

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure environment variables in Vercel dashboard
6. Click "Deploy"

#### Environment Variables in Vercel

Add all the environment variables from `.env.local` to your Vercel project settings:

1. Go to Project Settings → Environment Variables
2. Add each variable with its value
3. Make sure to add production values (not localhost URLs)

**Important**: Update redirect URIs for production:
- YouTube: `https://your-domain.com/api/youtube/callback`
- TikTok: `https://your-domain.com/api/tiktok/callback`

---

### Option 2: Netlify

Netlify is another great option for deploying Next.js applications.

#### Deploy to Netlify via CLI

1. Install Netlify CLI:

```bash
npm i -g netlify-cli
```

2. Login to Netlify:

```bash
netlify login
```

3. Initialize:

```bash
netlify init
```

4. Deploy:

```bash
netlify deploy --prod
```

#### Deploy to Netlify via Dashboard

1. Push your code to GitHub
2. Go to [Netlify Dashboard](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables in Site Settings → Environment variables
7. Click "Deploy site"

#### Important Note for Netlify

Netlify requires additional configuration for Next.js. Create a `netlify.toml` file:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[functions]
  node_bundler = "esbuild"
```

---

### Option 3: Self-Hosted (VPS/Cloud)

If you prefer to host on your own server (DigitalOcean, AWS, GCP, etc.):

#### Using PM2 (Process Manager)

1. Build the application:

```bash
npm run build
```

2. Install PM2 globally:

```bash
npm i -g pm2
```

3. Start the application:

```bash
pm2 start npm --name "sketools" -- start
```

4. Save PM2 configuration:

```bash
pm2 save
pm2 startup
```

#### Using Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t sketools .
docker run -p 3000:3000 --env-file .env.local sketools
```

---

## Database Setup

### Firestore (Firebase)

Firestore is already configured in the project. You can manage your data through:

1. **Firebase Console**: [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. **Firestore Emulator** (for local development):

```bash
firebase emulators:start
```

### Required Collections

The following collections will be created automatically:

- `users` - User authentication data
- `jobs` - Background jobs (downloads, uploads)
- `schedules` - Scheduled uploads
- `youtube_videos` - YouTube video metadata
- `tiktok_videos` - TikTok video metadata
- `connected_accounts` - Connected social media accounts

---

## Storage Setup

### Firebase Storage

1. Go to Firebase Console → Storage
2. Click "Get Started"
3. Choose a location (choose closest to your users)
4. Set up security rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## Monitoring & Logging

### Vercel Analytics

Vercel provides built-in analytics. Enable it in your project settings.

### Sentry (Error Tracking)

1. Install Sentry:

```bash
npm install @sentry/nextjs
```

2. Initialize Sentry:

```bash
npx @sentry/wizard -i nextjs
```

### Custom Logging

The application uses console logging. For production, consider using:

- **LogRocket** - Session replay and error tracking
- **Datadog** - Infrastructure monitoring
- **New Relic** - Application performance monitoring

---

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Use strong secrets** for all API keys
3. **Enable 2FA** on all your accounts
4. **Regularly update dependencies**: `npm audit fix`
5. **Set up CORS** properly for API routes
6. **Use HTTPS** in production
7. **Implement rate limiting** for API endpoints
8. **Regular backups** of Firestore data

---

## Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working

- Ensure variables are set in the deployment platform
- Restart the deployment after adding variables
- Check for typos in variable names

### Firebase Connection Issues

- Verify Firebase configuration in `.env.local`
- Check Firebase project rules
- Ensure Firestore is enabled

### YouTube/TikTok API Errors

- Verify API credentials
- Check redirect URIs match exactly
- Ensure API quotas are not exceeded
- Verify OAuth consent screen is configured

---

## Cost Estimation

### Vercel (Hobby Plan - Free)
- 100GB bandwidth/month
- 6,000 minutes of execution time
- Perfect for MVP and testing

### Vercel (Pro Plan - $20/month)
- 1TB bandwidth/month
- 100,000 minutes of execution time
- Recommended for production

### Firebase (Spark Plan - Free)
- 50K reads/day
- 20K writes/day
- 5GB storage
- Good for MVP

### Firebase (Blaze Plan - Pay as you go)
- $0.18/GB storage
- $0.06/GB download
- $0.18/100K reads
- Recommended for production

### YouTube API
- 10,000 units/day (free tier)
- Additional units: $0.003 per 1,000 units

### TikTok API
- Varies based on usage
- Contact TikTok for enterprise pricing

---

## Next Steps

1. ✅ Complete local installation
2. ✅ Test all features locally
3. ✅ Set up production environment variables
4. ✅ Deploy to Vercel/Netlify
5. ✅ Configure custom domain (optional)
6. ✅ Set up monitoring and analytics
7. ✅ Test production deployment
8. ✅ Set up CI/CD pipeline (optional)

---

## Support

For issues and questions:

- Check the [GitHub Issues](https://github.com/your-repo/issues)
- Review the [Documentation](https://github.com/your-repo/wiki)
- Contact support at support@sketools.com

---

## License

This project is licensed under the MIT License.
