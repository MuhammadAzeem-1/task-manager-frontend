# 🚀 Quick Setup Guide

Follow these steps to get your Task Manager frontend up and running!

## Step 1: Create Environment File

Create a `.env.local` file in the `task-frontend` directory:

```bash
cd task-frontend
```

Create the file with this content:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Step 2: Install React Query Devtools (Optional)

If not already installed, add the devtools:

```bash
npm install @tanstack/react-query-devtools
```

## Step 3: Start the Backend

Make sure your NestJS backend is running:

```bash
cd ../nest-task_manager
npm run start:dev
```

Backend should be running on `http://localhost:3000`

## Step 4: Start the Frontend

In a new terminal, start the Next.js frontend:

```bash
cd task-frontend
npm run dev
```

Frontend will start on `http://localhost:3001` (or another available port)

## Step 5: Test the Application

1. **Open browser:** Navigate to `http://localhost:3001`

2. **Create an account:**
   - Click "Get Started" or "Sign Up"
   - Fill in your name, email, and password
   - You'll be automatically logged in and redirected to the dashboard

3. **Create a task:**
   - Click "Create Task" button
   - Fill in task details
   - Click "Create Task" to save

4. **Explore features:**
   - View dashboard with stats
   - Manage tasks (create, edit, delete)
   - Search and filter tasks
   - View your profile in the sidebar

5. **Test admin features (optional):**
   - Create an admin user in the backend
   - Login as admin
   - Access "Users" page from sidebar
   - View all users and tasks

## 🎯 Creating an Admin User

### Method 1: Using Prisma Studio
```bash
cd nest-task_manager
npx prisma studio
```
- Open browser at `http://localhost:5555`
- Navigate to User table
- Find your user and change role to "ADMIN"
- Save changes

### Method 2: Direct Database Query
```sql
-- Connect to your PostgreSQL database
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

## ✅ Verification Checklist

- [ ] Backend running on `http://localhost:3000`
- [ ] Frontend running on `http://localhost:3001`
- [ ] `.env.local` file created with correct API URL
- [ ] Can access landing page
- [ ] Can sign up new user
- [ ] Can login
- [ ] Can create tasks
- [ ] Can edit and delete tasks
- [ ] Dashboard shows correct stats
- [ ] (Admin) Can view users page

## 🐛 Common Issues

### Issue: "Failed to fetch" or Network Errors
**Solution:** 
- Check backend is running: `curl http://localhost:3000`
- Verify `.env.local` has correct URL
- Check browser console for errors

### Issue: "Unauthorized" errors
**Solution:**
- Clear localStorage: `localStorage.clear()` in browser console
- Log out and log back in
- Check if JWT token is valid in backend

### Issue: Page keeps redirecting
**Solution:**
- Clear browser cookies and localStorage
- Check middleware.ts is working correctly
- Restart both backend and frontend

### Issue: Styles not loading
**Solution:**
```bash
# Rebuild Tailwind CSS
npm run dev
# Or clear Next.js cache
rm -rf .next
```

## 📱 Test Scenarios

### Scenario 1: New User Flow
1. Visit homepage
2. Click "Get Started"
3. Sign up with credentials
4. Verify redirect to dashboard
5. Create first task
6. Edit the task
7. Mark as completed
8. Delete the task

### Scenario 2: Admin Flow
1. Login as admin user
2. View dashboard (see all tasks)
3. Navigate to Users page
4. View all registered users
5. Delete a test user
6. View tasks from multiple users

### Scenario 3: Access Control
1. Login as regular user
2. Try accessing `/dashboard/users` directly
3. Verify redirect or access denied
4. Create task
5. Logout
6. Try accessing `/dashboard` without login
7. Verify redirect to login

## 🎉 Success!

If you can complete the test scenarios above, your application is working perfectly!

## 📚 Next Steps

- Customize the UI colors and branding
- Add more features (due dates, priorities, categories)
- Implement user profile editing
- Add password reset functionality
- Deploy to production (Vercel, Netlify, etc.)

---

**Need help? Check the main README.md for detailed documentation!**

