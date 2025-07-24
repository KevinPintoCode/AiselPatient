🩺 AiselCase – Patients Management System
Full-stack web application to manage patient records using a secure login system.

Built with:

Backend: NestJS + JWT Auth

Frontend: Next.js (App Router) + Tailwind + RTK Query

📦 1. Clone the Repository
git clone https://github.com/KevinPintoCode/AiselPatient
cd AiselPatient

🛠️ 2. Set Up & Run Locally
✅ Backend (NestJS)
cd backend
npm install

# Development
npm run start:dev

# .env file example (create one if needed)
# .env
PORT=3000
JWT_SECRET=supersecret
API will be available at:
http://localhost:3000

💻 Frontend (Next.js)
bash
cd ../frontend
npm install

# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000

# Run frontend
npm run dev
App will be available at:
http://localhost:3001 (or 3000 if running frontend only)

🚀 3. Deployed App
🌐 Frontend: https://aisel-case.vercel.app

🧠 Backend: https://aiselpatient-production.up.railway.app

🔐 Test Users !!IMPORTANT
Role	Username	Password
Admin	admin	admin
User	user	user