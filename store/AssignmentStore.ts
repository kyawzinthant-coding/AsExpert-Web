import { Iassignment } from "@/type/assignment";
import { create } from "zustand";

interface IAssignmentStore {
  assignments: Iassignment[];
  setAssignment: (data: Iassignment[]) => void;
}

const AssignmentStore = create<IAssignmentStore>((set) => ({
  assignments: [],
  setAssignment: (data: any) => set((state: any) => ({ assignments: data })),
}));

export default AssignmentStore;
