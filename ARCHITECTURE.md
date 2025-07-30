# 🏗️ System Architecture - Ramro E-commerce Platform

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [System Components](#system-components)
3. [Database Architecture](#database-architecture)
4. [Authentication & Security](#authentication--security)
5. [Search Architecture](#search-architecture)
6. [Payment Processing](#payment-processing)
7. [Real-time Features](#real-time-features)
8. [User Flow Diagrams](#user-flow-diagrams)
9. [Admin Flow Diagrams](#admin-flow-diagrams)
10. [Data Flow](#data-flow)
11. [Security Architecture](#security-architecture)
12. [Performance Considerations](#performance-considerations)
13. [Scalability](#scalability)

---

## Architecture Overview

**COMPREHENSIVE SYSTEM DESIGN**: This document provides complete architectural documentation for the Ramro e-commerce platform, covering all systems, flows, and integrations.

This comprehensive architecture documentation provides a complete technical overview of the Ramro e-commerce platform, covering all aspects from frontend components to backend services, security, and scalability considerations.

---

# 🗄️ **DATABASE ARCHITECTURE**

## **Firestore Collections Structure**

```mermaid
erDiagram
    USERS ||--o{ ORDERS : places
    USERS ||--o{ CARTS : owns
    USERS ||--o{ WISHLISTS : maintains
    USERS ||--o{ REVIEWS : writes
    
    PRODUCTS ||--o{ ORDER_ITEMS : contains
    PRODUCTS ||--o{ CART_ITEMS : includes
    PRODUCTS ||--o{ WISHLIST_ITEMS : saved_in
    PRODUCTS ||--o{ REVIEWS : receives
    PRODUCTS ||--o{ INVENTORY_LOGS : tracks
    
    ARTISANS ||--o{ PRODUCTS : creates
    CATEGORIES ||--o{ PRODUCTS : categorizes
    
    ORDERS ||--o{ ORDER_ITEMS : contains
    ORDERS ||--o{ PAYMENTS : processed_via
    
    USERS {
        string uid PK
        string email UK
        string displayName
        string role
        object preferences
        array addresses
        timestamp createdAt
        timestamp updatedAt
    }
    
    PRODUCTS {
        string id PK
        string name
        string description
        number price
        string image
        number quantityAvailable
        string category
        string sku UK
        number rating
        number reviewCount
        boolean featured
        string artisanId FK
        string artisan
        timestamp createdAt
        timestamp updatedAt
    }
    
    ARTISANS {
        string id PK
        string name
        string title
        string location
        string region
        number experience
        string profileImage
        string shortBio
        string story
        array specialties
        array techniques
        array values
        string culturalHeritage
        number familyMembers
        number rating
        boolean featured
        timestamp createdAt
        timestamp updatedAt
    }
    
    ORDERS {
        string id PK
        string userId FK
        string orderNumber UK
        array items
        object shipping
        object payment
        number total
        string status
        string paymentStatus
        timestamp createdAt
        timestamp updatedAt
    }
    
    CARTS {
        string userId PK
        array items
        timestamp updatedAt
    }
    
    WISHLISTS {
        string userId PK
        array productIds
        timestamp updatedAt
    }
    
    REVIEWS {
        string id PK
        string productId FK
        string userId FK
        number rating
        string comment
        boolean verified
        timestamp createdAt
    }
```

## **Security Rules Architecture**

```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Server-side admin verification
    function isAdmin() {
      return request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // User data access
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Product access (public read, admin write)
    match /products/{productId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Artisan access (public read, admin write)
    match /artisans/{artisanId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Order access (user owns order or admin)
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        (request.auth.uid == resource.data.userId || isAdmin());
      allow write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Cart access (user owns cart)
    match /carts/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Wishlist access (user owns wishlist)
    match /wishlists/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Reviews (public read, authenticated write)
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

---

# 💳 **PAYMENT PROCESSING ARCHITECTURE**

## **Razorpay Integration Flow**

```mermaid
sequenceDiagram
    participant Customer as Customer
    participant Frontend as Frontend
    participant Backend as Backend API
    participant Razorpay as Razorpay
    participant DB as Database
    participant Email as Email Service
    
    Customer->>Frontend: Initiate Checkout
    Frontend->>Backend: Create Order Request
    Backend->>Razorpay: Create Razorpay Order
    Razorpay->>Backend: Return Order ID
    Backend->>Frontend: Return Order Details
    
    Frontend->>Customer: Show Payment Interface
    Customer->>Razorpay: Complete Payment
    Razorpay->>Frontend: Payment Callback
    
    Frontend->>Backend: Verify Payment
    Backend->>Razorpay: Verify Signature
    Razorpay->>Backend: Confirm Payment
    
    Backend->>DB: Create Order Record
    Backend->>DB: Update Inventory
    Backend->>Email: Send Confirmation
    Backend->>Frontend: Payment Success
    Frontend->>Customer: Show Success Page
    
    Note over Razorpay, Backend: Webhook for additional security
    Razorpay->>Backend: Payment Webhook
    Backend->>DB: Update Payment Status
```

---

# 🔍 **SEARCH ARCHITECTURE**

## **Algolia Search Integration**

```mermaid
graph TB
    subgraph "Search Frontend"
        A[Search Input]
        B[Autocomplete]
        C[Filters]
        D[Results Display]
        E[Analytics Tracking]
    end
    
    subgraph "Algolia Service"
        F[Search API]
        G[Autocomplete API]
        H[Analytics API]
        I[Index Management]
    end
    
    subgraph "Backend Sync"
        J[Firebase Functions]
        K[Product Sync]
        L[Index Configuration]
        M[Bulk Operations]
    end
    
    subgraph "Data Sources"
        N[Firestore Products]
        O[Algolia Index]
        P[Search Analytics]
    end
    
    A --> F
    B --> G
    C --> F
    D --> F
    E --> H
    
    F --> O
    G --> O
    H --> P
    I --> O
    
    J --> K
    K --> O
    L --> I
    M --> O
    
    N --> J
    O --> D
    P --> E
```

## **Search Performance Metrics**
- **Response Time**: <500ms for instant search
- **Autocomplete**: <200ms for suggestions
- **Index Size**: Optimized for fast queries
- **Analytics**: Real-time search behavior tracking

## Data Flow

> **📝 Note**: To edit the data flow diagram, please modify the source file at `docs/diagrams/data-flow.md`

### **Real-time Data Synchronization**

The application implements sophisticated real-time data flow: