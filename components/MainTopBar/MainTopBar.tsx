import Image from "next/image";
import React from "react";
import SemesterSelection from "./Semester/SemesterSelection";
import AssignmentPicker from "./Assignment/AssignmentPicker";

const MainTopBar = () => {
  return (
    <div className="flex items-center gap-12 flex-row justify-between">
      <div>
        <Image
          alt="logo"
          src={"/image/Assignment_Tracker.svg"}
          width={120}
          height={120}
          priority
        />
      </div>

      <div>
        <SemesterSelection />
      </div>
      <div>
        <AssignmentPicker />
      </div>
    </div>
  );
};

export default MainTopBar;
