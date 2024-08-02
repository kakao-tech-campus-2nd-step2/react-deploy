import { Link } from 'react-router-dom';

import { SettingsIcon } from '@chakra-ui/icons';
import { Button, Text } from '@chakra-ui/react';

import { ROUTER_PATH } from '@/routes/path';

export const AdminButton = () => {
  return (
    <Link to={ROUTER_PATH.ADMIN}>
      <Button colorScheme="yellow" gap="0.5rem">
        <SettingsIcon />
        <Text fontSize="sm">관리자</Text>
      </Button>
    </Link>
  );
};
