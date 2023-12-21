import * as React from "react";
import type { SVGProps } from "react";
const SvgLogoLargeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill="currentColor"
    {...props}
  >
    <g clipPath="url(#logo-large-icon_svg__a)">
      <path
        fill="#FBEFFF"
        d="M15.588.012a16.263 16.263 0 0 0 .624 32.488H29.4c1.713 0 3.1-1.375 3.1-3.1V16.263A16.238 16.238 0 0 0 15.587.012Z"
      />
      <path
        fill="#57606A"
        d="M34.413 49.987a16.263 16.263 0 0 0-.625-32.487H20.6a3.1 3.1 0 0 0-3.1 3.1v13.137a16.238 16.238 0 0 0 16.913 16.25Z"
      />
      <path
        fill="#6E7781"
        d="M32.5 17.5v11.9a3.1 3.1 0 0 1-3.1 3.1H17.5V20.6a3.1 3.1 0 0 1 2.9-3.1l.2-.012h11.9v.012Z"
      />
    </g>
    <defs>
      <clipPath id="logo-large-icon_svg__a">
        <path fill="currentColor" d="M0 0h50v50H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgLogoLargeIcon;
