import React from "react";

import { Avatar } from "./avatar";

export interface AvatarGroupProps {
  srcArray: string[];
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  srcArray,
  className = "",
}) => {
  return (
    <div className={`flex ${className}`}>
      {srcArray.slice(0, 3).map((s, i) => (
        <span
          key={s + i}
          className="rounded-full border border-secondary shadow-outlineSm"
          style={{
            zIndex: srcArray.length - i,
            marginLeft: i > 0 ? -10 : 0,
            height: 30,
            width: 30,
            overflow: "hidden",
          }}
        >
          <Avatar src={s} size="36" />
        </span>
      ))}
    </div>
  );
};
