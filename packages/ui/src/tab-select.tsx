export function TabSelect({
  options,
  selected,
  selectAction,
}: {
  options: string[];
  selected: string;
  selectAction: (option: string) => void;
}) {
  return (
    <div className="relative inline-flex items-center space-x-3">
      {options.map((option) => (
        <button
          key={option}
          className={`${
            option === selected
              ? "bg-primary-accents-2 text-gray-800"
              : "bg-primary-accents-2 text-gray-600 hover:bg-gray-100"
          } rounded-md px-2 py-1 text-sm font-medium capitalize transition-all duration-75 active:scale-95 sm:px-3`}
          onClick={() => selectAction(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
