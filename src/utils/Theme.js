import { Button, background, extendTheme } from "@chakra-ui/react";
import { MultiSelectTheme } from "chakra-multiselect";
import "@fontsource-variable/nunito";
import "@fontsource/ubuntu";
import { COLOR } from "../utils/Constants/Color";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#132D46",
        color: "#FFFFFF",
      },
    },
  },
  fonts: {
    heading: `'Nunito Variable', sans-serif;`,
    body: `'Ubuntu', sans-serif`,
  },
  components: {
    MultiSelect: MultiSelectTheme,
    Button: {
      variants: {
        "green-up": {
          bg: COLOR.GREEN,
          color: COLOR.WHITE,
        },
        "green-outline-up": {
          background: "transparent",
          color: COLOR.WHITE,
          borderColor: COLOR.GREEN,
          boxShadow: `0 0 2px 2px ${COLOR.GREEN}`,
        },
      },
    },
    FormHelperText: {
      variants: {
        "white-up": {
          color: COLOR.WHITE,
        },
      },
    },
  },
});

export default theme;
