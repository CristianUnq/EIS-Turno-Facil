import '../styles/Searcher.css';

const Searcher = ({handleOnChangeSearcher, negociosEncontrados, updateNegocio, textoBusqueda, negocioSeleccionado}) => {
    
    return (
        <div className="searcherContainer">
            <input 
                type="text" 
                placeholder="Ingresá el nombre del negocio" 
                onChange={(e) => handleOnChangeSearcher(e.target.value)}>
            </input>
        {
        textoBusqueda?.length >= 3 && (
          negociosEncontrados?.length > 0 ? (
            <ul className="listContainer">
              {
                negociosEncontrados.map((n) => (
                  <li 
                    key={n.email} 
                    className={`negocioItem ${negocioSeleccionado === n.nombreNegocio ? 'active' : ''}`}
                    onClick={(e) => updateNegocio(e, n.nombreNegocio)} 
                    onBlur={(e) => e.classList.remove("active")}>
                    {n.nombreNegocio}
                    <span id="dir" className="spanDireccion"> {n.direccion} </span>
                  </li>
                ))
              }
            </ul>
          ) : (
            <p>No se encontraron resultados para su búsqueda</p>
          )
        )
      }
    </div>
  );
}


export default Searcher;
