import { useState } from "react";

export interface WithClickCounterProps {
  clickCount: number;
  onClick: () => void;
}

function withClickCounter<P extends object>(
  Component: React.ComponentType<P & WithClickCounterProps>
) {
  const WithClickCounter =  (props: Omit<P, keyof WithClickCounterProps>) => {
//   const WithClickCounter =  (props: Omit<P, keyof WithClickCounterProps>) => {
    const [clickCount, setClickCount] = useState(0);
    const handleClick = () => {
      setClickCount((prev) => prev + 1);
    };

    return (
      <div>
        <div>Nombre total de clics : {clickCount}</div>
        <Component {...(props as P)} clickCount={clickCount} onClick={handleClick} />
      </div>
    );
  };

    WithClickCounter.displayName = `withClickCounter(${
    Component.displayName || Component.name || "Component"
  }`;

  return WithClickCounter
}

export default withClickCounter;

