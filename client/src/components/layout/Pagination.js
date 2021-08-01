import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ listName, totalItems, totalPages, pageNumber, SetCurrentPage }) =>
{            
    const limits = (() =>
    {
        for(let i = 1; i <= totalPages; i += 4)
        {
            const upperLimit = i + 3;
            
            if(i <= pageNumber && upperLimit >= pageNumber) return {
                    min: i,
                    max: upperLimit < totalPages ? upperLimit : totalPages
                };
        }
    })();

    const OnClick = e => SetCurrentPage(parseInt(e.target.innerHTML));

    const PreviousPage = () => SetCurrentPage(limits.min - 4);

    const BackToStart = () => SetCurrentPage(1);

    const NextPage = () => SetCurrentPage(limits.max + 1);

    const ForwardToEnd = () => SetCurrentPage(totalPages);

    const PrintPageIndexes = () =>
    {
        const indexes = [];

        for(let i = limits.min; i <= limits.max; i++) indexes.push(<button key={i} className={pageNumber === i ? 'active' : ''} onClick={OnClick}>{i}</button>);
        
        limits.min > 1 && indexes.unshift(<button title='back to start' key={'start'} className='index-command' onClick={BackToStart}><i className="fas fa-step-backward" /></button>,
                                            <button title='previous index page' key={'previousPage'} className='index-command' onClick={PreviousPage}><i className="fas fa-angle-double-left" /></button>);
        
        limits.max < totalPages && indexes.push(<button title='next index page' key={'nextPage'} className='index-command' onClick={NextPage}><i className="fas fa-angle-double-right" /></button>,
                                                <button title='last index' key={'end'} className='index-command' onClick={ForwardToEnd}><i className="fas fa-step-forward" /></button>);
                        
        return indexes;
    };

    return <div className='count-container'>
                <div>
                    <span>{`${totalItems} ${listName}`}</span>
                    {totalPages > 1 && <div className='pagination'>
                        {PrintPageIndexes()}
                    </div>}
                </div>
            </div>;
};


Pagination.propTypes = 
{
    listName: PropTypes.string.isRequired,
    totalItems: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired,
    SetCurrentPage: PropTypes.func.isRequired
};

export default Pagination;