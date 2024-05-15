import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CryptoCurrency, CryptoPrice, PairCurrency } from './types';
import { fetchCurrencyCryptoPrice, getCryptos } from './services/CryptoService';

type CryptoStore = {
	cryptocurrencies: CryptoCurrency[];
	result: CryptoPrice;
	loading: boolean;
	fetchCryptos: () => Promise<void>;
	fetchData: (pair: PairCurrency) => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>()(
	devtools((set) => ({
		cryptocurrencies: [],
		result: {
			IMAGEURL: '',
			PRICE: '',
			HIGHDAY: '',
			LOWDAY: '',
			CHANGEPCT24HOUR: '',
			LASTUPDATE: '',
		},
		loading: false,
		fetchCryptos: async () => {
			const cryptocurrencies = await getCryptos();
			set(() => ({
				cryptocurrencies,
			}));
		},
		fetchData: async (pair) => {
			set(() => ({
				loading: true,
			}));
			const result = await fetchCurrencyCryptoPrice(pair);
			set(() => ({ result, loading: false }));
		},
	}))
);
