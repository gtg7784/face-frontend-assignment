import styled from 'styled-components';
import { Clear } from '@mui/icons-material';

export const Wrapper = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Background = styled.div`
  opacity: 0.35;
  background: ${({ theme }) => theme.colors.darkgrey.dark};
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 16px;
  width: 360px;
  background: ${({ theme }) => theme.colors.white};

  &.dialog-modal {
    padding: 36px;
    padding-bottom: 0px;
  }

  &.dialog-popup {
    padding: 24px 32px 0px 32px;
  }
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 24px; // 24px is the height of close button
  margin-bottom: 16px;
  ${({ theme }) => theme.typography.heading._5SemiBold};

  &.dialog-header-popup {
    justify-content: center;
  }
`;

export const CloseButton = styled(Clear).attrs(({ theme }) => ({
  sx: {
    color: theme.colors.darkgrey.light,
  },
}))`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;

  &.dialog-header-popup {
    align-items: center;
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 32px 0px;
`;
