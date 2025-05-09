import type { GeneratedPrompt, SavedTemplate } from '../types/index';

/**
 * Export prompt as plain text
 */
export const exportAsText = (prompt: GeneratedPrompt): string => {
  return prompt.content;
};

/**
 * Export prompt as markdown
 */
export const exportAsMarkdown = (prompt: GeneratedPrompt): string => {
  const lines = prompt.content.split('\n');
  let markdown = `# ${prompt.title}\n\n`;
  
  // Created date
  markdown += `> Generated on: ${new Date(prompt.timestamp).toLocaleString()}\n\n`;
  
  // Main content with proper markdown formatting
  let inList = false;
  
  for (const line of lines) {
    // Detect and format section headers
    if (line.includes(':') && !line.startsWith('-') && !line.startsWith(' ')) {
      markdown += `## ${line}\n`;
    } 
    // Format list items
    else if (line.startsWith('- ')) {
      inList = true;
      markdown += line + '\n';
    }
    // Format section headers
    else if (line && !line.includes(':') && !line.startsWith('-') && !line.startsWith(' ')) {
      markdown += `## ${line}\n`;
      inList = false;
    }
    // End list
    else if (line === '' && inList) {
      markdown += '\n';
      inList = false;
    }
    // Regular line
    else {
      markdown += line + '\n';
    }
  }
  
  return markdown;
};

/**
 * Export prompt as JSON
 */
export const exportAsJSON = (prompt: GeneratedPrompt): string => {
  return JSON.stringify(prompt, null, 2);
};

/**
 * Export all templates as JSON
 */
export const exportTemplatesAsJSON = (templates: SavedTemplate[]): string => {
  return JSON.stringify(templates, null, 2);
};

/**
 * Download content as a file
 */
export const downloadFile = (content: string, filename: string, mimeType: string): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  
  URL.revokeObjectURL(url);
};

/**
 * Download functions for each format
 */
export const downloadAsText = (prompt: GeneratedPrompt): void => {
  const content = exportAsText(prompt);
  const filename = `${prompt.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
  downloadFile(content, filename, 'text/plain');
};

export const downloadAsMarkdown = (prompt: GeneratedPrompt): void => {
  const content = exportAsMarkdown(prompt);
  const filename = `${prompt.title.replace(/\s+/g, '-').toLowerCase()}.md`;
  downloadFile(content, filename, 'text/markdown');
};

export const downloadAsJSON = (prompt: GeneratedPrompt): void => {
  const content = exportAsJSON(prompt);
  const filename = `${prompt.title.replace(/\s+/g, '-').toLowerCase()}.json`;
  downloadFile(content, filename, 'application/json');
};

/**
 * Download saved templates as JSON
 */
export const downloadTemplatesAsJSON = (templates: SavedTemplate[]): void => {
  const content = exportTemplatesAsJSON(templates);
  const filename = `prompt-generator-templates-${new Date().toISOString().split('T')[0]}.json`;
  downloadFile(content, filename, 'application/json');
}; 