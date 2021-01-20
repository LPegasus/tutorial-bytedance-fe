import { useGlobalStyle } from '@src/GlobalStyle';
import {
  Container,
  Box,
  Typography,
  Link,
  ThemeProvider,
} from '@material-ui/core';
import { theme } from '@src/theme';

export default function Home() {
  useGlobalStyle();
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          <Link href="/about" color="secondary">
            Go to the about page
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
