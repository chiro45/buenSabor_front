import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client/dist/sockjs';
import { over } from "stompjs";

var stompClient: any = null;

const PedidosPruebaPrivate = () => {
  const [pedidos, setPedidos] = useState<any>([]);

  const username = "josue";
  
  useEffect(() => {
    createSocket();
  }, []);

  const createSocket = () => {
    const Sock = new SockJS('http://localhost:9000/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    stompClient.subscribe('/user/' + username + '/private', onMessageReceived);
    console.log('OnConnected');
  };

  const onMessageReceived = async(payload:any) => {
     const payloadData = JSON.parse(payload.body);
     console.log("SUPUESTO ID",payloadData)
     setPedidos(payloadData)
    console.log("Mensaje recibido privado");
    // await getPedidos();
    // setPedidos((prevPublicChats:any) => [...prevPublicChats, payloadData]);
  };

  const onError = (err: any) => {
    console.log(err);
  };

  const enviarMensaje = () => {
    const estadoPedido = {
      senderName: "Fede",
      estadoPedido: 'PENDIENTE',
      // Agrega aquí los demás campos del estado de pedido
    };

    stompClient.send('/app/pedidows', {}, JSON.stringify(estadoPedido));
  };

  return (
    <div>
      <h2>Hola</h2>
      <button onClick={enviarMensaje}>Enviar Mensaje</button>
      <h1>{pedidos}</h1>
    </div>

  );
};

export default PedidosPruebaPrivate;



// import React, { useEffect, useState } from 'react'
// import { over } from 'stompjs';
// import SockJS from 'sockjs-client';

// var stompClient: any = null;
// const PedidosPrueba = () => {
//   const [privateChats, setPrivateChats] = useState(new Map());
//   const [publicChats, setPublicChats] = useState<any>([]);
//   const [tab, setTab] = useState("CHATROOM");
//   const [userData, setUserData] = useState({
//     username: '',
//     receivername: '',
//     connected: false,
//     message: ''
//   });
//   useEffect(() => {
//     console.log(userData);
//   }, [userData]);

//   const connect = () => {
//     let Sock = new SockJS('http://localhost:9000/ws');
//     stompClient = over(Sock);
//     stompClient.connect({}, onConnected, onError);
//   }

//   const onConnected = () => {
//     setUserData({ ...userData, "connected": true });
//     stompClient.subscribe('/pedidows/public', onMessageReceived);
//     stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
//     userJoin();
//   }

//   const userJoin = () => {
//     var chatMessage = {
//       senderName: userData.username,
//       status: "JOIN"
//     };
//     stompClient.send("/app/pedidows", {}, JSON.stringify(chatMessage));
//   }

//   const onMessageReceived = (payload: any) => {
//     var payloadData = JSON.parse(payload.body);

//     publicChats.push(payloadData);
//     setPublicChats([...publicChats]);


//   }

//   const onPrivateMessage = (payload: any) => {
//     console.log(payload);
//     var payloadData = JSON.parse(payload.body);
//     if (privateChats.get(payloadData.senderName)) {
//       privateChats.get(payloadData.senderName).push(payloadData);
//       setPrivateChats(new Map(privateChats));
//     } else {
//       let list = [];
//       list.push(payloadData);
//       privateChats.set(payloadData.senderName, list);
//       setPrivateChats(new Map(privateChats));
//     }
//   }

//   const onError = (err: any) => {
//     console.log(err);

//   }

//   const handleMessage = (event: any) => {
//     const { value } = event.target;
//     setUserData({ ...userData, "message": value });
//   }
//   const sendValue = () => {
//     if (stompClient) {
//       var chatMessage = {
//         senderName: userData.username,
//         message: userData.message,
//         status: "MESSAGE"
//       };
//       console.log(chatMessage);
//       stompClient.send("/app/pedidows", {}, JSON.stringify(chatMessage));
//       setUserData({ ...userData, "message": "" });
//     }
//   }

//   const sendPrivateValue = () => {
//     if (stompClient) {
//       var chatMessage = {
//         senderName: userData.username,
//         receiverName: tab,
//         message: userData.message,
//         status: "MESSAGE"
//       };

//       if (userData.username !== tab) {
//         privateChats.get(tab).push(chatMessage);
//         setPrivateChats(new Map(privateChats));
//       }
//       stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
//       setUserData({ ...userData, "message": "" });
//     }
//   }

//   const handleUsername = (event: any) => {
//     const { value } = event.target;
//     setUserData({ ...userData, "username": value });
//   }

//   const registerUser = () => {
//     connect();
//   }
//   return (
//     <div className="container">
//       {userData.connected ?
//         <div className="chat-box">
//           <div className="member-list">
//             <ul>
//               <li onClick={() => { setTab("CHATROOM") }} className={`member ${tab === "CHATROOM" && "active"}`}>Chatroom</li>
//               {[...privateChats.keys()].map((name, index) => (
//                 <li onClick={() => { setTab(name) }} className={`member ${tab === name && "active"}`} key={index}>{name}</li>
//               ))}
//             </ul>
//           </div>
//           {tab === "CHATROOM" && <div className="chat-content">
//             <ul className="chat-messages">
//               {publicChats.map((chat: any, index: any) => (
//                 <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
//                   {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
//                   <div className="message-data">{chat.message}</div>
//                   {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
//                 </li>
//               ))}
//             </ul>

//             <div className="send-message">
//               <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} />
//               <button type="button" className="send-button" onClick={sendValue}>send</button>
//             </div>
//           </div>}
//           {tab !== "CHATROOM" && <div className="chat-content">
//             <ul className="chat-messages">
//               {[...privateChats.get(tab)].map((chat, index) => (
//                 <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
//                   {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
//                   <div className="message-data">{chat.message}</div>
//                   {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
//                 </li>
//               ))}
//             </ul>

//             <div className="send-message">
//               <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} />
//               <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
//             </div>
//           </div>}
//         </div>
//         :
//         <div className="register">
//           <input
//             id="user-name"
//             placeholder="Enter your name"
//             name="userName"
//             value={userData.username}
//             onChange={handleUsername}
//           />
//           <button type="button" onClick={registerUser}>
//             connect
//           </button>
//         </div>}
//     </div>
//   )
// }

// export default PedidosPrueba