import type {
  CSSVariablesResolver,
  DefaultMantineColor,
  MantineColorsTuple,
} from "@mantine/core";
import { createTheme, rem } from "@mantine/core";

const textBlue: MantineColorsTuple = [
  "#E5F0FF",
  "#B3D2FF",
  "#80B5FF",
  "#4D97FF",
  "#1A79FF",
  "#0060E6",
  "#004AB3",
  "#003580",
  "#00204D",
  "#000B1A",
];

const backgroundGrey: MantineColorsTuple = [
  "#EFF3F6",
  "#CEDBE3",
  "#ADC3D1",
  "#8DABBF",
  "#6C93AC",
  "#537993",
  "#405E72",
  "#2E4352",
  "#1C2831",
  "#090D10",
];

const primaryBlue: MantineColorsTuple = [
  "#dfffff",
  "#caf9ff",
  "#9af0ff",
  "#64e8ff",
  "#3de1fe",
  "#25ddfe",
  "#09dbff",
  "#00c1e4",
  "#00adcc",
  "#0096b3",
];

const secondaryPink: MantineColorsTuple = [
  "#ffe8f5",
  "#ffcee3",
  "#ff9bc3",
  "#ff64a1",
  "#fe3885",
  "#fe1c73",
  "#ff096a",
  "#e40059",
  "#cc004e",
  "#b30043",
];

const accentYellow: MantineColorsTuple = [
  "#ffffe2",
  "#feffcc",
  "#feff9b",
  "#fdff64",
  "#fcff39",
  "#fcff1d",
  "#fcff09",
  "#e0e300",
  "#c7c900",
  "#aaae00",
];

const errorRed: MantineColorsTuple = [
  "#ffeaea",
  "#fed4d4",
  "#f3a9a9",
  "#ea7a7b",
  "#e25353",
  "#de3939",
  "#dd2b2c",
  "#c31d20",
  "#af161a",
  "#9a0914",
];

const successGreen: MantineColorsTuple = [
  "#ebfaeb",
  "#dfeedf",
  "#c0dabf",
  "#9fc49e",
  "#83b282",
  "#71a770",
  "#67a166",
  "#568c55",
  "#4a7e4a",
  "#3b6d3c",
];

const colors = {
  "text-blue": textBlue,
  "background-grey": backgroundGrey,
  "primary-blue": primaryBlue,
  "secondary-pink": secondaryPink,
  "accent-yellow": accentYellow,
  "error-red": errorRed,
  "success-green": successGreen,
} as const;

type ExtendedCustomColors = keyof typeof colors | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}

export const theme = createTheme({
  fontFamily: "Plus Jakarta Sans, sans-serif",
  headings: {
    sizes: {
      h1: { fontSize: rem(48), fontWeight: "700" },
      h2: { fontSize: rem(36), fontWeight: "700" },
      h3: { fontSize: rem(28), fontWeight: "400" },
    },
  },
  colors,
  primaryColor: "primary-blue",
  primaryShade: 3,
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {},
  dark: {
    "--mantine-color-text": theme.colors["text-blue"][0],
    "--mantine-color-body": theme.colors["background-grey"][9],
  },
});
