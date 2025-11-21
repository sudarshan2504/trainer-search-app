# Semester Study App

A React Native app built with Expo SDK 51 for accessing semester study materials and viewing personal information.

## Features

- **Home Screen**: 8 semester buttons (1-8) that open Google Drive links
- **Profile Screen**: Personal information display with interactive cards
- **Bottom Tab Navigation**: Easy navigation between Home and Profile
- **Modern UI**: Beautiful gradients, animations, and smooth transitions
- **Slide Animations**: Smooth page transitions
- **Button Animations**: Interactive feedback on all buttons

## Getting Started

1. Navigate to the app directory:
```bash
cd trainer-search-app/semester-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the Expo development server:
```bash
npm start
```

4. Run on your device:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app (SDK 49 compatible)

## Customization

### Google Drive Links
Edit the `openGoogleDrive` function in `screens/HomeScreen.jsx` to add your actual Google Drive folder IDs:
```javascript
const driveUrl = `https://drive.google.com/drive/folders/YOUR_FOLDER_ID_${semester}`;
```

### Personal Information
Update the `personalInfo` array in `screens/ProfileScreen.jsx` with your actual information.

## Dependencies

- Expo SDK 49 (Stable older version)
- React Navigation (Bottom Tabs & Stack)
- React Native Reanimated (for animations)
- Expo Linear Gradient
- Expo Web Browser (for opening links)

## Project Structure

```
semester-app/
├── App.jsx              # Main app with navigation
├── screens/
│   ├── HomeScreen.jsx   # Semester buttons screen
│   └── ProfileScreen.jsx # Personal info screen
├── package.json
└── app.json
```

Enjoy your semester study app! 🎓

