import { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client/dist/sockjs';
import { over, Client, Message } from 'stompjs';

interface SocketOptions {
    connectionUrl: string;  // URL de conexión del socket
    subscriptionTopic: string;  // Tema (topic) de suscripción para recibir mensajes
}

// Hook personalizado para gestionar una conexión de socket
export const useSocket = ({ connectionUrl, subscriptionTopic }: SocketOptions) => {
    const [socketState, setSocketState] = useState(true);
    let stompClient = useRef<Client | null>(null)


    useEffect(() => {
        // Función para crear la conexión del socket
        const createSocket = () => {
            const Sock = new SockJS(connectionUrl); // Crear el objeto SockJS
            const client = over(Sock); // Crear el cliente STOMP sobre la conexión SockJS
            // Función para anular la impresión de mensajes de log
            client.debug = () => {};
            client.connect({}, onConnected, onError); // Conectar el cliente STOMP
        
            stompClient.current = client; // Almacenar el cliente STOMP en el estado
        };

        // Función que se ejecuta cuando la conexión se establece con éxito
        const onConnected = () => {
            stompClient.current?.subscribe(subscriptionTopic, onMessageReceived); // Suscribirse al tema especificado
            console.log('Conectado');
        };

        // Función que se ejecuta cuando se recibe un mensaje en el tema de suscripción
        const onMessageReceived = (message: Message) => {
            // Manejar el mensaje recibido según sea necesario
            setSocketState((prevState) => !prevState); // Actualizar el estado para indicar que se ha recibido un mensaje
        };

        // Función que se ejecuta en caso de error en la conexión
        const onError = (err: any) => {
            console.log(err);
        };

        // Crear la conexión del socket al montar el componente
        createSocket();

        // // Limpiar la conexión del socket al desmontar el componente
        // return () => {
        //     stompClient?.disconnect(()=>{console.log("desmontado")}, (error?: string) => {
        //         console.log(error ? `Error al desconectar el cliente STOMP: ${error}` : 'Desconectado');
        //     }); // Desconectar el cliente STOMP con los headers y body opcionales
        // };
    }, [connectionUrl, subscriptionTopic]); // Efecto depende de la URL de conexión y el tema de suscripción

    return socketState; // Devolver el estado para indicar la recepción de mensajes
};
