// Section interface
export interface Section {
  title: string;
  subtitle?: string;
  paragraphs?: string[]; // Array of paragraph strings
  media?: string[]; // URLs or paths to images/videos/SVGs
  lists?: string[][]; // Array of lists (each list is an array of strings)
  extras?: unknown[]; // For any additional/custom content/components
}

// Page interface
export interface Page {
  sections: Section[];
}

