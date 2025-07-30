# 🚀 Complete Setup Guide - Ramro E-commerce Platform

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Core Installation](#core-installation)
4. [Firebase Setup](#firebase-setup)
5. [Razorpay Configuration](#razorpay-configuration)
6. [Configure Professional Search (Algolia)](#configure-professional-search-algolia)
7. [Configure Media Management (Cloudinary)](#configure-media-management-cloudinary)
8. [Environment Variables](#environment-variables)
9. [Initial Setup & Testing](#initial-setup--testing)
10. [Admin Account Creation](#admin-account-creation)
11. [Data Seeding](#data-seeding)
12. [Production Deployment](#production-deployment)
13. [Troubleshooting](#troubleshooting)
14. [Next Steps](#next-steps)

---

## Overview

**ENTERPRISE-GRADE E-COMMERCE PLATFORM**: This guide covers the complete setup for the Ramro e-commerce application with all advanced features:
- ✅ **Advanced Search**: Professional Algolia integration with instant results
- ✅ **Cultural Content**: Rich artisan storytelling and heritage documentation
- ✅ **Secure Payments**: Razorpay integration with multiple payment methods
- ✅ **Real-time Features**: Live inventory, instant notifications
- ✅ **Admin Dashboard**: Complete business management tools
- ✅ **Mobile Responsive**: Optimized for all devices
- ✅ **Performance Optimized**: Fast loading with modern architecture

**Your platform is ready for production launch!** 🚀🏔️

---

## Prerequisites

### **System Requirements**
- **Node.js**: 18.0.0 or higher (required for React 18 compatibility)
- **npm**: 8.0.0 or higher
- **Git**: Latest version
- **Modern Browser**: Chrome, Firefox, Safari, Edge

### **Required Accounts**
You'll need to create accounts with these services:
1. **Firebase**: [console.firebase.google.com](https://console.firebase.google.com)
2. **Razorpay**: [razorpay.com](https://razorpay.com)
3. **Algolia**: [algolia.com](https://algolia.com)
4. **Cloudinary**: [cloudinary.com](https://cloudinary.com)
5. **Netlify**: [netlify.com](https://netlify.com) (for deployment)
6. **GitHub**: [github.com](https://github.com) (for CI/CD pipeline)

---

## Core Installation

### **1. Clone and Install Dependencies**
```bash
# Clone the repository
git clone <your-repository-url>
cd ramro-ecommerce

# Install all dependencies
npm install

# Verify installation
npm list --depth=0
```

### **2. Verify Dependencies**
```bash
# Check for vulnerabilities
npm audit

# Fix any vulnerabilities
npm audit fix

# Test build process
npm run build
```

---

## Firebase Setup

### **Step 1: Create Firebase Project**
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click "Create a project"
3. Project name: `ramro-ecommerce-prod`
4. Disable Google Analytics (can add later)
5. Wait for project creation (2-3 minutes)

### **Step 2: Enable Firestore Database**
1. Click "Firestore Database" in left sidebar
2. Click "Create database"
3. Select "Start in production mode"
4. Choose location: `asia-south1` (Mumbai) or closest region
5. Click "Done"

### **Step 3: Configure Security Rules**
1. Go to Firestore → Rules
2. Replace default rules with the provided `firestore.rules` file content
3. Click "Publish"

### **Step 4: Enable Authentication**
1. Click "Authentication" in left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password"
5. Enable "Google" (optional but recommended)

### **Step 5: Configure Storage**
1. Click "Storage" in left sidebar
2. Click "Get started"
3. Use production mode
4. Choose same location as Firestore
5. Replace default rules with provided `storage.rules` file content

### **Step 6: Get Configuration Keys**
1. Click Project Overview (home icon)
2. Click Web icon (`</>`)
3. App nickname: `ramro-web-prod`
4. Check "Also set up Firebase Hosting"
5. **IMPORTANT**: Copy the entire firebaseConfig object - you'll need this!

---

## Razorpay Configuration

### **Step 1: Create Razorpay Account**
1. Go to [razorpay.com](https://razorpay.com)
2. Click "Sign Up"
3. Complete business verification (required for live payments)
4. Verify email and phone number

### **Step 2: Get API Keys**
1. Login to Razorpay Dashboard
2. Go to "Settings" → "API Keys"
3. Generate new API keys
4. **IMPORTANT**: Copy both Key ID and Key Secret
5. For testing: Use test mode keys initially

### **Step 3: Configure Webhooks**
1. Go to "Settings" → "Webhooks"
2. Create new webhook
3. URL: `https://your-domain.com/api/razorpay/webhook`
4. Events: Select "payment.captured", "payment.failed"
5. Save webhook secret for later use

### **Payment Methods Supported**
- **Credit/Debit Cards**: Visa, Mastercard, RuPay, Amex
- **UPI**: Google Pay, PhonePe, Paytm, BHIM
- **Net Banking**: All major Indian banks
- **Wallets**: Paytm, Mobikwik, Freecharge
- **EMI**: No-cost and regular EMI options

---

## Configure Professional Search (Algolia)

### **Step 1: Create Algolia Account**
1. Go to [algolia.com](https://algolia.com)
2. Click "Start free" and sign up
3. Choose the free "Build" plan (14-day trial, then free tier)
4. Complete account verification

### **Step 2: Create Application and Index**
1. In Algolia Dashboard, click "Create Application"
2. Application name: `ramro-search`
3. Select closest region (e.g., "Singapore" for Asia)
4. Click "Create Application"
5. Go to "Indices" and create new index named `ramro_products`

### **Step 3: Get API Keys**
1. Go to "Settings" → "API Keys"
2. You'll need these three keys:
   - **Application ID**: Found at top of API Keys page
   - **Search-Only API Key**: Public key for frontend searches
   - **Admin API Key**: Secret key for backend operations

### **Step 4: Configure Search Settings**
1. Go to your `ramro_products` index
2. Click "Configuration" → "Searchable attributes"
3. Add: `name`, `description`, `category`, `artisan`
4. Click "Configuration" → "Facets"
5. Add: `category`, `price`, `rating`, `origin`

### **Key Architecture Note**
- **Frontend (Netlify)**: Uses Application ID + Search-Only Key
- **Backend (Firebase Functions)**: Uses Admin Key for indexing

---

## Configure Media Management (Cloudinary)

### **Step 1: Create Cloudinary Account**
1. Go to [cloudinary.com](https://cloudinary.com)
2. Click "Sign up for free"
3. Choose "Developer" account type
4. Complete email verification

### **Step 2: Get Configuration Details**
1. Login to Cloudinary Dashboard
2. Go to "Dashboard" (main page)
3. Find your account details:
   - **Cloud Name**: Displayed prominently on dashboard
   - **API Key**: Found in "Account Details" section
   - **API Secret**: Click "Reveal" to see secret key

### **Step 3: Create Upload Preset**
1. Go to "Settings" → "Upload"
2. Click "Add upload preset"
3. Preset name: `ramro_products`
4. Signing Mode: "Unsigned"
5. Folder: `ramro/products`
6. Allowed formats: `jpg,png,webp`
7. Transformation: Enable "Auto quality" and "Auto format"
8. Save preset

### **Features Enabled**
- **Automatic Optimization**: Images optimized for web delivery
- **Responsive Images**: Multiple sizes generated automatically
- **CDN Delivery**: Global content delivery network
- **Upload Security**: Size limits and format validation

---

## Environment Variables

### **Create .env File**
Create a `.env` file in your project root with these variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=ramro-ecommerce-prod.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ramro-ecommerce-prod
VITE_FIREBASE_STORAGE_BUCKET=ramro-ecommerce-prod.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Razorpay Configuration (Public Key Only)
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id

# Algolia Search Configuration (Public Keys Only)
VITE_ALGOLIA_APP_ID=your_application_id
VITE_ALGOLIA_SEARCH_KEY=your_search_only_key
VITE_ALGOLIA_INDEX_NAME=ramro_products

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_UPLOAD_PRESET=ramro_products

# Environment
VITE_NODE_ENV=development
```

### **Security Note**
- **Public Keys**: All `VITE_*` variables are safe for frontend
- **Secret Keys**: Never put secret keys in .env file
- **Production**: Secret keys go in Firebase Functions environment

---

## Initial Setup & Testing

### **Step 1: Start Development Server**
```bash
# Start the application
npm run dev

# Should open at http://localhost:5173
```

### **Step 2: Verify Core Functionality**
1. **Homepage**: Should load without errors
2. **Authentication**: Try signing up for a new account
3. **Products**: Navigate to /shop and verify products load
4. **Search**: Test the search functionality
5. **Cart**: Add items to cart and verify persistence

### **Step 3: Check Browser Console**
- Open Developer Tools (F12)
- Check Console tab for any errors
- Network tab should show successful API calls

---

## Admin Account Creation

### **Step 1: Create User Account**
1. Sign up for a new account in your application
2. Use an email you'll remember (e.g., admin@yourcompany.com)
3. Complete the registration process

### **Step 2: Assign Admin Role**
1. Go to Firebase Console → Authentication → Users
2. Find your user and copy the UID
3. Go to Firestore Database → users collection
4. Find document with your UID
5. Add field: `role` with value `admin`
6. Save the document

### **Step 3: Verify Admin Access**
1. Log out and log back in
2. Navigate to `/admin`
3. Should see admin dashboard
4. Verify you can access all admin features

---

## Data Seeding

### **Step 1: Seed Products**
1. Access admin panel at `/admin`
2. Click "Seed Products" button
3. Wait for completion message
4. Verify products appear in shop

### **Step 2: Seed Artisan Profiles**
1. In admin panel, find "Artisan Database Setup"
2. Click "Seed Artisan Profiles"
3. Wait for completion
4. Visit `/artisans` to verify profiles

### **Step 3: Sync Search Index**
1. In admin panel, find "Algolia Search Management"
2. Click "Sync Products to Algolia"
3. Wait for completion
4. Test search functionality in shop

---

## Production Deployment

### **Step 1: Configure Netlify (Frontend)**

#### **Create Netlify Site**
1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "New site from Git"
3. Connect your GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

#### **Add Environment Variables to Netlify**
1. Go to Site settings → Environment variables
2. Add all `VITE_*` variables from your .env file:
   ```
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=ramro-ecommerce-prod.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=ramro-ecommerce-prod
   VITE_FIREBASE_STORAGE_BUCKET=ramro-ecommerce-prod.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_RAZORPAY_KEY_ID=rzp_live_your_live_key_id
   VITE_ALGOLIA_APP_ID=your_application_id
   VITE_ALGOLIA_SEARCH_KEY=your_search_only_key
   VITE_ALGOLIA_INDEX_NAME=ramro_products
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_API_KEY=your_api_key
   VITE_CLOUDINARY_UPLOAD_PRESET=ramro_products
   ```

## Enterprise CI/CD Pipeline Setup

### **Step 1: GitHub Actions Configuration**

#### **Create GitHub Secrets**
1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Add the following secrets:
   ```
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=ramro-ecommerce-prod.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=ramro-ecommerce-prod
   VITE_FIREBASE_STORAGE_BUCKET=ramro-ecommerce-prod.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_RAZORPAY_KEY_ID=rzp_live_your_live_key_id
   VITE_ALGOLIA_APP_ID=your_application_id
   VITE_ALGOLIA_SEARCH_KEY=your_search_only_key
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NETLIFY_AUTH_TOKEN=your_netlify_auth_token
   NETLIFY_SITE_ID=your_netlify_site_id
   FIREBASE_TOKEN=your_firebase_ci_token
   ```

#### **Get Required Tokens**

**Netlify Auth Token:**
1. Go to Netlify → User settings → Applications
2. Click "New access token"
3. Copy the token

**Firebase CI Token:**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and get CI token
firebase login:ci
# Copy the token that's generated
```

#### **CI/CD Pipeline Features**
The GitHub Actions pipeline includes:
- ✅ **Quality Checks**: Linting, type checking, unit tests
- ✅ **Security Scanning**: Dependency audit, secret detection
- ✅ **Build Verification**: Production build testing
- ✅ **E2E Testing**: Cypress test execution
- ✅ **Performance Testing**: Lighthouse audits
- ✅ **Automated Deployment**: Netlify + Firebase Functions
- ✅ **Failure Notifications**: Deployment status alerts

#### **Pipeline Workflow**
```
Code Push → Quality Gates → Security Scan → Build Test → E2E Tests → Performance Audit → Deploy → Notify
```

### **Step 2: Branch Protection Rules**

1. **Go to Repository Settings → Branches**
2. **Add rule for main branch:**
   - Require pull request reviews
   - Require status checks to pass
   - Require branches to be up to date
   - Include administrators

### **Step 3: Monitoring CI/CD Pipeline**

#### **Pipeline Status Monitoring:**
- View pipeline status in GitHub Actions tab
- Monitor build times and success rates
- Set up notifications for failures
- Review performance reports

#### **Quality Gates:**
- **Linting**: Code style and quality checks
- **Testing**: 95% test coverage requirement
- **Security**: No high-severity vulnerabilities
- **Performance**: Lighthouse score >85
- **Build**: Successful production build

### **Step 2: Configure Firebase Functions (Backend)**

#### **Install Firebase CLI**
```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize functions in your project
firebase init functions
```

#### **Set Secret Environment Variables**
**CRITICAL**: Secret keys must NEVER be put in Netlify. Use Firebase CLI:

```bash
# Set Algolia Admin API Key (for search indexing)
firebase functions:config:set algolia.admin_key="your_algolia_admin_api_key"

# Set Razorpay Key Secret (for payment verification)
firebase functions:config:set razorpay.key_secret="your_razorpay_key_secret"

# Set Razorpay Webhook Secret (for webhook verification)
firebase functions:config:set razorpay.webhook_secret="your_razorpay_webhook_secret"

# Set Cloudinary API Secret (for secure uploads)
firebase functions:config:set cloudinary.api_secret="your_cloudinary_api_secret"

# Verify configuration
firebase functions:config:get
```

### **Step 3: Deploy**

#### **Deploy Backend Functions First**
```bash
# Deploy Firebase Functions
firebase deploy --only functions

# Verify functions are deployed
firebase functions:log
```

#### **Deploy Frontend**
```bash
# Push to main branch (triggers Netlify deployment)
git add .
git commit -m "Production deployment"
git push origin main

# Monitor deployment in Netlify dashboard
```

### **Step 4: Production Testing**
1. **Test Website**: Visit your Netlify URL
2. **Test Authentication**: Sign up and login
3. **Test Search**: Verify Algolia search works
4. **Test Payments**: Use Razorpay test cards
5. **Test Admin**: Verify admin panel access
6. **Test Images**: Upload and verify Cloudinary integration

---

## Troubleshooting

### **Common Issues**

#### **"Firebase not configured" Error**
```bash
# Check environment variables
echo $VITE_FIREBASE_API_KEY

# Restart development server
npm run dev
```

#### **"Algolia search not working"**
1. Verify API keys in Netlify environment variables
2. Check Algolia index has data
3. Test search in Algolia dashboard

#### **"Payment processing failed"**
1. Verify Razorpay keys are correct
2. Check webhook configuration
3. Test with provided test card numbers

#### **"Images not uploading"**
1. Verify Cloudinary upload preset is unsigned
2. Check file size limits (5MB max)
3. Verify allowed file formats

#### **Build Failures**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for syntax errors
npm run lint

# Test build locally
npm run build
```

### **Debug Commands**
```bash
# Check Firebase connection
firebase projects:list

# Test Algolia connection
curl -X GET "https://APPLICATION_ID-dsn.algolia.net/1/indexes/ramro_products" \
  -H "X-Algolia-API-Key: SEARCH_ONLY_KEY" \
  -H "X-Algolia-Application-Id: APPLICATION_ID"

# Check Netlify deployment logs
netlify logs

# Monitor Firebase Functions
firebase functions:log --only=syncProductToAlgolia
```

---

## Next Steps

### **After Successful Deployment**

#### **Business Setup**
1. **Domain Configuration**: Add custom domain in Netlify
2. **SSL Certificate**: Enable HTTPS (automatic with Netlify)
3. **Analytics**: Set up Google Analytics
4. **Monitoring**: Configure error tracking

#### **Go Live Checklist**
- [ ] All tests passing in production
- [ ] Payment processing working with live keys
- [ ] Email notifications sending
- [ ] Search functionality operational
- [ ] Admin panel accessible
- [ ] Mobile experience optimized
- [ ] Performance scores >90

#### **Marketing Preparation**
- [ ] SEO optimization complete
- [ ] Social media accounts created
- [ ] Content marketing strategy
- [ ] Customer service processes
- [ ] Legal compliance verified

### **Ongoing Maintenance**
- **Weekly**: Monitor performance and user feedback
- **Monthly**: Review analytics and optimize conversion
- **Quarterly**: Plan feature updates and improvements

---

## 🎉 **Congratulations!**

You now have a fully functional, production-ready e-commerce platform with:
- ✅ **Enterprise-grade security** with role-based access control
- ✅ **Professional search** with Algolia instant results
- ✅ **Optimized media management** with Cloudinary CDN
- ✅ **Secure payment processing** with Razorpay
- ✅ **Rich cultural content** with artisan storytelling
- ✅ **Real-time features** with cross-tab synchronization
- ✅ **Comprehensive testing** with 95% coverage
- ✅ **Mobile-responsive design** optimized for all devices

**Your Ramro e-commerce platform is ready to connect customers with authentic Himalayan craftsmanship!** 🏔️

---

*This setup guide provides everything needed to deploy a production-ready e-commerce platform. For ongoing support, refer to the service documentation links provided throughout this guide.*