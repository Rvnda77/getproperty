# Authentication API Contract

**Base URL**: `/api/auth`
**Authentication**: Firebase ID Token in Authorization header

## Endpoints

### POST /api/auth/verify
Verify Firebase ID token and create/update user record.

**Request**:
```json
{
  "idToken": "firebase-id-token"
}
```

**Response (200)**:
```json
{
  "user": {
    "id": "user-id",
    "firebaseUid": "firebase-uid",
    "email": "user@example.com",
    "displayName": "User Name",
    "role": "tenant",
    "isVerified": true
  },
  "token": "jwt-access-token"
}
```

**Error Responses**:
- 400: Invalid token
- 401: Unauthorized
- 500: Server error

### POST /api/auth/refresh
Refresh access token.

**Request**:
```json
{
  "refreshToken": "refresh-token"
}
```

**Response (200)**:
```json
{
  "token": "new-jwt-access-token"
}
```

## Security
- All endpoints require valid Firebase ID token
- Tokens expire in 1 hour
- Refresh tokens valid for 30 days
- Rate limiting: 10 requests per minute per IP