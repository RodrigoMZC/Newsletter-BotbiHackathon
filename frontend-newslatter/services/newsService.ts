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

  getAll: async (page: number = 1, search: string = ''): Promise<Article[]> => {
    try {
      let url = `${API_URL}/news?page=${page}`;

      if (search) url += `&search=${encodeURIComponent(search)}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) throw new Error(`Error al conectar al api: ${response.status}` );

      const json = await response.json();

      const articles = json.data || json;

      if (search) return articles;

      if (page === 1) {
        cache = articles
      } else {
        cache = [...cache, ...articles]
      }

      return articles

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
  },

  refreshNews: async (): Promise<Article[]> => {
    try {
      const response = await fetch(`${API_URL}/news/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })

      if (!response.ok) throw new Error('Error actualizando noticias');

      return await response.json()
    } catch (e) {
      console.error('Error en refetch')
      return []
    }
  },

  getTopTen: async (): Promise<Article[]> => {
    try {
      // Ajusta la URL según tu ruta de Laravel
      const response = await fetch(`${API_URL}/news/top`, {
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('Error fetching top 10');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
