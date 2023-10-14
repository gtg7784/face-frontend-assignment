import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type IframeStoreActions = {
  setRequestId: (id: string) => void;
  clearRequestId: () => void;
};

type IframeStore = {
  requestId: string;
  actions: IframeStoreActions;
};

export const useIframeStore = create<IframeStore>()(
  devtools(
    (set) => ({
      requestId: '',
      actions: {
        setRequestId: (id: string) => set({ requestId: id }),
        clearRequestId: () => set({ requestId: '' }),
      },
    }),
    {
      name: 'Zustand',
      store: 'IframeStore',
    }
  )
);

export const useRequestId = () => useIframeStore(({ requestId }) => requestId);
export const useIframeActions = () => useIframeStore(({ actions }) => ({ ...actions }));
