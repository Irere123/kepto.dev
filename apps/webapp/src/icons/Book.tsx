import * as React from "react";
import type { SVGProps } from "react";
const SvgBook = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    {...props}
  >
    <path
      fill="currentColor"
      d="M0 3.75A.75.75 0 0 1 .75 3h7.497c1.566 0 2.945.8 3.751 2.014A4.495 4.495 0 0 1 15.75 3h7.5a.75.75 0 0 1 .75.75v15.063a.753.753 0 0 1-.755.75l-7.682-.052a2.999 2.999 0 0 0-2.142.878l-.89.891a.75.75 0 0 1-1.061 0l-.902-.901a2.995 2.995 0 0 0-2.121-.879H.75a.75.75 0 0 1-.75-.75v-15Zm12.75 15.232a4.504 4.504 0 0 1 2.823-.971l6.927.047V4.5h-6.75a3 3 0 0 0-3 3v11.482ZM11.247 7.497a3 3 0 0 0-3-2.997H1.5V18h6.947c1.018 0 2.006.346 2.803.98l-.003-11.483Z"
    />
  </svg>
);
export default SvgBook;
