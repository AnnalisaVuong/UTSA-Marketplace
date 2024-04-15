# UTSA-Marketplace
This marketplace facilitates buying and selling among UTSA students, providing a convenient and secure environment for transactions

## Docker [RECOMMENDED FOR THE GRADER]
This application can be run through docker.  With docker installed, clone the project, change into the UTSA_Marketplace directory and run:
```
docker compose up --build -d
```
to detach from the instances.\
Or run:
```
docker compose up --build
```
To run and see output on the command line.

## Installation and Running Instructions

To install and run this project locally, follow these steps:

### 1. Clone the Project
```
git clone https://github.com/AnnalisaVuong/UTSA-Marketplace.git
```

### 2. Navigate to the Backend Directory and Install Dependencies
```
cd <project-directory>/backend
pip install -r requirements.txt
make sure main.py is the current file and then execute main.py
```

### 3. Navigate to the frontend Directory and Install Dependencies
```
cd ../frontend
npm install
```
### 4. Run the Development Server
```
npm run dev
```
