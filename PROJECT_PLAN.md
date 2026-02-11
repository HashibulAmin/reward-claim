# Reward Claim Web App - Google Antigravity Agent Plan

## Project Overview
A delightful reward claiming web app with animated graphics (gift, balloons, kitty), user data collection, Firebase integration, and admin dashboard. Built using Google Antigravity's multi-agent orchestration for parallel development.

**Platform**: Google Antigravity IDE (Agent-First Development)  
**Primary AI Model**: Gemini 3 Pro (with Deep Think for complex tasks)  
**Alternative Models**: Claude Sonnet 4.5, GPT-OSS-120B

---

## Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations  
- **Lottie React** - Complex animations (gift, balloons, kitty)
- **React Router v6** - Navigation
- **React Hook Form** + **Zod** - Form management & validation
- **Firebase** - Auth + Firestore database
- **React Confetti** - Celebration effects
- **Date-fns** - Date utilities
- **React Hot Toast** - Notifications

---

## Antigravity-Specific Approach

### Agent Orchestration Strategy

Google Antigravity allows you to run **multiple agents in parallel** via the Manager View. For this project, we'll use:

1. **Setup Agent** - Project initialization, dependencies, config
2. **Animation Agent** - All animation components (Gift, Balloons, Kitty, Button, Confetti)
3. **Form Agent** - Claim form, validation, time slot logic
4. **Firebase Agent** - Database schema, integration, security rules
5. **Dashboard Agent** - Admin login, dashboard, claims table
6. **Testing Agent** - Browser automation to test the complete flow

### Key Antigravity Features We'll Use

- **Artifacts**: Each agent generates Plans, Implementation Plans, Screenshots, Browser Recordings
- **Manager View**: Orchestrate multiple agents working simultaneously
- **Browser Subagent**: Automatically test UI flows and verify functionality
- **Skills/Knowledge Base**: Save reusable patterns for animations and Firebase queries
- **Deep Think Mode**: Enable for complex Firebase security rules and form validation logic
- **Cascade Flow**: Natural language feature requests that cascade through the codebase

---

## Agent Tasks Breakdown

### 🤖 AGENT 1: Setup & Foundation (Priority: High)

**Mode**: Plan Mode (to review setup before execution)  
**Model**: Gemini 3 Pro

**Task Description**:
```
Initialize a new React + TypeScript + Vite project for a reward claim web app.

Setup requirements:
- Install dependencies: firebase, react-router-dom, framer-motion, lottie-react, react-confetti, react-hook-form, @hookform/resolvers, zod, date-fns, react-hot-toast
- Install dev dependencies: tailwindcss, postcss, autoprefixer, @types/react-router-dom
- Configure Tailwind with custom theme:
  * Primary colors: purple-500, pink-500 (gradients)
  * Secondary: blue-400
  * Accent: yellow-400
  * Custom animations: bounce, wiggle, pulse, float
  * Fun, playful design system for gift/reward theme
- Create project folder structure:
  * src/components/animations/
  * src/components/common/
  * src/components/claim/
  * src/components/dashboard/
  * src/contexts/
  * src/hooks/
  * src/lib/
  * src/pages/
  * src/types/
  * src/utils/
- Setup Firebase config at src/lib/firebase.ts with Firestore and Auth
- Create .env.example with Firebase placeholder variables
- Initialize Git repository with .gitignore

Verify the setup by running the dev server and confirming no errors.
```

**Artifact Expected**: Setup Plan, Installation Log, Config Files

---

### 🤖 AGENT 2: Animation Components (Priority: High, Parallel with Agent 3)

**Mode**: Fast Mode (animations are self-contained)  
**Model**: Gemini 3 Pro

