import { create } from 'zustand'

export const useCounterStore =  create((set)=>({
    listCounter:0,
    increaseListCounter: () => set((state) => ({ listCounter: state.listCounter + 1 })),
    decreaseListCounter: () => set((state) => ({ listCounter: state.listCounter - 1 })),


}))