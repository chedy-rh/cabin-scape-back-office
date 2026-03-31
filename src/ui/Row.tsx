import styled, { css } from "styled-components";
import type { RowProps } from "../types";

const StyledRow = styled.div<RowProps>`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

function Row({ type = "vertical", ...props }: RowProps) {
  return <StyledRow type={type} {...props} />;
}

export default Row;