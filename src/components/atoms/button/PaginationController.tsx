import { Text } from '@chakra-ui/react';
import { useCallback } from 'react';

interface PaginationControlProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  maxPage: number;
  direction: 'next' | 'prev';
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

function PaginationControl({
  currentPage,
  setCurrentPage,
  maxPage,
  direction,
  hasNextPage,
  hasPreviousPage,
}: PaginationControlProps) {
  const isDisabled = (direction === 'next' && !hasNextPage) || (direction === 'prev' && !hasPreviousPage);

  const handleClick = useCallback(() => {
    if (isDisabled) return;

    if (direction === 'next' && currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [direction, currentPage, maxPage, setCurrentPage]);

  return (
    <Text
      fontWeight="bold"
      fontSize="20px"
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      onClick={handleClick}
      opacity={isDisabled ? 0.5 : 1}
    >
      {direction === 'next' ? '>' : '<'}
    </Text>
  );
}

export default PaginationControl;
