export type Framework = 'react' | 'nextjs' | 'vite' | 'remix' | 'astro' | 'gatsby';
export type UILibrary = 'none' | 'tailwind' | 'mui' | 'chakra' | 'antd' | 'bootstrap';
export type StateManagement = 'none' | 'redux' | 'zustand' | 'jotai' | 'recoil' | 'mobx';
export type Testing = 'none' | 'jest' | 'vitest' | 'cypress' | 'playwright' | 'rtl';
export type Linting = 'none' | 'eslint' | 'prettier' | 'both';
export type CICD = 'none' | 'github' | 'gitlab' | 'jenkins' | 'azure' | 'circle';
export type Database = 'none' | 'mongodb' | 'postgresql' | 'mysql' | 'sqlite' | 'supabase' | 'firebase';
export type Authentication = 'none' | 'oauth' | 'jwt' | 'firebase' | 'auth0' | 'clerk';

export interface PromptGeneratorConfig {
  projectName: string;
  framework: Framework;
  uiLibrary: UILibrary;
  stateManagement: StateManagement;
  testing: Testing;
  linting: Linting;
  cicd: CICD;
  database: Database;
  authentication: Authentication;
  typescript: boolean;
  pwa: boolean;
  i18n: boolean;
  seo: boolean;
  analytics: boolean;
  darkMode: boolean;
  optionalRequirements: string;
}

export interface SavedTemplate {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  config: Omit<PromptGeneratorConfig, 'projectName'>;
}

export interface Option {
  value: string;
  label: string;
  description: string;
}

export interface CategoryOptions {
  frameworks: Option[];
  uiLibraries: Option[];
  stateManagement: Option[];
  testing: Option[];
  linting: Option[];
  cicd: Option[];
  database: Option[];
  authentication: Option[];
}

export type Category = keyof CategoryOptions;

export interface FormSection {
  id: string;
  title: string;
  description: string;
  category: Category;
}

export interface GeneratedPrompt {
  title: string;
  content: string;
  timestamp: string;
} 