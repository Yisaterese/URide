import axios from 'axios';

export default async function getExchangeRateInNaira(baseCurrency: string): Promise<number> {
    const options = {
        method: 'GET',
        url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest',
        params: { from: baseCurrency },
        headers: {
            'x-rapidapi-key': process.env.NEXT_PUBLIC_EXCHANGE_RATE,
            'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com',
        },
    };

    try {
        const response = await axios.request(options);
        const rates = response.data.rates;

        // Get the rate for NGN (Naira)
        const nairaRate = rates['NGN'];

        if (!nairaRate) {
            throw new Error(`Exchange rate for ${baseCurrency} to NGN not found`);
        }

        return nairaRate;
    } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
        throw new Error("Exchange rate conversion failed");
    }
}
