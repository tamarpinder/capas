# CAPAS Bahamas Monorepo

A TurboRepo monorepo for the CAPAS (Creative Arts, Performance & Academic Studies) educational platform in The Bahamas.

## 🏗️ Project Structure

```
CAPAS-BAHAMAS/
├── apps/
│   ├── main-website/     # Public-facing Next.js 14 site
│   ├── school-portal/    # Student/teacher portal
│   └── creatives-hub/    # Creative arts platform
├── packages/
│   ├── shared/          # Shared components & utilities
│   └── backend/         # Moodle Docker setup
├── mocks/               # JSON mock data
└── README.md           # This file
```

## 🎨 Design System

The project features a uniquely Bahamian design system with:

- **Primary Colors**: Turquoise (#0A8A98), Gold (#FFCE00)
- **Ocean-inspired animations**: Wave patterns, floating elements
- **Cultural motifs**: Conch shells, palm leaves, coral reefs
- **Custom SVG patterns** in `packages/shared/patterns/`

## 🚀 Quick Start

1. **Install dependencies**:
```bash
npm install
```

2. **Start development servers**:
```bash
npm run dev
```

3. **Start Moodle backend**:
```bash
cd packages/backend
npm run start
```

## 📦 Applications

### Main Website (`apps/main-website`)
- Next.js 14 with App Router
- Payload CMS integration
- Public-facing site for CAPAS

### School Portal (`apps/school-portal`)
- Student/teacher dashboard
- Course management
- Academic tools

### Creatives Hub (`apps/creatives-hub`)
- Student creative project showcase
- Digital arts portfolio
- Creative collaboration tools

## 🔧 Development

### Available Scripts

- `npm run dev` - Start all development servers
- `npm run build` - Build all applications
- `npm run lint` - Lint all packages
- `npm run format` - Format code with Prettier

### Environment Setup

1. Copy `.env.example` to `.env`
2. Update environment variables with your values
3. Start the Moodle backend: `cd packages/backend && npm run start`

## 🐳 Docker Services

The backend includes Moodle LMS with:
- **Moodle**: http://localhost:8080
- **phpMyAdmin**: http://localhost:8081
- **MariaDB**: Internal database

## 📊 Mock Data

Sample data available in `mocks/`:
- `courses.json` - Academic course catalog
- `students.json` - Student profiles
- `events.json` - School events
- `creative-works.json` - Student creative projects

## 🎯 Key Features

- **Monorepo architecture** with TurboRepo
- **Shared design system** with Bahamian themes
- **Ocean-inspired animations** and wave patterns
- **Cultural SVG patterns** (conch shells, palm leaves)
- **Integrated Moodle LMS** via Docker
- **Mock data** for development
- **TypeScript** throughout
- **Tailwind CSS** with custom Bahamian color palette

## 🌊 Bahamian Cultural Elements

The design incorporates authentic Bahamian elements:
- **Conch shell patterns** - Symbol of Bahamian heritage
- **Palm frond motifs** - Representing tropical beauty
- **Ocean wave animations** - Reflecting island geography
- **Coral reef designs** - Celebrating marine ecosystems
- **Turquoise and gold palette** - Inspired by Bahamian waters and sunshine

## 📝 License

MIT License - see LICENSE file for details.