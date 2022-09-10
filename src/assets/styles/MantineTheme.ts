import { MantineThemeOverride } from "@mantine/core";

export const myTheme: MantineThemeOverride = {
  colorScheme: "light",

  focusRing: "never",

  respectReducedMotion: true,

  cursorType: "pointer",

  defaultRadius: "sm",

  white: "#fff",
  black: "#18333E",

  primaryColor: "blue",

  primaryShade: 4,

  headings: {
    fontWeight: 500,
    sizes: {
      h1: { fontSize: 32 },
      h2: { fontSize: 28 },
      h3: { fontSize: 24 },
      h4: { fontSize: 20 },
      h5: { fontSize: 16 },
      h6: { fontSize: 12 },
    },
  },

  loader: "bars",

  dateFormat: "MMMM DD, YYYY",

  datesLocale: "en",
};
