import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './receita-info.css';
import api from "../../service/api";


function Receita(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [ receita, setReceita ] = useState([]);
   

    useEffect(() => {
        async function loadReceita(){
            await api.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, {
                params: {
                    api_key: '1',
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                setReceita(response.data.meals[0]);

            })
            .catch((error) => {
                console.error('Receita não encontrada:', error);
                navigate("/", { replace: true });
                return;
            })
        }

        loadReceita();

        return() => {
            console.log('Receita desmontada');
        }
    }, [navigate, id]);

    

    return(
        <div className="container">
            <div className="receita-info">
                <img src={receita.strMealThumb} alt="Imagem da receita" />
                <h1>{receita.strMeal}</h1>
                <h2>Ingredientes:</h2>
                <ul>
                    {Object.keys(receita).map((key) => {
                        if (key.includes('strIngredient') && receita[key]) {
                            const ingredientNumber = key.replace('strIngredient', '');
                            const measureKey = `strMeasure${ingredientNumber}`;
                            return (
                                <li key={ingredientNumber}>
                                    {receita[key]} - {receita[measureKey]}
                                </li>
                            );
                        }
                        return null;
                    })}
                </ul>
                <h2>Modo de preparo:</h2>
                <p>{receita.strInstructions}</p>
                <div className="button">
    
                </div>
            </div>

        </div>
    )

}

export default Receita;