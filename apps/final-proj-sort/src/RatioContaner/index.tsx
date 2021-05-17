import type { CSSProperties, PropsWithChildren } from "react";

const innerStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

export function RatioContainer(
  props: PropsWithChildren<RatioContainerPropsType>
) {
  const { ratio, children, width, className, style } = props;
  return (
    <div
      className={className}
      style={{
        width,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          height: 0,
          paddingTop: `${Math.round((1 / ratio) * 100)}%`,
        }}
      >
        <div style={innerStyle}>{children}</div>
      </div>
    </div>
  );
}

export interface RatioContainerPropsType {
  /** 宽/高 */
  ratio: number;
  width: number | string;
  className?: string;
  style?: CSSProperties;
}
