import React, { useState } from "react";
import { usePromptStore } from "../store/promptStore";
import type { SavedTemplate } from "../types/index";
import { EditTemplateModal } from "./EditTemplateModal";

export const SavedTemplates: React.FC = () => {
  const { savedTemplates, loadTemplate, deleteTemplate } = usePromptStore();
  const [expandedTemplateId, setExpandedTemplateId] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState<SavedTemplate | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedTemplateId(expandedTemplateId === id ? null : id);
  };

  const handleLoadTemplate = (templateId: string) => {
    loadTemplate(templateId);
  };

  const handleEditTemplate = (template: SavedTemplate, e: React.MouseEvent) => {
    e.stopPropagation();
    setTemplateToEdit(template);
    setEditModalOpen(true);
  };

  const handleDeleteTemplate = (templateId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this template?")) {
      deleteTemplate(templateId);
    }
  };

  if (savedTemplates.length === 0) {
    return (
      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No saved templates yet. Save your current configuration as a template to reuse it later.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {savedTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden cursor-pointer transition-all duration-200"
            onClick={() => toggleExpand(template.id)}
          >
            <div className="p-4 flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(template.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLoadTemplate(template.id);
                  }}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-md transition-colors"
                >
                  Load
                </button>
                <button
                  onClick={(e) => handleEditTemplate(template, e)}
                  className="px-3 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 rounded-md transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handleDeleteTemplate(template.id, e)}
                  className="px-3 py-1 text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-md transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
            
            {expandedTemplateId === template.id && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  {template.description || "No description provided."}
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Framework:</span>
                      <span className="font-medium">{template.config.framework}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">UI Library:</span>
                      <span className="font-medium">{template.config.uiLibrary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">State Management:</span>
                      <span className="font-medium">{template.config.stateManagement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Testing:</span>
                      <span className="font-medium">{template.config.testing}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Database:</span>
                      <span className="font-medium">{template.config.database}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Authentication:</span>
                      <span className="font-medium">{template.config.authentication}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">CI/CD:</span>
                      <span className="font-medium">{template.config.cicd}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Linting:</span>
                      <span className="font-medium">{template.config.linting}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-2 mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                    <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {template.config.typescript && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs">
                          TypeScript
                        </span>
                      )}
                      {template.config.pwa && (
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-xs">
                          PWA
                        </span>
                      )}
                      {template.config.i18n && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-xs">
                          i18n
                        </span>
                      )}
                      {template.config.seo && (
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded text-xs">
                          SEO
                        </span>
                      )}
                      {template.config.analytics && (
                        <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded text-xs">
                          Analytics
                        </span>
                      )}
                      {template.config.darkMode && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 rounded text-xs">
                          Dark Mode
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Edit Template Modal */}
      <EditTemplateModal 
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setTemplateToEdit(null);
        }}
        template={templateToEdit}
      />
    </>
  );
};
