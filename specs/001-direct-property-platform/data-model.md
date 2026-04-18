# Data Model

**Feature**: Direct Property Platform  
**Date**: 2026-04-18  
**Database**: MongoDB with Mongoose ODM  

## Entity: User

**Purpose**: Represents property owners, tenants, and administrators

**Fields**:
- `_id`: ObjectId (MongoDB)
- `firebaseUid`: String (required, unique) - Firebase user ID
- `email`: String (required, unique, validated)
- `phone`: String (optional, validated)
- `displayName`: String (required)
- `role`: String (enum: 'owner', 'tenant', 'admin', default: 'tenant')
- `isVerified`: Boolean (default: false)
- `profilePicture`: String (optional, URL)
- `createdAt`: Date (default: now)
- `updatedAt`: Date (default: now)
- `lastLoginAt`: Date (optional)

**Relationships**:
- One-to-many with Property (as owner)
- One-to-many with Message (as sender)
- One-to-many with Search (as user)

**Validation Rules**:
- Email must be valid format
- Phone must be valid international format (if provided)
- Display name 2-50 characters

**Indexes**:
- firebaseUid (unique)
- email (unique)
- role

## Entity: Property

**Purpose**: Property listings posted by owners

**Fields**:
- `_id`: ObjectId (MongoDB)
- `ownerId`: ObjectId (ref: User, required)
- `title`: String (required, 10-100 chars)
- `description`: String (required, 50-2000 chars)
- `propertyType`: String (enum: 'apartment', 'house', 'villa', 'office', 'shop', required)
- `transactionType`: String (enum: 'rent', 'sale', required)
- `price`: Number (required, positive)
- `area`: Number (required, positive, sq ft)
- `bedrooms`: Number (required, 0-20)
- `bathrooms`: Number (required, 0-20)
- `address`: Object
  - `street`: String (required)
  - `city`: String (required)
  - `state`: String (required)
  - `pincode`: String (required)
  - `country`: String (default: 'India')
  - `coordinates`: Object (lat: Number, lng: Number)
- `amenities`: [String] (array of amenity names)
- `photos`: [Object] (array of photo objects with url, alt, order)
- `isActive`: Boolean (default: true)
- `isVerified`: Boolean (default: false)
- `createdAt`: Date (default: now)
- `updatedAt`: Date (default: now)
- `views`: Number (default: 0)

**Relationships**:
- Many-to-one with User (owner)
- One-to-many with Message (property discussions)

**Validation Rules**:
- Price must be reasonable range based on location
- At least one photo required
- Coordinates must be valid lat/lng

**Indexes**:
- ownerId
- propertyType
- transactionType
- address.city
- price
- createdAt
- isActive

## Entity: Message

**Purpose**: Real-time chat messages between users about properties

**Fields**:
- `_id`: ObjectId (MongoDB)
- `propertyId`: ObjectId (ref: Property, required)
- `senderId`: ObjectId (ref: User, required)
- `receiverId`: ObjectId (ref: User, required)
- `content`: String (required, 1-1000 chars)
- `messageType`: String (enum: 'text', 'image', default: 'text')
- `isRead`: Boolean (default: false)
- `createdAt`: Date (default: now)

**Relationships**:
- Many-to-one with Property
- Many-to-one with User (sender)
- Many-to-one with User (receiver)

**Validation Rules**:
- Content cannot be empty
- Sender and receiver cannot be the same user

**Indexes**:
- propertyId
- senderId
- receiverId
- createdAt

## Entity: Search

**Purpose**: Saved search criteria for user dashboards

**Fields**:
- `_id`: ObjectId (MongoDB)
- `userId`: ObjectId (ref: User, required)
- `name`: String (required, user-defined search name)
- `criteria`: Object
  - `city`: String (optional)
  - `propertyType`: String (optional)
  - `transactionType`: String (optional)
  - `minPrice`: Number (optional)
  - `maxPrice`: Number (optional)
  - `minBedrooms`: Number (optional)
  - `maxBedrooms`: Number (optional)
- `isActive`: Boolean (default: true)
- `createdAt`: Date (default: now)
- `lastExecutedAt`: Date (optional)

**Relationships**:
- Many-to-one with User

**Validation Rules**:
- At least one search criterion required
- Price ranges must be logical (min < max)

**Indexes**:
- userId
- isActive

## Data Relationships Diagram

```
User (1) ────owns──── (N) Property
  │                        │
  │                        │
  └──sends── (N) Message (N) ──discusses──┘
       │           │
       └─receives─┘

User (1) ───saves── (N) Search
```

## Data Integrity Rules

1. Properties can only be created by verified owners
2. Messages can only be sent between different users
3. Users can only view messages for properties they own or have contacted about
4. Search criteria must include at least one filter
5. Property coordinates must be validated against address

## Migration Strategy

- Initial schema creation with validation
- Data seeding with sample properties and users
- Index creation for performance
- Backup strategy before production deployment

## Performance Optimizations

- Compound indexes for common search patterns
- Text indexes for property descriptions
- Geospatial indexes for location-based searches
- Pagination for large result sets
- Caching layer for frequently accessed data