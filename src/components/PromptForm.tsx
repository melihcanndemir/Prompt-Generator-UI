import React, { useState } from "react";
import { usePromptStore } from "../store/promptStore";
import { OptionSelector } from "./OptionSelector";
import { ToggleOption } from "./ToggleOption";
import { SavedTemplates } from "./SavedTemplates";
import { SaveTemplateModal } from "./SaveTemplateModal";
import { ImportTemplatesModal } from "./ImportTemplatesModal";
import { downloadTemplatesAsJSON } from "../utils/exportHelpers";
import { CATEGORY_OPTIONS } from "../data/options";
import type {
  Framework,
  UILibrary,
  StateManagement,
  Testing,
  Linting,
  CICD,
  Database,
  Authentication,
} from "../types/index";

export const PromptForm: React.FC = () => {
  const [saveTemplateModalOpen, setSaveTemplateModalOpen] = useState(false);
  const [importTemplatesModalOpen, setImportTemplatesModalOpen] =
    useState(false);
  const [templatesExpanded, setTemplatesExpanded] = useState(false);

  const {
    projectName,
    framework,
    uiLibrary,
    stateManagement,
    testing,
    linting,
    cicd,
    database,
    authentication,
    typescript,
    pwa,
    i18n,
    seo,
    analytics,
    darkMode,
    optionalRequirements,
    savedTemplates,
    setProjectName,
    setFramework,
    setUILibrary,
    setStateManagement,
    setTesting,
    setLinting,
    setCICD,
    setDatabase,
    setAuthentication,
    setTypescript,
    setPWA,
    setI18n,
    setSEO,
    setAnalytics,
    setDarkMode,
    setOptionalRequirements,
    resetForm,
    generateProjectPrompt,
    generateCICDPrompt,
  } = usePromptStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateProjectPrompt();
  };

  const handleCICDPrompt = () => {
    generateCICDPrompt();
  };

  const toggleTemplatesSection = () => {
    setTemplatesExpanded(!templatesExpanded);
  };

  const handleExportTemplates = () => {
    if (savedTemplates.length === 0) {
      alert("No templates to export.");
      return;
    }

    downloadTemplatesAsJSON(savedTemplates);
  };

  return (
    <>
      {/* Templates Section */}
      <div className="card mb-6">
        <div
          className="flex justify-between items-center cursor-pointer p-1"
          onClick={toggleTemplatesSection}
        >
          <div className="flex items-center">
            <h3 className="text-lg font-medium">Saved Templates</h3>
            <span className="ml-2 text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
              {savedTemplates.length}
            </span>
          </div>
          <button
            className="text-gray-500"
            aria-label={
              templatesExpanded ? "Collapse templates" : "Expand templates"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform ${
                templatesExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {templatesExpanded && (
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <SavedTemplates />
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={() => setSaveTemplateModalOpen(true)}
                className="flex-grow px-4 py-2 text-sm bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 font-medium rounded-md transition-colors flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Save as Template
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleExportTemplates}
                  className="px-4 py-2 text-sm bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 font-medium rounded-md transition-colors flex items-center justify-center"
                  disabled={savedTemplates.length === 0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Export
                </button>

                <button
                  type="button"
                  onClick={() => setImportTemplatesModalOpen(true)}
                  className="px-4 py-2 text-sm bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 font-medium rounded-md transition-colors flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                  Import
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Name */}
        <div className="space-y-2">
          <label htmlFor="projectName" className="block text-sm font-medium">
            Project Name
          </label>
          <input
            id="projectName"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="input-field"
            placeholder="Enter your project name"
            required
          />
        </div>

        {/* Framework Selection */}
        <OptionSelector
          label="Framework"
          description="Select the framework for your project"
          options={CATEGORY_OPTIONS.frameworks}
          selectedValue={framework}
          onChange={(value) => setFramework(value as Framework)}
        />

        {/* UI Library */}
        <OptionSelector
          label="UI Library"
          description="Choose a UI component library"
          options={CATEGORY_OPTIONS.uiLibraries}
          selectedValue={uiLibrary}
          onChange={(value) => setUILibrary(value as UILibrary)}
        />

        {/* State Management */}
        <OptionSelector
          label="State Management"
          description="Select a state management solution"
          options={CATEGORY_OPTIONS.stateManagement}
          selectedValue={stateManagement}
          onChange={(value) => setStateManagement(value as StateManagement)}
        />

        {/* Testing */}
        <OptionSelector
          label="Testing"
          description="Choose testing tools for your project"
          options={CATEGORY_OPTIONS.testing}
          selectedValue={testing}
          onChange={(value) => setTesting(value as Testing)}
        />

        {/* Linting */}
        <OptionSelector
          label="Linting & Formatting"
          description="Choose code quality tools"
          options={CATEGORY_OPTIONS.linting}
          selectedValue={linting}
          onChange={(value) => setLinting(value as Linting)}
        />

        {/* CI/CD */}
        <OptionSelector
          label="CI/CD"
          description="Select a continuous integration and deployment solution"
          options={CATEGORY_OPTIONS.cicd}
          selectedValue={cicd}
          onChange={(value) => setCICD(value as CICD)}
        />

        {/* Database */}
        <OptionSelector
          label="Database"
          description="Choose a database solution"
          options={CATEGORY_OPTIONS.database}
          selectedValue={database}
          onChange={(value) => setDatabase(value as Database)}
        />

        {/* Authentication */}
        <OptionSelector
          label="Authentication"
          description="Select an authentication method"
          options={CATEGORY_OPTIONS.authentication}
          selectedValue={authentication}
          onChange={(value) => setAuthentication(value as Authentication)}
        />

        {/* Toggle Options */}
        <div className="card mt-6">
          <h3 className="text-lg font-medium mb-4">Additional Options</h3>

          <ToggleOption
            label="TypeScript"
            description="Add type safety to your project"
            isEnabled={typescript}
            onChange={setTypescript}
          />

          <ToggleOption
            label="Progressive Web App (PWA)"
            description="Add offline capabilities and installation support"
            isEnabled={pwa}
            onChange={setPWA}
          />

          <ToggleOption
            label="Internationalization (i18n)"
            description="Add support for multiple languages"
            isEnabled={i18n}
            onChange={setI18n}
          />

          <ToggleOption
            label="SEO Optimization"
            description="Add search engine optimization support"
            isEnabled={seo}
            onChange={setSEO}
          />

          <ToggleOption
            label="Analytics"
            description="Add analytics tracking support"
            isEnabled={analytics}
            onChange={setAnalytics}
          />

          <ToggleOption
            label="Dark Mode"
            description="Add dark mode support to your UI"
            isEnabled={darkMode}
            onChange={setDarkMode}
          />
        </div>

        {/* Optional Requirements */}
        <div className="card mt-6">
          <h3 className="text-lg font-medium mb-4">Optional Requirements</h3>
          <div className="space-y-2">
            <label
              htmlFor="optionalRequirements"
              className="block text-sm font-medium"
            >
              Custom Requirements (optional)
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add any custom requirements or specifications that are not covered
              by the options above. These will be included in the generated
              prompt.
            </p>
            <textarea
              id="optionalRequirements"
              value={optionalRequirements}
              onChange={(e) => setOptionalRequirements(e.target.value)}
              className="input-field h-32 resize-y"
              placeholder="Example: 
- Add feature to export notes as PDF
- Include sync with cloud storage
- Add support for Markdown syntax"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button type="submit" className="btn-primary">
            Generate Project Prompt
          </button>

          <button
            type="button"
            className={`px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors duration-200 shadow-sm ${
              cicd === "none" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleCICDPrompt}
            disabled={cicd === "none"}
          >
            Generate CI/CD Prompt
          </button>

          <button
            type="button"
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md transition-colors duration-200 shadow-sm"
            onClick={() => resetForm()}
          >
            Reset Form
          </button>
        </div>
      </form>

      {/* Template Save Modal */}
      <SaveTemplateModal
        isOpen={saveTemplateModalOpen}
        onClose={() => setSaveTemplateModalOpen(false)}
      />

      {/* Template Import Modal */}
      <ImportTemplatesModal
        isOpen={importTemplatesModalOpen}
        onClose={() => setImportTemplatesModalOpen(false)}
      />
    </>
  );
};
