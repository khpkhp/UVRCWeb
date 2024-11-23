// Configuration for the application
const config = {
    // API base URL - change this for different environments
    apiBaseUrl: (() => {
        // For Vercel deployment
        return 'https://uvrc-web.vercel.app/api';
    })(),

    // Helper function to make API calls
    async fetchApi(endpoint, options = {}) {
        const url = `${this.apiBaseUrl}/${endpoint}`;
        console.log('Fetching from URL:', url);
        
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    ...options.headers
                },
                mode: 'cors',
                credentials: 'same-origin' // Changed from 'include' for Vercel
            });
            
            if (!response.ok) {
                console.error('API Response:', {
                    status: response.status,
                    statusText: response.statusText,
                    url: response.url
                });
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('API Response Data:', data);
            return data;
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    },

    // Helper function to display errors
    showError(message) {
        console.error(message);
        // Add visual feedback for users
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #ff4444; color: white; padding: 15px; border-radius: 5px; z-index: 1000;';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
    }
};
