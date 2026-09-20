# ZYROO Local Delivery

A frontend prototype of a local delivery and logistics management platform, built for the ZYROO Frontend Development Internship. It simulates order creation, rider assignment, live delivery tracking, and role-based dashboards for Business, Rider, and Customer users — all powered by mock data (no backend).

## Live Roles

The app supports three user roles, selected at login:

- **Business** — creates orders, assigns riders, edits or cancels orders
- **Rider** — accepts assigned deliveries and updates delivery status
- **Customer** — views their own current and past orders, tracks delivery status

## Features

### Week 1 — Frontend MVP
- Landing page with hero section and feature highlights
- Dashboard with order statistics (total, pending, in delivery, completed)
- Orders list with status badges
- Order details page
- Customer delivery tracking by order ID
- Fully responsive layout (desktop + mobile)

### Week 2 — Progress
- Login and logout
- Role-based views for Business, Rider, and Customer
- Role-aware navigation bar

### Week 3 — Order & Delivery Management
- **Create Order** — Business users can create new orders with customer info, pickup/delivery addresses, package details, priority, and payment method
- **Edit Order** — update basic order details after creation
- **Assign Rider** — Business users assign a rider to a pending order
- **Cancel Order** — cancel an order with a confirmation prompt
- **Rider Dashboard** — riders see their deliveries grouped into Today's, Pending, Active, and Completed
- **Delivery Status Updates** — riders move an order through Accept → Picked Up → In Transit → Delivered
- **Customer Orders** — customers see their current and previous orders and can check status
- **Delivery Timeline** — visual progress tracker on the order details page (Pending → Assigned → Accepted → Picked Up → In Transit → Delivered)
- **Persistent mock data** — orders, riders, and login state are saved to `localStorage`, so changes survive a page refresh

## Tech Stack

- React
- React Router
- Context API (auth state + orders state)
- CSS (no framework)
- Vite

# Install dependencies
npm install

# Start the development server
npm run dev


## Demo Walkthrough

To see the full order lifecycle:

1. Go to `/login`, log in as **Business** (any name).
2. Go to **Orders → + Create Order** and submit a new order.
3. Open the new order and **Assign a Rider** (use one of: `Hamza`, `Bilal`, `Zeeshan`).
4. Log out, log back in as **Rider** using that exact rider name.
5. On the Rider Dashboard, walk the order through **Accept → Picked Up → Start Transit → Delivered**.
6. Log out, log back in as **Customer** using the order's customer name.
7. View the order under **My Orders** and check its final status and timeline.

## Project Structure

zyroo-local-delivery/
├── public/
├── screenshots/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── StatCard.jsx
│   │   └── StatusBadge.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── OrdersContext.jsx
│   ├── data/
│   │   └── orders.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Orders.jsx
│   │   ├── CreateOrder.jsx
│   │   ├── EditOrder.jsx
│   │   ├── OrderDetails.jsx
│   │   ├── TrackDelivery.jsx
│   │   ├── RiderDashboard.jsx
│   │   ├── CustomerOrders.jsx
│   │   └── Login.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── README.md
├── package.json
└── .gitignore

## Notes

This is a frontend-only prototype built with mock data — there is no real backend, database, authentication, or payment processing. Login is a simple role-picker used to demonstrate role-based views, and all data resets if `localStorage` is cleared.

## Author

Abdur Rahman — ZYROO Frontend Development Internship