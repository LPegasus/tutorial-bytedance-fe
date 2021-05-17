import { CSSProperties, PropsWithChildren, useMemo } from "react";

// import { useViewCenterAxis } from "hooks/useViewCenter";
import styled from "styled-components";

export function FixedByViewport(
  props: PropsWithChildren<{
    x: number;
    y: number;
  }>
) {
  const { x, y, children } = props;
  // const styleProps = useViewCenterAxis(...pos);
  const style = useMemo<CSSProperties>(() => {
    return {
      transform: `translate3d(${x}px, ${y}px, 0)`,
    };
  }, [x, y]);
  return (
    <Wrapper style={style}>
      <div className="hover">{children}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  will-change: transform;
  .hover {
    perspective: 1200px;
    transform-style: preserve-3d;
    transform: scale(1);
    transition: transform ease-out 0.3s;
    &:hover {
      transform: scale(1.2);
    }
  }
`;
