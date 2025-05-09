import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { 
  PromptGeneratorConfig, 
  GeneratedPrompt, 
  Framework, 
  UILibrary, 
  StateManagement,
  Testing, 
  Linting, 
  CICD, 
  Database, 
  Authentication,
  SavedTemplate
} from '../types/index';
import { generateProjectPrompt, generateCICDPrompt } from '../utils/promptGenerator';

interface PromptStore {
  // Form state
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
  
  // App theme state
  siteThemeDark: boolean;
  toggleSiteTheme: () => void;
  
  // Generated prompts
  generatedPrompts: GeneratedPrompt[];
  
  // Saved templates
  savedTemplates: SavedTemplate[];
  
  // Actions
  setProjectName: (name: string) => void;
  setFramework: (framework: Framework) => void;
  setUILibrary: (library: UILibrary) => void;
  setStateManagement: (stateManagement: StateManagement) => void;
  setTesting: (testing: Testing) => void;
  setLinting: (linting: Linting) => void;
  setCICD: (cicd: CICD) => void;
  setDatabase: (database: Database) => void;
  setAuthentication: (auth: Authentication) => void;
  setTypescript: (enabled: boolean) => void;
  setPWA: (enabled: boolean) => void;
  setI18n: (enabled: boolean) => void;
  setSEO: (enabled: boolean) => void;
  setAnalytics: (enabled: boolean) => void;
  setDarkMode: (enabled: boolean) => void;
  setOptionalRequirements: (requirements: string) => void;
  
  // Helper functions
  resetForm: () => void;
  generateProjectPrompt: () => void;
  generateCICDPrompt: () => void;
  clearPrompts: () => void;
  deletePrompt: (index: number) => void;
  
  // Share functionality
  sharePrompt: (prompt: GeneratedPrompt) => string;
  addSharedPrompt: (prompt: GeneratedPrompt) => void;
  
  // Template management
  saveCurrentAsTemplate: (name: string, description: string) => void;
  loadTemplate: (templateId: string) => void;
  deleteTemplate: (templateId: string) => void;
  updateTemplate: (templateId: string, updates: Partial<SavedTemplate>) => void;
  importTemplates: (templatesData: string) => { success: boolean; count: number; error?: string };
}

const initialState = {
  projectName: '',
  framework: 'react' as Framework,
  uiLibrary: 'none' as UILibrary,
  stateManagement: 'none' as StateManagement,
  testing: 'none' as Testing,
  linting: 'none' as Linting,
  cicd: 'none' as CICD,
  database: 'none' as Database,
  authentication: 'none' as Authentication,
  typescript: true,
  pwa: false,
  i18n: false,
  seo: false,
  analytics: false,
  darkMode: false,
  optionalRequirements: '',
  siteThemeDark: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
  generatedPrompts: [],
  savedTemplates: []
};

