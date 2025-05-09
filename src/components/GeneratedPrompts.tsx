import React, { useState, useRef, useMemo } from "react";
import { usePromptStore } from "../store/promptStore";
import type { GeneratedPrompt } from "../types/index";
import {
  downloadAsText,
  downloadAsMarkdown,
  downloadAsJSON,
} from "../utils/exportHelpers";

export const GeneratedPrompts: React.FC = () => {
  const { generatedPrompts, clearPrompts, deletePrompt, sharePrompt } =
    usePromptStore();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sharedPromptIndex, setSharedPromptIndex] = useState<number | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCopy = (prompt: GeneratedPrompt, index: number) => {
    navigator.clipboard.writeText(prompt.content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleExport = (
    prompt: GeneratedPrompt,
    format: "text" | "markdown" | "json"
  ) => {
    switch (format) {
      case "text":
        downloadAsText(prompt);
        break;
      case "markdown":
        downloadAsMarkdown(prompt);
        break;
      case "json":
        downloadAsJSON(prompt);
        break;
    }
    setOpenDropdownIndex(null);
  };

  const handleShare = (prompt: GeneratedPrompt, index: number) => {
    const shareUrl = sharePrompt(prompt);
    navigator.clipboard.writeText(shareUrl);
    setSharedPromptIndex(index);
    setTimeout(() => setSharedPromptIndex(null), 2000);
  };

  // Filter prompts based on search query
  const filteredPrompts = useMemo(() => {
    if (!searchQuery.trim()) {
      return generatedPrompts;
    }

    const query = searchQuery.toLowerCase();
    return generatedPrompts.filter(
      (prompt) =>
        prompt.title.toLowerCase().includes(query) ||
        prompt.content.toLowerCase().includes(query)
    );
  }, [generatedPrompts, searchQuery]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (generatedPrompts.length === 0) {
    return (
      <div className="card text-center py-12">
        <h3 className="text-lg font-medium mb-2">No Prompts Generated Yet</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Configure your project options and click "Generate Prompt" to create a
          new prompt.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Generated Prompts</h2>
        <button
          onClick={clearPrompts}
          className="px-3 py-1 text-sm bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-md transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Search input */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field w-full pl-10"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg
                className="h-5 w-5 text-gray-400 hover:text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      {searchQuery && (
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Found {filteredPrompts.length}{" "}
          {filteredPrompts.length === 1 ? "result" : "results"} for "
          {searchQuery}"
        </div>
      )}

      {filteredPrompts.length === 0 ? (
        <div className="card text-center py-8">
          <h3 className="text-lg font-medium mb-2">No matching prompts</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try a different search term or clear the search
          </p>
        </div>
      ) : (
        filteredPrompts.map((prompt, index) => (
          <div key={index} className="card space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{prompt.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(prompt.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleCopy(prompt, index)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-md transition-colors"
                >
                  {copiedIndex === index ? "Copied!" : "Copy"}
                </button>

                <button
                  onClick={() => handleShare(prompt, index)}
                  className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-md transition-colors"
                >
                  {sharedPromptIndex === index ? "Link Copied!" : "Share"}
                </button>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 rounded-md transition-colors"
                  >
                    Export
                  </button>
                  {openDropdownIndex === index && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                      <ul className="py-1">
                        <li>
                          <button
                            onClick={() => handleExport(prompt, "text")}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Download as Text
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleExport(prompt, "markdown")}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Download as Markdown
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleExport(prompt, "json")}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Download as JSON
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => deletePrompt(index)}
                  className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-md transition-colors"
                  aria-label="Delete prompt"
                >
                  Delete
                </button>
              </div>
            </div>

            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto whitespace-pre-wrap text-sm">
              {prompt.content}
            </pre>
          </div>
        ))
      )}
    </div>
  );
};
