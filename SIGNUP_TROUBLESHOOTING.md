# Signup API Key Troubleshooting Guide

## Quick Diagnostic Steps

### Step 1: Test Signup Flow (Backend)

Run the test script to verify backend functionality:

```powershell
cd "C:\Users\meaux\CascadeProjects\my second project\CascadeProjects\windsurf-project\nexflow-deploy"
npx tsx scripts/test-signup-flow.ts
```

**Expected Output:**
- ✅ Account created successfully
- ✅ API key created successfully
- ✅ API key found in database
- ✅ Authentication works

**If Test Fails:**
- Check database connection
- Verify API key creation logic
- Check for database schema issues

### Step 2: Test Signup via API (Real Request)

```powershell
$body = @{
    email = "test-$(Get-Date -Format 'yyyyMMddHHmmss')@example.com"
    password = "TestPassword123"
    name = "Test User"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/api/v1/auth/signup" -Method POST -Headers @{"Content-Type"="application/json"} -Body $body

Write-Host "Response:"
$response | ConvertTo-Json -Depth 10

# Check API key
if ($response.apiKey.token) {
    Write-Host "`n✅ API Key received: $($response.apiKey.token.Substring(0, 20))..."
} else {
    Write-Host "`n❌ API Key missing in response!"
}
```

### Step 3: Check Browser Console

When testing signup in browser:

1. Open DevTools (F12) → Console tab
2. Try signing up
3. Check for errors:
   - `[Signup] Failed to store API key in localStorage`
   - Network errors
   - JSON parsing errors

**Browser Console Checks:**
```javascript
// After signup, check localStorage
console.log('API Key in localStorage:', localStorage.getItem('api_key'));

// Verify API key format
const apiKey = localStorage.getItem('api_key');
if (apiKey) {
    console.log('Format valid:', apiKey.startsWith('nf_live_') || apiKey.startsWith('nf_test_'));
    console.log('Length:', apiKey.length);
} else {
    console.error('API key not found in localStorage!');
}
```

### Step 4: Check Network Tab

1. Open DevTools → Network tab
2. Filter by "signup"
3. Find the POST request to `/api/v1/auth/signup`
4. Check:
   - **Request**: Body sent correctly?
   - **Response Status**: 201 (success) or error?
   - **Response Body**: Does it contain `apiKey.token`?

**Common Issues:**
- **400 Bad Request**: Validation error (check password format)
- **409 Conflict**: Email already exists
- **500 Internal Server Error**: Check server logs
- **201 but no apiKey**: API key creation failed (check logs)

## Common Issues & Fixes

### Issue 1: API Key Not in Response

**Symptom:** Signup succeeds (201) but response has no `apiKey.token`

**Check:**
1. Server logs: `[auth/signup] API key created:`
2. Database: Verify API key was created
3. Response structure: Check Network tab

**Fix:**
- Improved error handling added to signup route
- API key creation failures are now logged
- Response includes warning if API key creation fails

### Issue 2: localStorage Not Storing

**Symptom:** API key received but not stored

**Check:**
```javascript
// Test localStorage
localStorage.setItem('test', 'value');
console.log('Test value:', localStorage.getItem('test'));
localStorage.removeItem('test');
```

**Causes:**
- Browser privacy mode
- localStorage disabled
- Domain mismatch (www vs non-www)
- Browser extension blocking

**Fix:**
- Added verification in signup page
- Shows error if localStorage fails
- User can manually copy API key

### Issue 3: API Key Not in Database

**Symptom:** API key received but authentication fails

**Check:**
```powershell
# Verify API key exists
npx tsx scripts/verify-api-key.ts "nf_live_YOUR_KEY_HERE"
```

**Causes:**
- Database connection issue during signup
- Transaction rollback
- API key creation failed silently

**Fix:**
- Better error handling in signup route
- Logging added for API key creation
- Transaction handling improved

### Issue 4: Invalid API Key Format

**Symptom:** API key doesn't start with `nf_live_` or `nf_test_`

**Check:**
```javascript
const apiKey = localStorage.getItem('api_key');
console.log('Format:', apiKey?.substring(0, 10));
```

**Fix:**
- Format validation added to signup route
- Error returned if format invalid

### Issue 5: Database Connection Errors

**Symptom:** 500 error with "Database connection failed"

**Check:**
- Database running?
- Connection string correct in `.env.local`?
- Network connectivity?

**Fix:**
- Better error messages for database errors
- Specific error codes (503 for connection issues)

## Debugging Checklist

### Backend Checks

- [ ] Database is running and accessible
- [ ] `.env.local` has correct database credentials
- [ ] API key creation succeeds (check logs)
- [ ] API key is stored in database
- [ ] API key can be retrieved from database
- [ ] Server logs show signup flow completing

### Frontend Checks

- [ ] Signup request sends correct data
- [ ] Response includes `apiKey.token`
- [ ] localStorage is accessible (not blocked)
- [ ] API key is stored correctly
- [ ] API key format is valid (`nf_live_...`)
- [ ] Dashboard can read API key from localStorage

### Integration Checks

- [ ] API key from signup works for authentication
- [ ] Dashboard endpoints accept the API key
- [ ] API key has correct role (`user`)
- [ ] API key is linked to correct account (`userId`)

## Server Logs to Check

When signup happens, you should see:

```
[auth/signup] Creating account for: user@example.com
[auth/signup] Account created: account-uuid
[auth/signup] Creating API key for account: account-uuid
[auth/signup] API key created: key-123 Token: nf_live_ABC...
[auth/signup] Signup successful for: user@example.com
```

**If you see errors:**
- `Failed to create API key:` - Database issue or constraint violation
- `API key created but token is missing` - Generation issue
- `API key has invalid format` - Token generation bug

## Testing Commands

### Test Complete Flow

```powershell
# 1. Test backend signup logic
npx tsx scripts/test-signup-flow.ts

# 2. Test via API
$body = @{
    email = "test-$(Get-Date -Format 'yyyyMMddHHmmss')@example.com"
    password = "TestPassword123"
    name = "Test User"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/api/v1/auth/signup" -Method POST -Headers @{"Content-Type"="application/json"} -Body $body

# 3. Verify API key
if ($response.apiKey.token) {
    npx tsx scripts/verify-api-key.ts $response.apiKey.token
}

# 4. Test authentication
$headers = @{"x-api-key"=$response.apiKey.token; "Accept"="application/json"}
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/endpoints" -Method GET -Headers $headers
```

## Quick Fixes Applied

1. **Better Error Handling** - API key creation failures are caught and logged
2. **Validation** - API key format and existence validated before returning
3. **Logging** - Detailed logs for each step of signup process
4. **Graceful Degradation** - Account created even if API key fails (user can create later)
5. **Error Messages** - More specific error messages for different failure scenarios

## Still Having Issues?

1. **Check server logs** for detailed error messages
2. **Run test script** to verify backend functionality
3. **Test via API** directly (bypass frontend)
4. **Verify database** connection and schema
5. **Check browser console** for client-side issues
