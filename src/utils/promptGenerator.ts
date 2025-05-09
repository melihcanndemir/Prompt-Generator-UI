import type { PromptGeneratorConfig, GeneratedPrompt } from '../types/index';

export const generateProjectPrompt = (config: PromptGeneratorConfig): GeneratedPrompt => {
  const timestamp = new Date().toISOString();
  const { projectName } = config;
  
  // Base template including project name
  let promptContent = `Create a professional ${projectName} application with the following specifications:\n\n`;
  
  // Framework
  promptContent += `Framework: ${getFrameworkDescription(config)}\n`;
  
  // UI Library
  if (config.uiLibrary !== 'none') {
    promptContent += `UI Library: ${getUILibraryDescription(config)}\n`;
  }
  
  // State Management
  if (config.stateManagement !== 'none') {
    promptContent += `State Management: ${getStateManagementDescription(config)}\n`;
  }
  
  // Testing
  if (config.testing !== 'none') {
    promptContent += `Testing: ${getTestingDescription(config)}\n`;
  }
  
  // Linting
  if (config.linting !== 'none') {
    promptContent += `Linting: ${getLintingDescription(config)}\n`;
  }
  
  // Database
  if (config.database !== 'none') {
    promptContent += `Database: ${getDatabaseDescription(config)}\n`;
  }
  
  // Authentication
  if (config.authentication !== 'none') {
    promptContent += `Authentication: ${getAuthenticationDescription(config)}\n`;
  }
  
  // Additional options
  const additionalFeatures: string[] = [];
  
  if (config.typescript) {
    additionalFeatures.push('TypeScript for type safety');
  }
  
  if (config.pwa) {
    additionalFeatures.push('Progressive Web App (PWA) support');
  }
  
  if (config.i18n) {
    additionalFeatures.push('Internationalization (i18n) support');
  }
  
  if (config.seo) {
    additionalFeatures.push('SEO optimization');
  }
  
  if (config.analytics) {
    additionalFeatures.push('Analytics integration');
  }
  
  if (config.darkMode) {
    additionalFeatures.push('Dark mode support');
  }
  
  if (additionalFeatures.length > 0) {
    promptContent += `\nAdditional Features:\n`;
    additionalFeatures.forEach(feature => {
      promptContent += `- ${feature}\n`;
    });
  }
  
  // Project requirements
  promptContent += `\nRequirements:\n`;
  promptContent += `- Follow best practices for clean code and folder structure\n`;
  promptContent += `- Implement responsive design for all screen sizes\n`;
  promptContent += `- Include comprehensive documentation\n`;
  
  if (config.cicd !== 'none') {
    promptContent += `- Set up ${getCICDDescription(config)}\n`;
  }
  
  // Optional requirements
  if (config.optionalRequirements && config.optionalRequirements.trim() !== '') {
    promptContent += `\nOptional Requirements:\n${config.optionalRequirements}\n`;
  }
  
  return {
    title: `${projectName} Project Prompt`,
    content: promptContent,
    timestamp
  };
};

export const generateCICDPrompt = (config: PromptGeneratorConfig): GeneratedPrompt => {
  const timestamp = new Date().toISOString();
  const { projectName, cicd, testing, linting } = config;
  
  let promptContent = `Set up CI/CD pipeline for ${projectName} using ${getCICDOption(cicd)}:\n\n`;
  
  // Basic pipeline structure
  promptContent += `Create a complete CI/CD workflow that includes:\n\n`;
  
  promptContent += `- Build and compilation steps\n`;
  
  // Add testing if selected
  if (testing !== 'none') {
    promptContent += `- Run ${getTestingOption(testing)} tests\n`;
  }
  
  // Add linting if selected
  if (linting !== 'none') {
    promptContent += `- ${getLintingOption(linting)} checks\n`;
  }
  
  // Deployment environments
  promptContent += `- Deployment to multiple environments (development, staging, production)\n`;
  promptContent += `- Environment-specific configuration management\n`;
  
  // Security and best practices
  promptContent += `\nAdditional requirements:\n`;
  promptContent += `- Implement security scanning for vulnerabilities\n`;
  promptContent += `- Set up caching for faster builds\n`;
  promptContent += `- Configure notifications for build status\n`;
  promptContent += `- Add appropriate error handling and reporting\n`;
  
  // Optional requirements
  if (config.optionalRequirements && config.optionalRequirements.trim() !== '') {
    promptContent += `\nOptional Requirements:\n${config.optionalRequirements}\n`;
  }
  
  return {
    title: `${projectName} CI/CD Prompt`,
    content: promptContent,
    timestamp
  };
};

// Helper functions for detailed descriptions

