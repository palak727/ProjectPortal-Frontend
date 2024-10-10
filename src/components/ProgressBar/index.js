const ProgressBar = ({ current, total }) => {
  const progressPercentage = Math.min((current / total) * 100, 100);

  return (
    <div className="h-6 w-full overflow-hidden rounded-full bg-gray-300 shadow">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
