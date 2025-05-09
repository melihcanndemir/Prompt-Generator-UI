import type { FormSection } from '../types/index';

export const FORM_SECTIONS: FormSection[] = [
  {
    id: 'frameworks',
    title: 'Frameworks',
    description: 'Choose the framework for your project',
    category: 'frameworks'
  },
  {
    id: 'uiLibraries',
    title: 'UI Libraries',
    description: 'Select a UI component library',
    category: 'uiLibraries'
  },
  {
    id: 'stateManagement',
    title: 'State Management',
    description: 'Choose how to manage application state',
    category: 'stateManagement'
  },
  {
    id: 'testing',
    title: 'Testing',
    description: 'Select testing tools for your project',
    category: 'testing'
  },
  {
    id: 'linting',
    title: 'Linting & Formatting',
    description: 'Choose code quality tools',
    category: 'linting'
  },
  {
    id: 'cicd',
    title: 'CI/CD',
    description: 'Select continuous integration and deployment solution',
    category: 'cicd'
  },
  {
    id: 'database',
    title: 'Database',
    description: 'Choose a database solution',
    category: 'database'
  },
  {
    id: 'authentication',
    title: 'Authentication',
    description: 'Select authentication method',
    category: 'authentication'
  }
]; 