**Task Description**:
```
Create all animation components for the reward claim app with delightful, smooth animations.

Components to build:

1. GiftAnimation (src/components/animations/GiftAnimation.tsx):
   - Bouncing 3D gift box using Framer Motion
   - Subtle glow effect with pulsing animation
   - Spring physics for natural movement
   - Floating on mount with stagger animation
   - Props: size, autoPlay

2. BalloonAnimation (src/components/animations/BalloonAnimation.tsx):
   - Colorful balloons floating upward using Lottie
   - Random positioning across screen
   - Continuous loop animation
   - Use free Lottie animation from LottieFiles or create with CSS
   - Props: count (number of balloons), speed

3. KittyAnimation (src/components/animations/KittyAnimation.tsx):
   - Cute animated cat playing/celebrating using Lottie
   - Position in bottom-right corner
   - Idle animation with occasional playful movements
   - Props: position, size

4. AnimatedButton (src/components/common/AnimatedButton.tsx):
   - Primary CTA button with animations:
     * Gentle pulse when idle
     * Scale up on hover (spring animation)
     * Press animation on click
     * Gradient background (purple to pink)
     * Shimmer effect on hover
     * Particle burst on click (optional)
   - Props: text, onClick, loading, disabled, variant

5. ConfettiEffect (src/components/animations/ConfettiEffect.tsx):
   - Full-screen confetti using react-confetti
   - Triggers on success (controlled by prop)
   - Runs for 5 seconds then fades
   - Rainbow colored pieces
   - Props: active (boolean), onComplete

Ensure all animations are performant on mobile devices. Use GPU-accelerated CSS properties (transform, opacity). Add will-change hints where needed.

Test each component individually before marking complete.
```

**Artifact Expected**: Animation Plan, Component Code, Demo Screenshots

---

### 🤖 AGENT 3: Form Logic & Validation (Priority: High, Parallel with Agent 2)

**Mode**: Plan Mode (complex validation logic)  
**Model**: Gemini 3 Pro with Deep Think enabled

**Task Description**:
```
Build the complete claim form system with validation and time slot logic.

Tasks:

1. Create time slot utility (src/utils/timeSlots.ts):
   - Generate 3-hour interval time slots:
     * 10:00 AM - 1:00 PM
     * 1:00 PM - 4:00 PM
     * 4:00 PM - 7:00 PM
     * 7:00 PM - 10:00 PM
   - Function to validate date is not in the past
   - Format time slots for display
   - Export as constant TIME_SLOTS array

2. Create Zod validation schemas (src/lib/validation.ts):
   - claimFormSchema with fields:
     * userName: string, min 2, max 100, required
     * pickupLocation: string, min 3, required
     * pickupNumber: string, phone format (US/international), required
     * pickupDate: date, must be today or future, required
     * pickupTimeSlot: enum of valid time slots, required
   - Export type ClaimFormData from schema

3. Build TimeSlotSelector component (src/components/claim/TimeSlotSelector.tsx):
   - Radio button group styled as cards
   - Visual indication of selected slot
   - Hover animations
   - Integrate with React Hook Form
   - Props: control, name from useForm

4. Build ClaimForm component (src/components/claim/ClaimForm.tsx):
   - Use React Hook Form with Zod resolver
   - Animated form fields that slide in sequentially (stagger 100ms)
   - Fields:
     * Text input: User Name (autofocus)
     * Dropdown/Text: Pickup Location (suggest: "Main Office", "North Branch", "South Branch")
     * Tel input: Phone Number (with format hint)
     * Date picker: Pickup Date (disable past dates, use HTML5 date input)
     * TimeSlotSelector: Pickup Time
   - Show validation errors with smooth fade-in animation
   - Submit button uses AnimatedButton component
   - Loading state during submission (disable form, show spinner on button)
   - On submit: call onSubmit prop with form data
   - Props: onSubmit, isLoading

5. Create SuccessScreen component (src/components/claim/SuccessScreen.tsx):
   - Display after successful submission
   - Show confetti effect
   - Personalized message: "🎉 Congratulations {userName}!"
   - Summary card with pickup details
   - Animated checkmark or success icon
   - "Done" button to close/reset
   - Props: userName, pickupDetails, onClose

Ensure accessibility: proper labels, ARIA attributes, keyboard navigation, focus management.
```

**Artifact Expected**: Form Plan, Validation Schema, Component Code, Accessibility Report

---

### 🤖 AGENT 4: Firebase Integration (Priority: Medium, After Agent 1)

**Mode**: Plan Mode  
**Model**: Gemini 3 Pro with Deep Think enabled

