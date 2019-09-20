import axios from 'react-native-axios';
import {
    USE_FAKE_SERVER,
    FAKE_DATA_URL_ROOT,
    REAL_DATA_URL_ROOT,
} from 'react-native-dotenv';

let activeSortMode = 'all';
let activeFilterType = 'all';

 
const setActiveSortMode = function(mode) {
  activeSortMode = mode;
}

const setActiveFilterType = function(type) {
  activeFilterType = type;
}

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

const processRealCampaign = (serverCamp) => {
  let clientCamp = {
    id: serverCamp.id,
    name: serverCamp.name,
  };
  
  let activeCreativeId = serverCamp.activeCreativeId;
  // right now activeCreativeId is coming back from the server as null, so 
  // just pick the first one while this is broken.
  let media = serverCamp.media[0];
  if (activeCreativeId) { 
    media = serverCamp.media.filter(m => m.id === activeCreativeId)[0];
  }
  if (!media) media = { type: "invalid"};

  clientCamp.views = media.totalViews;

  switch (media.type) {
    case "image":
      clientCamp.type = "image";
      clientCamp.imageUri = media.url;
      break;
    case "animatedImage":
      clientCamp.type = "animatedImage";
      clientCamp.imageUri = media.url;
      break;
    case "video":
      clientCamp.type = "video";
      clientCamp.videoUri = media.url;
      break;
    case "text":
      clientCamp.type = "text";
      clientCamp.text = media.name;
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
                totalViews
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
             
            return {
              ok: true,
              debugInfo: JSON.stringify(response),
              data: {
                campaigns: response.data.getCampaigns.map(processRealCampaign),
              },
            };
        });
    },
    getCampaignInfo: function(userCreds, campaignId) {
        let url = REAL_DATA_URL_ROOT + '/api';
        return sendGqlRequest(url, `{
          getActiveMediaCampaign(campaignId: ${campaignId}) {
            id
            name
            media {
                type
                url
                name
                id
                totalViews
            }
          }
        }`).then(response => {
          
          if (!response.data || !response.data.getActiveMediaCampaign) {
            return { data: { errors: ["Unknown response from server" ] } };
          }

          // TODO: ideally the fake data should be changed to match the real data once
          // the actual data is more stable.
          let campaign = response.data.getActiveMediaCampaign[0];
          if (campaign) {
            return { data: { campaign: processRealCampaign(campaign) } };
          } else {
            return { data: { errors: ["Unknown campaign ID #"] } };
          }
        });
    },
}

const server = parseInt(USE_FAKE_SERVER) ? fakeServer : realServer;

// TODO: remove this once we pass feature freeze and client sign-in is not requested.
let activeUserCredentials = {
    userId: 1,
};

const sortByKey = function(arr, f) {
  arr.sort((a, b) => {
    let aKey = f(a);
    let bKey = f(b);
    if (aKey === bKey) return 0;
    return aKey < bKey ? -1 : 1;
  });
  return arr;
}

// TODO: sorting should be done on the server as this is not scalable.
function listCampaigns() {
    return server.listCampaigns(activeUserCredentials).then(response => {
      let campaigns = response.data.campaigns;
      switch (activeSortMode) {
        case 'top10':
          campaigns = sortByKey(campaigns, c => -(c.views || 0)).slice(0, 10);
          break;
        
        case 'new':
          campaigns = sortByKey(campaigns, c => -c.id);
          break;
        
        case 'all':
        default:
          break;
      }

      switch (activeFilterType) {
        case 'image': 
        campaigns = campaigns.filter( c => c.type === 'image');
        break;

        case 'animatedImage': 
        campaigns = campaigns.filter( c => c.type === 'animatedImage');
        break;

        case 'video': 
        campaigns = campaigns.filter( c => c.type === 'video');
        break;

        case 'text': 
        campaigns = campaigns.filter( c => c.type === 'text');
        break;
        case 'all':
        default:
          break;
          
      }

      response.data.campaigns = campaigns;
      return response;
    });
}

function getCampaign(id) {
    return server.getCampaignInfo(activeUserCredentials, id).then(response => {
      return {
        ok: true,
        data: {
          campaign: response.data.campaign
        }
      }
    });
}

module.exports = {
    listCampaigns,
    getCampaign,
    setActiveSortMode,
    setActiveFilterType
};