import { create } from "zustand";

interface FeatureStore {
  inViewFeature: string | null;
  setInViewFeature: (feature: string | null) => void;
}

export const useFeatureStore = create<FeatureStore>((set) => ({
  inViewFeature: null,
  setInViewFeature: (feature: string | null) => set({ inViewFeature: feature }),
}));
