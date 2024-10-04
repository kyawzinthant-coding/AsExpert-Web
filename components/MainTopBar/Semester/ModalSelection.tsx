import { getSemesterIdByName } from "@/libs/firebase/getSemesterByName";
import semesterStore from "@/store/semesterStore";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";

type ModalSelectionProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  setFullSem: (str: string) => void;
};

const Years = [
  {
    name: "HNC",
  },
  {
    name: "HND",
  },
];

const Semester = [
  {
    name: "First Semester",
  },
  {
    name: "Second Semester",
  },
];

const Module = [
  {
    name: "First Module",
  },
  {
    name: "Second Module",
  },
];

function ModalSelection({
  isOpen,
  onOpenChange,
  setFullSem,
}: ModalSelectionProps) {
  const [year, setYear] = useState<string>("");
  const [semester, setSemester] = useState<string>("");
  const [module, setModule] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { setSemesterId } = semesterStore();

  const handleClear = () => {
    setYear("");
    setSemester("");
    setModule("");
  };

  const handleSelect = async () => {
    const selectedSem = `${year},${semester},${module}`;
    setFullSem("");
    try {
      setLoading(true);
      const ID = await getSemesterIdByName(selectedSem);
      setSemesterId(ID);
    } catch (error) {
      console.error("Error fetching semester ID:", error);
    } finally {
      setLoading(false);
      setFullSem(`${year} |  ${semester} | ${module}`);
      handleClear();
      onOpenChange(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Select Semester
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col space-y-4 w-full">
                  <div>
                    <Select
                      label="Select Year"
                      placeholder="Select Year"
                      selectedKeys={[year]}
                      onChange={(e) => setYear(e.target.value)}
                      className=" border-dashed"
                    >
                      {Years.map((year) => (
                        <SelectItem key={year.name}>{year.name}</SelectItem>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Select
                      label="Select Semester"
                      placeholder="Select Semester"
                      selectedKeys={[semester]}
                      isDisabled={year != "" ? false : true}
                      onChange={(e) => setSemester(e.target.value)}
                      className=""
                    >
                      {Semester.map((sem) => (
                        <SelectItem key={sem.name}>{sem.name}</SelectItem>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Select
                      label="Select Module"
                      placeholder="Select Module"
                      selectedKeys={[module]}
                      isDisabled={year != "" && semester != "" ? false : true}
                      onChange={(e) => setModule(e.target.value)}
                      className=""
                    >
                      {Module.map((mo) => (
                        <SelectItem key={mo.name}>{mo.name}</SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  isDisabled={loading}
                  isLoading={loading}
                  color="primary"
                  onPress={handleSelect}
                >
                  {loading ? "Selecting...." : "Select"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalSelection;
