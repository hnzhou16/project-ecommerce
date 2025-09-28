# E-Commerce Platform - Frontend

A modern, responsive e-commerce platform built with React that provides a seamless shopping experience with advanced features including AI-powered product recommendations and integrated payment processing.

**Live Demo**: [https://hugzest.com/](https://hugzest.com/)

## Features

### User Experience

- **User registration**: User registration with email validation
- **User Authentication**: Secure login and registration system with JWT token management
- **Input Validation**: Client-side validation with server-side verification
- **User Profiles**: Personal account management with order history and preferences
- **Shopping Cart**: Persistent shopping cart with real-time updates and quantity management

### Product Management

- **Product Catalog**: Browse extensive product collections with detailed information and images
- **Product Filtering**: Advanced search functionality with category, size, material and price filters
- **Product Details**: Comprehensive product pages with specifications and reviews 
- **Product Carousel**: Interactive image galleries with smooth navigation

### Shopping Features

- **Shopping Bag**: Add, remove, and modify items with real-time price calculations
- **Checkout Process**: Streamlined multi-step checkout with address and payment information

### Payment Integration

- **PayPal Integration**: Secure payment processing with PayPal REST SDK

### AI-Powered Features

- **Product Recommendations**: AI-driven product suggestions based on user inputs

### Interactive Features

- **Google Maps Integration**: Address autocomplete 

### Security Features

- **Environment Variables**: Sensitive data stored in environment variables

## Tech Stack

- **Frontend Framework**: React
- **State Management**: Redux with Redux Thunk
- **Routing**: React Router DOM for navigation
- **Styling**: Sass for advanced styling capabilities
- **HTTP Request**: Fetch for API communication
- **Address Autocomplete**: Google Maps API integration
- **Payment**: PayPal REST SDK integration

## Project Structure

```
project-ecommerce/
├── public/                   # Static assets and HTML template
├── src/                      # Source code
│   ├── components/           # React components
│   │   ├── AI/              # AI-powered features
│   │   ├── checkout/        # Checkout process components
│   │   ├── login/           # Authentication components
│   │   ├── main/            # Main layout and navigation
│   │   ├── mybag/           # Shopping cart components
│   │   ├── pages/           # Page components
│   │   ├── product/         # Product display components
│   │   ├── shared/          # Reusable UI components
│   │   └── consts.js        # Application constants
│   ├── redux/               # Redux store and state management
│   ├── assets/              # Images, icons, and static resources
│   ├── App.js               # Main application component
│   ├── App.css              # Global application styles
│   ├── index.js             # Application entry point
│   └── index.css            # Global CSS styles
├── package.json             # Dependencies and scripts
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

## Integrations
- **Google Maps API**: Address autocomplete 
- **PayPal REST SDK**: Payment processing
- **OpenAI Integration**: AI-powered features (via backend)

