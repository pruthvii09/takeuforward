import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { EditorView } from "@codemirror/view";
import { getLanguage } from "../helper/language";
import { javascript } from "@codemirror/lang-javascript";
import { mapLanguages } from "../helper/map-languages";
const Editor = ({ onChange, source_code, language_id }) => {
  console.log(language_id);
  const selectedLanguage = getLanguage(language_id).toLowerCase();
  // const lowercaseLanguage = selectedLanguage.toLowerCase();
  console.log(selectedLanguage);
  const handleIndentTab = (cm) => {
    const spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
    cm.replaceSelection(spaces);
  };
  const extensions = [
    keymap.of([handleIndentTab]),
    mapLanguages(selectedLanguage)(),
    EditorView.lineWrapping,
  ];
  return (
    <div className="overlay rounded-lg overflow-hidden text-lg w-full h-full shadow-4xl">
      <CodeMirror
        onChange={onChange}
        value={source_code}
        extensions={extensions}
        height="1000px"
        theme={dracula}
      />
    </div>
  );
};

export default Editor;
