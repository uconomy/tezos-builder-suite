import React, { useEffect } from 'react';
import prism from 'prismjs';
import './CodeViewer.css';

export interface CodeViewerProps {
  language: string;
  code: string;
}

// Add more LIGO support
prism.languages.pascaligo = {
    comment: [/\(\*[\s\S]+?\*\)/, /\/\/.*/],
    string: {
        pattern: /(?:'(?:''|[^'\r\n])*'|#[&$%]?[a-f\d]+)+|\^[a-z]/i,
        greedy: !0
    },
    keyword: [{
        pattern: /(^|[^&])\b(?:absolute|array|asm|begin|case|const|constructor|destructor|do|downto|else|end|file|for|function|goto|if|implementation|inherited|inline|interface|label|nil|object|of|operator|packed|procedure|program|record|reintroduce|repeat|self|set|string|then|to|type|unit|until|uses|var|while|with)\b/i,
        lookbehind: !0
    }, {
        pattern: /(^|[^&])\b(?:dispose|exit|false|new|true)\b/i,
        lookbehind: !0
    }, {
        pattern: /(^|[^&])\b(?:class|dispinterface|except|exports|finalization|finally|initialization|inline|library|on|out|packed|property|raise|resourcestring|threadvar|try)\b/i,
        lookbehind: !0
    }, {
        pattern: /(^|[^&])\b(?:absolute|abstract|alias|assembler|bitpacked|break|cdecl|continue|cppdecl|cvar|default|deprecated|dynamic|enumerator|experimental|export|external|far|far16|forward|generic|helper|implements|index|interrupt|iochecks|local|message|name|near|nodefault|noreturn|nostackframe|oldfpccall|otherwise|overload|override|pascal|platform|private|protected|public|published|read|register|reintroduce|result|safecall|saveregisters|softfloat|specialize|static|stdcall|stored|strict|unaligned|unimplemented|varargs|virtual|write)\b/i,
        lookbehind: !0
    }],
    number: [/(?:[&%]\d+|\$[a-f\d]+)/i, /\b\d+(?:\.\d+)?(?:e[+-]?\d+)?/i],
    operator: [/\.\.|\*\*|:=|<[<=>]?|>[>=]?|[+\-*\/]=?|[@^=]/i, {
        pattern: /(^|[^&])\b(?:and|as|div|exclude|in|include|is|mod|not|or|shl|shr|xor)\b/,
        lookbehind: !0
    }],
    punctuation: /\(\.|\.\)|[()\[\]:;,.]/
};
prism.languages.reasonligo = Object.assign({}, prism.languages.reason, {
    comment: [/(^|[^\\])\/\*[\s\S]*?\*\//, /\(\*[\s\S]*?\*\)/, /\/\/.*/]
});
prism.languages.cameligo = Object.assign({}, prism.languages.ocaml, {
    comment: [/(^|[^\\])\/\*[\s\S]*?\*\//, /\(\*[\s\S]*?\*\)/, /\/\/.*/]
});
prism.languages.jsligo = prism.languages.typescript;

export const CodeViewer: React.FC<CodeViewerProps> = ({ language, code }) => {
  useEffect(() => {
    prism.highlightAll();
  }, [code, language]);

  return (
    <pre>
      <code className={`language-${language}`}>
        { code }
      </code>
    </pre>
  );
}