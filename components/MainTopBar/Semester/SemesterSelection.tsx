"use client";
import { useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";
import ModalSelection from "./ModalSelection";

const SemesterSelection = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fullSem, setFullSem] = useState<string | "">("");

  return (
    <div
      className={`border-2  ${fullSem == "" ? "border-dashed" : "border"}  px-4 rounded-md`}
    >
      <button
        onClick={onOpen}
        aria-label="select-semester-btn"
        className="p-4 text-bold cursor-pointer  text-lg font-medium"
      >
        {fullSem == "" ? "Select Semester" : fullSem}
      </button>

      <ModalSelection
        setFullSem={setFullSem}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};

export default SemesterSelection;
