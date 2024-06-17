// Importamos las cosas que necesitamos importar
import BotonesPildoraMain from './BotonesPildoraMain.js';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import letrasfap from './img/letrasfap.png';
import escritor from './img/Quieres_ser_Escritor.png';
import lector from './img/Quieres_ser_Lector.png';
import editor from './img/Quieres_ser_Editor.png';


function MainInicio() {

    const backgroundStyle = {
        backgroundImage: `url(${letrasfap})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
    };

    return (
        <div style={backgroundStyle} className='bg-image'>
            <main>
                <div className="container mb-5">
                    <div className="row pt-4 ms-3">
                        <h1 className="text-center">Bienvenido/a a <span id='sytpalabras'><b>Share your tale</b></span></h1>
                        <h3 className="text-center">Donde escribir está a tu alcance</h3>
                    </div>
                </div>
                <div className="container">
                    <div className="row text-center justify-content-between mx-5">
                        <div className="col-md-3 d-flex align-items-center justify-content-center border rounded-4 my-2 bigDiv" id='naranja'>
                            <img src={escritor} className='ele' alt="" />
                        </div>
                        <div className="col-md-3 d-flex align-items-center justify-content-center border rounded-4 my-2 bigDiv" id='naranja'>
                            <img src={lector} className='ele' alt="" />
                        </div>
                        <div className="col-md-3 d-flex align-items-center justify-content-center border rounded-4 my-2 bigDiv" id='naranja'>
                            <img src={editor} className='ele' alt="" />
                        </div>
                    </div>
                </div>
                <div className="row mt-3 pb-3">
                    <div className="col text-center">
                        <BotonesPildoraMain title="Empieza a leer" />
                        <BotonesPildoraMain title="Empieza a escribir" />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MainInicio;