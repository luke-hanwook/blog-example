import SyntaxHighlighter from "react-syntax-highlighter";
import { rainbow } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const CopyButton = ({ target }) => {
  const handleCopy = async () => {
    if (target) {
      try {
        await navigator.clipboard.writeText(target);
        alert("copied");
      } catch (error) {
        alert("copied failed");
      }
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-0.5 top-0.5 bg-white dark:text-gray-800 rounded-lg"
    >
      copy
    </button>
  );
};

export default function CodeBlock({ children }) {
  return (
    <div className="relative">
      <CopyButton target={children} />
      <SyntaxHighlighter showLineNumbers style={rainbow}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
