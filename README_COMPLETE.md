# 🚀 Futuristic Album Gallery

A React-based futuristic photo gallery website with Firebase authentication, Google Drive integration, and an interactive graph-based album layout.

![Futuristic Gallery Preview](https://via.placeholder.com/800x400/1f2937/06b6d4?text=Futuristic+Album+Gallery)

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

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Google account (for Firebase and Google Drive)
- GitHub account (for deployment)

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/futuristic-gallery.git
cd futuristic-gallery

# Install dependencies
npm install

# Start development server
npm run dev
```

### Configuration Required
Before the app will work, you need to complete the manual setup steps:

1. **Firebase Setup** - Configure Google authentication
2. **Email Whitelist** - Add authorized user emails
3. **Google Drive** - Set up image hosting
4. **Albums Data** - Create your album collection

**📋 See [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) for complete step-by-step instructions.**

## 📂 Project Structure

```
futuristic-gallery/
├── public/
│   └── albums.json            # Album metadata and image URLs
├── src/
│   ├── components/
│   │   ├── AlbumCard.jsx      # Individual album node in graph
│   │   ├── AlbumGraph.jsx     # Main graph layout component
│   │   ├── ImageModal.jsx     # Full-screen image viewer
│   │   └── AddAlbumModal.jsx  # Form for adding new albums
│   ├── pages/
│   │   ├── Home.jsx           # Main gallery page
│   │   ├── Login.jsx          # Google Sign-In page
│   │   └── AccessDenied.jsx   # Unauthorized access page
│   ├── firebase.js            # Firebase configuration
│   └── App.tsx                # Main app component with routing
├── SETUP_CHECKLIST.md         # Complete setup instructions
└── README.md                  # This file
```

## 🔧 Configuration Files

### Firebase Configuration (`src/firebase.js`)
```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id-here"
};

// Email whitelist - Only these emails can access the gallery
export const allowedEmails = [
  "your-email@gmail.com",
  "friend@example.com"
];
```

### Albums Data (`public/albums.json`)
```json
{
  "albums": [
    {
      "id": "sample-album-1",
      "title": "Cyberpunk Adventures",
      "cover": "https://drive.google.com/uc?export=view&id=YOUR_COVER_ID",
      "images": [
        "https://drive.google.com/uc?export=view&id=IMAGE_1_ID",
        "https://drive.google.com/uc?export=view&id=IMAGE_2_ID"
      ]
    }
  ]
}
```

## 🎨 Design System

### Color Palette
- **Primary**: Cyan (#06b6d4) - Main accent color
- **Secondary**: Purple (#8b5cf6) - Secondary accent
- **Background**: Dark Gray (#111827) - Main background
- **Surface**: Gray 800/900 - Card backgrounds
- **Text**: White/Gray variants

### Key Design Elements
- **Glassmorphism**: Backdrop blur with transparency
- **Neon Glows**: CSS box-shadows with color
- **Smooth Transitions**: 300ms duration animations
- **Graph Layout**: Connected nodes with flowing lines
- **Responsive Grid**: Adapts to all screen sizes

## 📱 Usage Guide

### For Users
1. **Sign In**: Click "Continue with Google" and use authorized email
2. **Browse Albums**: Click on album nodes in the graph to view photos
3. **Navigate Images**: Use arrow keys, click arrows, or tap thumbnails
4. **Add Albums**: Click the floating + button to add new albums
5. **Sign Out**: Click the logout button in the header

### For Administrators
1. **Add Users**: Update `allowedEmails` array in `src/firebase.js`
2. **Add Albums**: Use the in-app form or edit `public/albums.json`
3. **Update Images**: Replace Google Drive links in albums data
4. **Deploy Changes**: Run `npm run build && npm run deploy`

## 🚀 Deployment

### GitHub Pages (Recommended)
```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Manual Deployment Steps
1. Update `homepage` in `package.json` with your GitHub Pages URL
2. Push code to GitHub repository
3. Run deployment commands
4. Enable GitHub Pages in repository settings
5. Add your domain to Firebase authorized domains

**📋 See [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) for detailed deployment instructions.**

## 🔐 Security Features

### Authentication
- **Google OAuth**: Secure sign-in via Firebase
- **Email Whitelist**: Only pre-approved emails can access
- **Session Management**: Automatic sign-out handling
- **Domain Restrictions**: Firebase domain authorization

### Privacy
- **Private Repository**: Can be made private on GitHub
- **Authorized Domains**: Firebase restricts to specified domains
- **No Public API**: All data served statically
- **Secure Image Links**: Google Drive public links only

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run deploy       # Deploy to GitHub Pages
npm run lint         # Run ESLint
```

### Adding New Features
1. **New Components**: Add to `src/components/`
2. **New Pages**: Add to `src/pages/` and update routing
3. **Styling**: Use Tailwind classes with futuristic theme
4. **State Management**: Use React hooks (useState, useEffect)

### Customization
- **Colors**: Update Tailwind classes throughout components
- **Animations**: Modify Framer Motion configurations
- **Layout**: Adjust graph positioning in `AlbumGraph.jsx`
- **UI Elements**: Customize glassmorphism effects and glows

## 📊 Performance

### Optimization Features
- **Lazy Loading**: Images load on demand
- **Responsive Images**: Optimized for different screen sizes
- **Efficient Animations**: Hardware-accelerated CSS transitions
- **Minimal Bundle**: Tree-shaking and code splitting
- **CDN Hosting**: Fast delivery via GitHub Pages

### Best Practices
- **Image Optimization**: Use compressed images in Google Drive
- **Caching**: Browser caching for static assets
- **Error Handling**: Graceful fallbacks for failed loads
- **Loading States**: Smooth loading indicators

## 🆘 Troubleshooting

### Common Issues

**Authentication Problems:**
- Verify Firebase config is correct
- Check authorized domains in Firebase Console
- Ensure email is in whitelist array

**Images Not Loading:**
- Confirm Google Drive links are public
- Use correct direct link format: `https://drive.google.com/uc?export=view&id=FILE_ID`
- Check browser console for CORS errors

**Deployment Issues:**
- Verify `homepage` field in package.json
- Ensure GitHub Pages is enabled
- Check that `gh-pages` branch exists

**Performance Issues:**
- Optimize image sizes in Google Drive
- Check network tab in browser dev tools
- Consider using WebP format for images

### Getting Help
1. Check browser console for error messages
2. Verify all setup steps were completed
3. Test in incognito mode to rule out cache issues
4. Check Firebase Console for authentication logs

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style
- Use ESLint configuration provided
- Follow React best practices
- Maintain consistent Tailwind class ordering
- Add comments for complex logic

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Firebase** - For authentication services
- **Framer Motion** - For smooth animations
- **React Flow** - For graph visualization
- **Lucide React** - For beautiful icons

## 📞 Support

If you encounter any issues or have questions:

1. **Check Documentation**: Review this README and SETUP_CHECKLIST.md
2. **Search Issues**: Look through existing GitHub issues
3. **Create Issue**: Open a new issue with detailed description
4. **Community**: Join discussions in the repository

---

## 🎉 Ready to Get Started?

Follow the complete setup guide in [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) to configure your Firebase project, set up Google Drive hosting, and deploy your futuristic photo gallery!

**Your journey to a stunning, secure photo gallery starts now! 🚀**