import { useState } from "react";

export interface WithHoverProps {
  isHovered: boolean;
}

function withHover<P extends object>(
  Component: React.ComponentType<P & WithHoverProps>
) {
  const WithHover: React.FC<P> = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    return (
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Component {...props} isHovered={isHovered} />
      </div>
    );
  };

  WithHover.displayName = `withHover(${
    Component.displayName || Component.name || "Component"
  })`;

  return WithHover;
}

export default withHover;
