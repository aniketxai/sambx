# SAMBX - AI, Vision & Smart Hardware Engineering

A modern, fully responsive frontend-only website for SAMBX, a technology startup specializing in AI, computer vision, and smart hardware solutions. Built with Next.js, React, and Tailwind CSS.

## Features

### Pages
- **Home** - Hero section with animated features, featured products, and latest blog posts
- **About** - Company information, mission & vision, founder profile, and expertise showcase
- **Services** - Detailed service offerings with problem/solution/use case format
- **Products** - Product catalog with category filtering
- **Product Detail** - Individual product pages with features, tech stack, and use cases
- **Cart** - Shopping cart UI with quantity controls and order summary
- **Checkout** - Complete checkout form with shipping and payment UI
- **Blog** - Blog listing with category filtering
- **Single Blog Post** - Article layout with author info and related posts
- **Contact** - Contact form with business information and social links

### Design Features
- Fully responsive (mobile, tablet, desktop)
- Dark/Light mode toggle with persistent theme
- Smooth animations and transitions
- Premium, futuristic design inspired by SpaceX, Tesla, and DJI
- Glass morphism effects
- Hover states and micro-interactions
- Clean typography and spacing

### Technical Stack
- **Framework**: Next.js 13.5.1 with App Router
- **Language**: JavaScript (no TypeScript)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes for dark mode

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

## Project Structure

```
├── app/                      # Next.js app directory
│   ├── about/               # About page
│   ├── blog/                # Blog pages
│   │   └── [slug]/         # Dynamic blog post pages
│   ├── cart/                # Shopping cart page
│   ├── checkout/            # Checkout page
│   ├── contact/             # Contact page
│   ├── products/            # Products pages
│   │   └── [slug]/         # Dynamic product detail pages
│   ├── services/            # Services page
│   ├── layout.js            # Root layout with navbar/footer
│   ├── page.jsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── blog-card.jsx       # Blog card component
│   ├── footer.jsx          # Footer component
│   ├── navbar.jsx          # Navigation bar component
│   ├── product-card.jsx    # Product card component
│   ├── service-card.jsx    # Service card component
│   └── theme-provider.jsx  # Theme provider component
└── lib/
    ├── mockData.js         # Static mock data
    └── utils.js            # Utility functions
```

## Mock Data

All data is static and stored in `lib/mockData.js`:
- **Products** - 6 product items with complete details
- **Blog Posts** - 4 blog posts with full content
- **Services** - 4 service offerings
- **Cart Items** - Sample cart data

## Key Components

### Navbar
- Sticky navigation with scroll effects
- Mobile-responsive hamburger menu
- Dark mode toggle
- Cart icon with item count

### Footer
- Company information
- Navigation links
- Social media links
- Copyright information

### Product Card
- Product image with hover effects
- Status badge (Available, In Development, Prototype)
- Price and category
- View details button

### Blog Card
- Featured image
- Publication date and read time
- Category badge
- Excerpt with read more link

### Service Card
- Icon representation
- Problem/Solution/Use Case format
- Hover effects

## Color Scheme

The website uses a neutral color palette suitable for both light and dark modes:
- Light mode: Clean whites and grays
- Dark mode: Deep blacks with subtle highlights
- Accent: Primary brand colors

## Animations

- Fade-in animations on page load
- Slide-up animations for content sections
- Hover transformations on cards
- Smooth transitions between states
- Scroll-triggered navigation changes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

This is a **frontend-only** implementation. Features like:
- Form submissions
- Cart functionality
- Order processing
- Authentication
- Backend API calls

...are UI-only and display alerts when triggered. They will need to be connected to backend services for production use.

## Contact

- Email: sambx.tech@gmail.com
- GitHub: [github.com](https://github.com)
- Instagram: [instagram.com](https://instagram.com)

## License

All rights reserved © 2024 SAMBX
