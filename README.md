# Apt_Fincare - Personal Finance Management System

## Overview
Apt_Fincare is a comprehensive personal finance management system built with Next.js, MongoDB, and modern web technologies. It helps users track expenses, manage budgets, and gain insights into their financial health.

## Features

### 1. User Authentication & Management
- Secure login and registration
- Password recovery functionality
- Profile management and customization

### 2. Budget Management
- Create and manage custom budgets
- Set budget alerts and thresholds
- Track budget progress with rollover support
- Flexible period-based budgeting (Daily/Weekly/Monthly/Quarterly/Yearly)

### 3. Transaction Tracking
- Record expenses and income
- Organize transactions by categories
- Detailed transaction history
- Multiple payment method support

### 4. Analytics & Reporting
- Visual expense breakdown
- Budget vs. Actual analysis
- Spending trend visualization
- Customizable financial reports

### 5. Dashboard & Overview
- Real-time financial summary
- Budget progress tracking
- Recent transaction display
- Alert notifications system

## Tech Stack
- **Frontend**: Next.js, TailwindCSS
- **Backend**: Node.js
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **State Management**: React Context/Hooks

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

## License
This project is licensed under the MIT License - see the LICENSE file for details

## Contact
Your Name - [@your_twitter](https://twitter.com/your_twitter)
Project Link: [https://github.com/tarang07q/Apt_Fincare](https://github.com/tarang07q/Apt_Fincare)

## Acknowledgments
- Next.js Documentation
- TailwindCSS
- MongoDB Atlas
- NextAuth.js
