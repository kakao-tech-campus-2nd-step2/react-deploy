import { DEFAULT_IMAGE_URL } from '@/constants/data';

import { Image } from '@/components/ui/Image/Default';
import { Container } from '@/components/ui/Layout/Container';

import { containerStyle, imageStyle, titleStyle } from './styles';

type CategoryItemProps = {
  label: string;
  imageURL?: string;
};

export const CategoryItem = ({
  label,
  imageURL = DEFAULT_IMAGE_URL,
}: CategoryItemProps) => {
  return (
    <Container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      css={containerStyle}
    >
      <Image
        src={imageURL}
        radius={1.8}
        ratio="square"
        alt={label}
        css={imageStyle}
      />
      <div css={titleStyle}>{label}</div>
    </Container>
  );
};
