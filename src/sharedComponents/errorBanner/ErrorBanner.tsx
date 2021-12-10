import React from "react";
import style from "./ErrorBanner.module.css";

export function ErrorBanner({ message }: { message: string }) {
  return (
    <div className={style.banner}>
      <p role="alert">{message}</p>
    </div>
  );
}
