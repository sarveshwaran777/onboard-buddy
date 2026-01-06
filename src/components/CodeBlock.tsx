import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeBlock = ({ code, language = 'typescript', title }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting
  const highlightCode = (code: string) => {
    return code
      .replace(/(\/\/.*$)/gm, '<span class="text-muted-foreground">$1</span>')
      .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-success">$1</span>')
      .replace(/\b(const|let|var|function|return|if|else|for|while|import|export|from|async|await|interface|type|enum)\b/g, '<span class="text-accent">$1</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-warning">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-info">$1</span>')
      .replace(/(@\w+)/g, '<span class="text-primary">$1</span>');
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-border bg-muted/30">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
          <span className="text-xs font-medium text-muted-foreground">{title}</span>
          <span className="text-xs text-muted-foreground font-mono">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto scrollbar-thin">
          <code
            className="text-sm font-mono leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
          />
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 rounded-lg bg-secondary/80 hover:bg-secondary border border-border opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <Check className="w-4 h-4 text-success" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  );
};
