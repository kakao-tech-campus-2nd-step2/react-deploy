import { Box, Select } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

interface DropdownProps {
  onSelect: (value: string) => void;
}

export const Dropdown = ({ onSelect }: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelect(value);
  };

  return (
    <Box width="200px">
      <Select placeholder="백엔드 API 선택" value={selectedOption} onChange={handleChange}>
        <option value="https://do-free.duckdns.org/stopmin">정지민</option>
        <option value="https://do-free.duckdns.org/jjt4515">정진택</option>
        <option value="https://do-free.duckdns.org/canyos">이풍헌</option>
        <option value="https://do-free.duckdns.org/amm0124">김건호</option>
      </Select>
    </Box>
  );
};
