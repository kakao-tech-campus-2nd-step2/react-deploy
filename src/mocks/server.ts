import { setupServer } from 'msw/node';

import { interestHandlers } from '@/api/hooks/interestHandlers';
import { loginHandler } from '@/api/hooks/login.mock';
import { handlers } from '@/mocks/handlers';

export const server = setupServer(...interestHandlers, ...loginHandler, ...handlers);
