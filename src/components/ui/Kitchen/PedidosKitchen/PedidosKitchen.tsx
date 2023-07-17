import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SockJS from 'sockjs-client/dist/sockjs';
import { over } from 'stompjs';
import { getElementSetState } from '../../../../helpers';
import { useAccessToken } from '../../../../hooks';
import { EEstadoPedido, IPedido } from '../../../../interfaces';
import CardKitchen from '../CardKitchen/CardKitchen';
import './PedidosKitchen.css'
const urlDoneRejected = `${import.meta.env.VITE_URL_PEDIDOSPREPAREDREJECTED}`;
const urlEspera = `${import.meta.env.VITE_URL_PEDIDOSBYESTADO}`;
const urlWs = `${import.meta.env.VITE_URL_WS}`;
var stompClient: any = null;
const PedidosKitchen = () => {
    const header = useAccessToken();
    const [pedidosDone, setPedidosDone] = useState<IPedido[]>([]);
    const [pedidosEspera, setPedidosEspera] = useState<IPedido[]>([]);
    const [pedidosPreparacion, setPedidosPreparacion] = useState<IPedido[]>([]);
    const [socketState, setsocketState] = useState(true)
    const { pathname } = useLocation();

    useEffect(() => {
        createSocket();
    }, []);

    useEffect(() => {
        if (pathname === "/kitchen/process") {
            getElementSetState(`${urlEspera}/${EEstadoPedido.ESPERA}`, header, setPedidosEspera);
            getElementSetState(`${urlEspera}/${EEstadoPedido.PREPARACION}`, header, setPedidosPreparacion);
        } else if (pathname === "/kitchen/done") {
            getElementSetState(urlDoneRejected, header, setPedidosDone);
        }
    }, [pathname, socketState]);


    const createSocket = () => {
        const Sock = new SockJS(urlWs);
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        stompClient.subscribe('/pedidows/public', onMessageReceived);
        console.log('OnConnected');
    };

    const onMessageReceived = async () => {
        setsocketState(prevState => !prevState);
    };

    const onError = (err: any) => {
        console.log(err);
    };

    const renderPedidos = (pedidos:IPedido[]) => {
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
                            <h4>Pedidos en espera: {pedidosEspera.length}</h4>
                        </div>
                        <div className='pedidosKitchen_title-preparacion'>
                            <h4>Pedidos en Preparacion: {pedidosPreparacion.length}</h4>
                        </div>
                    </div>
                    <div className="pedidosKitchen_cardContainer">
                        <div className="pedidosKitchen_espera">
                            {renderPedidos(pedidosEspera)}
                        </div>
                        <div className="pedidosKitchen_preparacion">
                            {renderPedidos(pedidosPreparacion)}
                        </div>
                    </div>
                </div>
            )}

            {pathname === "/kitchen/done" && (
                <div className="pedidosKitchen_container">
                    <div className="pedidosKitchen_title done">
                        <div className='pedidosKitchen_title-done'>
                            <h4>Pedidos terminados y cancelados: {pedidosDone.length} </h4>
                        </div>
                    </div>
                    <div className="pedidosKitchen_cardContainer">
                        <div className="pedidosKitchen_done">
                            {renderPedidos(pedidosDone)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default PedidosKitchen
