import { extendTheme } from "@chakra-ui/react";

import { Button } from "./components/button";
import { FloatingLabelStyle } from "./components/forms/floating-label.themes";

const overrides = {
  components: {
    Button,
    Form: {
      ...FloatingLabelStyle,
    },
  },
};

export const theme = extendTheme(overrides);
