import { useCallback, useEffect, useState } from "react";

interface State {
  counts: Record<string, number>;
  mine: string | null;
}

const EMPTY: State = { counts: {}, mine: null };

// Stored in this browser only. Swap the localStorage calls for API calls
// once your backend has a reactions route.
export function useReactions(blogId: string) {
  const key = `reactions:${blogId}`;
  const [state, setState] = useState<State>(EMPTY);

  useEffect(() => {
    try {
      setState(JSON.parse(localStorage.getItem(key) ?? ""));
    } catch {
      setState(EMPTY);
    }
  }, [key]);

  const react = useCallback(
    (name: string) => {
      setState((prev) => {
        if (prev.mine === name) return prev; // holding the emoji fires repeats; one reaction per user
        const counts = { ...prev.counts };
        if (prev.mine) counts[prev.mine] = Math.max(0, (counts[prev.mine] ?? 1) - 1);
        counts[name] = (counts[name] ?? 0) + 1;
        const next = { counts, mine: name };
        localStorage.setItem(key, JSON.stringify(next));
        return next;
      });
    },
    [key],
  );

  return { counts: state.counts, mine: state.mine, react };
}