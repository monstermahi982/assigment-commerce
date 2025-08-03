# 🛍️ e-commerce - Modern E-Commerce Platform

A full-featured e-commerce website built with Next.js 15, React 19, GraphQL, and Redux Toolkit. Features product listings, search, filtering, cart management, checkout process, and user authentication.

![E-Commerce](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Integration](#-api-integration)
- [Key Features Explained](#-key-features-explained)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### 🛒 **E-Commerce Core**

- **Product Catalog**: Browse products with infinite scroll
- **Product Details**: Detailed product pages with variants
- **Search & Filtering**: Advanced search with attribute filters
- **Shopping Cart**: Persistent cart with quantity management
- **Checkout Process**: Multi-step checkout (Shipping → Payment → Confirmation)
- **User Authentication**: Login/logout with JWT tokens

### 🎨 **UI/UX Features**

- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme switching capability
- **Animations**: Smooth transitions with Framer Motion
- **Toast Notifications**: User feedback system
- **Loading States**: Skeleton loaders and spinners
- **Infinite Scroll**: Lazy loading for product lists
- **Image Optimization**: Lazy loading and optimization

### 🔧 **Technical Features**

- **GraphQL Integration**: graphql e-commerce backend
- **State Management**: Redux Toolkit with persistence
- **Form Handling**: React Hook Form with Zod validation
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized with Next.js 15 features

## 🛠️ Tech Stack

### **Frontend Framework**

- **Next.js 15.4.5** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.0** - Type-safe development

### **Styling & UI**

- **Tailwind CSS 4.0** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Radix UI** - Accessible UI primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### **State Management**

- **Redux Toolkit** - Modern Redux with RTK Query
- **React Redux** - React bindings for Redux
- **Redux Persist** - State persistence

### **Forms & Validation**

- **React Hook Form** - Performant forms
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation resolvers

### **Backend Integration**

- **GraphQL** - API query language

### **Development Tools**

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundler (development)

## 📁 Project Structure

```
e-commerce/
├── app/                          # Next.js App Router
│   ├── cart/                     # Shopping cart page
│   ├── checkout/                 # Checkout process
│   ├── login/                    # Authentication page
│   ├── products/                 # Product pages
│   │   └── [slug]/              # Dynamic product detail pages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx          # Navigation header
│   │   └── Footer.tsx          # Site footer
│   ├── products/               # Product-related components
│   │   ├── ProductCard.tsx     # Product display card
│   │   └── ProductFilters.tsx  # Filter sidebar
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx         # Button component
│   │   ├── input.tsx          # Input component
│   │   ├── toast.tsx          # Toast notifications
│   │   └── ...                # Other UI components
│   └── GlobalLoader.tsx       # Global loading component
├── store/                      # Redux store configuration
│   ├── slices/                # Redux slices
│   │   ├── authSlice.ts       # Authentication state
│   │   ├── cartSlice.ts       # Shopping cart state
│   │   ├── productsSlice.ts   # Products state
│   │   └── loaderSlice.ts     # Loading states
│   ├── provider.tsx           # Redux provider
│   └── store.ts               # Store configuration
├── lib/                       # Utility functions
│   ├── hooks.ts              # Custom React hooks
│   └── utils.ts              # Utility functions
├── hooks/                     # Additional hooks
│   └── use-toast.ts          # Toast notification hook
├── public/                    # Static assets
├── package.json              # Dependencies and scripts
├── next.config.ts            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18.17 or later
- npm, yarn, or pnpm package manager
- Git

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/monstermahi982/assigment-commerce
   cd assigment-commerce
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration (see Environment Variables section)

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# GraphQL API Configuration
NEXT_PUBLIC_BASE_URL=YOUR-PRODUCTION-URL
# or for local development:
# NEXT_PUBLIC_BASE_URL=http://localhost:8000
```

## 🔌 API Integration

### **GraphQL Endpoint**

The application connects to a graphql e-commerce backend:

- **Production**: `USE-YOUR-PRODUCTION-URL`
- **Development**: `http://localhost:8000/graphql/`

### **Key GraphQL Queries**

- **Products**: Fetch product catalog with pagination
- **Product Details**: Get individual product information
- **Cart Operations**: Add/remove items, update quantities
- **Checkout**: Create and manage checkout sessions

## 🎯 Key Features Explained

### **1. Product Catalog with Infinite Scroll**

- **Location**: `app/products/page.tsx`
- **Features**:
  - Infinite scroll pagination
  - Search functionality
  - Attribute-based filtering
  - Grid/List view toggle
  - Lazy image loading

### **2. Shopping Cart Management**

- **Location**: `app/cart/page.tsx`
- **Features**:
  - Persistent cart state
  - Quantity adjustments
  - Remove items
  - Price calculations
  - Cart summary

### **3. Multi-Step Checkout**

- **Location**: `app/checkout/page.tsx`
- **Steps**:
  1. **Shipping Information**: Address and delivery options
  2. **Payment**: Credit card and payment methods
  3. **Confirmation**: Order summary and confirmation

### **4. User Authentication**

- **Location**: `app/login/page.tsx`
- **Features**:
  - JWT token authentication
  - Persistent login state
  - Protected routes
  - User profile management

### **5. State Management**

- **Redux Slices**:
  - `authSlice.ts`: User authentication state
  - `cartSlice.ts`: Shopping cart operations
  - `productsSlice.ts`: Product catalog and search
  - `loaderSlice.ts`: Global loading states

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Additional commands
npm run type-check   # TypeScript type checking
npm run clean        # Clean build artifacts
```

## 🚀 Deployment

### **Vercel (Recommended)**

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### **Other Platforms**

- **Netlify**: Configure build settings for Next.js
- **Railway**: Deploy with automatic environment detection
- **Docker**: Use provided Dockerfile for containerized deployment

### **Environment Variables for Production**

Ensure all required environment variables are set in your deployment platform:

- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_AUTH_SECRET`

## 🎨 Customization

### **Styling**

- **Tailwind CSS**: Modify `tailwind.config.js` for custom design system
- **Theme**: Update color schemes in `globals.css`
- **Components**: Customize shadcn/ui components in `components/ui/`

### **Features**

- **Payment**: Integrate additional payment gateways
- **Analytics**: Add Google Analytics or other tracking
- **SEO**: Enhance meta tags and structured data
- **Performance**: Implement additional optimizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**

- Follow TypeScript best practices
- Use conventional commit messages
- Ensure all tests pass
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Vercel** for the amazing Next.js framework
- **Tailwind CSS** for the utility-first styling approach

## 📞 Support

If you have any questions or need help:

- Create an issue on GitHub
- Check the documentation
- Join our community discussions

---

**Built with ❤️ using Next.js, React, and modern web technologies**
