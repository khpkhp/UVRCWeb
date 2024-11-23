// Configuration for the application
const config = {
    // API base URL - change this for different environments
    apiBaseUrl: window.location.hostname === 'localhost' 
        ? 'http://localhost:3000/api'
        : '/api', // for production

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
        alert(`Error: ${message}`);
    }
};
