export const LANGUAGES = [
    'Python',
    'JavaScript',
    'Java',
    'C#',
    'TypeScript',
    'Go',
    'Ruby',
    'PHP',
    'Swift',
    'Kotlin',
  ] as const;
  
  export type Language = typeof LANGUAGES[number];