import { Component, JSX, splitProps } from "solid-js";
import clsx from "clsx";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element;
  "aria-disabled"?: boolean; // Optional aria-disabled prop for reactivity
}

export const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ["children", "class", "aria-disabled"]);

  return (
    <button
      {...rest}
      class={clsx(
        "flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        local.class
      )}
      aria-disabled={local["aria-disabled"]}
      disabled={local["aria-disabled"]}
    >
      {local.children}
    </button>
  );
};
