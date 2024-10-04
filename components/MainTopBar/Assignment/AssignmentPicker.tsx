"use client";

import semesterStore from "@/store/semesterStore";
import React from "react";

const AssignmentPicker = () => {
  const { semesterId } = semesterStore();
  return (
    <div>
      {semesterId && <div>{semesterId}</div>}
      <div>lr ml</div>
    </div>
  );
};

export default AssignmentPicker;
