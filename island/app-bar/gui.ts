import { css } from "@stitches/core";
import { h } from "preact";

import { ModuleContext } from "./params.ts";

const rootStyles = css({
  gridArea: ModuleContext.className,
  // backgroundColor: THEME.palette.background,
  height: "100%",
  position: "initial",
  zIndex: 2147483647,
});

export const AppBarGUI = () =>
  h("header", {
    class: rootStyles(),

    children: h("button", {
      title: "Open settings",

      children: h("img", { alt: "Avatar", src: "/rin.jpeg" }),
    }),
  });
