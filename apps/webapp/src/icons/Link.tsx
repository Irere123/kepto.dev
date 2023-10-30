import * as React from "react";
import type { SVGProps } from "react";
const SvgLink = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    {...props}
  >
    <path
      fill="currentColor"
      d="M14.78 3.653a3.936 3.936 0 1 1 5.567 5.567l-3.627 3.627a3.937 3.937 0 0 1-5.88-.353.75.75 0 1 0-1.18.928 5.437 5.437 0 0 0 8.12.486l3.628-3.628a5.436 5.436 0 0 0-7.688-7.688l-3 3a.75.75 0 0 0 1.06 1.061l3-3Z"
    />
    <path
      fill="currentColor"
      d="M7.28 11.153a3.937 3.937 0 0 1 5.88.353.75.75 0 1 0 1.18-.928 5.437 5.437 0 0 0-8.12-.486L2.592 13.72a5.437 5.437 0 0 0 7.688 7.688l3-3a.75.75 0 1 0-1.06-1.06l-3 3a3.937 3.937 0 0 1-5.567-5.568l3.627-3.627Z"
    />
  </svg>
);
export default SvgLink;
