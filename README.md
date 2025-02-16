# URide - E-Hailing App

## Overview
URide is a modern ride-booking platform built using Next.js with TypeScript and Tailwind CSS. The app provides a user-friendly interface for requesting rides, real-time tracking, fare estimation, and secure payment options.

## Features
- **Google Sign-In**: Users can log in using their Google account.
- **Ride Booking**: Users can request a ride by entering their pickup and destination locations.
- **Real-Time Tracking**: Live tracking of rides using an interactive map.
- **Fare Estimation**: Estimated fare calculation based on distance and ride type.
- **Driver Matching**: Efficient driver assignment using an algorithm.
- **Payment Integration**: Supports multiple payment options including card, wallet, and cash.
- **Multi-Currency Support**: Currency conversion based on exchange rates.
- **Ride History**: Users can view past rides and details.
- **Reviews & Ratings**: Passengers and drivers can rate each other after a ride.
- **Notifications**: Push and in-app notifications for ride status updates.

## Tech Stack
### Frontend
- **Next.js** – React framework for server-side rendering and static site generation.
- **TypeScript** – For type safety and maintainability.
- **Tailwind CSS** – For responsive and modern UI styling.
- **Material UI Icons** – For consistent and modern icons.

### DevOps & Deployment
- **Vercel** – For hosting and deployment.
- **CI/CD** – GitHub Actions for continuous integration and deployment.

## APIs Used
URide integrates the following free APIs to provide essential ride-hailing features:

- **OpenStreetMap API** – Used for map initialization and display.
- **TrueWay Geocoding API** – Converts addresses into geographic coordinates.
- **TrueWay Reverse Geocoding API** – Converts geographic coordinates into readable addresses.
- **Driving Distance Calculator API (RapidAPI)** – Calculates the driving distance and estimated time between locations.
- **Currency Conversion and Exchange Rates API (RapidAPI)** – Converts fares between different currencies.
- **Google Sign-In API** – Enables users to sign in with their Google account.

## Installation

### Prerequisites
Before running the project, ensure you have the following installed:
- **Node.js** (LTS version recommended)
- **npm** or **yarn** (for package management)
- **Git** (to clone the repository)

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Yisaterese/URide.git
   cd URide

Install dependencies:
```bash
 npm install

Start the development server:

npm run dev

Open http://localhost:3000 in your browser to see the app.

