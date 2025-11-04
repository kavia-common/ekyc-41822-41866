# WebFrontend Supabase Setup

Environment variables (React):
- REACT_APP_SUPABASE_URL: https://<project>.supabase.co
- REACT_APP_SUPABASE_KEY: anon/public key only (never use service role key in frontend)
- REACT_APP_SITE_URL: optional; defaults to http://localhost:3000

Auth redirects:
- Ensure Supabase Authentication -> URL Configuration contains:
  - Site URL: http://localhost:3000/ (dev), https://your-domain/ (prod)
  - Redirect URLs:
    - http://localhost:3000/**
    - https://your-domain/**

Routing:
- This repository includes pages/auth/Callback.jsx. Ensure your router maps /auth/callback to this component.

Usage:
- import { supabase } from './src/utils/supabase'
- import { signUp, signInWithMagicLink, signInWithOAuth, resetPassword } from './src/utils/auth'
