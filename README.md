# HyperLocal Emergency & Help Connector (ResQ)

A real-time emergency response platform connecting users in distress with nearby volunteers.

## Features

- **One-tap SOS**: Instantly triggers an alarm and shares location with nearby volunteers.
- **Real-time Alerts**: Uses Socket.io to notify volunteers instantly.
- **Interactive Map**: Live tracking of emergency requests and volunteers.
- **Role-based Dashboards**: distinct views for Users (SOS trigger) and Volunteers (Response map).
- **Blood Donor Search**: Filter donors by blood group (mocked in UI for now).

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Leaflet (Maps), Socket.io-client
- **Backend**: Node.js, Express, MongoDB, Socket.io, JWT Auth

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas Account (or local MongoDB)

### Backend Setup
1. Navigate to `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your credentials:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open http://localhost:5173 in your browser.
2. **User Flow**:
   - Sign up as a "User".
   - Go to Dashboard.
   - Click the big Red SOS button.
3. **Volunteer Flow**:
   - Open a new incognito window.
   - Sign up as a "Volunteer".
   - Go to Dashboard.
   - You will see the SOS alert on the map/list in real-time.

## Project Structure

```
/
├── backend/       # Express Server & API
│   ├── config/    # DB Config
│   ├── models/    # Mongoose Models
│   ├── routes/    # API Routes
│   └── index.js   # Entry point
└── frontend/      # React App
    ├── src/
    │   ├── components/  # Reusable UI
    │   ├── context/     # Auth State
    │   └── pages/       # App Pages
```

## License
MIT
