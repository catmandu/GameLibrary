import React, { useContext, useEffect } from 'react';
import Search from '../../layout/Search';
import Pagination from '../../layout/Pagination';
import Spinner from '../../layout/Spinner';
import GenreItem from './GenreItem';
import GenreContext from '../../../context/main/genre/genreContext';

const Genres = () => 
{
    const { genres, filtered, loading, pageNumber, totalPages, currentPage, SetCurrentPage, FilterGenres, GetGenres } = useContext(GenreContext);
    const currentGenres = filtered || currentPage;

    useEffect(() =>
    {
        genres.length === 0 && GetGenres();
        //eslint-disable-next-line
    }, []);
    
    let content;

    if(loading)
    {
        content = <Spinner/>;
    }
    else if (currentGenres !== null && currentGenres.length === 0)
    {
        content = <h4>No genres found</h4>;
    }
    else
    {
        const genreContainerStyle = 
        {
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gridGap: '1rem'
        };
    
        content = <div style={genreContainerStyle}>
                    {
                        currentGenres.map(genre =>
                        
                            <GenreItem key={genre._id}
                                genre={genre} />
                        )
                    }
                    </div>;
    }
    

    return (
        <>
        <Search Filter={FilterGenres}/>
        <Pagination listName='genres' totalItems={genres.length} pageNumber={pageNumber} totalPages={totalPages} SetCurrentPage={SetCurrentPage} />
        {content}
        </>
    );
};

export default Genres;
