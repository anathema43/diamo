# System Architecture Diagram

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React 19 + Vite]
        B[Tailwind CSS]
        C[Zustand State Management]
        D[React Router]
        E[Component Library]
    end
    
    subgraph "Authentication"
        F[Firebase Auth]
        G[Google OAuth]
        H[Email/Password]
    end
    
    subgraph "Database Layer"
        I[Firestore]
        J[Security Rules]
        K[Real-time Listeners]
    end
    
    subgraph "External APIs"
        L[Razorpay Payment Gateway]
        M[Algolia Search Service]
        N[Cloudinary Media Management]
        O[Email Service Provider]
    end
    
    subgraph "Data Storage"
        P[Firebase Storage]
        Q[Algolia Search Index]
        R[Cloudinary CDN]
    end
    
    subgraph "Backend Services"
        S[Firebase Functions]
        T[Payment Processing]
        U[Email Notifications]
        V[Search Indexing]
    end
    
    A --> F
    A --> I
    A --> L
    A --> M
    A --> N
    
    F --> H
    F --> G
    
    I --> J
    I --> K
    
    S --> T
    S --> U
    S --> V
    
    M --> Q
    N --> R
    
    L --> T
    O --> U
    I --> V
```

## Architecture Notes

- **Frontend**: Modern React 19 with Vite build system
- **State Management**: Zustand with real-time Firebase integration
- **Authentication**: Firebase Auth with multiple providers
- **Database**: Firestore with comprehensive security rules
- **Search**: Algolia for professional search capabilities
- **Media**: Cloudinary for optimized image delivery
- **Payments**: Razorpay for Indian market payment processing
- **Real-time**: Firebase onSnapshot for live updates