import { forwardRef } from 'react';
import styled, { CSSProperties, keyframes } from 'styled-components';

const kf = keyframes`
  0% {
    perspective-origin: 600px -800px;
    perspective: 2000px;
  }
  100% {
    perspective-origin: 1000px -500px;
    perspective: 2000px;
  }
`;

const width = 40;

const CubeContainer = styled.div`
  width: ${width * 5}px;
  height: ${width * 2}px;
  perspective: 2000px;
  perspective-origin: 500px -200px;
  animation: ${kf} 5s infinite;
  animation-direction: alternate;
  position: relative;
  overflow: visible;
  transform: translate3d(${width * 2}px, ${width * 10}px, 0);

  & > .cube {
    position: absolute;
    width: ${width}px;
    height: ${width}px;
    perspective: none;
    transform-style: preserve-3d;

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 2px solid #333;
      position: absolute;
      backface-visibility: inherit;
      background: #fff;

      /* Define each face based on direction */
      &.front {
        transform: translateZ(${width / 2}px);
      }

      &.back {
        transform: rotateY(180deg) translateZ(${width / 2}px);
      }

      &.right {
        transform: rotateY(90deg) translateZ(${width / 2}px);
      }

      &.left {
        transform: rotateY(-90deg) translateZ(${width / 2}px);
      }

      &.top {
        transform: rotateX(90deg) translateZ(${width / 2}px);
      }

      &.bottom {
        transform: rotateX(-90deg) translateZ(${width / 2}px);
      }
    }
  }
`;

type MetricsRowType = [0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1];
type MetricsFloorType = [
  MetricsRowType,
  MetricsRowType,
  MetricsRowType,
  MetricsRowType,
  MetricsRowType
];

const DEFAULT_METRICS: Required<CubePropsType>['metrics'] = [
  [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ],
];

export interface CubePropsType {
  style?: CSSProperties;
  metrics?: MetricsFloorType[];
}
export const Cube = forwardRef<HTMLDivElement, CubePropsType>(function Cube(
  props: CubePropsType,
  ref
) {
  const { metrics = DEFAULT_METRICS, style } = props;
  return (
    <CubeContainer ref={ref} style={style}>
      {metrics.map((floor, i) => {
        return floor.map((row, j) => {
          return row.map((c, k) => {
            return (
              <div
                className="cube"
                style={{
                  zIndex: -i,
                  visibility: c === 0 ? 'hidden' : undefined,
                  transform: `translate3d(${width * k}px,${width * i}px,${
                    width * j - width * 5
                  }px)`,
                }}
              >
                <div className="front"></div>
                <div className="back"></div>
                <div className="left"></div>
                <div className="right"></div>
                <div className="top"></div>
                <div className="bottom"></div>
              </div>
            );
          });
        });
      })}
    </CubeContainer>
  );
});
