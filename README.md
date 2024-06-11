#STREET TADKA
# Food Ordering Application with Street Vendor Registration

Welcome to the Food Ordering Application! This project is built using the MERN stack and provides a platform for users to order food and for street vendors to register and manage their offerings.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This is a full-stack web application designed to facilitate food ordering from street vendors. It features separate front-end and back-end components, leveraging the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- **User Authentication:** Users can sign up, log in, and log out.
- **Vendor Registration:** Street vendors can register, create profiles, and manage their menus.
- **Food Ordering:** Users can browse available vendors, view menus, and place orders.
- **Order Management:** Vendors can view and manage incoming orders.
- **Responsive Design:** The application is mobile-friendly and responsive.

## Tech Stack

- **Frontend:**
  - React.js
  - Tailwind CSS
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
- **Others:**
  - JWT for authentication
  - Bcrypt for password hashing
  - Axios for HTTP requests

## Installation

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Clone the Repository

```bash
git clone https://github.com/umesh2407/Street-Tadka.git
cd Street-Tadka
```

### Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### Set Up Environment Variables

Create a `.env` file in the `backend` folder and add the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Usage

### Running the Backend Server

```bash
cd backend
npm start
```

The backend server will start on `http://localhost:5000`.

### Running the Frontend Server

In a separate terminal:

```bash
cd frontend
npm start
```

The frontend server will start on `http://localhost:3000`.

## Contributing

We welcome contributions to this project. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy coding! If you have any questions, feel free to open an issue or contact the project maintainers.