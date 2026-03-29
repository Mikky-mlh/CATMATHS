import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  completedTopics: Record<string, boolean>;
  markComplete: (topicId: string) => void;
  unmarkComplete: (topicId: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedTopics: {},
      markComplete: (topicId) =>
        set((state) => ({
          completedTopics: { ...state.completedTopics, [topicId]: true },
        })),
      unmarkComplete: (topicId) =>
        set((state) => {
          const next = { ...state.completedTopics };
          delete next[topicId];
          return { completedTopics: next };
        }),
      isDarkMode: false,
      toggleDarkMode: () =>
        set((state) => {
          const next = !state.isDarkMode;
          if (next) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDarkMode: next };
        }),
    }),
    {
      name: 'cat-math-progress',
      onRehydrateStorage: () => (state) => {
        if (state?.isDarkMode) {
          document.documentElement.classList.add('dark');
        }
      },
    }
  )
);
