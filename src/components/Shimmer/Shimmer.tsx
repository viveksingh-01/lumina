const Shimmer: React.FC<{ width?: string }> = ({ width = "w-full" }) => {
  return <div className={`h-96 ${width} bg-gray-100 rounded animate-pulse`}></div>;
};

export default Shimmer;