**Task Description**:
```
Setup Firebase backend with Firestore database, security rules, and React integration.

Tasks:

1. Firestore Database Schema:

   Collection: users
   {
     userId: string (auto-generated),
     email: string,
     createdAt: timestamp,
     claimLinks: string[] (array of linkIds)
   }

   Collection: claimLinks
   {
     linkId: string (unique identifier, use nanoid),
     createdBy: string (user email),
     createdAt: timestamp,
     isActive: boolean,
     title?: string (optional, e.g., "Holiday Giveaway")
   }

   Collection: claims
   {
     claimId: string (auto-generated),
     linkId: string (reference to claimLink),
     ownerEmail: string (admin who owns this claim),
     userName: string,
     pickupLocation: string,
     pickupNumber: string,
     pickupDate: string (YYYY-MM-DD),
     pickupTimeSlot: string (e.g., "1:00 PM - 4:00 PM"),
     claimedAt: timestamp,
     status: 'pending' | 'completed' | 'cancelled'
   }

2. Create custom hooks:

   useClaimSubmit (src/hooks/useClaimSubmit.ts):
   - Accept linkId and ClaimFormData
   - Validate linkId exists in claimLinks collection
   - Get ownerEmail from claimLink document
   - Create new claim document in claims collection
   - Return: { submitClaim, isLoading, error, success }

   useClaims (src/hooks/useClaims.ts):
   - Fetch all claims where ownerEmail matches provided email
   - Real-time listener for updates
   - Return: { claims, loading, error }

   useClaimLink (src/hooks/useClaimLink.ts):
   - Fetch claimLink by linkId
   - Validate if link is active
   - Return: { link, isValid, loading, error }

3. Create Firestore security rules (firestore.rules):
   - Allow public read on claimLinks if isActive == true
   - Allow public write to claims collection (anonymous claim submission)
   - Allow authenticated users to:
     * Read/write claimLinks where createdBy == auth.token.email
     * Read claims where ownerEmail == auth.token.email
   - Deny all other access

4. Create Firestore indexes (firestore.indexes.json):
   - Composite index for claims: ownerEmail + claimedAt (descending)
   - Single field index for claimLinks: isActive

Install Firebase CLI globally and prepare deployment commands.
```

**Artifact Expected**: Database Schema Diagram, Security Rules, Hooks Implementation, Deployment Script

---

### 🤖 AGENT 5: Authentication & Admin Dashboard (Priority: Medium, After Agent 4)

**Mode**: Plan Mode  
**Model**: Gemini 3 Pro

**Task Description**:
```
Build the admin authentication system and dashboard for managing claim links and viewing submissions.

Tasks:

1. Create AuthContext (src/contexts/AuthContext.tsx):
   - Manage Firebase Auth state
   - Provide functions: login, signup, logout, resetPassword
   - Persist user session
   - Provide current user data
   - Export useAuth hook
   - Handle auth errors with user-friendly messages

2. Build LoginForm component (src/components/dashboard/LoginForm.tsx):
   - Two modes: Sign In and Sign Up (toggle)
   - Fields: Email, Password (+ Confirm Password for signup)
   - Form validation with Zod
   - Show/hide password toggle
   - "Forgot Password?" link
   - Submit with loading state
   - Error messages with toast notifications
   - Smooth mode transition animation
   - Props: onSuccess callback

3. Create DashboardLayout component (src/components/dashboard/DashboardLayout.tsx):
   - Top navigation bar:
     * Logo/title: "Reward Claims Dashboard"
     * User email display
     * Logout button
   - Sidebar (desktop) / Bottom nav (mobile):
     * "My Claims" link
     * "Create Link" link
   - Main content area with Outlet for nested routes
   - Protected route wrapper (redirects to /login if not authenticated)
   - Responsive design
   - Props: children

4. Build CreateLinkForm component (src/components/dashboard/CreateLinkForm.tsx):
   - Form to create new claim link:
     * Optional title input
     * Generate button
   - On submit:
     * Generate unique linkId using nanoid
     * Create claimLink document in Firestore
     * Associate with current user's email
   - Display generated URL: https://yourapp.com/claim/{linkId}
   - Copy-to-clipboard button with success feedback
   - List of all created links below:
     * Show title, created date, status (active/inactive)
     * Copy link button for each
     * Toggle active/inactive status
     * View claims count for each link
   - Props: none (uses useAuth for current user)

5. Build ClaimsTable component (src/components/dashboard/ClaimsTable.tsx):
   - Fetch claims using useClaims hook (filter by current user's email)
   - Display in responsive table/card layout
   - Columns: User Name, Location, Phone, Date, Time Slot, Status, Actions
   - Features:
     * Sort by date (newest first default)
     * Filter by status (pending/completed/cancelled)
     * Search by name or phone number
     * Date range filter
   - Status badges with color coding
   - Actions: Mark as completed, Mark as cancelled, Delete
   - Empty state when no claims
   - Loading skeleton while fetching
   - Export to CSV button (optional)
   - Props: none (uses useAuth for current user)

6. Build Dashboard overview page (src/pages/Dashboard.tsx):
   - Summary cards:
     * Total claims
     * Pending claims
     * Completed claims
     * Active links
   - Quick actions:
     * "Create New Link" button
     * "View All Claims" button
   - Recent claims preview (latest 5)
   - Charts/graphs (optional): Claims over time

Ensure all dashboard components are protected and only accessible to authenticated users.
```

