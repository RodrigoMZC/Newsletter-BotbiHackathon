const API_URL = process.env.EXPO_PUBLIC_API_URL

export const SubscribersService = {
  subscribe: async (name: string, email: string) => {

    try {
      const response = await fetch(`${API_URL}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ name, email}),
      })

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || 'Error en la suscripción');
      }

      return json;

    } catch (e) {
      console.error("Error en SubscriberService:", e);
      throw e;
    }
  }
}