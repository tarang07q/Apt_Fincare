# Apt_Fincare - Personal Finance Management System

![Finance GIF](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjBlZWt5dW5rNTFuNHY5aG9vdzJxYTdkeTV3emhhOTNjc3dndnJmayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7btPCcdNniyf0ArS/giphy.gif)

## Overview
Apt_Fincare is a comprehensive personal finance management system built with Next.js, MongoDB, and modern web technologies. It helps users track expenses, manage budgets, and gain insights into their financial health.


![image](https://github.com/user-attachments/assets/cd8bf841-cfe4-4beb-bd84-0e74aea3bccb)


## Key Features

### 1. User Authentication & Management
- Secure login and registration
- Password recovery functionality
- Profile management and customization



### 2. Budget Management
- Create and manage custom budgets
- Set budget alerts and thresholds
- Track budget progress with rollover support
- Flexible period-based budgeting (Daily/Weekly/Monthly/Quarterly/Yearly)

![image](https://github.com/user-attachments/assets/ff7229ef-7c9d-4d2c-bd91-e603ac4a9fcf)


### 3. Transaction Tracking
- Record expenses and income
- Organize transactions by categories
- Detailed transaction history
- Multiple payment method support
  
![image](https://github.com/user-attachments/assets/94a55e2f-4b5e-4b73-82aa-80f33cabba32)



### 4. Analytics & Reporting
- Visual expense breakdown
- Budget vs. Actual analysis
- Spending trend visualization
- Customizable financial reports

![image](https://github.com/user-attachments/assets/eccdd1df-2584-436c-ba50-3d29fa694296)

![image](https://github.com/user-attachments/assets/91d37083-7ddb-42fe-90c8-524680d8f176)


### 5. Dashboard & Overview
- Real-time financial summary
- Budget progress tracking
- Recent transaction display
- Alert notifications system

![image](https://github.com/user-attachments/assets/f30615b5-94ee-4dab-831a-1fbcae1a2166)


## Tech Stack
- **Frontend**: Next.js, TailwindCSS
- **Backend**: Node.js
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **State Management**: React Context/Hooks

## Project Structure
```
apt_fincare/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/
│   │   │   │   └── route.ts
│   │   │   ├── login-notification/
│   │   │   │   └── route.ts
│   │   │   └── register/
│   │   │       └── route.ts
│   │   └── notifications/
│   │       └── route.ts
│   ├── dashboard/
│   │   ├── transactions/
│   │   │   └── page.tsx
│   │   ├── budgets/
│   │   │   └── page.tsx
│   │   ├── analytics/
│   │   │   └── page.tsx
│   │   └── notifications/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   └── forgot-password/
│       └── page.tsx
├── components/
│   ├── ui/
│   │   ├── buttons/
│   │   ├── forms/
│   │   └── cards/
│   ├── auth-provider.tsx
│   ├── currency-provider.tsx
│   ├── theme-provider.tsx
│   └── ... (other components)
├── lib/
│   ├── utils/
│   │   └── ... (utility files)
│   ├── hooks/
│   │   └── ... (custom hooks)
│   └── mongodb.ts
├── models/
│   ├── user.ts
│   ├── notification.ts
│   ├── transaction.ts
│   ├── budget.ts
│   └── category.ts
├── public/
│   ├── images/
│   └── icons/
├── scripts/
│   └── ... (build or utility scripts)
├── styles/
│   └── globals.css
├── types/
│   └── index.ts
├── .env
├── .gitignore
├── next.config.mjs
├── package.json
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

### Directory Structure Overview

- **/app**: Next.js 13+ app directory containing routes and layouts
  - **/api**: Backend API routes including authentication endpoints
  - **/dashboard**: Main application pages and features
  
- **/components**: Reusable React components
  - **/ui**: Shared UI components like buttons, forms, and cards
  
- **/lib**: Utility functions and custom hooks
  - **/utils**: Helper functions and utilities
  - **/hooks**: Custom React hooks
  
- **/public**: Static assets like images and icons
  
- **/styles**: Global styles and CSS modules
  
- **/types**: TypeScript type definitions

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/tarang07q/Apt_Fincare.git
cd Apt_Fincare
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration
- Customize categories in `config/categories.ts`
- Modify theme settings in `tailwind.config.ts`
- Adjust authentication options in `pages/api/auth/[...nextauth].ts`

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Contact
Tarang Bhargava - [tarangbhargava09@gmail.com](mailto:tarangbhargava09@gmail.com)
Project Link: https://apt-fincare-4k4w.vercel.app/

## Acknowledgments
- Next.js Documentation
- TailwindCSS
- MongoDB Atlas
- NextAuth.js
