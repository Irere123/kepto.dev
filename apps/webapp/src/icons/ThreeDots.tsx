import * as React from "react";
import type { SVGProps } from "react";
const SvgThreeDots = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    {...props}
  >
    <path
      fill="currentColor"
      d="M20 14a2 2 0 1 1-.09-3.998A2 2 0 0 1 20 14ZM6 12a2 2 0 1 1-4 .09A2 2 0 0 1 6 12Zm8 0a2 2 0 1 1-3.998.09A2 2 0 0 1 14 12Z"
    />
  </svg>
);
export default SvgThreeDots;
