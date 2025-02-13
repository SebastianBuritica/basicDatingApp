# Dating App

A modern mobile dating application built with React Native and Expo, featuring a clean architecture and TypeScript integration.

## 🚀 Technologies

- React Native (0.76.6)
- Expo (52.0.30)
- TypeScript
- Axios for API integration
- ESLint & Prettier for code quality

## ⚙️ Prerequisites

- Node.js >= 14.x
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd datingapp1
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

## 📱 Running the App

- For iOS:
```bash
npm run ios
# or
yarn ios
```

- For Android:
```bash
npm run android
# or
yarn android
```

## 🧰 Project Structure

```
datingapp1/
├── src/
│   ├── components/        # Reusable UI components
│   ├── screens/          # Application screens
│   ├── navigation/       # Navigation configuration
│   ├── services/        # API services
│   ├── utils/           # Helper functions
│   └── types/           # TypeScript type definitions
├── assets/              # Images, fonts, etc.
└── App.tsx             # Application entry point
```

## ✨ Features

- User authentication
- Profile creation and editing
- Match discovery
- Real-time messaging (planned)
- Location-based matching (planned)

## 🔧 Development

### Code Style

This project uses ESLint and Prettier for code formatting. To maintain code quality:

```bash
# Run linter
npm run lint

# Format code
npm run format
```

### TypeScript

The project is configured with TypeScript for type safety. Ensure all new files use the `.ts` or `.tsx` extension.

## 📝 Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🛟 Support

For support, email [your-email@example.com] or open an issue in the repository.
