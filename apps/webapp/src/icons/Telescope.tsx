import * as React from "react";
import type { SVGProps } from "react";
const SvgTelescope = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    {...props}
  >
    <g clipPath="url(#telescope_svg__a)">
      <path
        fill="currentColor"
        d="M.408 15.13a2 2 0 0 1 .59-2.642L17.038 1.33a1.999 1.999 0 0 1 2.85.602l2.828 4.644a2 2 0 0 1-.851 2.847l-17.762 8.43a2 2 0 0 1-2.59-.807L.408 15.13Zm5.263-4.066 1.987 3.44 8.712-4.135-2.857-4.76-7.842 5.455Zm12.06-1.34.001-.001 3.49-1.656a.497.497 0 0 0 .212-.712l-2.826-4.644a.503.503 0 0 0-.713-.151l-3.148 2.19 2.984 4.974Zm-13.295 2.2L1.854 13.72a.5.5 0 0 0-.147.66l1.105 1.915a.5.5 0 0 0 .648.201l2.838-1.347-1.862-3.225ZM17.155 22.87a.75.75 0 0 0 .226-1.036l-4-6.239a.75.75 0 0 0-.941-.278l-2.75 1.25a.75.75 0 0 0-.318.274l-3.25 4.989a.75.75 0 0 0 1.256.819l3.131-4.806.51-.232v5.64a.75.75 0 1 0 1.5 0v-6.22l3.6 5.613a.75.75 0 0 0 1.036.226Z"
      />
    </g>
    <defs>
      <clipPath id="telescope_svg__a">
        <path fill="currentColor" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgTelescope;
