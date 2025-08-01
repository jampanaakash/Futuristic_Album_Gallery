# 🚀 Quick Reference - Futuristic Album Gallery

## 📁 Essential Files You Need to Edit

### 1. **src/firebase.js** - Authentication Setup
```javascript
// Replace this entire config with yours from Firebase Console
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Add your authorized email addresses
export const allowedEmails = [
  "your-email@gmail.com",
  "friend@example.com",
  "family@domain.com"
];
```

### 2. **public/albums.json** - Your Photo Albums
```json
{
  "albums": [
    {
      "id": "unique-album-id",
      "title": "Album Title",
      "cover": "https://drive.google.com/uc?export=view&id=COVER_IMAGE_ID",
      "images": [
        "https://drive.google.com/uc?export=view&id=IMAGE_1_ID",
        "https://drive.google.com/uc?export=view&id=IMAGE_2_ID",
        "https://drive.google.com/uc?export=view&id=IMAGE_3_ID"
      ]
    }
  ]
}
```

### 3. **package.json** - GitHub Pages Setup
```json
{
  "homepage": "https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME"
}
```

## 🔧 Core Components (Auto-Generated)

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **App.tsx** | Main app routing | Authentication checks, route protection |
| **Login.jsx** | Sign-in page | Google OAuth, futuristic UI |
| **Home.jsx** | Main gallery | Album graph, user header, add button |
| **AlbumGraph.jsx** | Graph layout | Connected nodes, spiral positioning |
| **AlbumCard.jsx** | Album nodes | Cover image, hover effects |
| **ImageModal.jsx** | Image viewer | Full-screen gallery, navigation |
| **AddAlbumModal.jsx** | Add album form | Dynamic form, validation |

## 🎨 Styling System

### **Color Scheme**
- **Primary**: `text-cyan-400`, `border-cyan-500`
- **Secondary**: `text-purple-400`, `border-purple-500`
- **Background**: `bg-gray-900`, `bg-gray-800`
- **Glass Effect**: `backdrop-blur-md bg-gray-800/30`

### **Key CSS Patterns**
```css
/* Glassmorphism Card */
backdrop-blur-md bg-gray-800/30 border border-cyan-500/50

/* Neon Glow Effect */
hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]

/* Gradient Button */
bg-gradient-to-r from-cyan-600 to-purple-600
```

## 🚀 Deployment Commands

```bash
# 1. Install dependencies
npm install

# 2. Test locally
npm run dev

# 3. Build for production
npm run build

# 4. Deploy to GitHub Pages
npm run deploy
```

## 📋 Setup Checklist (Essential Steps)

### **Firebase Setup**
- [ ] Create Firebase project
- [ ] Enable Google authentication
- [ ] Copy config to `src/firebase.js`
- [ ] Add your email to `allowedEmails`

### **Google Drive Images**
- [ ] Upload images to Google Drive
- [ ] Make each image public ("Anyone with link")
- [ ] Convert links to direct format: `https://drive.google.com/uc?export=view&id=FILE_ID`
- [ ] Update `public/albums.json` with your albums

### **GitHub Deployment**
- [ ] Update `homepage` in `package.json`
- [ ] Create GitHub repository
- [ ] Push code: `git add . && git commit -m "Initial commit" && git push`
- [ ] Deploy: `npm run deploy`
- [ ] Enable GitHub Pages in repo settings

### **Final Verification**
- [ ] Add your GitHub domain to Firebase authorized domains
- [ ] Test live site with authorized email
- [ ] Verify all images load correctly

## 🔐 Security Notes

### **Access Control**
- Only emails in `allowedEmails` can access the gallery
- Unauthorized users see "Access Denied" page
- Firebase handles all authentication securely

### **Image Privacy**
- Images are hosted on Google Drive with public links
- No sensitive data is stored in the code
- Repository can be made private if desired

## 🎯 What Each File Does (Simple Explanation)

| File | What It Does |
|------|-------------|
| `firebase.js` | Connects to Google for sign-in, checks if email is allowed |
| `albums.json` | Stores your album titles and image links |
| `Login.jsx` | Shows the "Sign in with Google" page |
| `Home.jsx` | Shows the main gallery with album graph |
| `AlbumGraph.jsx` | Creates the connected map/graph of albums |
| `ImageModal.jsx` | Opens full-screen when you click an album |
| `AddAlbumModal.jsx` | Form that pops up when you click the + button |

## 🚨 Common Issues & Solutions

### **Images Not Loading**
- Check Google Drive links are public
- Use correct format: `https://drive.google.com/uc?export=view&id=FILE_ID`

### **Authentication Fails**
- Verify Firebase config is correct
- Check email is in `allowedEmails` array
- Add GitHub domain to Firebase authorized domains

### **Site Not Deploying**
- Check `homepage` field in `package.json`
- Ensure GitHub Pages is enabled in repo settings
- Wait 5-10 minutes after deployment

## 📱 Features Overview

### **For Users**
- Sign in with Google account
- Browse albums in interactive graph layout
- View images in full-screen modal
- Navigate with arrows or thumbnails
- Add new albums with + button

### **For You (Admin)**
- Control access with email whitelist
- Host images on Google Drive
- Add albums via JSON file or web form
- Deploy easily to GitHub Pages
- Secure, private photo sharing

This is everything you need to know to set up and customize your futuristic photo gallery! 🎨✨