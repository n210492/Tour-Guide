# Travel TwoGether

A responsive platform connecting users with India’s cultural heritage through seamless tour and guide bookings across cities like Delhi, Mumbai, Chennai, and Bangalore.

## Team

- **Preetham** *(Scrum Master, Frontend Lead)*: CSS fixes, project coordination.  
- **Vinuthna Sneha** *(Product Owner, Backend, Payments)*: Payment flows, INR formatting.  
- **Vinaya Sri** *(Frontend)*: Login, profiles, payment pages.  
- **Parnika** *(Frontend)*: City pages, place pages, wishlist, cart.  
- **Jeesus** *(Backend)*: MongoDB API, user/place endpoints, login backend.

## Features

- Browse and book tours in Indian cities with INR pricing.  
- User profiles, wishlist, and cart for personalized bookings.  
- Responsive design with city-specific guides and activities.  
- Secure payment system integrated with mock payment flows.  
- MongoDB backend for managing places, users, and bookings.

## Tech Stack

**Frontend**: HTML, CSS, JavaScript, Bootstrap, Swiper, Flatpickr, AOS.  
**Backend**: Node.js, Express, MongoDB (Mongoose), bcryptjs, JSON Web Tokens.

**Dependencies**:
```json
{
  "express": "^4.21.2",
  "mongoose": "^8.0.3",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5",
  "dotenv": "^16.5.0"
}
```

## Setup Instructions

### Clone the Repository:
```bash
git clone https://github.com/n210492/Tour-Guide.git
cd tour-guide-portal
```

### Install Dependencies:
```bash
npm install
```

### Set Up Environment Variables:

- Create a `.env` file in the root directory.
- Add:
```
MONGODB_URI=mongodb://localhost/travel
JWT_SECRET=your-secret-key
```

### Run the Server:
```bash
npm start
```

### Access the App:

Open `http://localhost:3000/src/index.html` in your browser.

## Usage

- Navigate to `src/place.html` to browse tours (e.g., Garden of Five Senses in Delhi).  
- Select participants, dates, and book with INR pricing.  
- Use the wishlist or cart to save tours for later.

## Deployment

- Deployed on Render *(TBD link, Sprint 6 milestone)*.  
- Backend API endpoints: `/api/places`, `/api/users` *(in progress)*.

## Contributing

- Fork the repository and create a feature branch:
```bash
git checkout -b feature-name
```
- Commit changes:
```bash
git commit -m "Add feature"
```
- Push and open a pull request to `main`.  
- Coordinate with **Preetham** for merge approvals.

## License

MIT License

## Contact

Reach out to the team via **GitHub Issues** for questions or contributions.
