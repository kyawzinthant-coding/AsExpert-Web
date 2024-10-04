import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const normalizeString = (str: string) => str.trim().toLowerCase();

export const getSemesterIdByName = async (
  semesterName: string
): Promise<string | null> => {
  const semesterRef = collection(db, "semester");

  try {
    const querySnapshot = await getDocs(semesterRef);

    for (const doc of querySnapshot.docs) {
      const dbSemesterName = doc.data().name;

      if (normalizeString(dbSemesterName) === normalizeString(semesterName)) {
        return doc.id;
      }
    }

    console.log("No matching documents.");
    return null;
  } catch (error) {
    console.error("Error fetching semester ID:", error);
    return null;
  }
};
