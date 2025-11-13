import withHover, { type WithHoverProps } from "../HOC/withHover";
interface CardProps extends WithHoverProps {
  title: string;
  description: string;
}
const Card: React.FC<CardProps> = ({ description, title, isHovered }) => (
  <div
    style={{
      background: isHovered ? "#e3f" : "white",
      color: isHovered ? "white" : "black",
    }}
  >
    <h3>{title}</h3>
    <p>{description}</p>
    {isHovered && <span>Vous survolez la carte</span>}
  </div>
);

export default withHover(Card);
