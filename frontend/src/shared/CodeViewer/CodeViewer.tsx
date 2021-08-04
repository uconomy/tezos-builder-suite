import React, { useEffect, useState } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import defaultTheme from 'prism-react-renderer/themes/vsDark';

import './prism-setup';
import './CodeViewer.css';

export type CodeViewerProps = {
  className?: string;
  code: string;
  fileName?: string;
  language?: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ language, fileName, code, className }) => {
  const [_language, setLanguage] = useState(language);

  useEffect(() => {
    if (fileName && !language) {
      if (fileName.endsWith('.jsligo')) {
        setLanguage("jsligo");
      } else if (fileName.endsWith('.mligo')) {
        setLanguage("cameligo");
      } else if (fileName.endsWith('.religo')) {
        setLanguage("reasonligo");
      } else {
        setLanguage("pascaligo");
      }
    }
  }, [language, fileName]);

  return (
    <Highlight {...defaultProps} language={_language as Language} code={code} theme={defaultTheme}>
      {({ className: _className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${_className}${className ? ` ${className}` : ''}`} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              <div className="token-line-no">{i + 1}</div>
              <div className="token-line-content">
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}