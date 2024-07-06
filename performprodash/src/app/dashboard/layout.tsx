import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen w-full items-start justify-between">
      <div>{children}</div>
    </div>
  );
};

export default layout;
