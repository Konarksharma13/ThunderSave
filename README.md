⚡ **THUNDERSAVE** ⚡

[![React](https://img.shields.io/badge/React-19.0-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Apache%202.0-green?style=flat-square)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-8A2BE2)](https://thundersave-107358358799.us-west1.run.app/)


> A lightning-fast, anime-themed personal finance tracker that turns budgeting into an epic RPG adventure. Master your money like a Thunder Hashira masters lightning.

## ✨ Features that'll make you go WOW

### ⚡ **Gamified Finance**
Transform boring money management into an electrifying JRPG experience. Climb through ranks—from Rookie to Thunder Breather to Lightning Hashira—as you smash your savings goals. Every transaction is a battle, every milestone an achievement unlock.

### 🎬 **Anime-Inspired Aesthetics**
Gorgeous hand-crafted UI inspired by anime storytelling. Dynamic visual effects, smooth animations powered by Motion, and a color palette that makes you *feel* the electricity of financial mastery. Built with Tailwind CSS for beautiful, responsive design.

### 📊 **Real-Time Financial Insights**
- Interactive charts and graphs powered by Recharts
- Track income vs. expenses at a glance
- Category-based expense breakdown
- Savings goal progress visualization
- Streak tracking to keep you motivated

### 🏆 **Achievement System**
Unlock badges and achievements as you hit milestones:
- Hit savings targets
- Maintain spending streaks
- Reach rank thresholds
- Complete financial challenges

### 💾 **Smart Data Management**
- Full transaction history with search and filter
- Persistent local storage
- Export and reset capabilities
- Demo data to get started instantly

### 🎨 **Beautiful UI Components**
- Transaction form for quick logging
- Real-time rank tracking
- Achievement badge showcase
- Motivational panel with personalized insights
- Special effects for epic moment celebrations

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/thundersave.git
cd thundersave

# Install dependencies
npm install

# Start the development server
npm run dev
```

Your app will be running at `http://localhost:3000`.

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Clean build artifacts
npm clean
```

## 📦 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework with latest hooks and features |
| **TypeScript** | Type-safe development |
| **Vite** | Lightning-fast build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Motion** | Smooth, performant animations |
| **Recharts** | Beautiful, responsive charts |
| **Lucide React** | Icon library |
| **date-fns** | Date manipulation and formatting |

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── AchievementBadges.tsx
│   ├── BackgroundEffects.tsx
│   ├── ChartsSection.tsx
│   ├── MotivationPanel.tsx
│   ├── RankTracker.tsx
│   ├── SpecialEffects.tsx
│   ├── TransactionForm.tsx
│   └── TransactionList.tsx
├── hooks/              # Custom React hooks
│   └── useFinanceStore.ts
├── lib/                # Utilities
│   └── utils.ts
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🎮 How It Works

1. **Log Transactions** - Add income or expenses with categories
2. **Watch Your Rank Grow** - Accumulate savings to unlock new ranks
3. **Unlock Achievements** - Hit milestones to earn special badges
4. **See the Magic** - Special visual effects celebrate your wins
5. **Track Progress** - Beautiful charts show your financial journey

## 🎯 The Ranks

Chase the lightning! Progress through increasingly powerful ranks:

| Rank | Savings Target | Icon |
|------|---|---|
| 🔰 Rookie | $100+ | ⚡ |
| ⚡ Thunder Breather | $500+ | ⚡⚡ |
| ⚡⚡ Lightning Hashira | $1000+ | ⚡⚡⚡ |

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Type check with TypeScript
npm run clean    # Remove dist folder
```

### Code Quality

TypeScript is configured for strict type checking. Run `npm run lint` before committing to catch any type errors.

## 🎨 Customization

- **Theme Colors**: Edit Tailwind classes in component files
- **Rank Thresholds**: Adjust in [src/types.ts](src/types.ts)
- **Achievement Icons**: Customize in component definitions
- **Effects**: Modify animations in `SpecialEffects.tsx`

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📄 License

Apache License 2.0 - See [LICENSE](LICENSE) for details.

## 🌟 Contributing

Love ThunderSave? Here's how to help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 💡 Future Features

- 🤖 AI-powered financial insights
- 📱 Mobile app companion
- 🌐 Cloud sync & backup
- 👥 Multiplayer challenges
- 📈 Advanced analytics
- 🎵 Sound effects
- 🌙 Dark mode variants

## 🙏 Acknowledgments

Inspired by anime storytelling, JRPG mechanics, and the power of gamification. Built with love for anyone who wants to make personal finance genuinely exciting.

---

**Ready to become a financial Thunder Hashira?** ⚡ Start using ThunderSave today and transform the way you manage money!
