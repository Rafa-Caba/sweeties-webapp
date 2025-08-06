import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { GuestInfo } from '../../types/public';

interface CheckoutState {
    guestInfo: GuestInfo;
    setGuestInfo: (info: GuestInfo) => void;
    clearGuestInfo: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
    devtools(
        immer((set) => ({
            guestInfo: {
                name: '',
                email: '',
                phone: '',
                note: '',
            },

            setGuestInfo: (info) => {
                set((state) => {
                    state.guestInfo = info;
                });
            },

            clearGuestInfo: () => {
                set((state) => {
                    state.guestInfo = {
                        name: '',
                        email: '',
                        phone: '',
                        note: '',
                    };
                });
            },
        }))
    )
);
