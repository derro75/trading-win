import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Trade {
  id: string;
  pair: string;
  amount: number;
  direction: 'HIGHER' | 'LOWER';
  entryPrice: number;
  expiryTime: number;
  status: 'PENDING' | 'WON' | 'LOST';
}

interface TradeState {
  demoBalance: number;
  activeTrades: Trade[];
  tradeHistory: Trade[];
  setDemoBalance: (amount: number) => void;
  addTrade: (trade: Trade) => void;
  updateTradeStatus: (id: string, status: 'WON' | 'LOST', payout: number) => void;
}

export const useTradeStore = create<TradeState>()(
  persist(
    (set) => ({
      demoBalance: 10000, // Initial demo funds
      activeTrades: [],
      tradeHistory: [],
      setDemoBalance: (amount) => set({ demoBalance: amount }),
      addTrade: (trade) => 
        set((state) => ({ 
          activeTrades: [...state.activeTrades, trade],
          demoBalance: state.demoBalance - trade.amount 
        })),
      updateTradeStatus: (id, status, payout) =>
        set((state) => ({
          activeTrades: state.activeTrades.filter((t) => t.id !== id),
          tradeHistory: [
            { ...state.activeTrades.find((t) => t.id === id)!, status },
            ...state.tradeHistory,
          ],
          demoBalance: status === 'WON' ? state.demoBalance + payout : state.demoBalance,
        })),
    }),
    { name: 'trading-storage' }
  )
);
