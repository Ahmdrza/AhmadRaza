function hasUserMedia() {
  return !!navigator.getUserMedia;
}

if (hasUserMedia()) {
  var video = document.querySelector("video");
  var canvas = document.querySelector("canvas");
  var streaming = false;
  navigator.getUserMedia(
    {
      video: true,
      audio: false,
    },
    (stream) => {
      video.srcObject = stream;
      streaming = true;
    },
    (err) => console.log("err", err)
  );
  document.querySelector("#capture").addEventListener("click", (event) => {
    if (streaming) {
      canvas.width = video.clientWidth;
      canvas.height = video.clientHeight;
      var context = canvas.getContext("2d");
      context.drawImage(video, 0, 0);
      context.fillStyle = "white";
      context.fillText("Hello world", 10, 10);
    }
  });
}