export const usePromptStore = create<PromptStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // Setters
        setProjectName: (name: string) => set({ projectName: name }),
        setFramework: (framework: Framework) => set({ framework }),
        setUILibrary: (uiLibrary: UILibrary) => set({ uiLibrary }),
        setStateManagement: (stateManagement: StateManagement) => set({ stateManagement }),
        setTesting: (testing: Testing) => set({ testing }),
        setLinting: (linting: Linting) => set({ linting }),
        setCICD: (cicd: CICD) => set({ cicd }),
        setDatabase: (database: Database) => set({ database }),
        setAuthentication: (authentication: Authentication) => set({ authentication }),
        setTypescript: (typescript: boolean) => set({ typescript }),
        setPWA: (pwa: boolean) => set({ pwa }),
        setI18n: (i18n: boolean) => set({ i18n }),
        setSEO: (seo: boolean) => set({ seo }),
        setAnalytics: (analytics: boolean) => set({ analytics }),
        setDarkMode: (darkMode: boolean) => set({ darkMode }),
        setOptionalRequirements: (optionalRequirements: string) => set({ optionalRequirements }),
        
        toggleSiteTheme: () => {
          const newThemeState = !get().siteThemeDark;
          if (newThemeState) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          set({ siteThemeDark: newThemeState });
        },
        
        // Helper functions
        resetForm: () => set({ ...initialState, generatedPrompts: get().generatedPrompts, savedTemplates: get().savedTemplates, siteThemeDark: get().siteThemeDark }),
        
        generateProjectPrompt: () => {
          const config: PromptGeneratorConfig = {
            projectName: get().projectName,
            framework: get().framework,
            uiLibrary: get().uiLibrary,
            stateManagement: get().stateManagement,
            testing: get().testing,
            linting: get().linting,
            cicd: get().cicd,
            database: get().database,
            authentication: get().authentication,
            typescript: get().typescript,
            pwa: get().pwa,
            i18n: get().i18n,
            seo: get().seo,
            analytics: get().analytics,
            darkMode: get().darkMode,
            optionalRequirements: get().optionalRequirements
          };
          
          // Validate necessary fields are present
          if (!config.projectName) {
            console.error('Project name is required');
            return;
          }
          
          const prompt = generateProjectPrompt(config);
          set((state) => ({
            generatedPrompts: [prompt, ...state.generatedPrompts]
          }));
        },
        
        generateCICDPrompt: () => {
          const config: PromptGeneratorConfig = {
            projectName: get().projectName,
            framework: get().framework,
            uiLibrary: get().uiLibrary,
            stateManagement: get().stateManagement,
            testing: get().testing,
            linting: get().linting,
            cicd: get().cicd,
            database: get().database,
            authentication: get().authentication,
            typescript: get().typescript,
            pwa: get().pwa,
            i18n: get().i18n,
            seo: get().seo,
            analytics: get().analytics,
            darkMode: get().darkMode,
            optionalRequirements: get().optionalRequirements
          };
          
          // Validate necessary fields
          if (!config.projectName) {
            console.error('Project name is required');
            return;
          }
          
          if (config.cicd === 'none') {
            console.error('CI/CD option must be selected');
            return;
          }
          
          const prompt = generateCICDPrompt(config);
          set((state) => ({
            generatedPrompts: [prompt, ...state.generatedPrompts]
          }));
        },
        
        clearPrompts: () => set({ generatedPrompts: [] }),
        
        deletePrompt: (index: number) => set((state) => {
          const updatedPrompts = [...state.generatedPrompts];
          updatedPrompts.splice(index, 1);
          return { generatedPrompts: updatedPrompts };
        }),
        
        // Share functionality
        sharePrompt: (prompt: GeneratedPrompt): string => {
          // Create a base64 encoded version of the prompt
          const promptData = JSON.stringify(prompt);
          const encodedPrompt = btoa(encodeURIComponent(promptData));
          
          // Create a shareable URL with the encoded prompt
          const shareUrl = `${window.location.origin}${window.location.pathname}?shared=${encodedPrompt}`;
          return shareUrl;
        },
        
        addSharedPrompt: (prompt: GeneratedPrompt) => {
          set((state) => ({
            generatedPrompts: [prompt, ...state.generatedPrompts]
          }));
        },
        
        // Template management
        saveCurrentAsTemplate: (name: string, description: string) => {
          if (!name.trim()) {
            console.error('Template name is required');
            return;
          }
          
          const newTemplate: SavedTemplate = {
            id: uuidv4(),
            name,
            description,
            createdAt: new Date().toISOString(),
            config: {
              framework: get().framework,
              uiLibrary: get().uiLibrary,
              stateManagement: get().stateManagement,
              testing: get().testing,
              linting: get().linting,
              cicd: get().cicd,
              database: get().database,
              authentication: get().authentication,
              typescript: get().typescript,
              pwa: get().pwa,
              i18n: get().i18n,
              seo: get().seo,
              analytics: get().analytics,
              darkMode: get().darkMode,
              optionalRequirements: get().optionalRequirements
            }
          };
          
          set((state) => ({
            savedTemplates: [newTemplate, ...state.savedTemplates]
          }));
        },
        
        loadTemplate: (templateId: string) => {
          const template = get().savedTemplates.find(t => t.id === templateId);
          
          if (!template) {
            console.error('Template not found');
            return;
          }
          
          set({
            framework: template.config.framework,
            uiLibrary: template.config.uiLibrary,
            stateManagement: template.config.stateManagement,
            testing: template.config.testing,
            linting: template.config.linting,
            cicd: template.config.cicd,
            database: template.config.database,
            authentication: template.config.authentication,
            typescript: template.config.typescript,
            pwa: template.config.pwa,
            i18n: template.config.i18n,
            seo: template.config.seo,
            analytics: template.config.analytics,
            darkMode: template.config.darkMode,
            optionalRequirements: template.config.optionalRequirements
          });
        },
        
        deleteTemplate: (templateId: string) => {
          set((state) => ({
            savedTemplates: state.savedTemplates.filter(template => template.id !== templateId)
          }));
        },
        
        updateTemplate: (templateId: string, updates: Partial<SavedTemplate>) => {
          set((state) => ({
            savedTemplates: state.savedTemplates.map(template => 
              template.id === templateId 
                ? { ...template, ...updates } 
                : template
            )
          }));
        },
        
        importTemplates: (templatesData: string) => {
          try {
            // Parse the JSON data
            const templates = JSON.parse(templatesData);
            
            // Validate it's an array
            if (!Array.isArray(templates)) {
              return { success: false, count: 0, error: 'Invalid format: Data is not an array' };
            }
            
            // Validate each template
            const validTemplates: SavedTemplate[] = [];
            
            for (const template of templates) {
              // Basic structure validation
              if (
                !template ||
                typeof template !== 'object' ||
                !template.name ||
                !template.config ||
                typeof template.config !== 'object'
              ) {
                continue;
              }
              
              // Ensure it has an ID and createdAt date
              const validTemplate: SavedTemplate = {
                id: template.id || uuidv4(),
                name: template.name,
                description: template.description || '',
                createdAt: template.createdAt || new Date().toISOString(),
                config: {
                  framework: template.config.framework || 'react',
                  uiLibrary: template.config.uiLibrary || 'none',
                  stateManagement: template.config.stateManagement || 'none',
                  testing: template.config.testing || 'none',
                  linting: template.config.linting || 'none',
                  cicd: template.config.cicd || 'none',
                  database: template.config.database || 'none',
                  authentication: template.config.authentication || 'none',
                  typescript: Boolean(template.config.typescript),
                  pwa: Boolean(template.config.pwa),
                  i18n: Boolean(template.config.i18n),
                  seo: Boolean(template.config.seo),
                  analytics: Boolean(template.config.analytics),
                  darkMode: Boolean(template.config.darkMode),
                  optionalRequirements: template.config.optionalRequirements || ''
                }
              };
              
              validTemplates.push(validTemplate);
            }
            
            if (validTemplates.length === 0) {
              return { success: false, count: 0, error: 'No valid templates found in the imported data' };
            }
            
            // Add to templates
            set((state) => ({
              savedTemplates: [...validTemplates, ...state.savedTemplates]
            }));
            
            return { success: true, count: validTemplates.length };
          } catch (err) {
            console.error('Error importing templates:', err);
            return { success: false, count: 0, error: 'Invalid JSON format or corrupted data' };
          }
        }
      }),
      {
        name: 'prompt-generator-storage'
      }
    )
  )
); 