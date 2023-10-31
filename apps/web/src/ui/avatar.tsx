import React, { useState } from "react";

export const avatarSizeMap = {
  default: "48px",
  "28": "28px",
  "32": "32px",
  "36": "36px",
  "40": "40px",
  "48": "48px",
  "56": "56px",
  "64": "64px",
  "72": "72px",
  "96": "96px",
  "128": "128px",
};

export const onlineIndicatorStyleMap = {
  default: {
    width: "8px",
    height: "8px",
    right: "-1px",
    bottom: "2px",
    borderWidth: "2px",
  },
  "28": {},
  "32": {},
  "36": {},
  "40": {},
  "48": {},
  "56": {},
  "64": {},
  "72": {},
  "96": {},
  "128": {},
};

export interface AvatarProps {
  src?: string;
  isOnline?: boolean;
  username?: string;
  active?: boolean;
  size?: keyof typeof avatarSizeMap;
}

export const Avatar: React.FC<AvatarProps> = ({
  active,
  isOnline,
  username,
  src,
  size = "default",
}) => {
  const [isError, setError] = useState(false);

  return (
    <div
      className={`relative inline-block`}
      style={{ width: avatarSizeMap[size], height: avatarSizeMap[size] }}
    >
      <img
        onError={() => setError(true)}
        style={{
          boxShadow: active ? `0px 0px 3px var(--success)` : "",
        }}
        className="rounded-full w-full h-full object-cover"
        src={isError ? `https://avatar.vercel.sh/${username || "rauchg"}` : src}
        alt={username ? `${username}-s avatar` : "your avatar"}
      />
      {isOnline && (
        <span
          style={onlineIndicatorStyleMap[size]}
          className={`rounded-full absolute box-content bg-success border-success-dark`}
        ></span>
      )}
    </div>
  );
};
