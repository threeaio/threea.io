import { createSignal, JSX, ParentProps } from "solid-js";

type CodeBlockProps = {
  code: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  maxHeight?: string;
} & ParentProps &
  JSX.HTMLAttributes<HTMLDivElement>;

export default function CodeBlock(props: CodeBlockProps) {
  const [copied, setCopied] = createSignal(false);

  const formatCode = (code: string) => {
    // First escape HTML to prevent XSS
    const escapeHtml = (str: string) => {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const lines = code.trim().split("\n");

    return lines.map((line) => {
      let processed = escapeHtml(line);

      // Apply syntax highlighting
      processed = processed
        // Keywords
        .replace(
          /\b(const|let|var|function|return|export|import|from|type|interface|extends|implements|class|new|if|else|for|while|do|switch|case|break|continue|default|try|catch|finally|throw|typeof|instanceof|void|null|undefined|true|false)\b(?![^<]*>)/g,
          '<span class="text-3a-blue">$1</span>',
        )
        // Function names
        .replace(
          /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\((?![^<]*>)/g,
          '<span class="text-3a-green">$1</span>(',
        )
        // Types
        .replace(
          /:\s*([A-Z][a-zA-Z0-9_$]*|string|number|boolean|any|void|never|unknown)(?![^<]*>)/g,
          ': <span class="text-3a-red">$1</span>',
        )
        // Numbers
        .replace(/\b(\d+)\b(?![^<]*>)/g, '<span class="text-3a-red">$1</span>')
        // String literals
        .replace(
          /(["'`])(.*?)\1(?![^<]*>)/g,
          '<span class="text-3a-white">$1$2$1</span>',
        )
        // Comments (if any)
        .replace(
          /(\/\/.*$|\/\*[\s\S]*?\*\/)(?![^<]*>)/gm,
          '<span class="text-3a-paper">$1</span>',
        );

      return processed;
    });
  };

  const formattedLines = formatCode(props.code);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(props.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div class={`relative rounded bg-3a-gray-darker p-4 ${props.class}`}>
      {props.showCopyButton && (
        <div class="absolute right-0 top-0 z-20">
          <button
            onClick={handleCopy}
            class="rounded-tr rounded-bl bg-3a-gray-darker px-3 py-1 text-sm text-3a-paper transition-colors hover:bg-3a-gray hover:text-3a-white"
          >
            {copied() ? "Kopiert!" : "Kopieren"}
          </button>
        </div>
      )}

      <div class={`relative overflow-auto ${props.maxHeight}`}>
        <pre class="font-mono text-sm leading-6">
          <code class="grid text-3a-white">
            {formattedLines.map((line, idx) => (
              <div class="flex">
                {props.showLineNumbers && (
                  <span
                    class="select-none pr-4 text-right text-3a-paper/50"
                    style={{ "min-width": "3rem" }}
                  >
                    {idx + 1}
                  </span>
                )}
                <span innerHTML={line || "&nbsp;"} />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
