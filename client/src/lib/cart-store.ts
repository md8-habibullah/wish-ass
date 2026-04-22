import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface RequisitionItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category: string;
  stock: number;
}

interface RequisitionStore {
  items: RequisitionItem[];
  addItem: (item: RequisitionItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearRequisition: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useRequisitionStore = create<RequisitionStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === newItem.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: Math.min(item.stock, item.quantity + newItem.quantity) }
                : item
            ),
          });
        } else {
          set({ items: [...currentItems, newItem] });
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },
      updateQuantity: (id, quantity) => {
        const item = get().items.find((i) => i.id === id);
        if (item) {
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, quantity: Math.max(1, Math.min(i.stock, quantity)) } : i
            ),
          });
        }
      },
      clearRequisition: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "medisync-requisition",
    }
  )
);
