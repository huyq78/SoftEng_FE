import React from "react";

// components


import CardCreateAbsence from "components/Cards/CardCreateAbsence";

export default function CreateAbsence() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardCreateAbsence />
        </div>
      </div>
    </>
  );
}
