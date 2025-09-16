export interface HistoryItem {
  id: string;
  timestamp: number;
  sourceLang: string;
  targetLang: string;
  inputCode: string;
  outputCode: string; 
  analysis: string;
  type: 'convert' | 'fix';
}

const HISTORY_KEY = 'devtranslate_history';
const MAX_HISTORY_ITEMS = 50; 

export const getHistory = (): HistoryItem[] => {
  try {
    const itemsJSON = localStorage.getItem(HISTORY_KEY);
    return itemsJSON ? JSON.parse(itemsJSON) : [];
  } catch (error) {
    console.error("Failed to parse history from localStorage", error);
    return [];
  }
};

export const addToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
  const history = getHistory();
  const newItem: HistoryItem = {
    ...item,
    id: new Date().toISOString() + Math.random(),
    timestamp: Date.now(),
  };

  const newHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
};

export const setItemToRerun = (item: HistoryItem) => {
  sessionStorage.setItem('rerun_item', JSON.stringify(item));
};

export const getItemToRerun = (): HistoryItem | null => {
  try {
    const itemJSON = sessionStorage.getItem('rerun_item');
    if (itemJSON) {
      sessionStorage.removeItem('rerun_item');
      return JSON.parse(itemJSON);
    }
    return null;
  } catch (error) {
    return null;
  }
};