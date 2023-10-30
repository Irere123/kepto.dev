import * as React from "react";
import type { SVGProps } from "react";
const SvgLogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    {...props}
  >
    <g clipPath="url(#Logo_Icon_svg__a)">
      <path
        fill="#FBEFFF"
        d="M7.482.006a7.806 7.806 0 0 0 .3 15.594h6.33c.822 0 1.488-.66 1.488-1.488V7.806a7.795 7.795 0 0 0-8.118-7.8Z"
      />
      <path
        fill="#57606A"
        d="M16.518 23.994a7.806 7.806 0 0 0-.3-15.594h-6.33A1.488 1.488 0 0 0 8.4 9.888v6.306a7.794 7.794 0 0 0 8.118 7.8Z"
      />
      <path
        fill="#6E7781"
        d="M15.6 8.4v5.712a1.488 1.488 0 0 1-1.488 1.488H8.4V9.888A1.488 1.488 0 0 1 9.792 8.4l.096-.006H15.6V8.4Z"
      />
    </g>
    <defs>
      <clipPath id="Logo_Icon_svg__a">
        <path fill="currentColor" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgLogoIcon;
