import { create } from "zustand";

export const useErrorStore = create((set, get: any) => ({
  error: null,
  setError: (error: any) => set({ error }),
  /* action2: () => {
    return get().error;
  },
  setError2: () =>
    set((state: any) => {
      console.log(7777);
      return { error: "123123123", test: 789 };
    }), */
}));
/* const { error, setError }: any = useErrorStore();
{error} */