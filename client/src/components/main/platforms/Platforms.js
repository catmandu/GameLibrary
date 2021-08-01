import React, { useContext, useEffect } from 'react';
import Search from '../../layout/Search';
import Pagination from '../../layout/Pagination';
import Spinner from '../../layout/Spinner';
import PlatformItem from './PlatformItem';
import PlatformContext from '../../../context/main/platform/platformContext';

const Platforms = () => 
{
    const { platforms, filtered, loading, pageNumber, totalPages, currentPage, SetCurrentPage, FilterPlatforms, GetPlatforms } = useContext(PlatformContext);
    const currentPlatforms = filtered || currentPage;

    useEffect(() =>
    {
        platforms.length === 0 && GetPlatforms();
        //eslint-disable-next-line
    }, []);

    let content;

    if(loading)
    {
      content = <Spinner/>;
    }
    else if(currentPlatforms !== null && currentPlatforms.length === 0)
    {
      content = <h4>No platforms found</h4>;
    }
    else
    {
      const platformContainerStyle = 
      {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gridGap: '1rem'
      };
  
      content = <div style={platformContainerStyle}>
                  {
                    currentPlatforms.map(platform =>
                    
                      <PlatformItem key={platform._id}
                          platform={platform} />
                    )
                  }
                </div>;
    }

    return (
        <>
        <Search Filter={FilterPlatforms}/>
        <Pagination listName='platforms' totalItems={platforms.length} pageNumber={pageNumber} totalPages={totalPages} SetCurrentPage={SetCurrentPage}/>
        {content}
        </>
    );
};

export default Platforms;
