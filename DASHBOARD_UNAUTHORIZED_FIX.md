# Dashboard "Unauthorized" Error - Diagnosis & Fix

## Problem
After signing up at `nexflowapp.app/start`, users get "Unauthorized" when trying to create an endpoint at `nexflowapp.app/dashboard/metered`.

## Root Cause Analysis

### Expected Flow
1. User signs up at `/start` → API key is created and returned
2. Signup page stores API key: `localStorage.setItem('api_key', data.apiKey.token)` (line 58 in `src/app/start/page.tsx`)
3. User navigates to `/dashboard/metered`
4. Dashboard reads API key: `localStorage.getItem('api_key')` (line 28 in `src/lib/api-client.ts`)
5. API key is sent in `x-api-key` header to `/api/v1/endpoints`

### Potential Issues

#### Issue 1: localStorage Not Persisting
- **Symptom**: API key stored but not found on next page
- **Causes**:
  - Browser privacy mode / incognito
  - localStorage blocked by browser settings
  - Different domain/subdomain (e.g., `www.nexflowapp.app` vs `nexflowapp.app`)
  - Browser extension clearing localStorage

#### Issue 2: API Key Not in Database
- **Symptom**: API key exists in localStorage but returns "Invalid API key"
- **Causes**:
  - Signup succeeded but API key creation failed silently
  - Database connection issue during signup
  - API key format mismatch

#### Issue 3: Response Structure Mismatch
- **Symptom**: Signup succeeds but API key not extracted correctly
- **Cause**: Response structure doesn't match expected format

## Diagnosis Steps

### Step 1: Check Browser Console
Open browser DevTools (F12) → Console tab, then run:
```javascript
// Check if API key is stored
console.log('API Key in localStorage:', localStorage.getItem('api_key'));

// Check signup response structure
// (Run this right after signup, before navigating)
```

### Step 2: Verify API Key Format
The API key should:
- Start with `nf_live_` or `nf_test_`
- Be ~50+ characters long
- Example: `nf_live_ABC123...XYZ789`

### Step 3: Check Network Tab
1. Open DevTools → Network tab
2. Try creating an endpoint
3. Find the request to `/api/v1/endpoints`
4. Check Request Headers:
   - Should have: `x-api-key: nf_live_...`
   - If missing: localStorage issue
   - If present but still 401: API key not in database

### Step 4: Verify API Key in Database
Run the verification script:
```powershell
cd "C:\Users\meaux\CascadeProjects\my second project\CascadeProjects\windsurf-project\nexflow-deploy"
npx tsx scripts/verify-api-key.ts "nf_live_YOUR_KEY_HERE"
```

## Fixes

### Fix 1: Add Error Handling & Debugging

**File**: `src/app/start/page.tsx`

Add better error handling and verification:

```typescript
// After line 58 (localStorage.setItem)
localStorage.setItem('api_key', data.apiKey.token)

// Verify it was stored
const stored = localStorage.getItem('api_key')
if (!stored || stored !== data.apiKey.token) {
  console.error('Failed to store API key in localStorage')
  // Show error to user
  setError('Failed to save API key. Please copy it manually and set it in dashboard settings.')
}
```

### Fix 2: Add API Key Validation on Dashboard Load

**File**: `src/app/dashboard/page.tsx`

Add check on mount:

```typescript
useEffect(() => {
  // Check if API key exists
  const apiKey = localStorage.getItem('api_key')
  if (!apiKey) {
    setError('No API key found. Please sign up or set your API key in settings.')
    return
  }
  
  // Verify API key format
  if (!apiKey.startsWith('nf_live_') && !apiKey.startsWith('nf_test_')) {
    setError('Invalid API key format. Please check your API key.')
    return
  }
  
  loadData()
}, [])
```

### Fix 3: Add API Key Settings Page

Create a page where users can manually set their API key if localStorage fails:

**File**: `src/app/dashboard/settings/page.tsx` (new file)

```typescript
'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('api_key') || '')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (!apiKey.startsWith('nf_live_') && !apiKey.startsWith('nf_test_')) {
      alert('Invalid API key format. Must start with nf_live_ or nf_test_')
      return
    }
    localStorage.setItem('api_key', apiKey)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">API Key Settings</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">API Key</label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            placeholder="nf_live_..."
          />
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-lime-400 text-gray-900 rounded-lg font-medium hover:bg-lime-300"
        >
          {saved ? 'Saved!' : 'Save API Key'}
        </button>
      </div>
    </div>
  )
}
```

### Fix 4: Improve Signup Error Handling

**File**: `src/app/start/page.tsx`

Add verification after signup:

```typescript
// After successful signup (line 57-64)
const data = await response.json()

if (!response.ok) {
  throw new Error(data.error || data.details?.[0]?.message || 'Signup failed')
}

// Verify API key in response
if (!data.apiKey || !data.apiKey.token) {
  throw new Error('Signup succeeded but no API key received. Please contact support.')
}

// Store and verify
localStorage.setItem('api_key', data.apiKey.token)
const verified = localStorage.getItem('api_key')
if (verified !== data.apiKey.token) {
  console.error('localStorage verification failed')
  // Still show success but warn user to copy key
}
```

### Fix 5: Add Fallback Authentication

If localStorage fails, allow users to paste API key in a modal:

**File**: `src/lib/api-client.ts`

```typescript
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  let apiKey = typeof window !== 'undefined' ? localStorage.getItem('api_key') : null;
  
  if (!apiKey) {
    // Show modal to enter API key
    const userKey = prompt('API key not found. Please enter your API key:');
    if (userKey) {
      localStorage.setItem('api_key', userKey);
      apiKey = userKey;
    } else {
      throw new ApiError(401, 'UNAUTHORIZED', 'API key required');
    }
  }
  
  // ... rest of function
}
```

## Immediate Workaround for Users

If a user encounters this issue:

1. **Copy API key from signup page** (it's displayed after successful signup)
2. **Open browser console** (F12)
3. **Run**: `localStorage.setItem('api_key', 'nf_live_YOUR_KEY_HERE')`
4. **Refresh the dashboard page**

## Testing Checklist

- [ ] Sign up with new account
- [ ] Verify API key is stored in localStorage
- [ ] Navigate to dashboard
- [ ] Try creating an endpoint
- [ ] Check Network tab for `x-api-key` header
- [ ] Verify API key exists in database
- [ ] Test with incognito/private browsing
- [ ] Test with localStorage disabled

## Recommended Priority Fixes

1. **High Priority**: Add API key validation on dashboard load (Fix 2)
2. **High Priority**: Add settings page for manual API key entry (Fix 3)
3. **Medium Priority**: Improve signup error handling (Fix 4)
4. **Low Priority**: Add fallback authentication modal (Fix 5)

## Long-term Solution

Consider implementing:
- Session-based authentication (cookies) as primary
- API keys as secondary/optional
- Server-side session management
- Better error messages guiding users to fix the issue
