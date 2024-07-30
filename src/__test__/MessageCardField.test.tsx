// import { ChakraProvider } from '@chakra-ui/react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { act, render, screen } from '@testing-library/react';
// // import userEvent from '@testing-library/user-event';
// import { FormProvider, useForm } from 'react-hook-form';

// import { OrderFormOrderInfo } from '@/components/features/Order/OrderForm/OrderInfo';
// // import { worker } from '@/mocks/browser';
// import { server } from '@/mocks/server';

// beforeAll(() => {
//   server.listen({
//     onUnhandledRequest: 'warn',
//   });
//   window.alert = jest.fn();
// });

// const TestWrapper = ({ children }: { children: React.ReactNode }) => {
//   const methods = useForm();

//   const queryClient = new QueryClient();
//   return (
//     <QueryClientProvider client={queryClient}>
//       <FormProvider {...methods}>
//         <ChakraProvider>{children}</ChakraProvider>
//       </FormProvider>
//     </QueryClientProvider>
//   );
// };
// const orderHistory = {
//   id: 1,
//   count: 1,
// };
// describe('MessageCardFields', () => {
//   // test('renders the textarea correctly', () => {
//   //   render(<OrderFormOrderInfo orderHistory={orderHistory} />, { wrapper: TestWrapper });

//   //   expect(textarea).toBeInTheDocument();
//   // });

//   test('validates the message text correctly', async () => {
//     const { debug } = render(<OrderFormOrderInfo orderHistory={orderHistory} />, {
//       wrapper: TestWrapper,
//     });
//     debug();
//     // const submitButton = screen.getByRole('button', { name: /submit/i });
//     const submitButton = screen.getByText(/결제하기/i);
//     debug(submitButton);

//     // Test empty input validation

//     // expect(await screen.findByText('Message is required')).toBeInTheDocument();

//     // // Test input with valid data
//     // userEvent.click(submitButton);

//     // expect(await screen.queryByText('Message is required')).not.toBeInTheDocument();
//   });
// });
export {};
