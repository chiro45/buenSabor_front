import "./Footer.css"

export const Footer = () => {
    return (
        <section className="footerSection">
            <div className="containerImg__footer">
                <img src="/src/assets/logopng.webp"></img>
            </div>
            <div className="mainContainer__footer">
                <div className="container__information-footer">
                    <div className="container-horarios__footer">
                        <p>Ubicacion: Cuesta del madero, 284</p>
                    </div>
                    <div className="container-horarios__footer">
                        <p>Horarios: 8:00 a 22:00</p>
                    </div>
                    <div className="container-horarios__footer">
                        <p>Contactenos: +54 9 261 123 4567</p>
                    </div>
                </div>
                <div className="container-brand__footer">
                    <p>© Todos los derechos reservados, Ven Rapido y Sabroso</p>
                </div>
            </div>
        </section>
    )
}
