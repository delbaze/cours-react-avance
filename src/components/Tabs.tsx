import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
  Children,
  cloneElement,
  isValidElement,
} from "react";

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

type TabsProps = {
  children: React.ReactNode;
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

type TriggerProps = {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
};
type ContentProps = {
  value: string;
  children: React.ReactNode;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context)
    throw new Error("Tabs compound components must be used within Tabs");
  return context;
}

function Tabs({
  children,
  defaultValue,
  value: controlledValue,
  onValueChange,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  console.log("%c⧭", "color: #00e600", children);

  const value = controlledValue ?? internalValue;
  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      {/* {Children.map((children, child) => {
        cloneElement(child);
      })} */}
      <div className="tabs">
        {/* {children} */}
        {Children.map(children, (child) => {
          console.log("Children", children);
          console.log("Child", child);
          if (!isValidElement(child)) return child;

          //   if (child.type === Tabs.Trigger) {
          //     return cloneElement(child, {className: "test" });
          //   }
          return child;
        })}
      </div>
    </TabsContext.Provider>
  );
}

Tabs.List = function TabsList({ children }: PropsWithChildren) {
  return (
    <div role="tablist" className="tabs-list">
      {children}
    </div>
  );
};
Tabs.Trigger = function TabsTrigger({
  children,
  value,
  disabled,
}: TriggerProps) {
  const { value: activeValue, onValueChange } = useTabs();
  const isSelected = activeValue === value;
  return (
    <button
      role="tab"
      aria-select={isSelected}
      aria-controls={`tabpanel-${value}`}
      disabled={disabled}
      onClick={() => !disabled && onValueChange(value)}
      className={`tab-trigger ${isSelected ? "active" : ""} ${
        disabled ? "disabled" : ""
      }`}
    >
      {cloneElement(children, {
        style: { color: activeValue === value ? "green" : "blue" },
      })}
    </button>
  );
};
Tabs.Content = function TabsContent({ children, value }: ContentProps) {
  const { value: activeValue } = useTabs();
  if (value !== activeValue) return null;
  return (
    <div role="tabpanel" id={`tabpanel-${value}`} className="tab-content">
      {children}
    </div>
  );
};

export default Tabs;
