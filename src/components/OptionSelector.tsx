import React from "react";
import type { Option } from "../types/index";

interface OptionSelectorProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  label: string;
  description?: string;
}

export const OptionSelector: React.FC<OptionSelectorProps> = ({
  options,
  selectedValue,
  onChange,
  label,
  description,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">{label}</label>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {description}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {options.map((option) => (
          <div
            key={option.value}
            className={`
              cursor-pointer rounded-lg border p-4 transition-all
              ${
                selectedValue === option.value
                  ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-400"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
              }
            `}
            onClick={() => onChange(option.value)}
          >
            <div className="font-medium">{option.label}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {option.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
