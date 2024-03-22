import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";
export const mapLanguages = (value) => {
  const mappedLanguages = {
    javascript,
    python,
    java,
    "c++": cpp,
  };
  return mappedLanguages[value];
};
