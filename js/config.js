// Configuration for the application
const config = {
    // API base URL - change this for different environments
    apiBaseUrl: (() => {
        const hostname = window.location.hostname;
        const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
        const isGitHubCodespaces = hostname.endsWith('.app.github.dev');
        
        if (isLocalhost) {
            return 'http://localhost:3000/api';
        } else if (isGitHubCodespaces) {
            // For GitHub Codespaces
            return `${window.location.protocol}//${hostname}:3000/api`;
        } else if (hostname === 'uvrc-web.vercel.app') {
            // For Vercel deployment
            return 'https://uvrc-web.vercel.app/api';
        } else {
            // For other environments
            return '/api';
        }
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
                credentials: 'include'
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
    }
};
