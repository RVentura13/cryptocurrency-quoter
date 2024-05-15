import { object, z } from 'zod';

export const CurrencySchema = z.object({
	code: z.string(),
	name: z.string(),
});

// Schema para singular
export const CryptoCurrencyResponseSchema = z.object({
	CoinInfo: object({
		FullName: z.string(),
		Name: z.string(),
	}),
});

// Schema para plural
export const CryptoCurrenciesResponseSchema = z.array(CryptoCurrencyResponseSchema);

export const PairSchema = z.object({
	currency: z.string(),
	criptocurrency: z.string(),
});

export const CryptoPriceSchema = z.object({
	IMAGEURL: z.string(),
	PRICE: z.string(),
	HIGHDAY: z.string(),
	LOWDAY: z.string(),
	CHANGEPCT24HOUR: z.string(),
	LASTUPDATE: z.string(),
});
