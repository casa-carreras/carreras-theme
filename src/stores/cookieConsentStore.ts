import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CookieCategories {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentState {
  hasDecided: boolean;
  categories: CookieCategories;
  isPreferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (categories: Omit<CookieCategories, 'necessary'>) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const defaultCategories: CookieCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export const useCookieConsentStore = create<CookieConsentState>()(
  persist(
    (set) => ({
      hasDecided: false,
      categories: defaultCategories,
      isPreferencesOpen: false,
      acceptAll: () =>
        set({
          hasDecided: true,
          categories: { necessary: true, analytics: true, marketing: true },
          isPreferencesOpen: false,
        }),
      rejectAll: () =>
        set({
          hasDecided: true,
          categories: defaultCategories,
          isPreferencesOpen: false,
        }),
      savePreferences: (categories) =>
        set({
          hasDecided: true,
          categories: { necessary: true, ...categories },
          isPreferencesOpen: false,
        }),
      openPreferences: () => set({ isPreferencesOpen: true }),
      closePreferences: () => set({ isPreferencesOpen: false }),
    }),
    {
      name: 'cookie-consent:v1',
      partialize: (state) => ({
        hasDecided: state.hasDecided,
        categories: state.categories,
      }),
    },
  ),
);
