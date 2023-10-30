import * as React from "react";
import type { SVGProps } from "react";
const SvgLocation = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12 13.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
    />
    <path
      fill="currentColor"
      d="M19.071 3.429h.001c3.905 3.905 3.905 10.237 0 14.142l-5.403 5.403a2.36 2.36 0 0 1-3.336 0l-5.375-5.375-.028-.028c-3.905-3.905-3.905-10.237 0-14.142 3.904-3.905 10.236-3.905 14.141 0ZM5.99 4.489a8.502 8.502 0 0 0 0 12.021l.023.024.002.002 5.378 5.378a.86.86 0 0 0 1.214 0l5.403-5.404A8.5 8.5 0 0 0 5.99 4.489Z"
    />
  </svg>
);
export default SvgLocation;
