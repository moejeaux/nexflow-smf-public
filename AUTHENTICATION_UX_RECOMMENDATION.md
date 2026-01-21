# Authentication UX Recommendation: Session-Based for Dashboard, API Keys for Programmatic Access

## Current State Analysis

### What You Have
- ✅ Email/password accounts (signup works)
- ✅ Password hashing (PBKDF2)
- ✅ API key system (for programmatic access)
- ❌ **No login endpoint** (only signup)
- ❌ **No session management** (cookies/JWT)
- ❌ **Dashboard relies on localStorage API keys** (fragile, not user-friendly)

### Current Problems
1. **localStorage is unreliable** - Can be blocked, cleared, or fail silently
2. **API keys are not user-friendly** - Long strings, need manual copying
3. **No "stay logged in"** - Users must re-enter API key
4. **No password reset** - Users can't recover accounts
5. **Security concerns** - API keys in localStorage are accessible to XSS

## Recommended Solution: Hybrid Authentication

### Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    User Types                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  👤 Human Users (Dashboard)                            │
│     → Session-based auth (cookies/JWT)                 │
│     → Email/password login                              │
│     → "Stay logged in" functionality                    │
│     → Password reset                                    │
│                                                         │
│  🤖 Programmatic Access (SDK/CLI/API)                  │
│     → API keys (current system)                        │
│     → Created/managed from dashboard                    │
│     → Multiple keys per account                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Benefits

1. **User-Friendly Dashboard**
   - Traditional email/password login
   - Automatic session management
   - "Remember me" option
   - No manual API key copying

2. **Secure Programmatic Access**
   - API keys for SDK/CLI usage
   - Keys can be rotated/revoked
   - Multiple keys per account
   - Fine-grained permissions

3. **Best of Both Worlds**
   - Humans get familiar UX
   - Machines get secure tokens
   - Clear separation of concerns

## Implementation Plan

### Phase 1: Session-Based Authentication (Dashboard)

#### 1.1 Create Login Endpoint

**File**: `src/app/api/v1/auth/login/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { findAccountByEmail, verifyPassword } from '@/db/accounts';
import { createSession, findSessionByToken } from '@/db/sessions';
import { z } from 'zod';
import crypto from 'crypto';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = loginSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', code: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }

    const { email, password, rememberMe } = validation.data;

    // Find account
    const account = await findAccountByEmail(email);
    if (!account) {
      return NextResponse.json(
        { error: 'Invalid email or password', code: 'INVALID_CREDENTIALS' },
        { status: 401 }
      );
    }

    // Verify password
    if (!verifyPassword(password, account.passwordHash)) {
      return NextResponse.json(
        { error: 'Invalid email or password', code: 'INVALID_CREDENTIALS' },
        { status: 401 }
      );
    }

    // Check account status
    if (account.status !== 'active') {
      return NextResponse.json(
        { error: 'Account is suspended', code: 'ACCOUNT_SUSPENDED' },
        { status: 403 }
      );
    }

    // Create session
    const sessionToken = crypto.randomBytes(32).toString('base64url');
    const expiresAt = rememberMe 
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      : new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const session = await createSession({
      accountId: account.id,
      token: sessionToken,
      expiresAt: expiresAt.toISOString(),
      userAgent: request.headers.get('user-agent') || undefined,
      ipAddress: request.ip || request.headers.get('x-forwarded-for')?.split(',')[0],
    });

    // Set HTTP-only cookie (secure, not accessible to JavaScript)
    const response = NextResponse.json({
      success: true,
      account: {
        id: account.id,
        email: account.email,
        name: account.name,
      },
    });

    response.cookies.set('session_token', sessionToken, {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax', // CSRF protection
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[auth/login] Error:', error);
    return NextResponse.json(
      { error: 'Login failed', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
```

#### 1.2 Create Session Middleware

**File**: `src/lib/session-auth.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { findSessionByToken } from '@/db/sessions';
import { getAccountWithPlan } from '@/db/accounts';

export interface AuthenticatedSession {
  accountId: string;
  email: string;
  name?: string;
  plan: {
    name: string;
    dailyLimit: number;
    monthlyLimit: number;
  };
}

/**
 * Authenticate request using session cookie
 * Returns session data or error response
 */
export async function requireSession(
  request: NextRequest
): Promise<
  | { session: AuthenticatedSession; response?: never }
  | { session?: never; response: NextResponse }
> {
  // Get session token from cookie
  const sessionToken = request.cookies.get('session_token')?.value;

  if (!sessionToken) {
    return {
      response: NextResponse.json(
        { error: 'Not authenticated', code: 'UNAUTHORIZED' },
        { status: 401 }
      ),
    };
  }

  // Find session in database
  const session = await findSessionByToken(sessionToken);

  if (!session) {
    return {
      response: NextResponse.json(
        { error: 'Invalid session', code: 'UNAUTHORIZED' },
        { status: 401 }
      ),
    };
  }

  // Check if session expired
  if (new Date(session.expiresAt) < new Date()) {
    return {
      response: NextResponse.json(
        { error: 'Session expired', code: 'SESSION_EXPIRED' },
        { status: 401 }
      ),
    };
  }

  // Get account with plan
  const account = await getAccountWithPlan(session.accountId);

  if (!account || account.status !== 'active') {
    return {
      response: NextResponse.json(
        { error: 'Account not found or suspended', code: 'ACCOUNT_INVALID' },
        { status: 403 }
      ),
    };
  }

  return {
    session: {
      accountId: account.id,
      email: account.email,
      name: account.name,
      plan: account.plan,
    },
  };
}
```

