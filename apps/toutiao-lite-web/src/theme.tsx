import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#a61b29',
      light: '#F2273B',
      dark: '#A61B28',
    },
    secondary: {
      main: '#0A72A6',
      light: '#57BFF2',
      dark: '#074F73',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export { theme };
