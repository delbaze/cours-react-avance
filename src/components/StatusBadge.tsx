interface StatusBadgeProps {
  status: "Alive" | "Dead" | "unknown";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colors = {
    Alive: "bg-green-500",
    Dead: "bg-red-500",
    unknown: "bg-gray-400",
  };

  return (
    <span
      className={`inline-block w-3 h-3 rounded-full ${colors[status]} mr-2`}
    />
  );
}
