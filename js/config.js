// Configuration for the application
const config = {
    // API base URL - change this for different environments
    apiBaseUrl: 'https://uvrc-web.vercel.app/api',

    // Helper function to make API calls
    async fetchApi(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    },

    // Helper function to display errors
    showError(message) {
        console.error(message);
    }
};
