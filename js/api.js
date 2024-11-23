// API functions for different match types
const api = {
    // QM Matches
    async loadQMMatches() {
        return await config.fetchApi('qmmatches');
    },
    async loadQMMatch(matchnum) {
        return await config.fetchApi(`qmmatches/${matchnum}`);
    },
    async saveQMMatch(matchData) {
        return await config.fetchApi(`qmmatches/${matchData.id}`, {
            method: 'PUT',
            body: JSON.stringify(matchData)
        });
    },

    // PM Matches
    async loadPMMatches() {
        return await config.fetchApi('pmmatches');
    },
    async loadPMMatch(matchnum) {
        return await config.fetchApi(`pmmatches/${matchnum}`);
    },
    async savePMMatch(matchData) {
        return await config.fetchApi(`pmmatches/${matchData.id}`, {
            method: 'PUT',
            body: JSON.stringify(matchData)
        });
    },

    // PO Matches
    async loadPOMatches() {
        return await config.fetchApi('pomatches');
    },
    async loadPOMatch(matchnum) {
        return await config.fetchApi(`pomatches/${matchnum}`);
    },
    async savePOMatch(matchData) {
        return await config.fetchApi(`pomatches/${matchData.id}`, {
            method: 'PUT',
            body: JSON.stringify(matchData)
        });
    },

    // Teams
    async loadTeams() {
        return await config.fetchApi('team');
    },
    async saveTeam(teamData) {
        return await config.fetchApi(`team/${teamData.id}`, {
            method: 'PUT',
            body: JSON.stringify(teamData)
        });
    },

    // Results
    async loadResults() {
        return await config.fetchApi('results');
    },

    // PO Teams
    async loadPOTeams() {
        return await config.fetchApi('poteams');
    },
    async savePOTeams(teamData) {
        return await config.fetchApi(`poteams/${teamData.id}`, {
            method: 'PUT',
            body: JSON.stringify(teamData)
        });
    }
};
