import { useState, ChangeEvent, FormEvent } from 'react';
import { currencies } from '../data/db';
import { useCryptoStore } from '../store';
import { PairCurrency } from '../types';
import { ErrorMessage } from './ErrorMessage';

export const CriptoSearchForm = () => {
	const cryptoCurrencies = useCryptoStore((state) => state.cryptocurrencies);
	const fetchData = useCryptoStore((state) => state.fetchData);

	const [pair, setPair] = useState<PairCurrency>({
		currency: '',
		criptocurrency: '',
	});
	const [error, setError] = useState('');

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setPair({
			...pair,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (Object.values(pair).includes('')) {
			setError('Todos los campos son obligatorios');
			return;
		}
		setError('');
		fetchData(pair);
	};

	return (
		<form
			className='form'
			onSubmit={handleSubmit}
		>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<div className='field'>
				<label htmlFor='currency'>Moneda:</label>
				<select
					name='currency'
					id='currency'
					onChange={handleChange}
					value={pair.currency}
				>
					<option value=''>--- Seleccione ---</option>
					{currencies.map((currency) => (
						<option
							key={currency.code}
							value={currency.code}
						>
							{currency.name}
						</option>
					))}
				</select>
			</div>
			<div className='field'>
				<label htmlFor='criptocurrency'>Criptomoneda:</label>
				<select
					name='criptocurrency'
					id='criptocurrency'
					onChange={handleChange}
					value={pair.criptocurrency}
				>
					<option value=''>--- Seleccione ---</option>
					{cryptoCurrencies.map((currency) => (
						<option
							key={currency.CoinInfo.Name}
							value={currency.CoinInfo.Name}
						>
							{currency.CoinInfo.FullName}
						</option>
					))}
				</select>
			</div>
			<input
				type='submit'
				value='Cotizar'
			/>
		</form>
	);
};
