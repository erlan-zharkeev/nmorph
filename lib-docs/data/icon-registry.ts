import type { Component } from "vue";
import * as nmorphIcons from "@nmorph/nmorph-ui-kit/icons";

type NmorphIconEntry = readonly [string, Component];

const isVueComponent = (value: unknown): value is Component => {
  if (typeof value === "function") return true;
  if (!value || typeof value !== "object") return false;

  return "render" in value || "setup" in value;
};

const hiddenIconNames = new Set(["NmorphIconLoader1", "NmorphIconLoader2", "NmorphIconLoading"]);

const isNmorphIconEntry = (entry: [string, unknown]): entry is [string, Component] => {
  const [name, value] = entry;

  return name.startsWith("NmorphIcon") && name !== "NmorphIcon" && !hiddenIconNames.has(name) && isVueComponent(value);
};

const iconEntries = Object.entries(nmorphIcons).filter(isNmorphIconEntry) as NmorphIconEntry[];

export const nmorphIconEntries = Object.freeze(iconEntries);
export const nmorphIconNames = Object.freeze(iconEntries.map(([name]) => name));
export const nmorphIconRegistry = Object.freeze(Object.fromEntries(iconEntries) as Record<string, Component>);
