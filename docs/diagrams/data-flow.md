# Data Flow Diagram

```mermaid
sequenceDiagram
    participant User as User
    participant Frontend as Frontend
    participant Firestore as Firestore
    participant Algolia as Algolia Search
    participant Cloudinary as Cloudinary
    participant Razorpay as Razorpay
    participant Functions as Firebase Functions
    
    Note over User, Functions: Product Discovery Flow
    User->>Frontend: Search for products
    Frontend->>Algolia: Instant search query
    Algolia->>Frontend: Search results with facets
    Frontend->>User: Display results with filters
    
    Note over User, Functions: Real-time Cart Flow
    User->>Frontend: Add to cart
    Frontend->>Firestore: Update cart document
    Firestore->>Frontend: onSnapshot update
    Frontend->>User: Real-time cart sync
    
    Note over User, Functions: Admin Product Management
    User->>Frontend: Upload product image
    Frontend->>Cloudinary: Image upload with optimization
    Cloudinary->>Frontend: Optimized image URLs
    Frontend->>Firestore: Save product with image
    Firestore->>Functions: Trigger product sync
    Functions->>Algolia: Index product for search
    
    Note over User, Functions: Payment Processing
    User->>Frontend: Initiate checkout
    Frontend->>Functions: Create order request
    Functions->>Razorpay: Create payment order
    Razorpay->>Frontend: Payment interface
    User->>Razorpay: Complete payment
    Razorpay->>Functions: Payment webhook
    Functions->>Firestore: Update order status
    Functions->>User: Email confirmation
```

## Data Flow Notes

- **Real-time Updates**: Firestore onSnapshot for live synchronization
- **Search Integration**: Automatic product indexing to Algolia
- **Media Optimization**: Cloudinary for responsive image delivery
- **Secure Payments**: Razorpay with webhook verification
- **Email Notifications**: Automated order confirmations