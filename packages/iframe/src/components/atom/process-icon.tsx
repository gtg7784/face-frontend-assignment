import styled from 'styled-components';
import { ReactComponent as ProgressIconComponent } from '../../assets/progress-circular.svg';

export const ProgressIcon = styled(ProgressIconComponent)`
  color: black;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
