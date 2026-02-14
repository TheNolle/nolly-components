# Contributing to Nolly Components

Thank you for your interest in contributing to Nolly Components!

## Table of Contents

- [Contributing to Nolly Components](#contributing-to-nolly-components)
  - [Table of Contents](#table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [How Can I Contribute?](#how-can-i-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Components](#suggesting-components)
    - [Adding New Components](#adding-new-components)
  - [Development Setup](#development-setup)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Component Guidelines](#component-guidelines)
    - [File Structure](#file-structure)
    - [Requirements:](#requirements)
    - [Optional Features](#optional-features)
  - [Code Style](#code-style)
  - [Commit Guidelines](#commit-guidelines)
    - [Pull Request Process](#pull-request-process)
  - [Testing Checklist](#testing-checklist)
  - [Questions ?](#questions-)
  - [License](#license)

---

## Code of Conduct

This project adheres to our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

## How Can I Contribute?

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/thenolle/nolly-components/issues)
2. If not, create a new issue using the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md)
3. Include:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/OS version
   - Component name and props used
   - Code snippet or CodeSandbox link

### Suggesting Components

1. Check [existing component requests](https://github.com/thenolle/nolly-components/issues?q=is%3Aissue+is%3Aopen+label%3Acomponent-request)
2. Create a new issue with:
   - Component name
   - Use case
   - API design proposal (props, types)
   - Design mockups or references
   - Similar components in other libraries

### Adding New Components

1. Create an issue first to discuss the component
2. Get approval from maintainers
3. Follow the [Component Guidelines](#component-guidelines)
4. Submit a PR with:
   - Component code
   - TypeScript types
   - Documentation
   - Example usage
   - Showcase page

---

## Development Setup

### Prerequisites

- Node.js 20+
- pnpm 8+ (recommended) or npm/yarn

### Installation

```bash
# Clone your fork
git clone https://github.com/thenolle/nolly-components.git
cd nolly-components

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

Project structure:
```
components/          # All reusable components
├── MusicPlayer.tsx
└── YourComponent.tsx

contexts/            # React Context providers
├── AudioPlayerContext.tsx
└── YourContext.tsx

app/                 # Next.js pages
├── layout.tsx
├── page.tsx
└── your-component/
    └── page.tsx     # Component showcase page

lib/                 # Utilities
└── utils.ts
```

---

## Component Guidelines

### File Structure

Each component should follow this structure:
```tsx
'use client'

import React from 'react'
import { YourDependency } from 'your-dependency'

// Types at the top
type YourComponentProps = {
  prop1: string
  prop2?: number
  onAction?: () => void
  className?: string
}

// Helper functions
function helperFunction() {
  // ...
}

// Main component
export function YourComponent({
  prop1,
  prop2 = 0,
  onAction,
  className = ''
}: YourComponentProps) {
  const [state, setState] = React.useState(false)

  return (
    <div className={className}>
      {/* Component JSX */}
    </div>
  )
}
```

### Requirements:

All components must have:
1. **TypeScript types**: Fully typed props with no any
2. **Accessibility**: ARIA labels, keyboard navigation, focus management
3. **Responsive design**: Works on mobile, tablet, desktop
4. **Variants system**: Size, style, or theme variants
5. **Dark mode support**: Auto-detects or manual prop
6. **Documentation**: JSDoc comments on props
7. **Example usage**: Showcase page in app/

### Optional Features

Consider adding:
- Global state management (via Context)
- Animation/motion variants
- Reduced motion support
- Multiple visual themes
- Keyboard shortcuts
- Custom event handlers

---

## Code Style

General Rules
- **No semicolons**
- **Single quotes** for strings
- **2 spaces** for indentation
- **DRY principle**: Don't repeat yourself
- **Modular code**: Extract helpers and utilities
- **Descriptive names**: `handleSubmit` not `doThing`

TypeScript
```ts
// Good
type ButtonProps = {
  variant: 'primary' | 'secondary'
  size: 'sm' | 'md' | 'lg'
  onClick?: () => void
  children: React.ReactNode
}

// Bad
type ButtonProps = {
  variant: string
  size: any
  onClick: Function
  children: any
}
```

React Hooks
```tsx
// Good
const [count, setCount] = React.useState(0)
const handleClick = React.useCallback(() => {
  setCount(prev => prev + 1)
}, [])

// Bad
const [count, setCount] = useState(0)
const handleClick = () => setCount(count + 1)
```

CSS Classes
```tsx
// Good
<div className='flex items-center gap-4 rounded-lg bg-white p-4 shadow-md dark:bg-gray-900'>

// Bad
<div className='flex items-center gap-4' style={{ borderRadius: '8px', backgroundColor: 'white' }}>
```

Commenting
```tsx
// Good - Document complex logic
const calculateVolume = (clientY: number) => {
  // Convert mouse Y position to volume (0-1)
  // Invert because Y increases downward
  const rect = volumeRef.current.getBoundingClientRect()
  return 1 - (clientY - rect.top) / rect.height
}

// Bad - Obvious comments
const handleClick = () => {
  // Set count to count + 1
  setCount(count + 1)
}
```

---

## Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):
```bash
feat: add button component
fix: resolve music player volume bug
docs: update readme with installation steps
style: format code with prettier
refactor: extract audio context setup
test: add music player unit tests
chore: update dependencies
```

Commit Message Format
```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, no logic change)
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

Example:
```bash
feat(music-player): add waveform visualizer

Added a new waveform visualizer option that uses Web Audio API
to render audio frequency data as a line graph.

Closes #42
```

---

### Pull Request Process

Before Submitting
- [ ] Code follows the style guide
- [ ] All TypeScript types are correct
- [ ] Component is fully accessible
- [ ] Works in light and dark modes
- [ ] Responsive on all screen sizes
- [ ] No console errors or warnings
- [ ] Documentation is updated
- [ ] Example/showcase page is added

PR Checklist
1. Branch naming: feature/component-name or fix/issue-description
2. PR title: Follow commit message format
3. Description: Include:
   - What changed
   - Why it changed
   - Screenshots/videos (for UI changes)
   - Related issue: Closes #123
4. Testing: Describe how you tested
5. Breaking changes: Document any breaking changes

Review Process
1. Automated checks: GitHub Actions will run linting and build
2. Code review: Maintainer will review within 3-5 days
3. Feedback: Address any requested changes
4. Approval: Once approved, maintainer will merge
5. Release: Component will be included in next release

---

## Testing Checklist

Before submitting, manually test:

Music Player (or your component)
- [ ] All variants render correctly (default, glass, minimal, neon, soft, elevated)
- [ ] All styles work (filled, outline, ghost, soft, blur, flat)
- [ ] All sizes display properly (xs, sm, md, lg, xl, 2xl)
- [ ] All visualizers animate (none, bars, waveform, circle)
- [ ] Playlist queue functions (next, prev, shuffle, auto-advance)
- [ ] HLS streaming works (test with .m3u8 URL)
- [ ] Global state syncs multiple instances
- [ ] Light/dark modes toggle correctly
- [ ] Reduced motion respects accessibility
- [ ] Volume control works (slider + mute)
- [ ] Progress bar is accurate and seekable
- [ ] Buffering indicator appears when loading
- [ ] Media Session API works (lock screen controls)
- [ ] Works on Chrome, Firefox, Safari, Edge
- [ ] Responsive on mobile, tablet, desktop
- [ ] Keyboard navigation works (tab, enter, space)
- [ ] Screen reader announces content correctly

---

## Questions ?

- General questions: Open a [Discussion](https://github.com/thenolle/nolly-components/discussions)
- Bug reports: Use the [Bug Report template](https://github.com/thenolle/nolly-components/issues/new?template=bug_report.md)
- Component requests: Use the [Feature Request template](https://github.com/thenolle/nolly-components/issues/new?template=feature_request.md)

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

Thank you for contributing to Nolly Components!