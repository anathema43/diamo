# Ramro - Himalayan E-commerce Platform

## 🏔️ About Ramro

Ramro is a premium e-commerce platform showcasing authentic Himalayan products including handcrafted goods, organic foods, and traditional items. Our mission is to connect global customers with local Himalayan artisans while preserving cultural heritage and supporting sustainable communities.

## ✨ Features

### Core E-commerce
- **Smart Shopping Cart** - Persistent cart with quantity controls
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
- **Performance Optimized** - Fast loading with optimized images
- **Accessibility Compliant** - WCAG 2.1 AA standards
- **Enterprise Security** - Server-side role verification and secure file uploads
- **Real-time Synchronization** - Cross-tab cart and wishlist updates
- **Real-time Synchronization** - Cross-tab cart and wishlist updates
- **Data Integrity** - Single source of truth architecture
- **Image Optimization** - Responsive images with multiple sizes and lazy loading
- **Testing Foundation** - Unit tests and store tests implemented

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

### Backend & Services
- **Firebase** - Authentication and database
- **Razorpay** - Payment processing (Indian market focused)
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
│   │   ├── apiService.js
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
- Product browsing and search
- Checkout process
- Payment processing
- Admin panel operations
- Accessibility compliance
- Security validation
- Input sanitization
- File upload security

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
- Follow security best practices
- Validate all user inputs

## 🔒 Security Features

### Enterprise-Grade Security
The application implements comprehensive security measures including server-side role validation, strict file upload controls, and input sanitization to prevent common attack vectors.

### Data Integrity
Single source of truth architecture ensures data consistency across all application components, eliminating conflicts between static and dynamic data sources.

### Access Control
Role-based access control with server-side validation prevents unauthorized access to administrative functions and sensitive data.

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