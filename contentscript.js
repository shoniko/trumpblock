function onLoad() {
  Array.from(document.images).forEach(image => {
    if ((image.height > 100) && (image.width > 100)) {
      chrome.runtime.sendMessage({ source: image.currentSrc },
        function (response) {
          console.log(response);
      });
    }
  });
};

window.addEventListener("load", onLoad, false);


chrome.runtime.onMessage.addListener(
  function (result, sender, sendResponse) {
    
    if (!sender.tab) {
      Array.from(document.images).forEach(image => {
        if ((image.height > 100) && (image.width > 100)) {
          if (image.currentSrc == result.url)
          {
            image.src = result.data;
          }
        }
      });
    }
  });