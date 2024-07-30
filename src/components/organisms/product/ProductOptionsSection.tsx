import {
  Box, Text,
} from '@chakra-ui/react';
import { useRef } from 'react';
import Container from '@components/atoms/container/Container';
import { ProductOption } from '@/dto';
import { generateRandomId } from '@/utils';

interface ProductOptionsSectionProps {
  options: ProductOption[];
  currentOption?: ProductOption;
  setOption: (option: ProductOption) => void;
}

function ProductOptionsSection({
  options,
  currentOption,
  setOption,
}: ProductOptionsSectionProps) {
  const productOptionsId = useRef(generateRandomId());

  return (
    <Container
      elementSize="full-width"
      justifyContent="center"
      flexDirection="column"
      padding="15px 0"
      cssProps={{
        gap: '2px',
        cursor: 'pointer',
      }}
    >
      {
        options.map((option, index) => (
          <Box
            w="100%"
            padding="12px 14px 16px"
            border={
              currentOption?.id === option.id
                ? 'rgb(100, 100, 100) 2px solid'
                : 'rgb(237, 237, 237) 1px solid'
            }
            display="flex"
            flexDirection="column"
            key={productOptionsId.current + index.toString()}
            onClick={() => {
              setOption(option);
            }}
          >
            <Text fontWeight="bold">{option.name}</Text>
            <Text>
              남은수량:
              {option.quantity}
            </Text>
          </Box>
        ))
      }
    </Container>
  );
}

export default ProductOptionsSection;
