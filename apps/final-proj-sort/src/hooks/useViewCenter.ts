import { useEffect, useState } from "react";

/**
 * 以中心区域为原点的坐标轴偏移计算
 *
 * @param x - 横轴偏移量
 * @param y - 纵轴偏移量
 * @returns
 */
export function useViewCenterAxis(
  x: number | `${number}%`,
  y: number | `${number}%`
) {
  const [v, setV] = useState<[number, number] | null>(null);
  useEffect(() => {
    const vw = document.documentElement.clientWidth || window.innerWidth;
    const vh = document.documentElement.clientHeight || window.innerHeight;
    const xv = Number(String(x).replace("%", ""));
    const xPercent = String(x).indexOf("%") > 0;
    const yv = Number(String(y).replace("%", ""));
    const yPercent = String(y).indexOf("%") > 0;
    const dx = xPercent ? (xv / 100) * vw : xv;
    const dy = yPercent ? (yv / 100) * vh : yv;

    const o = [vw / 2, vh / 2];
    setV([o[0] + dx, o[1] + dy]);
  }, [x, y]);
  return v;
}
