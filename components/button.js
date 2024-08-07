const Button = ({ children }) => {
  return (
    <button
      className="bg-black dark:bg-white text-lg text-teal-200 dark:text-teal-700 rounded-lg"
      onClick={() => alert("thanks to button")}
    >
      {children}
    </button>
  );
};

export default Button;
