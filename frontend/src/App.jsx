import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';

const App = () => {
  const [roomId, setRoomId] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [peers, setPeers] = useState([]);
  const [isInCall, setIsInCall] = useState(false);
  const socket = useRef(null);
  const userStream = useRef(null);
  const peersRef = useRef([]);

  useEffect(() => {
    socket.current = io('http://localhost:5000');

    const params = new URLSearchParams(window.location.search);
    const roomIdParam = params.get('roomId');
    if (roomIdParam) {
      setRoomId(roomIdParam);
      joinRoom(roomIdParam);
    }

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const createRoom = async () => {
    const response = await fetch('http://localhost:5000/create-room');
    const data = await response.json();
    setRoomId(data.roomId);
    setGeneratedLink(`${window.location.origin}?roomId=${data.roomId}`);
    joinRoom(data.roomId);
  };

  const joinRoom = (roomId) => {
    setIsInCall(true);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        userStream.current = stream;

        const myVideoElement = document.getElementById('my-video');
        if (myVideoElement) {
          myVideoElement.srcObject = stream;
        }

        socket.current.emit('join-room', roomId);
        socket.current.on('user-joined', (userId) => {
          const peer = createPeer(userId, socket.current.id, stream);
          peersRef.current.push({ peerID: userId, peer });
          setPeers([...peersRef.current]);
        });

        socket.current.on('user-signaled', (payload) => {
          const item = peersRef.current.find(p => p.peerID === payload.id);
          if (item) {
            item.peer.signal(payload.signal);
          }
        });

        socket.current.on('user-disconnected', (userId) => {
          const peerObj = peersRef.current.find(p => p.peerID === userId);
          if (peerObj) {
            peerObj.peer.destroy();
          }
          peersRef.current = peersRef.current.filter(p => p.peerID !== userId);
          setPeers([...peersRef.current]);
        });
      });
  };

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      socket.current.emit('signal', { userToSignal, callerID, signal });
    });

    peer.on('stream', (stream) => {
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      videoElement.autoplay = true;
      videoElement.playsInline = true;
      videoElement.muted = false;
      document.getElementById('video-container').appendChild(videoElement);
    });

    return peer;
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (roomId) {
      joinRoom(roomId);
    }
  };

  return (
    <div>
      {!isInCall ? (
        <div>
          <h2>Video Conferencing App</h2>
          <button onClick={createRoom}>Create a Conference</button>
          <h3>Or join an existing conference</h3>
          <form onSubmit={handleJoin}>
            <input
              type="text"
              placeholder="Enter room ID or paste link"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <button type="submit">Join Conference</button>
          </form>
          {generatedLink && (
            <div>
              <p>Share this link to invite others: <a href={generatedLink}>{generatedLink}</a></p>
            </div>
          )}
        </div>
      ) : (
        <div className="video-container" id="video-container">
          <h2>Room: {roomId}</h2>
          <video id="my-video" muted autoPlay playsInline></video>
        </div>
      )}
    </div>
  );
};

export default App;
