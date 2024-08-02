import styled from '@emotion/styled';

interface PageButtonProps {
  selected: boolean;
}

const PageButton = styled.div<PageButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: #222222 1px solid;
  padding: 3px 5px;
  transition: all 0.2s ease-out;
  user-select: none;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#222222' : 'transparent')};
  color: ${({ selected }) => (selected ? '#ffffff' : '#222222')};
  &:hover {
    background-color: #222222;
    color: #ffffff;
  }
`;

export default PageButton;
