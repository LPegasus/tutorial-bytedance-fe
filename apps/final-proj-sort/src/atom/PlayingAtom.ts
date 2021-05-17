import { random } from "../fisher-yates-shuffle";
import { makeAtom, makeAtomStream, useAtomState } from ".";

export const PlayingAtom = makeAtom({
  defaultValue: {
    total: NaN,
    sort: [] as (number | string)[],
    teamList: [] as string[],
  },
});

export function usePlayingAtom() {
  return useAtomState(PlayingAtom);
}

const cache = new Map<number, string[]>();

export const usePlayingRandom = makeAtomStream({
  get({ get }) {
    const { teamList } = get(PlayingAtom);
    const total = teamList.length;

    if (!cache.has(total)) {
      const sort = random(total);

      cache.set(
        total,
        sort.map((d) => teamList[d - 1])
      );
    }
    return cache.get(total);
  },
});
