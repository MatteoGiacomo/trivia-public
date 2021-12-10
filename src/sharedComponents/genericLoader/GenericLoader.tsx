import React from "react";
import style from "./GenericLoader.module.css"

type GenericLoaderProps = {
  message?: string | undefined;
}

export function GenericLoader (props: GenericLoaderProps) {
  const text = props.message || "loading"

  return (
    <div className={style.loader}>
      <div>
        <h2>{ text }</h2>
        <div className={style.progress}></div>
      </div>
    </div>
  )
}