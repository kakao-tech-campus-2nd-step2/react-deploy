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
  useToast,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { addPoint } from '@/api/services/admin';
import { Member } from '@/types/memberType';

import { PointInput } from '@/components/ui/Input/PointInput';

type AddPointModalProps = {
  member: Member;
};

export const AddPointModal = ({ member }: AddPointModalProps) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [point, setPoint] = useState('');

  const { mutate, status } = useMutation({
    mutationFn: addPoint,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      toast({
        title: '포인트를 추가하는데 실패했습니다.',
        description: error.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const handleAddPoint = () => {
    mutate({ memberId: member.id, depositPoint: Number(point) });
    onClose();
  };

  const { getInputProps } = useNumberInput({
    defaultValue: point,
    min: 0,
    onChange: (value) => {
      setPoint(value);
    },
  });

  const input = getInputProps();

  const onClickAddPoints = (value: number) => {
    const newValue = Number(point) + value;
    setPoint(newValue.toString());
  };

  return (
    <>
      <Button onClick={onOpen}>추가하기</Button>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{member.name}님의 포인트 추가하기</ModalHeader>
          <ModalBody display="flex" flexDirection="column" gap="0.5rem">
            <ButtonGroup spacing="2" size="sm">
              {addPointButtonData.map((data) => (
                <Button
                  key={data.id}
                  onClick={() => onClickAddPoints(data.point)}
                >
                  +{data.point}
                </Button>
              ))}
            </ButtonGroup>
            <PointInput {...input} value={point} />
          </ModalBody>
          <ModalFooter gap="0.5rem">
            <Button onClick={onClose}>취소하기</Button>
            <Button
              colorScheme="yellow"
              onClick={handleAddPoint}
              disabled={status === 'pending'}
            >
              추가하기
            </Button>
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
