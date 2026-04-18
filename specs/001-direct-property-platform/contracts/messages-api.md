# Messages API Contract

**Base URL**: `/api/messages`
**Authentication**: JWT token required
**Real-time**: Socket.io integration for live messaging

## REST Endpoints

### GET /api/messages
Get message history for a property.

**Query Parameters**:
- `propertyId`: String (required)
- `limit`: Number (default: 50, max: 100)
- `before`: Date (optional, for pagination)

**Response (200)**:
```json
{
  "messages": [
    {
      "id": "message-id",
      "propertyId": "property-id",
      "senderId": "sender-user-id",
      "receiverId": "receiver-user-id",
      "content": "Hello, is this property still available?",
      "messageType": "text",
      "isRead": false,
      "createdAt": "2026-04-18T10:30:00Z"
    }
  ],
  "hasMore": false
}
```

### POST /api/messages
Send new message.

**Request**:
```json
{
  "propertyId": "property-id",
  "receiverId": "receiver-user-id",
  "content": "I'm interested in viewing the property",
  "messageType": "text"
}
```

**Response (201)**:
```json
{
  "message": {
    "id": "new-message-id",
    "content": "I'm interested in viewing the property",
    "createdAt": "2026-04-18T10:30:00Z"
  }
}
```

### PUT /api/messages/:id/read
Mark message as read.

**Response (200)**:
```json
{
  "message": "Message marked as read"
}
```

## Socket.io Events

### Connection
```javascript
const socket = io('/messages', {
  auth: { token: 'jwt-token' }
});
```

### Join Property Room
```javascript
socket.emit('join-property', { propertyId: 'property-id' });
```

### Send Message
```javascript
socket.emit('send-message', {
  propertyId: 'property-id',
  receiverId: 'receiver-user-id',
  content: 'Message content',
  messageType: 'text'
});
```

### Receive Message
```javascript
socket.on('new-message', (message) => {
  console.log('New message:', message);
  // message object as in REST response
});
```

### Message Read
```javascript
socket.emit('mark-read', { messageId: 'message-id' });
```

### Typing Indicator
```javascript
socket.emit('typing', { propertyId: 'property-id', isTyping: true });
socket.on('user-typing', (data) => {
  // data: { userId, displayName, isTyping }
});
```

## Validation Rules
- Content: 1-1000 characters
- Users must be different (sender ≠ receiver)
- Users must have contacted about the property before
- Message type must be 'text' or 'image'

## Security
- Users can only access messages for properties they own or have messaged about
- Rate limiting: 30 messages per minute per user
- Content moderation for spam prevention

## Error Responses
- 400: Validation error
- 401: Unauthorized
- 403: Forbidden
- 404: Message/Property not found
- 429: Rate limit exceeded