import type { Colors, Typography } from '@face/ui';
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    typography: Typography;
  }
}
