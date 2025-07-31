# 🚀 Futuristic Album Gallery

A React-based futuristic photo gallery website with Firebase authentication, Google Drive integration, and an interactive graph-based album layout.

## ✨ Features

- 🔐 **Firebase Google Sign-In** with email whitelist access control
- 🗺️ **Interactive Graph Layout** using React Flow for album visualization
- 🖼️ **Google Drive Integration** for image hosting
- 🎨 **Futuristic UI** with glassmorphism effects and neon animations
- 📱 **Responsive Design** optimized for all devices
- ⚡ **Real-time Updates** for adding new albums
- 🔄 **Smooth Animations** using Framer Motion

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom futuristic theme
- **Authentication**: Firebase Auth (Google Sign-In)
- **Image Hosting**: Google Drive public links
- **Visualization**: React Flow for graph layout
- **Animations**: Framer Motion
- **Deployment**: GitHub Pages

## 📋 Manual Setup Steps

### 1. 🔥 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select existing one
3. Navigate to **Authentication** → **Sign-in method**
4. Enable **Google** sign-in provider
5. Go to **Project Settings** → **General** → **Your apps**
6. Click **Web app** icon and register your app
7. Copy the Firebase config object
8. Replace the config in `src/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

### 2. 📧 Email Whitelist Configuration

1. Open `src/firebase.js`
2. Update the `allowedEmails` array with authorized email addresses:

```javascript
export const allowedEmails = [
  "your-email@gmail.com",
  "authorized-friend@example.com",
  "another-user@domain.com"
];
```

### 3. 🖼️ Google Drive Image Setup

For each image you want to use:

1. Upload image to Google Drive
2. Right-click → **Share** → **Change to anyone with the link**
3. Set permission to **Viewer**
4. Copy the sharing link (format: `https://drive.google.com/file/d/FILE_ID/view`)
5. Convert to direct link format: `https://drive.google.com/uc?export=view&id=FILE_ID`

### 4. 📂 Album Configuration

1. Open `public/albums.json`
2. Replace sample data with your actual albums:

```json
{
  "albums": [
    {
      "id": "my-vacation-2024",
      "title": "Summer Vacation 2024",
      "cover": "https://drive.google.com/uc?export=view&id=YOUR_COVER_IMAGE_ID",
      "images": [
        "https://drive.google.com/uc?export=view&id=IMAGE_1_ID",
        "https://drive.google.com/uc?export=view&id=IMAGE_2_ID",
        "https://drive.google.com/uc?export=view&id=IMAGE_3_ID"
      ]
    }
  ]
}
```

### 5. 🧪 Local Testing

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Test the following:
   - ✅ Google Sign-In works
   - ✅ Authorized emails can access the gallery
   - ✅ Unauthorized emails get redirected to access denied
   - ✅ Albums display correctly in graph layout
   - ✅ Images load from Google Drive links
   - ✅ Modal gallery navigation works
   - ✅ Add album functionality works

### 6. 🚀 GitHub Pages Deployment

1. Update `package.json` with your GitHub info:
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
}
```

2. Initialize Git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

3. Create GitHub repository and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

4. Deploy to GitHub Pages:
```bash
npm run build
npm run deploy
```

5. Enable GitHub Pages:
   - Go to repository **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: **gh-pages**
   - Click **Save**

6. Wait 5-10 minutes and visit: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

### 7. 🔐 Security Configuration (Optional)

#### Make Repository Private:
1. Go to repository **Settings** → **General**
2. Scroll to **Danger Zone**
3. Click **Change repository visibility** → **Private**

#### Restrict Firebase Project:
1. Go to Firebase Console → **Authentication** → **Settings**
2. Add your deployed domain to **Authorized domains**
3. Remove localhost if deploying to production

### 8. ✅ Final Verification

Test these on your live site:

- [ ] Firebase authentication works on deployed site
- [ ] Only whitelisted emails can access
- [ ] All images load correctly from Google Drive
- [ ] Graph layout displays properly
- [ ] Mobile responsiveness works
- [ ] Add album feature functions
- [ ] All animations and transitions work

## 🔧 Troubleshooting

**Images not loading?**
- Check Google Drive sharing permissions
- Verify the direct link format: `https://drive.google.com/uc?export=view&id=FILE_ID`

**Authentication issues?**
- Ensure your domain is in Firebase authorized domains
- Check Firebase config in `firebase.js`

**Graph layout problems?**
- Check browser console for React Flow errors
- Ensure all albums have valid data

**Deployment failures?**
- Verify `homepage` field in `package.json`
- Check GitHub Pages settings
- Ensure `gh-pages` branch exists

## 📱 Usage

1. **Sign In**: Use Google account (must be in whitelist)
2. **View Albums**: Click on album nodes in the graph
3. **Navigate Images**: Use arrow keys or click navigation buttons
4. **Add Albums**: Click the floating + button
5. **Sign Out**: Click logout button in header

## 🎨 Customization

The app uses a futuristic theme with:
- **Primary**: Cyan (#06b6d4)
- **Secondary**: Purple (#8b5cf6)
- **Background**: Dark gray (#111827)
- **Glassmorphism**: Backdrop blur with transparency
- **Animations**: Smooth transitions and hover effects

Modify colors in Tailwind classes throughout the components to match your preferred aesthetic.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).