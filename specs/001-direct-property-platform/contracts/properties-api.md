# Properties API Contract

**Base URL**: `/api/properties`
**Authentication**: JWT token required

## Endpoints

### GET /api/properties
Search and filter properties.

**Query Parameters**:
- `city`: String (optional)
- `propertyType`: String (optional)
- `transactionType`: String (optional)
- `minPrice`: Number (optional)
- `maxPrice`: Number (optional)
- `minBedrooms`: Number (optional)
- `maxBedrooms`: Number (optional)
- `limit`: Number (default: 20, max: 100)
- `offset`: Number (default: 0)

**Response (200)**:
```json
{
  "properties": [
    {
      "id": "property-id",
      "title": "Beautiful Apartment",
      "description": "Spacious 2BHK apartment",
      "propertyType": "apartment",
      "transactionType": "rent",
      "price": 25000,
      "area": 1200,
      "bedrooms": 2,
      "bathrooms": 2,
      "address": {
        "street": "123 Main St",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400001",
        "coordinates": {
          "lat": 19.0760,
          "lng": 72.8777
        }
      },
      "amenities": ["parking", "gym", "swimming pool"],
      "photos": [
        {
          "url": "https://example.com/photo1.jpg",
          "alt": "Living room",
          "order": 1
        }
      ],
      "owner": {
        "id": "owner-id",
        "displayName": "John Doe",
        "phone": "+91-9876543210"
      },
      "isActive": true,
      "createdAt": "2026-04-18T10:00:00Z",
      "views": 45
    }
  ],
  "total": 150,
  "hasMore": true
}
```

### POST /api/properties
Create new property listing (owners only).

**Request**:
```json
{
  "title": "Beautiful Apartment",
  "description": "Spacious 2BHK apartment with modern amenities",
  "propertyType": "apartment",
  "transactionType": "rent",
  "price": 25000,
  "area": 1200,
  "bedrooms": 2,
  "bathrooms": 2,
  "address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  },
  "amenities": ["parking", "gym"],
  "photos": [
    {
      "url": "https://example.com/photo1.jpg",
      "alt": "Living room"
    }
  ]
}
```

**Response (201)**:
```json
{
  "property": {
    "id": "new-property-id",
    "title": "Beautiful Apartment",
    "isActive": true,
    "createdAt": "2026-04-18T10:00:00Z"
  }
}
```

### GET /api/properties/:id
Get property details.

**Response (200)**: Single property object as above.

### PUT /api/properties/:id
Update property (owner only).

**Request**: Same as POST, partial updates allowed.

**Response (200)**: Updated property object.

### DELETE /api/properties/:id
Deactivate property (owner only).

**Response (200)**:
```json
{
  "message": "Property deactivated successfully"
}
```

## Validation Rules
- Title: 10-100 characters
- Description: 50-2000 characters
- Price: Must be positive number
- Area: Must be positive number
- Bedrooms/Bathrooms: 0-20
- At least one photo required
- Address fields required

## Error Responses
- 400: Validation error
- 401: Unauthorized
- 403: Forbidden (not owner)
- 404: Property not found
- 500: Server error

## Rate Limiting
- Search: 100 requests per minute
- Create/Update/Delete: 10 requests per minute per user