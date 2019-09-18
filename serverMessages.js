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

let sendGqlRequest = function(uri, query) {
    return axios.post(uri, { query }).then(response => {
      if (response.data.errors) {
        return { ok: false, error: response.data.errors[0].message };
      }
      return {
        ok: true,
        data: response.data.data
      };
    });
  };


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
        return sendGqlRequest(url, `{
            getCampaigns {
              name 
              id 
              activeCreativeId
              media {
                id
                name
                url
                type
                views{
                  date
                  views
                } 
              }
            }
          }`).then(response => {
            if (!response.data) {
              return {
                ok: false, 
                error: "Unknown response: " + JSON.stringify(response),
              };
            }
            console.log(response);

            const processCampaign = (serverCamp) => {
              let clientCamp = {
                id: serverCamp.id,
                name: serverCamp.name,
                views: Math.floor(Math.random() * 10000), // This really needs to be handled in the server. I'm putting a random number here for now until this gets fixed.
              };
              
              let activeCreativeId = serverCamp.activeCreativeId;
              // right now activeCreativeId is coming back from the server as null, so 
              // just pick the first one while this is broken.
              let media = serverCamp.media[0];
              if (activeCreativeId) { 
                media = serverCamp.media.filter(m => m.id === activeCreativeId)[0];
              }
              if (!media) media = { type: "invalid" };

              switch (media.type) {
                case "image":
                  clientCamp.type = "image";
                  clientCamp.imageUri = media.url;
                  break;
                case "video":
                  clientCamp.type = "video";
                  clientCamp.videoUri = media.url;
                  break;
                case "text":
                  clientCamp.type = "text";
                  clientCamp.text = media.url;
                  break;
                case "invalid":
                  clientCamp.type = "text";
                  clientCamp.text = "No active media";
                  break;
                default:
                  clientCamp.type = "text";
                  clientCamp.text = "Unknown type: " + media.type;
                  break;
              }
              return clientCamp;
            };

            return {
              ok: true,
              debugInfo: JSON.stringify(response),
              data: {
                campaigns: response.data.getCampaigns.map(processCampaign),
              },
            };
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

const server = parseInt(USE_FAKE_SERVER) ? fakeServer : realServer;

let activeUserCredentials = {
    userId: 1,
};

function listCampaigns() {
    return server.listCampaigns(activeUserCredentials);
}

function getCampaign(id) {
    return listCampaigns().then((response) => { 

      if (!USE_FAKE_SERVER) {

        // TODO: REMOVE THIS ONCE THE SERVER IS FINISHED BEING IMPLEMENTED
        // Increment views. There is no API endpoint for getting the campaign data, so just send
        // an HTTP request to the old site.
        axios({
          method: "GET",
          uri: REAL_DATA_URL_ROOT + '/campaigns/' + id 
        }).then(response => { /* ignored */ });

      }

      return {
        ok: true,
        data: { 
          campaign: response.data.campaigns.filter((campaign) => campaign.id === id)[0]
        }
      };
    })
}

module.exports = {
    listCampaigns,
    getCampaign,
};