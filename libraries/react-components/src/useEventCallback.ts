import { useRef } from 'react';

/**
 * 用来确保函数中的闭包变量为最后一次渲染的状态
 *
 * @param fn - 函数
 */
export function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
  const ref = useRef<any>(fn);
  ref.current = fn;
  return useRef<T>(((...args) => ref.current(...args)) as T).current;
}