**Artifact Expected**: Dashboard Plan, Auth Flow Diagram, Components Code, Screenshots

---

### 🤖 AGENT 6: Routing & Page Assembly (Priority: Low, After Agents 2, 3, 5)

**Mode**: Fast Mode  
**Model**: Gemini 3 Pro

**Task Description**:
```
Setup React Router and assemble all components into complete pages.

Tasks:

1. Create ProtectedRoute component (src/components/common/ProtectedRoute.tsx):
   - Wraps routes that require authentication
   - Checks if user is authenticated using useAuth
   - Redirects to /login if not authenticated
   - Shows loading spinner while checking auth state
   - Props: children

2. Build ClaimPage (src/pages/ClaimPage.tsx):
   - Extract linkId from URL params (/claim/:linkId)
   - Use useClaimLink hook to validate linkId
   - States:
     * Loading: Show spinner
     * Invalid link: Show error message with sad animation
     * Valid link, not submitted: Show landing screen → form
     * Valid link, submitted: Show success screen
   - Landing screen:
     * Display all animations (Gift, Balloons, Kitty)
     * Welcome message: "You've Got a Surprise! 🎁"
     * AnimatedButton: "Claim Your Reward"
     * On click: Animations slide out, form slides in
   - Form screen:
     * Show ClaimForm component
     * On submit: Call useClaimSubmit hook
     * Handle loading, error, success states
   - Success screen:
     * Show ConfettiEffect
     * Display SuccessScreen component
     * After 10 seconds or on "Done" click: Reset to initial state

3. Build LoginPage (src/pages/LoginPage.tsx):
   - Center LoginForm on page
   - Gradient background
   - On successful login: Redirect to /dashboard

4. Build NotFound page (src/pages/NotFound.tsx):
   - 404 error page
   - Playful animation
   - Link back to home or login

5. Setup routing in App.tsx:
   - Routes:
     * / → Redirect to /login or landing page
     * /claim/:linkId → ClaimPage (public)
     * /login → LoginPage (public)
     * /dashboard → DashboardLayout (protected)
       - /dashboard/ → Dashboard overview
       - /dashboard/claims → ClaimsTable
       - /dashboard/create → CreateLinkForm
     * * → NotFound
   - Wrap protected routes with ProtectedRoute component
   - Add route transitions with Framer Motion (optional)

6. Update main.tsx and App.tsx:
   - Wrap app with Router
   - Wrap app with AuthProvider
   - Add Toaster component from react-hot-toast
   - Add global styles

Test all routes and navigation flows.
```

**Artifact Expected**: Route Map, Page Components, Navigation Flow Screenshot

---

### 🤖 AGENT 7: Browser Testing & Verification (Priority: Low, Final Step)

**Mode**: Plan Mode (to review test plan)  
**Model**: Gemini 3 Pro

**Task Description**:
```
Use Antigravity's browser subagent to automatically test the complete user flow and verify functionality.

Test Scenarios:

1. Public Claim Flow:
   - Navigate to /claim/{validLinkId}
   - Verify animations load and play
   - Click "Claim Your Reward" button
   - Fill form with test data:
     * Name: "Test User"
     * Location: "Main Office"
     * Phone: "+1234567890"
     * Date: Tomorrow's date
     * Time: "1:00 PM - 4:00 PM"
   - Submit form
   - Verify success screen appears
   - Verify confetti animation plays
   - Take screenshot of success state

2. Invalid Link Test:
   - Navigate to /claim/invalid-link-123
   - Verify error message is displayed
   - Take screenshot

3. Admin Login Flow:
   - Navigate to /login
   - Enter test credentials
   - Verify redirect to /dashboard
   - Take screenshot of dashboard

4. Create Claim Link Flow:
   - Navigate to /dashboard/create
   - Create new claim link
   - Copy generated URL
   - Verify link appears in list
   - Take screenshot

5. View Claims Flow:
   - Navigate to /dashboard/claims
   - Verify claims table loads
   - Test search functionality
   - Test filter functionality
   - Take screenshot

6. Mobile Responsiveness:
   - Resize viewport to mobile (375x667)
   - Navigate through all pages
   - Verify layouts are responsive
   - Verify animations work on mobile
   - Take screenshots

7. Error Handling:
   - Test form validation errors
   - Test network error scenarios
   - Verify error messages display correctly

Generate a test report with:
- All test results (pass/fail)
- Screenshots of each flow
- Browser recordings of complex interactions
- Performance metrics (load time, animation FPS)
- Any bugs or issues found

Save test report as: test-report.md
```

