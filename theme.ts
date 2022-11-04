import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  global: {
    "html, body": {
      padding: 0,
      margin: 0,
      "font-family": `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
    },
    "*": {
      "box-sizing": "border-box",
    },
  },
});

export default theme;
