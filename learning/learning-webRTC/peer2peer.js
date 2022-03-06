var yourVideo = document.querySelector("video#yours");
var theirVideo = document.querySelector("video#theirs");
var yourConnection;
var theirConnection;

function hasUserMedia() {
  return !!navigator.getUserMedia;
}

function hasRTCPeerConnection() {
  return !!window.RTCPeerConnection;
}

function startPeerConnection(stream) {
  debugger;
  yourConnection = new webkitRTCPeerConnection({});
  theirConnection = new webkitRTCPeerConnection({});

  yourConnection.addStream(stream);
  theirConnection.onaddstream = (e) => {
    theirVideo.srcObject = e.stream;
  };

  yourConnection.onicecandidate = (event) => {
    if (event.candidate) {
      theirConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
    }
  };

  theirConnection.onicecandidate = (event) => {
    if (event.candidate) {
      yourConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
    }
  };

  yourConnection.createOffer((offer) => {
    yourConnection.setLocalDescription(offer);
    theirConnection.setRemoteDescription(offer);

    theirConnection.createAnswer((offer) => {
      theirConnection.setLocalDescription(offer);
      yourConnection.setRemoteDescription(offer);
    });
  });
}

if (hasUserMedia()) {
  navigator.getUserMedia(
    { video: true, audio: false },
    (stream) => {
      yourVideo.srcObject = stream;
      if (hasRTCPeerConnection()) {
        startPeerConnection(stream);
      }
    },
    (err) => console.log("error", err)
  );
}
