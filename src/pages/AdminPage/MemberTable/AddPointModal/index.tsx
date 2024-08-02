import { useState } from 'react';

import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useNumberInput,
} from '@chakra-ui/react';

import { PointInput } from '@/components/ui/Input/PointInput';

export const AddPointModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [point, setPoint] = useState('');

  const { getInputProps } = useNumberInput({
    defaultValue: point,
    min: 0,
    onChange: (value) => {
      setPoint(value);
    },
  });

  const input = getInputProps();

  const addPoints = (value: number) => {
    const newValue = Number(point) + value;
    setPoint(newValue.toString());
  };

  return (
    <>
      <Button onClick={onOpen}>추가하기</Button>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ㅇㅇ님의 포인트 추가하기</ModalHeader>
          <ModalBody display="flex" flexDirection="column" gap="0.5rem">
            <ButtonGroup spacing="2" size="sm">
              {addPointButtonData.map((data) => (
                <Button key={data.id} onClick={() => addPoints(data.point)}>
                  +{data.point}
                </Button>
              ))}
            </ButtonGroup>
            <PointInput {...input} value={point} />
          </ModalBody>
          <ModalFooter gap="0.5rem">
            <Button onClick={onClose}>취소하기</Button>
            <Button colorScheme="yellow">추가하기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const addPointButtonData = [
  {
    id: 0,
    point: 1000,
  },
  {
    id: 1,
    point: 5000,
  },
  {
    id: 2,
    point: 10000,
  },
];
