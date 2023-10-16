import { useEffect, useState, useContext } from 'react';
import styles from './styles.module.css';
import { Photo } from '../../models/Photo';
import { searchPhotos } from '../../services/PhotoService';
import { PacmanLoader } from 'react-spinners';
import ResultCard from '../../components/ResultCard';
import searchIcon from '../../assets/img/search.png';
import { UserContext } from '../../context/UserContext';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [newSearch, setNewSearch] = useState(false);
  const [sorting, setSorting] = useState('relevant'); // Valor padrão para ordenação

  const { lastResult, setLastResult, query, setQuery } = useContext(UserContext);

  const searchResults = async () => {
    if (query.trim()) {
      setLoading(true);
      setLastResult({
        photos: [],
        totalPages: 0,
      });

      const searchResult = await searchPhotos(query, sorting, page); // Use o valor de sorting

      // Filtrar e classificar as fotos com base nas dimensões
      const filteredPhotos = searchResult.photos.filter((photo) => {
        const dimensions = photo.dimensions; // Acesse as dimensões das fotos corretamente aqui
        const isVertical = dimensions.height > dimensions.width;
        return sorting === 'vertical' ? isVertical : !isVertical;
      });

      // Ordenar as fotos conforme necessário (por relevância ou data, por exemplo)
      const sortedPhotos =
        sorting === 'relevant'
          ? filteredPhotos
          : [...filteredPhotos].sort(/* Implemente a lógica de classificação aqui */);

      setLastResult({
        photos: sortedPhotos,
        totalPages: searchResult.totalPages,
      });

      setLoading(false);
    }
  };

  const changeSorting = (newSorting: string) => {
    if (sorting !== newSorting) {
      setSorting(newSorting);
      setNewSearch(true); // Dispara uma nova pesquisa quando a ordenação muda
    }
  };

  useEffect(() => {
    searchResults();
  }, [page, sorting, newSearch]);

  return (
    <div className={styles.container}>
      <div className={styles.searchArea}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type='text'
          className={styles.searchInput}
        />
        <button
          onClick={() => setNewSearch(true)}
          className={styles.searchButton}
        >
          Pesquisar
        </button>

        <button
          onClick={() => setNewSearch(true)}
          className={styles.responsiveSearchButton}
        >
          <img src={searchIcon} alt='Pesquisar' />
        </button>
      </div>

      <div className={styles.containerBotoes}>
        <button
          className={
            sorting === 'horizontal'
              ? styles.activeButton
              : styles.botoesFiltro
          }
          onClick={() => changeSorting('horizontal')}
        >
          Horizontais
        </button>
        <button
          className={
            sorting === 'vertical' ? styles.activeButton : styles.botoesFiltro
          }
          onClick={() => changeSorting('vertical')}
        >
          Vertical
        </button>
        <button
          className={
            sorting === 'relevant' ? styles.activeButton : styles.botoesFiltro
          }
          onClick={() => changeSorting('relevant')}
        >
          Relevantes
        </button>
        <button
          className={
            sorting === 'recent' ? styles.activeButton : styles.botoesFiltro
          }
          onClick={() => changeSorting('recent')}
        >
          Recentes
        </button>
      </div>

      <PacmanLoader color='#fff' loading={loading} />

      {!loading && lastResult.photos.length > 0 && (
        <>
          <div className={styles.resultsArea}>
            {lastResult.photos.map((p: Photo) => (
              <ResultCard key={p.id} photo={p} />
            ))}
          </div>

          <div>
            {page > 1 && (
              <button
                className={styles.pageButton}
                onClick={() => setPage(page - 1)}
              >
                Anterior
              </button>
            )}
            <span className={styles.currentPageLabel}>
              Página {page} de {lastResult.totalPages}
            </span>
            {page < lastResult.totalPages && (
              <button
                className={styles.pageButton}
                onClick={() => setPage(page + 1)}
              >
                Próxima
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
