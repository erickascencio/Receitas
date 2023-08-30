import { Link } from "react-router-dom";
import './erro.css';

function Erro(){
    return(
        <section className="not-found">
            <h1> Esta Página não Existe!</h1>
            <Link to="/" className="erro-link">Página inicial</Link>
        </section>
    );
}

export default Erro;