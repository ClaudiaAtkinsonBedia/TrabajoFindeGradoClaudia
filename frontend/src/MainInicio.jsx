import BotonesPildoraMain from './BotonesPildoraMain';
import SectionComponentBigDiv from './SectionComponentBigDiv';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function MainInicio() {
    return (
        <div>
            <main>
                <div className="container mb-5">
                    <div className="row mt-4 ms-3">
                        <h1 className="text-center">Bienvenid@ a Share your tale</h1>
                        <h3 className="text-center">Donde escribir está a tu alcance.</h3>
                    </div>
                </div>
                <div className="container">
                    <div className="row text-center justify-content-between mx-5">
                        <SectionComponentBigDiv title="¿Quieres ser lector?" />
                        <SectionComponentBigDiv title="¿Quieres ser escritor?" />
                        <SectionComponentBigDiv title="¿Quieres ser editor?" />
                    </div>
                </div>
                <div className="row mt-3 mb-3">
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