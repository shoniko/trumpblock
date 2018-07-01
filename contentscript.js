function imageToBase64String(image) {
  try {
    let canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    
    return canvas.toDataURL("image/png");
  }
  catch(e) {
    return "";
  }
};

Array.from(document.images).forEach(image => {
  if ((image.height > 100) && (image.width > 100)) {
    image.crossOrigin = "Anonymous";
    chrome.runtime.sendMessage({ source: imageToBase64String(image), imageId: image },
      function (response) {
        console.log(response);
    });
  }
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    });