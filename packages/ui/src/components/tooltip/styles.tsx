import { SVGProps } from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Content = styled.div<{ $display: boolean }>`
  ${({ theme }) => theme.typography.body._3Medium};
  background: ${({ theme }) => theme.colors.custom.tooltip};
  color: ${({ theme }) => theme.colors.grey._100};
  display: ${({ $display }) => ($display ? 'block' : 'none')};
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  padding: 8px 12px;
  border-radius: 6px;
`;

const ArrowSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
    {...props}>
    <path
      d="M5.43324 7.22245C6.23396 8.25918 7.76536 8.25918 8.56608 7.22245L13.9995 0.000108719C13.9995 0.000108719 14.0582 0 12.3846 0C10.7111 0 9.10262 0 6.99966 0C4.8967 0 3.28821 0 1.61469 0C-0.0588318 0 -0.000237335 0.000108719 -0.000237335 0.000108719L5.43324 7.22245Z"
      fill="#1C2636"
      fill-opacity="0.9"
    />
  </svg>
);

export const Arrow = styled(ArrowSvg)<{ $display: boolean }>`
  display: ${({ $display }) => ($display ? 'block' : 'none')};
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  $ > path {
    fill: ${({ theme }) => theme.colors.custom.tooltip};
  }
`;
