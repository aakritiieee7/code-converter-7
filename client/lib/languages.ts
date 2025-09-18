export const LANGUAGES = [
  'Python',
  'Java', 
  'JavaScript',
  'C#'
] as const;

export type Language = typeof LANGUAGES[number];