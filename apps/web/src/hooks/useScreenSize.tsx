import { useMediaQuery } from "react-responsive";

export const useScreenSize = () => {
  const is3cols = useMediaQuery({ minWidth: 1336 });
  const is2cols = useMediaQuery({ minWidth: 1256 });
  const is1cols = useMediaQuery({ minWidth: 800 });

  if (is3cols) {
    return "3-cols";
  }
  if (is2cols) {
    return "2-cols";
  }

  if (is1cols) {
    return "1-cols";
  }

  return "fullscreen";
};
