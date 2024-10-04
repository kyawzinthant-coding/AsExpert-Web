import { create } from "zustand";

interface StoreState {
  semesterId: string | null;
  setSemesterId: (id: string | null) => void;
}

const semesterStore = create<StoreState>((set) => ({
  semesterId: null,
  setSemesterId: (id) => set({ semesterId: id }),
}));

export default semesterStore;
