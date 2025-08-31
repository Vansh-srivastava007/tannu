import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuestState {
  currentPage: number;
  completedPages: number[];
  credits: string[];
  progress: number;
}

interface QuestContextType {
  quest: QuestState;
  completeCurrentPage: () => void;
  goToNextPage: () => void;
  goToPage: (page: number) => void;
  addCredit: (message: string) => void;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

const initialState: QuestState = {
  currentPage: 1,
  completedPages: [],
  credits: [],
  progress: 0
};

export const QuestProvider = ({ children }: { children: ReactNode }) => {
  const [quest, setQuest] = useState<QuestState>(initialState);

  const completeCurrentPage = () => {
    setQuest(prev => ({
      ...prev,
      completedPages: [...prev.completedPages, prev.currentPage],
      progress: Math.min(100, ((prev.completedPages.length + 1) / 5) * 100)
    }));
  };

  const goToNextPage = () => {
    setQuest(prev => ({
      ...prev,
      currentPage: Math.min(5, prev.currentPage + 1)
    }));
  };

  const goToPage = (page: number) => {
    setQuest(prev => ({
      ...prev,
      currentPage: Math.max(1, Math.min(5, page))
    }));
  };

  const addCredit = (message: string) => {
    setQuest(prev => ({
      ...prev,
      credits: [...prev.credits, message]
    }));
  };

  return (
    <QuestContext.Provider value={{
      quest,
      completeCurrentPage,
      goToNextPage,
      goToPage,
      addCredit
    }}>
      {children}
    </QuestContext.Provider>
  );
};

export const useQuest = () => {
  const context = useContext(QuestContext);
  if (context === undefined) {
    throw new Error('useQuest must be used within a QuestProvider');
  }
  return context;
};