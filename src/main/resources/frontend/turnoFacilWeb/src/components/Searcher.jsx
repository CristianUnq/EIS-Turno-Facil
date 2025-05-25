import '../styles/Searcher.css';

const Searcher = ({handleOnChangeSearcher, negociosEncontrados, updateNegocio, textoBusqueda}) => {
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
                  <li key={n.email} className="negocioItem" onClick={() => updateNegocio(n.nombreNegocio)}>
                    {n.nombreNegocio}
                    <span className="spanDireccion"> {n.direccion} </span>
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
