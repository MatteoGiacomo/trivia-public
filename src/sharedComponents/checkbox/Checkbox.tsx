import React, { ChangeEvent, HTMLProps } from "react";
import styleModule from "./Checkbox.module.css";
import classNames from "classnames/bind";

const style = classNames.bind(styleModule);

export enum CheckboxStatus {
  success,
  failure
}

type CheckboxProp = {
  label: string;
  onChange: (arg: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  checked?: boolean;
  status?: CheckboxStatus;
};

export function Checkbox(props: CheckboxProp & HTMLProps<HTMLDivElement>) {

  const className = style({
    wrapper: true,
    success: props.status === CheckboxStatus.success ,
    failure: props.status === CheckboxStatus.failure,
  });

  return (
    <div className={`${className} ${props.className}`}>
      <input
        type="checkbox"
        onChange={props.onChange}
        value={props.value}
        checked={props.checked}
      />
      <label>{props.label}</label>
    </div>
  );
}
