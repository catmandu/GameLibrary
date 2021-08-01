const ApplyPaging = (list, paging) =>
{
  const pageSize = paging.pageSize || list.length;
  const pageNumber = paging.pageNumber || 1;

  return {
    currentPage: list.slice((pageNumber - 1) * pageSize, pageSize * pageNumber),
    totalPages: Math.ceil(list.length / pageSize)
  };
};

module.exports = 
{
    ApplyPaging
};

