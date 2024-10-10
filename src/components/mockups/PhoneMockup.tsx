import React from "react";

export const PhoneMockup: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="relative mx-auto border-gray-800 border-[8px] rounded-[2.5rem] min-h-[500px] w-[300px]">
      <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute" />
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[11px] top-[124px] rounded-s-lg" />
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[11px] top-[178px] rounded-s-lg" />
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[11px] top-[142px] rounded-e-lg" />

      <div className="rounded-[2rem] overflow-hidden h-full bg-red-300X py-6">
        {children}
      </div>
    </div>
  );
};
