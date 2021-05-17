/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import type { Observable } from "rxjs";
import { BehaviorSubject, combineLatest } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";

export interface AtomOptions<T> {
  /** 默认值 */
  defaultValue: T;
}

export interface Atom<T> {
  $: Observable<T>;
  /**
   * 获取现在的值
   */
  readonly currentValue: T;
  /**
   * @param v - 设置值
   */
  set(v: T): void;
  /**
   * @deprecated for internal use only
   */
  _$: BehaviorSubject<T>;
}

/**
 * 创建一个 atom 实例
 *
 * @param options - 配置参数
 * @returns
 */
export function makeAtom<T>(options: AtomOptions<T>): Atom<T> {
  const bs = new BehaviorSubject<T>(options.defaultValue);
  return {
    $: bs.asObservable().pipe(distinctUntilChanged(Object.is)),
    set(v: T) {
      bs.next(v);
    },
    get currentValue() {
      return bs.getValue();
    },
    _$: bs,
  };
}

export type AtomState<T> = [
  /**
   * 获取最新值
   */
  () => Readonly<T>,
  /**
   * 设置值
   */
  (v: T) => void,
  /**
   * snapshot 值
   */
  T
];

/**
 * 获取 atom 状态及 set 方法
 *
 * @param atom - 要读取的 atom 实例
 * @returns
 */
export function useAtomState<T>(atom: Atom<T>): AtomState<T> {
  const [state, setState] = useState(atom.currentValue);
  useEffect(() => {
    const sub = atom.$.subscribe((v: T) => {
      setState(v);
    });
    return () => sub.unsubscribe();
  }, []);

  const { current: set } = useRef((v: T) => {
    atom.set(v);
  });
  const { current: get } = useRef(() => atom.currentValue);

  return [get, set, state];
}

function _get<T>(atom: Atom<T>): T {
  return atom.currentValue;
}

/**
 * 合并 stream 产生新的状态订阅
 *
 * @param options - 一些配置
 * @returns
 */
export function makeAtomStream<V>(options: {
  get({ get }: { get: <T>(atom: Atom<T>) => T }): V;
}) {
  const { get } = options;
  const depsAtomsRef: Atom<any>[] = [];
  return () => {
    const [v, setV] = useState(() => {
      return get({
        get(atom) {
          depsAtomsRef.push(atom);
          return atom.currentValue;
        },
      });
    });

    useEffect(() => {
      const refresh$ = combineLatest(depsAtomsRef.map((d) => d.$)).pipe(
        map(() => {
          return get({
            get: _get,
          });
        })
      );
      const sub = refresh$.subscribe(setV);
      return () => {
        sub.unsubscribe();
      };
    }, []);

    return v;
  };
}

/**
 * 获取 atom 更新函数，这个 hook 的作用是提供那些只关心更新数据，而不需要订阅数据的组件减少渲染
 *
 * @param atom
 * @returns
 */
export function useAtomUpdater<T>(atom: Atom<T>) {
  return useState(() => (updateFn: (v: T) => T) => {
    const nextV = updateFn(atom.currentValue);
    atom.set(nextV);
  })[0];
}
