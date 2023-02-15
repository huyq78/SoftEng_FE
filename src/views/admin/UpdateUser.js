import React from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import CardUpdateUser from "components/Cards/CardUpdateUser";

export default function UpdateUser() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardUpdateUser />
        </div>
      </div>
    </>
  );
}
