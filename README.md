# FinTrack+

Welcome to **FinTrack+**! This is a secure, unified financial management platform designed to help individuals manage their finances responsibly while aligning with their sustainability goals.

![localhost_3000_about](https://github.com/user-attachments/assets/ea5f985a-0c64-49bd-ae19-27e197ac7279)

## 🌿 Vision
Empowering individuals to take control of their finances by providing a secure, simple, and sustainable platform that helps them make informed financial decisions, align with their values, and contribute to sustainable development.

## 🚀 Features
### Core Features
- **User Authentication** – Secure login and signup using NextAuth.js with JWT-based sessions.
- **Expense Tracking** – Log expenses with assigned categories (Food, Entertainment, Bills, etc.).
- **Transaction History** – View past transactions with filters and search functionality.
- **Category-Based Analytics** – Visualize spending habits with interactive charts.
- **Secure Data Storage** – Encrypted financial data for privacy and security.
- **Budget Management** – Set spending limits and receive alerts when exceeding limits.
- **Responsive Dashboard** – Mobile-friendly UI for easy access.

## 🏗️ Tech Stack
### Frontend:
- **Next.js** – React framework for server-side rendering and static generation.
- **Tailwind CSS** – Utility-first CSS framework for responsive UI.
- **Lucide Icons** – Modern icon library for UI elements.
- **Recharts (Optional)** – Data visualization for expense analytics.

### Backend:
- **Next.js API Routes** – Server-side functions for handling transactions.
- **Node.js & Express (Optional)** – If using a separate backend service.

### Additional Tools:
- **Zustand/Redux (Optional)** – State management for global data handling.
- **dotenv** – Environment variable management for security.
- **shadcn** – Used for specific components like buttons and sheets.

## 🔄 How It Works
### User Authentication
- Users sign up or log in securely via NextAuth.js.
- Authentication tokens (JWT) are used to maintain sessions.

### Dashboard & UI
- Users land on a dashboard displaying financial insights.
- Expenses are categorized (e.g., Food, Entertainment, Bills).

### Expense Tracking
- Users input expenses, selecting a category and payment source.
- Data is saved to MongoDB via Next.js API routes.

### Transaction History
- Users view past transactions with filters (date, category, amount).
- Data is fetched from the database and displayed in a table.

### Analytics & Reports
- **Recharts** visualizes spending trends in graphs and charts.
- Users can track total spending by category over time.

### Budget Management (Optional)
- Users set spending limits for each category.
- Alerts notify when spending exceeds limits.

### Security & Data Protection
- User data is encrypted and stored securely in MongoDB.
- Multi-factor authentication (MFA) can be added for extra security.


## Screenshots
- ## Home Page
![image](https://github.com/user-attachments/assets/3cf97dde-3da3-4120-be0a-151e32697bad)
- ## Sign Up Page
![image](https://github.com/user-attachments/assets/96279d7c-baa3-4da2-a0ec-f26df75a8eb3)
- ## Sign In Page
![image](https://github.com/user-attachments/assets/d06faca0-cfad-43c9-99e1-9e9b7b44e203)
- ## Dashboard
![image](https://github.com/user-attachments/assets/ccf2d643-f4bc-4740-be28-a0a5281e02d9)
- ## Banks
![image](https://github.com/user-attachments/assets/cce5415e-07b6-4ecf-91bb-385dc8771b76)
- ## Transactions 
![image](https://github.com/user-attachments/assets/ceef0946-4f4f-4b3c-ba7b-37eb94023a31)
- ## Transfer Funds
![image](https://github.com/user-attachments/assets/462b2fef-a4cc-49bf-809d-b5928f942904)
- ## Profile
![image](https://github.com/user-attachments/assets/494eb8bf-de70-4a76-9fb4-e1ed02c2b2ac)
- ## Settings



## 📦 Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/tarang07q/fintrack-plus.git
    ```
2. Navigate to the project directory:
    ```bash
    cd project
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables in a `.env` file:
    ```env
    NEXTAUTH_URL=http://localhost:3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```
5. Run the development server:
    ```bash
    npm run dev
    ```
6. Access the application at `http://localhost:3000`.

## 📚 Contributing
We welcome contributions from developers, financial experts, and privacy advocates! To contribute:
- Fork the repository.
- Create a new branch.
- Submit a pull request.

## 📧 Contact
For any inquiries, feel free to reach out via GitHub Issues or email at tarangbhargava09@gmail.com.

---

**Let's build a secure, sustainable financial future together!**

