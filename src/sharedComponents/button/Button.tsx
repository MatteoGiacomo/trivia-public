import React, { HTMLProps } from "react";
import styleModule from "./Button.module.css";
import classNames from "classnames/bind";

const style = classNames.bind(styleModule);

export type ButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  status?: "primary" | "secondary";
  type?: "button" | "submit" | "reset" | undefined;
};

export function Button(props: ButtonProps & HTMLProps<HTMLButtonElement>) {
  const className = style({
    base: true,
    primary: props.status === "primary" || !props.status,
    secondary: props.status === "secondary",
    disabled: props.disabled,
  });

  return (
    <button
      type={props.type || "button"}
      className={`${className} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
}
