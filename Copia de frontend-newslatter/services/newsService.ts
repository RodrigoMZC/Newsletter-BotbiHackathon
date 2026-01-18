export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  image: string | null
  publishedAt: string;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL

let  cache: Article[] = [];

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

      cache = json;
      return json

    } catch (e) {
      console.error('Error: ', e)
      return [];
    }
  },

  getArticle: (id: string) => {
    // si el artículo existe lo devuelvo
    const article = cache. find(item => item.id === id)
    if (article) return article;

    return null
  }
}
