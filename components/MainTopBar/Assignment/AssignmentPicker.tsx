"use client";

import useFetchAssignmentBySemester from "@/hook/useFetchAssignmentBySemester";
import semesterStore from "@/store/semesterStore";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import assignmentIdStore from "@/store/assignmentIdStore";

const AssignmentPicker = () => {
  const { semesterId } = semesterStore();
  const [assignmentId, setAssignmentId] = useState<string>("");
  const { setAssignmentIdStore } = assignmentIdStore();
  const { assignmentData, loading, error, refetch } =
    useFetchAssignmentBySemester(semesterId!);

  useEffect(() => {
    if (semesterId) {
      refetch();
    }
  }, [semesterId]);

  const handleSelect = (key: ChangeEvent<HTMLSelectElement>) => {
    setAssignmentId(key.target.value);
    setAssignmentIdStore(key.target.value);
  };

  return (
    <div className="w-full">
      {semesterId != null ? (
        <div className="w-[220px]">
          <Select
            label="Switch Assignment"
            placeholder="Switch Assignment"
            variant="bordered"
            isLoading={loading}
            selectedKeys={[assignmentId]}
            onChange={(e) => handleSelect(e)}
          >
            {assignmentData?.map((year) => (
              <SelectItem key={year.id}>{year.title}</SelectItem>
            ))}
          </Select>
        </div>
      ) : (
        <div className="w-[220px] ">
          <button
            disabled
            className="border-dashed border-2 border-black p-4 rounded-xl bg-gray-100 "
          >
            Select Assignment
          </button>
        </div>
      )}
    </div>
  );
};

export default AssignmentPicker;
