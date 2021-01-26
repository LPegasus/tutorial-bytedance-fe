import { makeStyles } from '@material-ui/core/styles';

export const useGlobalStyle = makeStyles((theme) => {
  return {
    '@global': {
      body: {
        margin: 0,
      },
    },
  };
});

export function GlobalStyle() {
  useGlobalStyle();
  return null;
}
