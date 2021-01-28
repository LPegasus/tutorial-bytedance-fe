/**
 * 手动实现一下 `AbortController`，这样 Node.js 也能用。并且保证在 `abort` 之后，事件监听器被清除。
 * 避免手动调用 `removeEventListener`
 */
export class AbortControllerEx {
  /**
   * 获取 signal
   *
   * @remarks
   * {@link AbortSignal}
   */
  public get signal() {
    return this._signal;
  }
  /** 取消 */
  public abort() {
    this._signal.aborted = true;
  }
  private _signal = new AbortSignal();
}

class AbortSignal {
  public addEventListener(_type: 'abort', callback: (e: AbortSignal) => void) {
    this._callbacks[this._eventId++] = callback;
  }
  public removeEventListener(
    _type: 'abort',
    callback: (e: AbortSignal) => void
  ) {
    Object.keys(this._callbacks).forEach((key) => {
      if (callback === this._callbacks[key]) {
        try {
          delete this._callbacks[key];
        } catch (_e) {}
      }
    });
  }
  public get aborted() {
    return this._aborted;
  }
  public set aborted(value: boolean) {
    if (!this._aborted && value === true) {
      this._aborted = value;
      Promise.resolve().then(() => {
        Object.keys(this._callbacks).forEach((key) => {
          try {
            this._callbacks[key].call(this, this);
          } catch (e) {
            console.error(e);
          }
        });
      });
      // @ts-ignore
      this._callbacks = null;
    }
  }

  private _eventId = 0;
  private _aborted = false;
  private _callbacks: Record<string, any> = {};
}
