import Container from '@components/atoms/container/Container';
import { backgroundColors } from '@styles/colors';
import { ReactNode } from 'react';
import { Text } from '@chakra-ui/react';
import { ContainerSize } from '@/types';

interface ModalProps {
  children: ReactNode;
  title: string;
  elementSize: ContainerSize;
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
}

function Modal({
  children, title, elementSize, isOpened, setIsOpened,
}: ModalProps) {
  return (
    isOpened ? (
      <Container
        justifyContent="center"
        cssProps={{
          position: 'absolute',
          width: '100%',
          height: 'calc(100dvh - 54px)',
          backgroundColor: 'rgba(0,0,0,0.2)',
          top: 0,
          left: 0,
          zIndex: 90,
        }}
      >
        <Container elementSize="full-width" padding="40px 0" justifyContent="center">
          <Container
            backgroundColor={backgroundColors.container}
            elementSize={elementSize}
            cssProps={{
              boxShadow: '10px 10px 12px -8px rgba(0,0,0,0.54)',
              border: '1px solid rgba(0, 0, 0, 0.12)',
            }}
            flexDirection="column"
          >
            <Container
              elementSize={{
                width: '100%',
                height: 'auto',
              }}
            >
              <Container
                elementSize="full-width"
                padding="15px 20px"
                justifyContent="space-between"
                cssProps={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                }}
              >
                <Text fontSize="20px" fontWeight="bold">
                  {title}
                </Text>
                <Text
                  fontSize="20px"
                  cursor="pointer"
                  onClick={() => {
                    setIsOpened(false);
                  }}
                >
                  X
                </Text>
              </Container>
            </Container>
            <Container padding="15px 20px">
              {children}
            </Container>
          </Container>
        </Container>
      </Container>
    ) : null
  );
}

export default Modal;