#### 1.3 Update Dashboard Routes

**File**: `src/app/api/v1/endpoints/route.ts`

```typescript
import { requireSession } from '@/lib/session-auth';

export async function POST(request: NextRequest) {
  // Use session auth for dashboard
  const sessionResult = await requireSession(request);
  if ('response' in sessionResult) {
    return sessionResult.response;
  }

  const { session } = sessionResult;
  
  // Now you have accountId from session
  // Create endpoint with accountId...
}
```

#### 1.4 Create Login Page

**File**: `src/app/login/page.tsx`

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important: sends cookies
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8">
        <h1 className="text-3xl font-bold mb-6">Sign In</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-900/20 border border-red-800 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={formData.rememberMe}
              onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-sm">
              Remember me for 30 days
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime-400 text-gray-900 py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/start" className="text-lime-400 hover:underline">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
```

### Phase 2: Update Dashboard to Use Sessions

#### 2.1 Remove localStorage Dependency

**File**: `src/lib/api-client.ts`

```typescript
// Remove localStorage API key logic for dashboard routes
// Keep API key support for programmatic access

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // For dashboard routes, use session cookie (automatic)
  // For programmatic access, use API key header
  const apiKey = options.headers?.['x-api-key'] as string | undefined;
  
  const response = await fetch(endpoint, {
    ...options,
    credentials: 'include', // Send cookies for session auth
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey && { 'x-api-key': apiKey }), // Only if provided
      ...options.headers,
    },
  });

  // ... rest of function
}
```

#### 2.2 Update Dashboard Pages

**File**: `src/app/dashboard/page.tsx`

```typescript
// Remove localStorage checks
// Session is automatically sent via cookies
// If session invalid, API will return 401
// Redirect to /login on 401
```

### Phase 3: Keep API Keys for Programmatic Access

#### 3.1 API Keys Still Work

- SDK/CLI can still use API keys
- Dashboard can manage API keys
- Users create keys from dashboard settings
- Keys are for programmatic access only

#### 3.2 Update API Routes to Support Both

**File**: `src/app/api/v1/endpoints/route.ts`

```typescript
export async function POST(request: NextRequest) {
  // Try session first (dashboard users)
  const sessionResult = await requireSession(request);
  
  let accountId: string;
  
  if ('session' in sessionResult) {
    accountId = sessionResult.session.accountId;
  } else {
    // Fall back to API key (programmatic access)
    const authResult = await requireAuth(request, 'user');
    if ('response' in authResult) {
      return authResult.response;
    }
    accountId = authResult.apiKey.userId || authResult.apiKey.id;
  }
  
  // Create endpoint with accountId...
}
```

## User Experience Flow

### Dashboard Users (Humans)

1. **Sign Up** → `/start`
   - Email/password
   - Account created
   - Auto-logged in (session cookie set)

2. **Login** → `/login`
   - Email/password
   - "Remember me" option
   - Session cookie set

3. **Dashboard** → `/dashboard`
   - No API key needed
   - Session automatically sent
   - Can create endpoints immediately

4. **Stay Logged In**
   - Cookie persists (24h or 30 days)
   - No manual re-authentication

### Programmatic Users (SDK/CLI)

1. **Get API Key** → Dashboard Settings
   - Create new API key
   - Copy token
   - Use in SDK/CLI

2. **Use API Key**
   - `x-api-key` header
   - Works for all API endpoints
   - Independent of dashboard session

## Security Benefits

1. **HTTP-only Cookies** - Not accessible to JavaScript (XSS protection)
2. **SameSite Cookies** - CSRF protection
3. **Secure Cookies** - HTTPS only in production
4. **Session Expiration** - Automatic logout
5. **Separate Concerns** - Sessions for humans, keys for machines

## Migration Path

1. **Add session system** (Phase 1)
2. **Update dashboard** to use sessions (Phase 2)
3. **Keep API keys** for backward compatibility (Phase 3)
4. **Gradually deprecate** localStorage API key usage
5. **Add password reset** functionality

## Additional Features to Add

1. **Password Reset**
   - `/api/v1/auth/forgot-password`
   - Email with reset token
   - `/api/v1/auth/reset-password`

2. **Logout**
   - `/api/v1/auth/logout`
   - Clear session cookie
   - Invalidate session in database

3. **Session Management**
   - View active sessions
   - Revoke sessions
   - Security notifications

## Recommendation Summary

**✅ Use Session-Based Auth for Dashboard**
- More user-friendly
- Familiar UX
- Better security
- Automatic management

**✅ Keep API Keys for Programmatic Access**
- Required for SDK/CLI
- Better for automation
- Can be rotated/revoked
- Fine-grained permissions

**❌ Don't Use localStorage API Keys for Dashboard**
- Fragile and unreliable
- Poor UX
- Security concerns
- Not standard practice

This hybrid approach gives you the best of both worlds: user-friendly dashboard experience and secure programmatic access.
