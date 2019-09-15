import axios from 'react-native-axios';
import {
    USE_FAKE_SERVER,
    FAKE_DATA_URL_ROOT,
    REAL_DATA_URL_ROOT,
} from 'react-native-dotenv';

const sendHttpRequest = function(url, requestBody) {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.post(
        url,
        {
            query: requestBody
        },
        headers).then(response => {
            if (response.data.errors) {
                return { ok: false, error: response.data.errors[0].message };
            }
            return response.data.data;
        });
}

const fakeServer = {
    listCampaigns: function(userCreds) {
        let url = FAKE_DATA_URL_ROOT + '/campaigns';
        return sendHttpRequest(url, {});
    },
    getCampaignInfo: function(userCreds, campaignId) {
        let url = FAKE_DATA_URL_ROOT + '/getcampaign/' + campaignId;
        return sendHttpRequest(url, {});
    },
};

const realServer = {
    listCampaigns: function(userCreds) {
        let url = REAL_DATA_URL_ROOT + '/api';
        
        // TODO: change this to graphql
        return sendHttpRequest(url, {}).then(response => {
            // TODO: munge real data to look like the fake data that I've been working with
            return response;
        });
    },
    getCampaignInfo: function(userCreds, campaignId) {
        let url = REAL_DATA_URL_ROOT + '/api';
        
        // TODO: change this to graphql
        return sendHttpRequest(url, {}).then(response => {
            // TODO: munge real data to look like the fake data that I've been working with
            return response;
        });
    },
}

const server = USE_FAKE_SERVER ? fakeServer : realServer;

let activeUserCredentials = {
    userId: 1,
};

function listCampaigns() {
    return server.listCampaigns(activeUserCredentials);
}

function getCampaign(id) {
    return server.getCampaignInfo(activeUserCredentials, id);
}

module.exports = {
    listCampaigns,
    getCampaign,
};