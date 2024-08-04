import { useFormContext } from 'react-hook-form';

import type { OrderFormData } from '@/types/order';

export const useOrderFormContext = useFormContext<OrderFormData>;
