# User Flow Diagram

```mermaid
flowchart TD
    A[User Visits Site] --> B{Authenticated?}
    B -->|No| C[Browse Products]
    B -->|Yes| D[Personalized Experience]
    
    C --> E[Advanced Search]
    C --> F[Browse Categories]
    C --> G[View Artisan Profiles]
    
    E --> H[Instant Search Results]
    F --> I[Filtered Products]
    G --> J[Cultural Stories]
    
    H --> K[Product Detail Page]
    I --> K
    J --> L[Artisan's Products]
    L --> K
    
    K --> M[Add to Cart]
    K --> N[Add to Wishlist]
    K --> O[View Artisan Story]
    
    M --> P[Real-time Cart Update]
    N --> Q[Real-time Wishlist Update]
    
    P --> R{Continue Shopping?}
    R -->|Yes| C
    R -->|No| S[Proceed to Checkout]
    
    S --> T{Authenticated?}
    T -->|No| U[Login/Register]
    T -->|Yes| V[Checkout Process]
    
    U --> V
    V --> W[Shipping Information]
    W --> X[Payment Selection]
    X --> Y[Razorpay Payment]
    Y --> Z[Order Confirmation]
    Z --> AA[Email Notification]
    
    Q --> BB[Wishlist Management]
    BB --> CC[Move to Cart]
    CC --> P
```

## User Journey Notes

- **Discovery**: Multiple entry points (search, browse, artisan stories)
- **Real-time**: Cart and wishlist sync across all tabs
- **Cultural Connection**: Artisan stories integrated throughout
- **Seamless Checkout**: Streamlined payment with Razorpay
- **Trust Building**: Order confirmations and email notifications