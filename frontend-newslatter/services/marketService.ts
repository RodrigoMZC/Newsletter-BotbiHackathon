export interface MarketAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  logo?: string;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const MarketService = {
  getMarkets: async (type: 'stocks' | 'crypto'): Promise<MarketAsset[]> => {
    try {
      const response = await fetch(`${API_URL}/markets?type=${type}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Error al obtener datos del mercado');

      return await response.json();
    } catch (e) {
      console.error("MarketService Error:", e);
      return [];
    }
  },
};