const getFrameworkDescription = (config: PromptGeneratorConfig): string => {
  const { framework } = config;
  const typescriptNote = config.typescript ? ' with TypeScript support' : '';
  
  switch (framework) {
    case 'react':
      return `React${typescriptNote} for building a dynamic user interface`;
    case 'nextjs':
      return `Next.js${typescriptNote} for server-side rendering and optimized performance`;
    case 'vite':
      return `Vite${typescriptNote} for fast development and optimized builds`;
    case 'remix':
      return `Remix${typescriptNote} for server-rendered React with modern UX patterns`;
    case 'astro':
      return `Astro${typescriptNote} for content-focused static site generation`;
    case 'gatsby':
      return `Gatsby${typescriptNote} for optimized static site generation`;
    default:
      return framework;
  }
};

const getUILibraryDescription = (config: PromptGeneratorConfig): string => {
  const { uiLibrary } = config;
  
  switch (uiLibrary) {
    case 'tailwind':
      return 'Tailwind CSS for utility-first styling';
    case 'mui':
      return 'Material UI for Google Material Design components';
    case 'chakra':
      return 'Chakra UI for accessible and customizable components';
    case 'antd':
      return 'Ant Design for enterprise-level UI components';
    case 'bootstrap':
      return 'Bootstrap for responsive UI components';
    default:
      return uiLibrary;
  }
};

const getStateManagementDescription = (config: PromptGeneratorConfig): string => {
  const { stateManagement } = config;
  
  switch (stateManagement) {
    case 'redux':
      return 'Redux for predictable state management';
    case 'zustand':
      return 'Zustand for simple and scalable state management';
    case 'jotai':
      return 'Jotai for atomic state management';
    case 'recoil':
      return 'Recoil for flexible state management';
    case 'mobx':
      return 'MobX for reactive state management';
    default:
      return stateManagement;
  }
};

const getTestingDescription = (config: PromptGeneratorConfig): string => {
  const { testing } = config;
  
  switch (testing) {
    case 'jest':
      return 'Jest for unit and integration testing';
    case 'vitest':
      return 'Vitest for fast unit testing';
    case 'cypress':
      return 'Cypress for end-to-end testing';
    case 'playwright':
      return 'Playwright for cross-browser testing';
    case 'rtl':
      return 'React Testing Library for component testing';
    default:
      return testing;
  }
};

const getLintingDescription = (config: PromptGeneratorConfig): string => {
  const { linting } = config;
  
  switch (linting) {
    case 'eslint':
      return 'ESLint for code quality enforcement';
    case 'prettier':
      return 'Prettier for consistent code formatting';
    case 'both':
      return 'ESLint and Prettier for code quality and formatting';
    default:
      return linting;
  }
};

const getDatabaseDescription = (config: PromptGeneratorConfig): string => {
  const { database } = config;
  
  switch (database) {
    case 'mongodb':
      return 'MongoDB for document-based data storage';
    case 'postgresql':
      return 'PostgreSQL for relational data storage';
    case 'mysql':
      return 'MySQL for relational data storage';
    case 'sqlite':
      return 'SQLite for lightweight relational data storage';
    case 'supabase':
      return 'Supabase for backend-as-a-service with PostgreSQL';
    case 'firebase':
      return 'Firebase for cloud-based data storage and real-time updates';
    default:
      return database;
  }
};

const getAuthenticationDescription = (config: PromptGeneratorConfig): string => {
  const { authentication } = config;
  
  switch (authentication) {
    case 'oauth':
      return 'OAuth for third-party authentication';
    case 'jwt':
      return 'JWT for secure token-based authentication';
    case 'firebase':
      return 'Firebase Authentication for user management';
    case 'auth0':
      return 'Auth0 for enterprise-grade authentication';
    case 'clerk':
      return 'Clerk for complete user management';
    default:
      return authentication;
  }
};

const getCICDDescription = (config: PromptGeneratorConfig): string => {
  const { cicd } = config;
  
  switch (cicd) {
    case 'github':
      return 'GitHub Actions for continuous integration and deployment';
    case 'gitlab':
      return 'GitLab CI/CD for continuous integration and deployment';
    case 'jenkins':
      return 'Jenkins for continuous integration and deployment';
    case 'azure':
      return 'Azure Pipelines for continuous integration and deployment';
    case 'circle':
      return 'CircleCI for continuous integration and deployment';
    default:
      return cicd;
  }
};

// Simple label functions for concise prompts
const getCICDOption = (cicd: string): string => {
  switch (cicd) {
    case 'github': return 'GitHub Actions';
    case 'gitlab': return 'GitLab CI/CD';
    case 'jenkins': return 'Jenkins';
    case 'azure': return 'Azure Pipelines';
    case 'circle': return 'CircleCI';
    default: return cicd;
  }
};

const getTestingOption = (testing: string): string => {
  switch (testing) {
    case 'jest': return 'Jest';
    case 'vitest': return 'Vitest';
    case 'cypress': return 'Cypress';
    case 'playwright': return 'Playwright';
    case 'rtl': return 'React Testing Library';
    default: return testing;
  }
};

const getLintingOption = (linting: string): string => {
  switch (linting) {
    case 'eslint': return 'ESLint';
    case 'prettier': return 'Prettier';
    case 'both': return 'ESLint and Prettier';
    default: return linting;
  }
}; 