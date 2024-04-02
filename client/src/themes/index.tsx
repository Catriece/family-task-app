import { extendTheme } from "@chakra-ui/react";
import { FloatingLabelStyle } from "./components/forms/floating-label.themes";
import { Button } from "./components/button";

const overrides = {
  components: {
    Button,
    Form: {
      ...FloatingLabelStyle,
    },
  },
};

export const theme = extendTheme(overrides);
