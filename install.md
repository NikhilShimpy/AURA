
# 🚀 Aura Installation Guide

Follow these steps to deploy the Aura Student OS ecosystem.

## 🛠️ 1. Firebase Setup

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new project named `aura-student-os`.
3.  **Authentication:** Enable "Google" and "Email/Password" providers.
4.  **Firestore:** Create a database in "Production Mode".
5.  **Project Settings:** Copy your `firebaseConfig` object.

## 🔑 2. Google Cloud & Gemini Setup

1.  Go to [Google AI Studio](https://makersuite.google.com/).
2.  Get an API Key.
3.  Ensure the account has access to `gemini-2.0-flash` and `gemini-pro`.

## 💻 3. Local Development

### Frontend
```bash
# Install packages
npm install

# Create environment file
touch .env
# Add the content from .env.example
```

### Security Rules
Ensure your `firestore.rules` are deployed:
```bash
firebase deploy --only firestore:rules
```

## 🌍 4. Production Build

```bash
npm run build
# The 'dist' folder is now ready for deployment.
```

## ☁️ 5. Deploy to Vercel

1.  Install Vercel CLI: `npm i -g vercel`
2.  Run `vercel`
3.  Set the environment variables in the Vercel dashboard.

> **Note:** For the Peer Mentor features to work, you must manually set the `role` field to `peer_mentor` or `admin` in your specific Firestore User document after signing up.
