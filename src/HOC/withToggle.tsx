import { useState } from "react";

interface WithToggleProps {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

function withToggle<P extends object>(
  Component: React.ComponentType<P & WithToggleProps>
) {
  const WithToggleComponent: React.FC<P> = (props) => {
    //   return (props: P) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen((prev) => !prev);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
      <Component
        {...props}
        isOpen={isOpen}
        toggle={toggle}
        close={close}
        open={open}
      />
    );
  };

  WithToggleComponent.displayName = `withToggle(${
    Component.displayName || Component.name || "Component"
  }`;
  return WithToggleComponent;
}
export default withToggle;
