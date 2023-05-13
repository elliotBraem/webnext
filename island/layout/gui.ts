import { css } from "@stitches/core";
import { ComponentChildren, h } from "preact";

import { NAME } from "./config.ts";

interface DesktopAreaProps {
  children: ComponentChildren;
  className?: string;
}

const displayAreaStyles = css({
  gridArea: NAME,
  overflow: "auto",
});

export const DesktopArea = ({ children, className }: DesktopAreaProps) =>
  h("div", { className: displayAreaStyles() + className, children });
