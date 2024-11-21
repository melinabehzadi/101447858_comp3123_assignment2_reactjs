# **Employee Management System** 🧑‍💼👩‍💻

## **📜 Project Overview**
This project is a **Full-Stack Employee Management System** built for managing employees in a professional environment. The primary goal of this assignment is to demonstrate **full-stack development skills** by creating a functional, aesthetically pleasing application with proper validation and deployment.

The system allows users to:
- **Sign up** and **log in** securely. 🔐  
- **Add, view, update, delete, and search employees** efficiently. 📋  
- Leverage **professional UI/UX design** using Material UI. 🎨

This project is **deployed using Docker Compose**, ensuring easy setup and scalability.

---

## **⚙️ Features**
### **Authentication** 🔑
- **Signup**: Users can create an account with proper validations.  
- **Login/Logout**: Authenticated users can log in and securely access the app.

### **Employee Management** 🗂️
- **Add Employee**: Add new employees with details like name, position, department, and email.  
- **View Employee**: View detailed information about an employee.  
- **Update Employee**: Edit employee details.  
- **Delete Employee**: Remove employees from the system.  
- **Search Employees**: Search by department or position for quick filtering.  

### **UI/UX** ✨
- Fully responsive and professional design using **Material UI**.  
- Consistent theme and user-friendly interface.  

---

## **🚀 How to Run the Project**
This project is configured with **Docker Compose** to simplify running both the backend and frontend. Follow these steps:

### **Prerequisites**  
- Ensure Docker and Docker Compose are installed on your system. 🐳  
- Clone the repository:  
  ```bash
  git clone https://github.com/your-username/your-repository.git
  cd your-repository

Run the Project
Start the application with Docker Compose:

docker-compose up --build
Access the application at http://localhost:3000.

Stop the Application
To stop the running containers, use:

docker-compose down
🛠️ Technologies Used

Frontend 🌐
React.js
Material UI
Axios for API calls.
Backend ⚙️
Node.js with Express.js
MongoDB for database management.
JWT Authentication with bcrypt for secure login.
Deployment 🚀
Docker Compose for backend and frontend orchestration.
📝 Validations

Form Validation: Proper error messages are displayed for empty fields, invalid email formats, etc.
Server Validation: The backend handles invalid requests securely.


🧪 API Endpoints

Authentication
POST /auth/signup - User Signup.
POST /auth/login - User Login.
Employee Management
GET /employees - List all employees.
POST /employees - Add a new employee.
GET /employees/:id - Get employee by ID.
PUT /employees/:id - Update employee.
DELETE /employees/:id - Delete employee.
GET /employees/search - Search employees by department or position.
