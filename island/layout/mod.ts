import * as config from "./config.ts";
import { DesktopArea } from "./gui.ts";

export const DesktopWidget = {
  ...config,
  GUI: DesktopArea,
};
