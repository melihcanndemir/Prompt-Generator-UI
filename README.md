# Professional Prompt Generator UI

A FAANG-level web application for generating high-quality, professional prompts for development projects. Built with React, Vite, TypeScript, and Tailwind CSS.

## Features

- Generate detailed project setup prompts based on your configuration
- Select from a variety of frameworks, UI libraries, state management solutions, and more
- Create CI/CD workflow prompts tailored to your project
- Real-time prompt generation with copy-to-clipboard functionality
- Save and manage prompt templates for reuse
- Export prompts in various formats (text, markdown, JSON)
- Share prompts via URL
- Fully responsive design with dark mode support
- Type-safe implementation with TypeScript

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Storage**: Local browser persistence
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/melihcanndemir/Prompt-Generator-UI.git
cd Prompt-Generator-UI
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## Usage

1. Enter your project name
2. Select your preferred technologies and options:
   - Framework (React, Next.js, Vite, etc.)
   - UI Library (Tailwind, Material UI, etc.)
   - State Management (Redux, Zustand, etc.)
   - Testing tools (Jest, Vitest, etc.)
   - Linting & Formatting (ESLint, Prettier)
   - CI/CD solutions
   - Database options
   - Authentication methods
3. Toggle additional features like TypeScript, PWA support, i18n, etc.
4. Click "Generate Project Prompt" or "Generate CI/CD Prompt"
5. Copy the generated prompt to use with AI assistants or developer documentation
6. Save prompts as templates for future use
7. Share prompts with others via the export or share functionality

## Template Management

- Save current configurations as reusable templates
- Load templates to quickly populate form fields
- Edit and delete templates
- Import/export templates as JSON

## Build for Production

```bash
npm run build
```

The output will be in the `dist` directory.

## Deployment

This project is configured for deployment to Netlify:

```bash
npm run deploy       # Deploy to Netlify (preview)
npm run deploy:prod  # Deploy to Netlify (production)
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vite team for the lightning-fast build tool
- Zustand for the simple state management

---

Built with ❤️ by [Melih Can Demir](https://github.com/melihcanndemir)
