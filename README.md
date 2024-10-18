# Atlan Goods Application - Backend

## Overview

Atlan Goods Application backend is built to handle complex logistics operations like booking management, driver assignments, and real-time tracking. It is designed for scalability and handling several requests. The backend includes role-based access for customers, drivers, and admins.

<p align="center">
  <img src="https://github.com/rishn/Atlan-Engineering-Internship-Task/blob/main/public/background2.png" alt="Image" />
</p>

### Deployed Link
[View the live site here](https://atlangoodsapplication.onrender.com) 

### Video Explanation
[View the explanation video here](https://drive.google.com/file/d/1jl3SyXi_6MKU0wrjauBNj-_ufbozkWxM/view?usp=sharing)

### Demo Videos

[Customer Demo Large](https://drive.google.com/file/d/11eqpj6rgl38MQGEf4spjDuZQw_aRzokh/view?usp=sharing)

https://github.com/user-attachments/assets/a87174ba-3ad1-4c47-ab46-1c574c0c195f

[Driver Demo Large](https://drive.google.com/file/d/1Db3AQhoqDR3Q75bCgTLdi2UCpIOQ1waO/view?usp=sharing)

https://github.com/user-attachments/assets/7a257835-810a-418c-8ae9-90fb92b569e0

https://github.com/user-attachments/assets/1cc1bea9-3bce-47c5-82b9-3e719c087c1a

https://github.com/user-attachments/assets/e9fb5c29-4832-42d7-ba6e-caa8cc841269

---

## Challenge

The backend needed to handle **real-time updates** for both driver and booking management, including **GPS tracking** and **notifications**. The goal was to design a scalable API that supports **JWT authentication** and secure data management.

---

## Features

### 1. Customers
- **Manage Bookings**: Create, update, and cancel bookings.
- **Real-time Notifications**: Get updates on driver assignments and movements.

### 2. Drivers
- **Receive Booking Requests**: Accept or reject bookings based on availability.
- **Track Bookings**: View and manage active bookings and past history.

### 3. Admins
- **Analytics**: Monitor driver performance and platform activity.
- **Driver & Vehicle Management**: View, update, and manage driver and vehicle data.
- **Booking Management**: Full control over booking creation, modification, and deletion.

---

## Tech Stack

- **Node.js & Express.js**: For handling API requests and routing.
- **MongoDB**: NoSQL database for storing bookings, users, and driver data.
- **JWT Authentication**: Used for secure access and route protection.
- **Socket.IO**: For real-time notifications and driver tracking.
- **Fuzzy Logic**: Implemented for price calculation based on distance, vehicle type, and weight.

---

## Screenshots

### Finding Driver
<p align="center">
  <img src="https://github.com/rishn/Atlan-Engineering-Internship-Task/blob/main/outputs/finding_driver.png" alt="Finding Driver" />
</p>

### Analytics Dashboard
<p align="center">
  <img src="https://github.com/rishn/Atlan-Engineering-Internship-Task/blob/main/outputs/analytics.png" alt="Analytics" />
</p>

---

## Documentation
[Please find documentation about the project here](https://drive.google.com/file/d/1g1hRTB8srE38dhVV7SR0mOsBzyyiw6LT/view?usp=sharing)

## Diagrams

### ER Diagram
<p align="center">
  <img src="https://github.com/rishn/Atlan-Engineering-Internship-Task/blob/main/diagrams/er_diagram.png" alt="ER Diagram" />
</p>

### Flow Diagram
<p align="center">
  <img src="https://github.com/rishn/Atlan-Engineering-Internship-Task/blob/main/diagrams/flow_diagram.png" alt="Flow Diagram" />
</p>

### HL Diagram
<p align="center">
  <img src="https://github.com/rishn/Atlan-Engineering-Internship-Task/blob/main/diagrams/hl_diagram.png" alt="HL Diagram" />
</p>


---