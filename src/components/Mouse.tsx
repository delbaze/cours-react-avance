import { useState, useEffect, type JSX } from "react";

function Mouse({ children }: { children: JSX.Element | Function }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);

    return () => window.removeEventListener("mousemove", handler);
  }, []);

  if (typeof children === "function") {
    return children(pos);
  }

  return children
}

export default Mouse;
