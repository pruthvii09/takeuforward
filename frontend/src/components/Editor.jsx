import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { javascript } from "@codemirror/lang-javascript";
const Editor = ({ onChange, source_code }) => {
  return (
    <div className="overlay rounded-lg overflow-hidden w-full h-full shadow-4xl">
      <CodeMirror
        onChange={onChange}
        value={source_code}
        extensions={[javascript({ jsx: true })]}
        className="h-[1000px]"
        height="1000px"
        theme={dracula}
      />
    </div>
  );
};

export default Editor;
