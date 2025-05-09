import React, { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { PromptForm } from "./components/PromptForm";
import { GeneratedPrompts } from "./components/GeneratedPrompts";
import { usePromptStore } from "./store/promptStore";
import type { GeneratedPrompt } from "./types/index";
import "./index.css";

function App() {
  const { addSharedPrompt } = usePromptStore();
  const [importStatus, setImportStatus] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });

  // Check for shared prompt in URL
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sharedParam = queryParams.get("shared");

    if (sharedParam) {
      try {
        // Decode the shared prompt
        const decodedData = decodeURIComponent(atob(sharedParam));
        const sharedPrompt = JSON.parse(decodedData) as GeneratedPrompt;

        // Validate the structure of the shared prompt
        if (
          typeof sharedPrompt === "object" &&
          typeof sharedPrompt.title === "string" &&
          typeof sharedPrompt.content === "string" &&
          typeof sharedPrompt.timestamp === "string"
        ) {
          // Add shared prompt to store
          addSharedPrompt(sharedPrompt);
          setImportStatus({
            message: "Successfully imported shared prompt!",
            type: "success",
          });

          // Remove the query parameter to avoid reimporting on refresh
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);

          // Clear success message after 3 seconds
          setTimeout(() => {
            setImportStatus({ message: "", type: null });
          }, 3000);
        } else {
          throw new Error("Invalid prompt format");
        }
      } catch (error) {
        console.error("Error importing shared prompt:", error);
        setImportStatus({
          message:
            "Failed to import shared prompt. Invalid format or corrupted data.",
          type: "error",
        });

        // Clear error message after 5 seconds
        setTimeout(() => {
          setImportStatus({ message: "", type: null });
        }, 5000);
      }
    }
  }, [addSharedPrompt]);

  return (
    <Layout>
      {importStatus.type && (
        <div
          className={`mb-6 p-3 rounded-md text-sm ${
            importStatus.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {importStatus.message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Configuration</h2>
          <PromptForm />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">Results</h2>
          <GeneratedPrompts />
        </div>
      </div>
    </Layout>
  );
}

export default App;
