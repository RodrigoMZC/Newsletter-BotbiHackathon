export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string | null
  publishedAt: string;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL

export const NewsService = {

  getAll: async (): Promise<Article[]> => {
    try {
      const response = await fetch(`${API_URL}/news`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application.json'
        }
      })

      if (!response.ok) throw new Error(`Error al conectar al api: ${response.status}` );

      const json = await response.json();
      return json.data;

    } catch (e) {
      console.error('Error: ', e)
      return [];
    }
  }
}