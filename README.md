# CATMATHS 🎯

A comprehensive CAT (Common Admission Test) Quantitative Aptitude learning platform with AI-powered custom test generation.

## Features

- 📚 **Structured Learning**: Complete syllabus coverage from foundations to advanced topics
- 🤖 **AI Test Generator**: Generate custom practice tests using Google Gemini AI
- ✏️ **Interactive Quizzes**: Practice questions with instant feedback and solutions
- 📊 **Progress Tracking**: Track completed topics and overall progress
- 📄 **Formula Cheat Sheet**: Quick reference for all essential formulas
- 🌙 **Dark Mode**: Eye-friendly dark theme support
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Routing**: React Router v7
- **Styling**: TailwindCSS v4
- **Math Rendering**: KaTeX (react-katex)
- **State Management**: Zustand
- **Build Tool**: Vite
- **AI Integration**: Google Gemini API

## Repository Structure

```
CATMATHS/
├── src/
│   ├── components/
│   │   ├── Layout.tsx          # Main app layout with sidebar
│   │   ├── MathText.tsx        # LaTeX math rendering component
│   │   └── QuizEngine.tsx      # Interactive quiz component
│   ├── data/
│   │   └── syllabus.tsx        # Complete syllabus content & questions
│   ├── lib/
│   │   └── utils.ts            # Utility functions (cn helper)
│   ├── pages/
│   │   ├── Dashboard.tsx       # Home page with progress overview
│   │   ├── TopicPage.tsx       # Individual topic learning page
│   │   ├── CheatSheet.tsx      # Printable formula reference
│   │   └── CustomTest.tsx      # AI-powered test generator
│   ├── store/
│   │   └── useProgress.ts      # Zustand store for progress tracking
│   ├── App.tsx                 # Root component with routing
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles & Tailwind imports
├── .env                        # Environment variables (API keys)
├── index.html                  # HTML template
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
└── README.md                   # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Gemini API key(s) - [Get one here](https://makersuite.google.com/app/apikey)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CATMATHS
```

2. Install dependencies:
```bash
npm install
```

3. Configure API keys:

Create/edit `.env` file:
```env
# Single API key
GEMINI_API_KEY="your-api-key-here"

# Multiple keys for load balancing (comma-separated)
GEMINI_API_KEY="key1,key2,key3"
```

4. Start development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run preview
```

## Syllabus Coverage

### 1. Foundations
- Number Line & Integers
- Absolute Value & Inequalities
- Fractions & Decimals
- Mental Math Benchmarks

### 2. Arithmetic
- Percentages & Base Values
- Profit, Loss & Discount
- Time, Speed & Distance

### 3. Algebra
- Linear Equations
- Quadratic Equations

### 4. Miscellaneous
- Trigonometry: Formulas, Ratios & Heights

## AI Custom Test Generator

The app includes an AI-powered test generator that:
- Supports multiple API keys with automatic rotation
- Auto-detects available Gemini models
- Generates CAT-level questions with LaTeX math formatting
- Creates both MCQ and TITA (Type In The Answer) questions
- Provides step-by-step solutions

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Type check with TypeScript

## License

Apache-2.0

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Built with ❤️ for CAT aspirants