**Artifact Expected**: Test Plan, Test Report, Screenshots, Browser Recordings, Bug List

---

## Deployment Instructions

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

**Environment Variables to set in Vercel**:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

**Create vercel.json**:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Alternative: Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize hosting
firebase init hosting

# Build
npm run build

# Deploy
firebase deploy --only hosting
```

---

## Antigravity-Specific Tips

### 1. Enable Deep Think Mode
For complex tasks (Firebase rules, validation logic, routing), enable Deep Think:
- Open Model Settings
- Select Gemini 3 Pro
- Toggle "Deep Think" ON

### 2. Use Artifacts for Review
- Each agent generates Artifacts (Plans, Implementation Plans)
- Review Artifacts before agent executes
- Comment on Artifacts to guide the agent
- Artifacts persist in the Artifacts Panel for reference

### 3. Parallel Agent Execution
Run these agents in parallel for faster development:
- Agent 2 (Animations) + Agent 3 (Forms)
- Agent 5 (Dashboard) while Agent 4 (Firebase) is testing

### 4. Browser Automation
- Let Agent 7 (Testing) use the browser subagent
- It will automatically launch Chrome, test your app, and generate screenshots
- Review browser recordings to see exactly what the agent tested

### 5. Save to Knowledge Base
After completing each major component, save useful patterns:
- "Save this animation pattern for future gift-themed apps"
- "Save this Firebase security rules pattern for public form submissions"
- "Save this Tailwind config for playful, colorful designs"

### 6. Cascade Flow for Iterations
Use natural language to request changes:
```
"Make the gift animation more bouncy"
"Add a loading skeleton to the claims table"
"Change the color scheme to blue and green"
```

The agent will automatically find the relevant files and make changes.

---

## Project Timeline with Antigravity

Using parallel agent execution:

- **Setup** (Agent 1): 15-20 minutes
- **Animations + Forms** (Agents 2 & 3 parallel): 45-60 minutes
- **Firebase** (Agent 4): 30-40 minutes
- **Dashboard** (Agent 5): 45-60 minutes
- **Routing** (Agent 6): 20-30 minutes
- **Testing** (Agent 7): 30-45 minutes

**Total Estimated Time**: 3-4 hours (vs 10-15 hours without Antigravity)

---

## Quality Assurance Checklist

After all agents complete:

- [ ] All animations are smooth and performant
- [ ] Form validation works correctly
- [ ] Firebase integration is secure
- [ ] Dashboard displays data correctly
- [ ] All routes work and are protected appropriately
- [ ] Mobile responsive design works
- [ ] Error handling is user-friendly
- [ ] Browser tests all pass
- [ ] App is deployed and accessible

---

## Next Steps After Completion

Optional enhancements:
1. **Email Notifications**: Send confirmation emails when reward is claimed
2. **QR Code Generator**: Generate QR codes for claim links
3. **Analytics Dashboard**: Track claim rates, popular times, locations
4. **Multi-language Support**: i18n with react-i18next
5. **Admin Controls**: Set expiration dates, limit claims per link
6. **SMS Notifications**: Integrate with Twilio for SMS confirmations

---

## Support Resources

- **Antigravity Docs**: https://codelabs.developers.google.com/getting-started-google-antigravity
- **Firebase Docs**: https://firebase.google.com/docs
- **React Router**: https://reactrouter.com
- **Framer Motion**: https://www.framer.com/motion
- **Tailwind CSS**: https://tailwindcss.com

---

**Built with Google Antigravity - Experience Liftoff! 🚀**
