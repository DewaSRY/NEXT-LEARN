import { useContext } from "react";
import { EditorContext } from "../Context/Editor.context";

export function useEditorContext() {
  return useContext(EditorContext);
}
