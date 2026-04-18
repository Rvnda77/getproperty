# Users API Contract

**Base URL**: `/api/users`
**Authentication**: JWT token required

## Endpoints

### GET /api/users/profile
Get current user profile.

**Response (200)**:
```json
{
  "user": {
    "id": "user-id",
    "firebaseUid": "firebase-uid",
    "email": "user@example.com",
    "phone": "+91-9876543210",
    "displayName": "John Doe",
    "role": "owner",
    "isVerified": true,
    "profilePicture": "https://example.com/avatar.jpg",
    "createdAt": "2026-04-18T09:00:00Z",
    "lastLoginAt": "2026-04-18T10:00:00Z"
  }
}
```

### PUT /api/users/profile
Update user profile.

**Request** (partial updates allowed):
```json
{
  "displayName": "John Smith",
  "phone": "+91-9876543210",
  "profilePicture": "https://example.com/new-avatar.jpg"
}
```

**Response (200)**: Updated user object.

### GET /api/users/dashboard
Get user dashboard data.

**Response (200)**:
```json
{
  "stats": {
    "totalProperties": 5,  // for owners
    "activeListings": 3,
    "totalViews": 150,
    "savedSearches": 2,    // for tenants
    "contactedProperties": 8,
    "unreadMessages": 3
  },
  "recentActivity": [
    {
      "type": "property_view",
      "propertyId": "prop-id",
      "timestamp": "2026-04-18T10:00:00Z"
    }
  ]
}
```

### GET /api/users/searches
Get saved searches (tenants only).

**Response (200)**:
```json
{
  "searches": [
    {
      "id": "search-id",
      "name": "2BHK in Mumbai",
      "criteria": {
        "city": "Mumbai",
        "propertyType": "apartment",
        "minBedrooms": 2,
        "maxPrice": 50000
      },
      "createdAt": "2026-04-18T09:00:00Z",
      "lastExecutedAt": "2026-04-18T10:00:00Z"
    }
  ]
}
```

### POST /api/users/searches
Save new search criteria.

**Request**:
```json
{
  "name": "My Search",
  "criteria": {
    "city": "Mumbai",
    "minPrice": 20000,
    "maxPrice": 40000,
    "propertyType": "apartment"
  }
}
```

**Response (201)**: Saved search object.

### DELETE /api/users/searches/:id
Delete saved search.

**Response (200)**:
```json
{
  "message": "Search deleted successfully"
}
```

## Validation Rules
- Display name: 2-50 characters
- Phone: Valid international format (optional)
- Profile picture: Valid URL (optional)
- Search name: 1-50 characters
- At least one search criterion required

## Error Responses
- 400: Validation error
- 401: Unauthorized
- 404: User/Search not found
- 500: Server error

## Rate Limiting
- Profile operations: 30 requests per minute
- Dashboard: 60 requests per minute
- Search operations: 20 requests per minute