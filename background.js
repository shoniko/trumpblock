const MODEL_URL = '/models'
const minConfidence = 0.6

async function initModels() {
  await faceapi.loadModels(MODEL_URL);
};

initModels();

chrome.runtime.onMessage.addListener(
  async function (request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (typeof request.source != "undefined") {
      sendResponse({ result: "processing" });

      let input = document.createElement("img");
      input.src = request.source;

      const fullFaceDescriptions = await faceapi.allFaces(input, minConfidence);

      input.remove();

      chrome.tabs.sendMessage(sender.tab.id, {result: fullFaceDescriptions}, function(response) {
        console.log(response);
      });
    }
  });
