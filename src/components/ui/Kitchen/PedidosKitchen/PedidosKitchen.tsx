import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SockJS from 'sockjs-client/dist/sockjs';
import { over } from 'stompjs';
import { getElementSetState } from '../../../../helpers';
import { useAccessToken } from '../../../../hooks';
import { IPedido } from '../../../../interfaces';
import CardKitchen from '../CardKitchen/CardKitchen';
import './PedidosKitchen.css'
const url = `${import.meta.env.VITE_URL_PEDIDOS}`;
var stompClient: any = null;

const PedidosKitchen = () => {
    const header = useAccessToken();
    const [pedidos, setPedidos] = useState<IPedido[]>([]);
    const [socketState, setsocketState] = useState(true)
    const { pathname } = useLocation();
    useEffect(() => {
        createSocket();
    }, []);
    useEffect(() => {
        if (pathname === "/kitchen/process") {
            getElementSetState(url, header, setPedidos);
            //aca va la url de pedidos en proceso y otra de en espera
            //agregar un estado mas para almacenar diferentes pedidos

        } else if (pathname === "/kitchen/done") {
            getElementSetState(url, header, setPedidos);
            //aca va la url de pedidos en cancelados y aprobados

        }
    }, [pathname, socketState]);


    const createSocket = () => {
        const Sock = new SockJS('http://localhost:9000/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        stompClient.subscribe('/pedidows/public', onMessageReceived);
        console.log('OnConnected');
    };

    const onMessageReceived = async () => {
        setsocketState(!socketState)
    };

    const onError = (err: any) => {
        console.log(err);
    };

    const renderPedidos = () => {
        return pedidos.map((pedido: IPedido) => (
            <CardKitchen pedido={pedido} key={pedido.id} />
        ));
    };

    return (
        <div className='pedidosKitchen_container-principal'>
            {pathname === "/kitchen/process" && (
                <div className="pedidosKitchen_container">
                    <div className="pedidosKitchen_title">
                        <div className='pedidosKitchen_title-espera'>
                            <h4>Pedidos en espera: {pedidos.length}</h4>
                        </div>
                        <div className='pedidosKitchen_title-preparacion'>
                            <h4>Pedidos en Preparacion: {pedidos.length}</h4>
                        </div>
                    </div>
                    <div className="pedidosKitchen_cardContainer">
                        <div className="pedidosKitchen_espera">
                            {renderPedidos()}
                        </div>
                        <div className="pedidosKitchen_preparacion">
                            {renderPedidos()}
                        </div>
                    </div>
                </div>
            )}

            {pathname === "/kitchen/done" && (
                <div className="pedidosKitchen_container">
                    <div className="pedidosKitchen_title done">
                        <div className='pedidosKitchen_title-done'>
                            <h4>Pedidos terminados y cancelados: {pedidos.length} </h4>
                        </div>
                    </div>
                    <div className="pedidosKitchen_cardContainer">
                        <div className="pedidosKitchen_done">
                            {renderPedidos()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default PedidosKitchen
