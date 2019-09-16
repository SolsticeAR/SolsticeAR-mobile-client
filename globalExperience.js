// This needs to be a global because the ViroARSceneNavigator instantiates the ARScene
// from the class name passed in as a property. Since we can't pass in any information 
// into it directly, we just set it as a global here instead.

let activeExperienceData = null;

export function setActiveExperienceData(data) {
  activeExperienceData = data;
};

export function getActiveExperienceData() {
  return activeExperienceData;
}



