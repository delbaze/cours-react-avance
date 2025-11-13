import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

interface IToggleContext {
  on: boolean;
  toggle: () => void;
}
const ToggleContext = createContext<IToggleContext>({
  on: false,
  toggle: () => {},
});

export function Toggle({ children }: PropsWithChildren) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn((prev) => !prev);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      <div>{children}</div>
    </ToggleContext.Provider>
  );
}

Toggle.On = function ToggleOn({ children }: PropsWithChildren) {
  const { on } = useContext(ToggleContext);
  return on ? <>{children}</> : null;
};
Toggle.Off = function ToggleOff({ children }: PropsWithChildren) {
  const { on } = useContext(ToggleContext);
  return on ? null : <>{children}</>;
};

Toggle.Button = function ToggleButton() {
  const { on, toggle } = useContext(ToggleContext);

  return <button onClick={toggle}>{on ? "On" : "Off"}</button>;
};
