import { useEffect, useState } from "react";

// True only for devices with a precise pointer and hover support — i.e.
// desktop with a mouse/trackpad, not touch. Used to gate purely decorative
// interactions like the custom cursor.
export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(query.matches);
    const handler = (event) => setFine(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return fine;
}
