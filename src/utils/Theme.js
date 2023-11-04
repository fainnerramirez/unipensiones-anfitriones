import { extendTheme } from "@chakra-ui/react";
import {  MultiSelectTheme } from 'chakra-multiselect'
import "@fontsource-variable/nunito"
import "@fontsource/ubuntu"

const theme = extendTheme({
  fonts: {
    heading: `'Nunito Variable', sans-serif;`,
    body: `'Ubuntu', sans-serif`,
  },
  components: {
    MultiSelect: MultiSelectTheme
  }
});

export default theme;