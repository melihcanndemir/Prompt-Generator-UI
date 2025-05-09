import type { CategoryOptions } from '../types/index';

export const CATEGORY_OPTIONS: CategoryOptions = {
  frameworks: [
    {
      value: 'react',
      label: 'React',
      description: 'A JavaScript library for building user interfaces'
    },
    {
      value: 'nextjs',
      label: 'Next.js',
      description: 'The React framework for production with server-side rendering'
    },
    {
      value: 'vite',
      label: 'Vite',
      description: 'Next generation frontend tooling with fast HMR'
    },
    {
      value: 'remix',
      label: 'Remix',
      description: 'Full stack web framework focusing on web standards and modern UX'
    },
    {
      value: 'astro',
      label: 'Astro',
      description: 'Framework for building fast, content-focused websites'
    },
    {
      value: 'gatsby',
      label: 'Gatsby',
      description: 'Static site generator and framework built on React'
    }
  ],
  
  uiLibraries: [
    {
      value: 'none',
      label: 'None',
      description: 'No UI library, custom styling only'
    },
    {
      value: 'tailwind',
      label: 'Tailwind CSS',
      description: 'A utility-first CSS framework for rapid UI development'
    },
    {
      value: 'mui',
      label: 'Material UI',
      description: 'React components that implement Google Material Design'
    },
    {
      value: 'chakra',
      label: 'Chakra UI',
      description: 'A simple, modular and accessible component library'
    },
    {
      value: 'antd',
      label: 'Ant Design',
      description: 'A design system for enterprise-level products'
    },
    {
      value: 'bootstrap',
      label: 'Bootstrap',
      description: 'Popular HTML, CSS, and JS framework for responsive sites'
    }
  ],
  
  stateManagement: [
    {
      value: 'none',
      label: 'None',
      description: 'No state management library, using React hooks only'
    },
    {
      value: 'redux',
      label: 'Redux',
      description: 'Predictable state container for JavaScript apps'
    },
    {
      value: 'zustand',
      label: 'Zustand',
      description: 'Small, fast and scalable state-management solution'
    },
    {
      value: 'jotai',
      label: 'Jotai',
      description: 'Primitive and flexible state management for React'
    },
    {
      value: 'recoil',
      label: 'Recoil',
      description: 'State management library for React from Facebook'
    },
    {
      value: 'mobx',
      label: 'MobX',
      description: 'Simple, scalable state management'
    }
  ],
  
  testing: [
    {
      value: 'none',
      label: 'None',
      description: 'No testing framework included'
    },
    {
      value: 'jest',
      label: 'Jest',
      description: 'Delightful JavaScript testing framework with a focus on simplicity'
    },
    {
      value: 'vitest',
      label: 'Vitest',
      description: 'Blazing fast unit test framework powered by Vite'
    },
    {
      value: 'cypress',
      label: 'Cypress',
      description: 'Fast, easy and reliable testing for anything that runs in a browser'
    },
    {
      value: 'playwright',
      label: 'Playwright',
      description: 'Reliable end-to-end testing for modern web apps'
    },
    {
      value: 'rtl',
      label: 'React Testing Library',
      description: 'Simple and complete testing utilities for React'
    }
  ],
  
  linting: [
    {
      value: 'none',
      label: 'None',
      description: 'No linting or formatting tools'
    },
    {
      value: 'eslint',
      label: 'ESLint',
      description: 'Find and fix problems in your JavaScript code'
    },
    {
      value: 'prettier',
      label: 'Prettier',
      description: 'An opinionated code formatter'
    },
    {
      value: 'both',
      label: 'ESLint + Prettier',
      description: 'Integrated linting and formatting'
    }
  ],
  
  cicd: [
    {
      value: 'none',
      label: 'None',
      description: 'No CI/CD configuration'
    },
    {
      value: 'github',
      label: 'GitHub Actions',
      description: 'Automate workflows with GitHub Actions'
    },
    {
      value: 'gitlab',
      label: 'GitLab CI/CD',
      description: 'Configure builds, tests, and deployments with GitLab'
    },
    {
      value: 'jenkins',
      label: 'Jenkins',
      description: 'Build, deploy, and automate projects with Jenkins'
    },
    {
      value: 'azure',
      label: 'Azure Pipelines',
      description: 'Continuous integration and delivery with Azure DevOps'
    },
    {
      value: 'circle',
      label: 'CircleCI',
      description: 'Continuous integration and delivery platform'
    }
  ],
  
  database: [
    {
      value: 'none',
      label: 'None',
      description: 'No database integration'
    },
    {
      value: 'mongodb',
      label: 'MongoDB',
      description: 'Document database with scalability and flexibility'
    },
    {
      value: 'postgresql',
      label: 'PostgreSQL',
      description: 'Powerful open source object-relational database'
    },
    {
      value: 'mysql',
      label: 'MySQL',
      description: 'Popular open-source relational database'
    },
    {
      value: 'sqlite',
      label: 'SQLite',
      description: 'Self-contained, serverless, zero-configuration SQL database'
    },
    {
      value: 'supabase',
      label: 'Supabase',
      description: 'Open source Firebase alternative with PostgreSQL backend'
    },
    {
      value: 'firebase',
      label: 'Firebase',
      description: 'Platform for building web and mobile applications'
    }
  ],
  
  authentication: [
    {
      value: 'none',
      label: 'None',
      description: 'No authentication integration'
    },
    {
      value: 'oauth',
      label: 'OAuth',
      description: 'Open standard for access delegation'
    },
    {
      value: 'jwt',
      label: 'JWT',
      description: 'JSON Web Tokens for secure authentication'
    },
    {
      value: 'firebase',
      label: 'Firebase Auth',
      description: 'Authentication system by Firebase'
    },
    {
      value: 'auth0',
      label: 'Auth0',
      description: 'Authentication and authorization platform'
    },
    {
      value: 'clerk',
      label: 'Clerk',
      description: 'Complete user management solution'
    }
  ]
}; 