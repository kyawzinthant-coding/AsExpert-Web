import { query, collection, where, getDocs, limit } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/libs/firebase";

import { useEffect } from "react";
import { Iassignment } from "@/type/assignment";
import AssignmentStore from "@/store/AssignmentStore";

const fetchAssignmentBySemester = async (
  semesterId: string
): Promise<Iassignment[] | null> => {
  const q = query(
    collection(db, "assignment"),
    where("semester_id", "==", semesterId)
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
  })) as Iassignment[];
};

const useFetchAssignmentBySemester = (semesterId: string) => {
  const { setAssignment } = AssignmentStore();

  const { data, isLoading, error, refetch } = useQuery<
    Iassignment[] | null,
    Error
  >({
    queryKey: ["assignment", semesterId],
    queryFn: () => fetchAssignmentBySemester(semesterId),
    staleTime: Infinity,
    refetchOnMount: false,
    retry: 3,
    enabled: !!semesterId,
  });

  useEffect(() => {
    if (data && !isLoading) {
      setAssignment(data);
    }
  }, [data, isLoading, setAssignment]);

  return {
    assignmentData: data || [],
    loading: isLoading,
    error,
    refetch,
  };
};

export default useFetchAssignmentBySemester;
