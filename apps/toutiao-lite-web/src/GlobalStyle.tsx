import { makeStyles } from '@material-ui/core/styles';

export const useGlobalStyle = makeStyles((theme) => {
  return { '@global': {} };
});

export function GlobalStyle() {
  useGlobalStyle();
  return null;
}
