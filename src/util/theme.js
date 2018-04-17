import createMuiTheme from "material-ui/styles/createMuiTheme";
import blue from "material-ui/colors/blue";
import green from "material-ui/colors/green";
import red from "material-ui/colors/red";

import createPalette from "material-ui/styles/createPalette";

export const theme = createMuiTheme({
  palette: createPalette({
    primary: red,
    accent: {
      ...green
    }
  }),
  overrides: {
    MuiAppBar: {
      height: 70
    }
  }
});
