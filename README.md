# Alcove Ridge Mobile App

## Overview
ACR mobile application built with React Native and Expo. It allows users to discover and browse financial events in their area.

## Features
- Swipe-up login page with smooth animation
- User authentication (test credentials provided)
- Browse upcoming financial events
- View past events
- User profile page with logout functionality
- Bottom tab navigation for easy access to different sections

## Tech Stack
- React Native
- Expo
- React Navigation
- TypeScript

### Prerequisites
- Node.js (v12 or later)
- npm or yarn
- Expo CLI

### Installation
1. Clone the repository

2. Install dependencies:
   ```
   npm install
   ```
   or if you're using yarn:
   ```
   yarn install
   ```

3. Start the Expo development server:
   ```
   npx expo start
   ```

4. Use the Expo Go app on your mobile device to scan the QR code from the terminal to launch the app.

## Project Structure
- `App.tsx`: Main entry point of the application
- `screens/`: Contains individual screen components
- `components/`: Reusable React components
- `navigation/`: Navigation configuration
- `data/`: Mock data for events
- `styles/`: Global styles
- `types/`: TypeScript type definitions

## Usage
- Launch the app and swipe up on the main screen to access the login page.
- Use the test credentials (username: test, password: password) to log in.
- Browse upcoming events on the Events tab.
- View your profile and log out from the Profile tab.

