import React from "react";

interface ToggleOptionProps {
  label: string;
  description?: string;
  isEnabled: boolean;
  onChange: (enabled: boolean) => void;
}

export const ToggleOption: React.FC<ToggleOptionProps> = ({
  label,
  description,
  isEnabled,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-col">
        <span className="font-medium">{label}</span>
        {description && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </span>
        )}
      </div>
      <button
        type="button"
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${isEnabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}
        `}
        role="switch"
        aria-checked={isEnabled}
        onClick={() => onChange(!isEnabled)}
      >
        <span className="sr-only">Toggle {label}</span>
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow 
            ring-0 transition duration-200 ease-in-out
            ${isEnabled ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
};
