import Container from '@components/atoms/container/Container';
import PageButton from '@components/atoms/button/PageButton';
import {
  useEffect, useRef, useState,
} from 'react';
import PaginationController from '@components/atoms/button/PaginationController';
import { generateRandomId } from '@/utils';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  maxPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pagesPerSection: number;
}

function Pagination({
  currentPage, setCurrentPage, maxPage, hasNextPage, hasPreviousPage, pagesPerSection,
}: PaginationProps) {
  const [pages, setPages] = useState<number[]>([]);
  const pageItemPrefix = useRef(generateRandomId());

  useEffect(() => {
    const nearPageStart = currentPage - (currentPage % 5 - 1);
    let nearPageEnd = currentPage + (pagesPerSection - (currentPage % 5));

    if (maxPage < nearPageEnd) {
      nearPageEnd = maxPage;
    }

    const tmpPages = [];

    for (let i = nearPageStart; i <= nearPageEnd; i++) {
      tmpPages.push(i);
    }

    setPages(tmpPages);
  }, [currentPage, maxPage]);

  return (
    <Container
      elementSize="full-width"
      padding="15px 20px"
      cssProps={{
        gap: '15px',
      }}
      justifyContent="center"
      alignItems="center"
    >
      <PaginationController
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maxPage={maxPage}
        direction="prev"
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />
      {pages.map((page, index) => (
        <PageButton key={`${pageItemPrefix}-${index}`} selected={page === currentPage}>
          {page}
        </PageButton>
      ))}

      <PaginationController
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maxPage={maxPage}
        direction="next"
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />
    </Container>
  );
}

export default Pagination;
