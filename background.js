(async function(){
  const MODEL_URL = '/models'
  const minConfidence = 0.5
  const substituteImage = new Image();
  let targetDescriptor = null;

  async function initModels() {
    await faceapi.loadModels(MODEL_URL);
  };

  async function loadTargetPersona() {
    let input = new Image()
    input.onload = async function() {
      targetDescriptor = await faceapi.allFaces(
        this, minConfidence
      );
      targetDescriptor = targetDescriptor[0].descriptor;
    }
    input.src = "icons/detailed/Donald_Trump_official_portrait.jpg"
  }

  function loadSubstituteImage() {
    substituteImage.src = "icons/detailed/Carrot-128a.png";
  }

  await initModels();
  loadSubstituteImage();
  await loadTargetPersona();

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (!sender.tab) {
        return;
      }
      if (typeof request.source != "undefined") {
        sendResponse({ result: "processing" });

        let input = new Image()
        input.onload = async function() {
          const fullFaceDescriptions = await faceapi.allFaces(this, minConfidence);
          
          let canvas = document.createElement("canvas");
          canvas.width = this.width;
          canvas.height = this.height;
          let ctx = canvas.getContext("2d");
          ctx.drawImage(this, 0, 0);
          fullFaceDescriptions.forEach(face => {
            const distance = faceapi.euclideanDistance(
              targetDescriptor, face.descriptor
            );
            if (distance < minConfidence) {
              ctx.drawImage(substituteImage, 
                face.detection._box.x, face.detection._box.y-30, 
                face.detection._box.width, face.detection._box.height+30);
            }
          });
          let fixedImageBase64 = canvas.toDataURL("image/png");
          chrome.tabs.sendMessage(sender.tab.id, {
            url: this.currentSrc, 
            data: fixedImageBase64
          }, function(response) {
            console.log(response);
          });
          this.remove();
        }
        input.src = request.source;
      }
    });
})();
