import React, { useContext, useEffect } from 'react';
import Search from '../../layout/Search';
import Pagination from '../../layout/Pagination';
import Spinner from '../../layout/Spinner';
import PublisherItem from './PublisherItem';
import PublisherContext from '../../../context/main/publisher/publisherContext';

const Publishers = () => 
{
    const { publishers, filtered, loading, pageNumber, totalPages, currentPage, SetCurrentPage, FilterPublishers, GetPublishers } = useContext(PublisherContext);
    const currentPublishers = filtered || currentPage;

    useEffect(() =>
    {
      publishers.length === 0 && GetPublishers();
      //eslint-disable-next-line
    }, []);

    let content;

    if(loading)
    {
      content = <Spinner/>;
    }
    else if(currentPublishers !== null && currentPublishers.length === 0)
    {
      content = <h4>No publishers found</h4>;
    }
    else
    {
      const publisherContainerStyle = 
      {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gridGap: '1rem'
      };
  
      content = <div style={publisherContainerStyle}>
                  {
                    currentPublishers.map(publisher =>
                    
                      <PublisherItem key={publisher._id}
                          publisher={publisher} />
                    )
                  }
                </div>;
    }    

    return (
      <>
        <Search Filter={FilterPublishers}/>
        <Pagination listName='publishers' totalItems={publishers.length} pageNumber={pageNumber} totalPages={totalPages} SetCurrentPage={SetCurrentPage}/>
        {content}
      </>
    );
};

export default Publishers;
