import type { WithClickCounterProps } from "../HOC/withClickCounter";

interface ButtonsProps extends WithClickCounterProps {
  label: string;
}
const Button: React.FC<ButtonsProps> = ({ label, clickCount, onClick }) => {
  return (
    <button onClick={onClick}>
      {label} (Cliqué {clickCount})
    </button>
  );
};

export default Button;
