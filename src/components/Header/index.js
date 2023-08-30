import { Link } from "react-router-dom";
import './header.css';
import { useState } from "react";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const searchRecipes = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.meals || []);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <header className="header">
      <Link className="logo" to="/">Galvão Receitas </Link>
      <input
        type="text"
        className="search-input"
        placeholder="Search for recipes"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
      />
      <button className="search-btn" onClick={searchRecipes}>Pesquisar</button>

      {/* Display search results dropdown */}
      <div className={showResults ? "show-results" : ""}>
        {searchResults.length > 0 && (
          <ul className="search-results-dropdown">
            {searchResults.map((recipe) => (
              <li key={recipe.idMeal}>
                <Link to={`/receita/${recipe.idMeal}`}>{recipe.strMeal}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
