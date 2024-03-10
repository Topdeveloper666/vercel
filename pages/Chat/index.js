import React, { useEffect, useState } from "react";
import LocSvg from "../../public/svg/location-svgrepo-com.svg";
import SendSvg from "../../public/svg/send-svgrepo-com.svg";
import Image from "next/image";
import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const firebaseConfig = {
  apiKey: "AIzaSyA0nlGZlpv9pYgXICl5R3X4mo2yZSWlI8Q",
  authDomain: "glamcodeflutter.firebaseapp.com",
  projectId: "glamcodeflutter",
  storageBucket: "glamcodeflutter.appspot.com",
  messagingSenderId: "32518278088",
  appId: "1:32518278088:web:980bbebdb1382466308efd",
  measurementId: "G-BGL38DLMFL",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function Chat() {
  const router = useRouter();
  const bookingId = router.query?.bookingId || null;
  const userdetails = useSelector((state) => state.userdetails?.userdetails);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) =>
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          (error) => reject(error)
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  }

  async function getCoordinates() {
    try {
      const coordinates = await getCurrentPosition();
      return coordinates;
    } catch (error) {
      console.error("Error getting coordinates:", error);
      return null;
    }
  }

  useEffect(() => {
    const messageRef = collection(db, "chatroom", bookingId, "messages");
    const printMessages = async () => {
      try {
        const querySnapshot = await getDocs(messageRef);
        const messagesArray = [];
        querySnapshot.forEach((doc) => {
          messagesArray.push({ id: doc.id, ...doc.data() });
        });
        const sortedMessages = messagesArray.sort(
          (a, b) => a.timestamp - b.timestamp
        );
        setMessages(sortedMessages);
      } catch (error) {
        console.error("Error getting messages:", error);
        setMessages([]);
      }
    };
    printMessages();
  }, []);

  const sendMessage = async () => {
    try {
      const messageText = newMessage.trim();
      if (messageText) {
        const messageData = {
          text: messageText,
          sender: userdetails.id,
          createdOn: new Date(),
        };
        const docRef = await addDoc(
          collection(db, "chatroom", bookingId, "messages"),
          messageData
        );
        setMessages([...messages, { id: docRef.id, ...messageData }]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="servicedesk-bg max-vh-100">
      <div className="chat-container">
        <div className="chat-header bookingiddata d-flex justify-content-space-between">
          <div className="bk-icon">
            <i className="fa fa-chevron-left fontSize-m-20"></i>
          </div>
          <h2>Chat With Beautician</h2>
        </div>
        <div>
        <div className="chat-messages d-flex flex-column">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${
                msg.user_id === userdetails.id
                  ? "sent align-self-end"
                  : "received"
              }`}
            >
              <div
                className={`avatar py-2 px-2 text-align-center ${
                  msg.user_id !== userdetails.id ? "sent" : "received"
                }`}
                style={{ textAlign: "center" }}
              >
                {msg.user_id !== userdetails.id ? "Me" : "B"}
              </div>
              <div className="message-text">
                <span className="user"></span>{" "}
                {msg.text.includes("http://") ? (
                  <a href={msg.text} target="_blank" rel="noopener noreferrer">
                    {msg.text}
                  </a>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <div
            className="d-flex"
            onClick={async () => {
              let lnglat = await getCoordinates();
              setNewMessage(
                `http://maps.google.com/maps?daddr=${lnglat.latitude},${lnglat.longitude}`
              );
            }}
          >
            <Image
              src={LocSvg.src}
              width={40}
              height={40}
              style={{ objectFit: "cover" }}
              alt=""
            />
          </div>
          <input
            type="text"
            className="input-field"
            placeholder="Enter message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Image
            src={SendSvg.src}
            width={40}
            height={40}
            style={{ objectFit: "cover" }}
            alt=""
            onClick={sendMessage}
          />
        </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
