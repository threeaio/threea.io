import { ParentProps } from "solid-js";

export default function Kbd(props: ParentProps) {
  return (
    <kbd
      class={"px-1.5 py-0.5 font-mono text-3a-green bg-3a-black border rounded"}
    >
      {props.children}
    </kbd>
  );
}
