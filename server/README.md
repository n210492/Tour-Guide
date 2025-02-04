# Tour Guide Booking Server

This is the backend server for the Tour Guide Booking System.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
- Create a `.env` file in the root directory
- Add the following variables:
  ```
  PORT=3000
  MONGODB_URI=your_mongodb_connection_string
  ```

3. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Bookings

- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get a specific booking
- `PUT /api/bookings/:id` - Update a booking status
- `DELETE /api/bookings/:id` - Delete a booking

## Project Structure

```
server/
├── controllers/     # Request handlers
├── models/         # Database models
├── routes/         # API routes
├── .env           # Environment variables
├── index.js       # Entry point
└── package.json   # Project dependencies
```
