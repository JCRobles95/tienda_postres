# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a dessert shop (tienda de postres) application repository. The project appears to be in its initial setup phase with no codebase established yet.

## Development Setup

Since this is a new repository, the first step will be to establish the technology stack and project structure. Common patterns for dessert shop applications include:

### Potential Tech Stacks
- **Frontend**: React/Next.js, Vue.js, or Angular for customer interface
- **Backend**: Node.js/Express, Python/Django/Flask, or PHP/Laravel for order management
- **Database**: PostgreSQL, MySQL, or MongoDB for product catalog and orders
- **Payment**: Stripe, PayPal, or similar integration for transactions

### Common Development Commands
Once the tech stack is chosen, typical commands might include:

**Node.js/npm projects:**
```bash
npm install           # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm test             # Run tests
npm run lint         # Run linting
```

**Python projects:**
```bash
pip install -r requirements.txt  # Install dependencies
python manage.py runserver       # Start development server (Django)
python -m pytest                 # Run tests
python -m flake8                 # Run linting
```

**PHP projects:**
```bash
composer install     # Install dependencies
php artisan serve    # Start development server (Laravel)
php artisan test     # Run tests
```

## Project Architecture Considerations

For a dessert shop application, consider implementing these core modules:

### Core Business Logic
- **Product Management**: Catalog of desserts with pricing, ingredients, availability
- **Order Processing**: Shopping cart, checkout flow, order status tracking  
- **Customer Management**: User accounts, order history, preferences
- **Inventory Tracking**: Stock levels, ingredient management
- **Payment Processing**: Secure transaction handling

### Typical Application Structure
- **Frontend Components**: Product catalog, shopping cart, user authentication
- **API Layer**: RESTful or GraphQL endpoints for data operations
- **Database Schema**: Products, customers, orders, payments tables/collections
- **Business Logic**: Order validation, pricing calculations, inventory updates
- **External Integrations**: Payment gateways, email notifications

## Getting Started

1. **Choose Technology Stack**: Decide on frontend/backend frameworks based on requirements
2. **Set up Development Environment**: Install necessary tools and dependencies
3. **Design Database Schema**: Plan data models for products, orders, customers
4. **Implement Core Features**: Start with product catalog and basic ordering
5. **Add Advanced Features**: Payment processing, user accounts, admin panel

## Important Considerations

- **PCI Compliance**: If handling credit cards directly, ensure proper security measures
- **Data Privacy**: Implement proper customer data protection (GDPR compliance if applicable)
- **Performance**: Optimize for mobile devices as customers often browse on phones
- **Localization**: Consider Spanish language support based on project name
- **Image Optimization**: Dessert photos are crucial - implement proper image handling

This WARP.md will be updated as the project develops and the codebase structure becomes established.
