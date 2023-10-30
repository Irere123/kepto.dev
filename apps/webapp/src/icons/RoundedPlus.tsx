import * as React from "react";
import type { SVGProps } from "react";
const SvgRoundedPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12.75 7.75a.75.75 0 1 0-1.5 0v3.5h-3.5a.75.75 0 1 0 0 1.5h3.5v3.5a.75.75 0 1 0 1.5 0v-3.5h3.5a.75.75 0 1 0 0-1.5h-3.5v-3.5Z"
    />
    <path
      fill="currentColor"
      d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1ZM2.5 12a9.5 9.5 0 1 0 19 0 9.5 9.5 0 0 0-19 0Z"
    />
  </svg>
);
export default SvgRoundedPlus;
