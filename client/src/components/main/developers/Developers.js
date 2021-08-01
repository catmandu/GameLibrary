import React, { useContext, useEffect } from 'react';
import Search from '../../layout/Search';
import Spinner from '../../layout/Spinner';
import Pagination from '../../layout/Pagination';
import DeveloperItem from './DeveloperItem';
import DeveloperContext from '../../../context/main/developer/developerContext';

const Developers = () => 
{
  const { developers, filtered, loading, totalPages, pageNumber, currentPage, SetCurrentPage, FilterDevelopers, GetDevelopers } = useContext(DeveloperContext);
  const currentDevelopers = filtered || currentPage;

  useEffect(() =>
  {
    developers.length === 0 && GetDevelopers();
    //eslint-disable-next-line
  }, []);

  let content;
  
  if(loading)
  {
    content = <Spinner />;
  }
  else if(currentDevelopers !== null && currentDevelopers.length === 0)
  {
    content = <h4>No developers found</h4>;
  }
  else
  {
    const developerContainerStyle = 
    {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gridGap: '1rem'
    };

    content = <div style={developerContainerStyle}>
                {
                  currentDevelopers.map(developer =>
                  
                    <DeveloperItem key={developer._id}
                        developer={developer} />
                  )
                }
              </div>;
  }
  

  return (
    <>
      <Search Filter={FilterDevelopers}/>
      <Pagination listName='developers' totalItems={developers.length} totalPages={totalPages} SetCurrentPage={SetCurrentPage} pageNumber={pageNumber}/>
      {content}
    </>
  );
};

export default Developers;
