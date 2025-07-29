# Ramro - Himalayan E-commerce Platform

## 🏔️ About Ramro

Ramro is a premium e-commerce platform showcasing authentic Himalayan products including handcrafted goods, organic foods, and traditional items. Our mission is to connect global customers with local Himalayan artisans while preserving cultural heritage and supporting sustainable communities.

## ✨ Features

### Core E-commerce
- **Smart Shopping Cart** - Persistent cart with quantity controls
- **Real-time Cart Sync** - Cart updates across browser tabs instantly
- **Product Catalog** - Advanced filtering and search
- **Multi-Currency Support** - USD, EUR, INR, NPR, CNY
- **Secure Checkout** - Multiple payment methods
- **User Accounts** - Profile management and order history

### Himalayan-Specific Features
- **Artisan Profiles** - Stories and backgrounds of local creators
- **Origin Verification** - GPS tracking and authenticity certificates
- **Cultural Context** - Educational content about products and regions
- **Multi-Language Support** - English, Hindi, Nepali, Tibetan
- **Seasonal Availability** - Weather and altitude-based product availability

### Technical Features
- **Progressive Web App** - Offline browsing capabilities
- **Responsive Design** - Optimized for all devices
- **Performance Optimized** - Fast loading with automatic image optimization
- **Accessibility Compliant** - WCAG 2.1 AA standards
- **Real-time Updates** - Live synchronization across sessions
- **Form Validation** - Comprehensive client-side validation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ramro.git
   cd ramro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Router** - Client-side routing
- **React Hook Form** - Form validation and management

### Backend & Services
- **Firebase** - Authentication and database
- **Razorpay** - Payment processing (Indian market focused)
- **Cloudinary** - Image management
- **Firebase Storage** - File storage with automatic image optimization

### Development Tools
- **ESLint** - Code linting
- **Cypress** - E2E testing
- **Vitest** - Unit testing
- **TypeScript** - Type safety (optional)

## 📁 Project Structure

For detailed architecture diagrams and flow charts, see [ARCHITECTURE_DIAGRAMS.md](ARCHITECTURE_DIAGRAMS.md).

```
ramro/
├── public/                 # Static assets
│   ├── images/            # Product and marketing images
│   └── favicon.ico        # Site favicon
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── AddToCartButton.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── RazorpayCheckout.jsx
│   │   ├── UserProfileEditor.jsx
│   │   └── ...
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── Cart.jsx
│   │   └── ...
│   ├── store/            # State management
│   │   ├── authStore.js
│   │   ├── cartStore.js
│   │   ├── inventoryStore.js
│   │   ├── reviewStore.js
│   │   └── ...
│   ├── data/             # Static data and configurations
│   │   └── seedProducts.js
│   ├── utils/            # Utility functions
│   │   ├── formatCurrency.js
│   │   ├── constants.js
│   │   └── costOptimization.js
│   ├── firebase/         # Firebase configuration
│   │   ├── firebase.js
│   │   ├── auth.js
│   │   └── collections.js
│   ├── services/         # External service integrations
│   │   ├── razorpayService.js
│   │   └── emailService.js
│   ├── config/           # Configuration files
│   │   └── razorpay.js
│   └── index.css         # Global styles
├── cypress/              # E2E tests
│   ├── e2e/              # Test specifications
│   ├── fixtures/         # Test data
│   └── support/          # Test utilities
├── .env.example          # Environment variables template
└── package.json          # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
```css
/* Organic Color System */
--organic-background: #FDFBF6    /* Soft off-white beige */
--organic-primary: #B97D4B       /* Warm earthy brown */
--organic-text: #333333          /* Dark charcoal grey */
--organic-highlight: #5E8C31     /* Muted natural green */
--organic-white: #FFFFFF         /* Pure white for contrast */
```

### Typography
- **Primary**: Inter (clean, international readability)
- **Display**: Playfair Display (elegant headers)
- **Cultural**: Noto Sans Devanagari (Hindi/Nepali support)

## 🧪 Testing

### Run E2E Tests
```bash
npm run cy:open
```

### Run Unit Tests
```bash
npm run test
```

### Run All Tests
```bash
npm run test:all
```

### Test Coverage
- User authentication flow
- Shopping cart functionality
- Real-time cart synchronization
- Product browsing and search
- Checkout process
- Form validation
- Payment processing
- Admin panel operations
- Accessibility compliance

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Performance Optimization
```bash
npm run optimize
```

### Cost Analysis
```bash
npm run cost-report
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure accessibility compliance
- Test real-time features thoroughly
- Optimize images before committing

## 🔧 Key Features Implementation

### Real-time Cart Synchronization
The cart automatically syncs across browser tabs using Firebase's onSnapshot feature, ensuring users have a consistent experience regardless of how many tabs they have open.

### Image Optimization
All product images are automatically optimized using Firebase Storage extensions, providing multiple sizes (400px, 600px, 800px) for different screen sizes and connection speeds.

### Form Validation
Comprehensive client-side validation using React Hook Form ensures data quality and provides immediate feedback to users.

### Accessibility
The application follows WCAG 2.1 AA guidelines with semantic HTML, proper ARIA attributes, keyboard navigation, and screen reader support.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Himalayan artisans and communities
- Open source contributors
- Cultural consultants and advisors
- Beta testers and early adopters

## 📞 Support

- **Email**: support@ramro.com
- **Documentation**: [docs.ramro.com](https://docs.ramro.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/ramro/issues)

---

Made with ❤️ for the Himalayan community