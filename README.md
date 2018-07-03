Trump face block
===

Detect a face of Donal Trump on images while browsing the Web and block it. Kind of like this:
![Blocked Trump face](https://github.com/shoniko/trumpblock/blob/master/icons/detailed/trumpblock.jpg "Blocked Trump face")

While browsing all the faces are extracted and compared to `icons/detailed/Donald_Trump_official_portrait.jpg`, if a match is significant enough - `icons/detailed/Carrot-128a.png` is drawn on top of the face.

Using [FaceAPI.js](https://github.com/justadudewhohacks/face-api.js), which is based on [TensorFlow.js](https://js.tensorflow.org/).

Usage
===
Download (or clone) the repository. Click the Chrome menu icon and select `Extensions` from the `Tools` menu. Ensure that the `Developer mode` checkbox in the top right-hand corner is checked. Then click `Load Unpacked` and select the downloaded repository.

Does it work?
===
Ish. It does use a lot of computing power. A dedicated GPU would not hurt (on Nvidia GTC 965 it takes about 200ms to detect faces on 1 image). You probably don't want to run it day to day, but this is a good POC of using ML models from within an extension.