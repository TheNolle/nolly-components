<div align='center'>

# Nolly Components

**Production-ready React component library**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)

[Documentation](https://github.com/thenolle/nolly-components/wiki) • [Live Demo](https://thenolle.github.io/nolly-components) • [Report Bug](https://github.com/thenolle/nolly-components/issues)

</div>

---

## Overview

Modern, accessible, and highly customizable React components built with TypeScript and Tailwind CSS. Each component is production-ready, fully typed, and follows WCAG 2.1 AA accessibility standards.

**Current Components:**
- Music Player (with 9 advanced features)

---

## Music Player

Feature-rich audio player with advanced playback capabilities and extensive customization options.

### Key Features

**Playback & Control**
- Single track and playlist support with auto-advance
- HLS/DASH live streaming (hls.js + Safari native)
- Volume control with mute functionality
- Shuffle and repeat modes

**Visualization & UI**
- Real-time audio visualization (bars, waveform, circle)
- 216 visual combinations (6 variants × 6 styles × 6 sizes)
- Light/dark mode with auto-detection
- Responsive design for all screen sizes

**Advanced Features**
- Media Session API integration (lock screen controls)
- Global state management (multi-instance sync)
- Web Audio API powered visualizations
- WCAG 2.1 AA accessibility compliant
- Buffering states and loading indicators

### Quick Start

```tsx
import { MusicPlayer } from '@/components/MusicPlayer'

export default function App() {
  return (
    <MusicPlayer
      trackName='Summer Nights'
      artist='Cool Band'
      cover='/cover.jpg'
      audioSrc='/song.mp3'
    />
  )
}
```

**[Complete documentation available in the Wiki →](https://github.com/thenolle/nolly-components/wiki)**

---

## Installation

```bash
git clone https://github.com/thenolle/nolly-components.git
cd nolly-components
npm install
npm run dev
```

Visit `http://localhost:3000` to see the live demos.

---

## Design Philosophy

**Modular Architecture**  
Each component is self-contained with minimal external dependencies. Import only what you need.

**Accessibility First**  
WCAG 2.1 AA compliant with full keyboard navigation, screen reader support, and ARIA labels.

**TypeScript Native**  
Fully typed with comprehensive type definitions. No `any` types, ever.

**Performance Optimized**  
Tree-shakeable exports, lazy loading support, optimized bundle size (~45KB gzipped).

**Zero Configuration**  
Works out of the box with sensible defaults. Customize when needed.

**Developer Experience**  
Intuitive prop APIs, comprehensive documentation, real-world examples.

---

## Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Native HLS support |
| Edge | 90+ | Full support |
| Opera | 76+ | Full support |

Mobile browsers fully supported (Chrome Android, Safari iOS, Firefox Android, Samsung Internet).

---

## Tech Stack

- **Framework:** Next.js 16 (React 19)
- **Language:** TypeScript 5.0
- **Styling:** Tailwind CSS 4.0
- **Icons:** Lucide React
- **Streaming:** hls.js
- **Audio:** Web Audio API
- **State:** React Context

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before submitting pull requests.

**Development Workflow:**
1. Fork the repository
2. Create feature branch (`git checkout -b feature/component-name`)
3. Commit changes (`git commit -m 'Add new component'`)
4. Push to branch (`git push origin feature/component-name`)
5. Open Pull Request

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

## Statistics

![Components](https://img.shields.io/badge/Components-1-blue)
![Bundle Size](https://img.shields.io/badge/Bundle%20Size-~45KB-green)
![Wiki Pages](https://img.shields.io/badge/Documentation-26%20Pages-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)

---

<div align='center'>

**[Read Documentation](https://github.com/thenolle/nolly-components/wiki)** • **[View Live Demo](https://thenolle.github.io/nolly-components)**

Made with ❤️ by [Nolly](https://thenolle.com)

[Website](https://thenolle.com) • [GitHub](https://github.com/thenolle) • [Patreon](https://patreon.com/c/_nolly)

</div>