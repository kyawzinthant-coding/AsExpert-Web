import { create } from "zustand";

interface AssignmentIdStore {
  assignmentId: string | null;
  setAssignmentIdStore: (id: string | null) => void;
}

const assignmentIdStore = create<AssignmentIdStore>((set) => ({
  assignmentId: null,
  setAssignmentIdStore: (id) => set({ assignmentId: id }),
}));

export default assignmentIdStore;
