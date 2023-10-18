import 'styled-components';
import { Typography } from './../src/styles/theme/typography/index';
import { Colors } from './../src/styles/theme/color';

// re-define the theme type
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    typography: Typography;
  }
}
