// import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Search from '../../components/home/Search';
//
// describe('Search Component Tests', () => {
//     it('render the Search component and check input presence', () => {
//         const { queryByPlaceholderText } = render(<Search />);
//         const input = queryByPlaceholderText('Pick up location');
//         expect(input).toBeTruthy();
//     });
//
//     it('update the input value when typing', async () => {
//         const { getByPlaceholderText } = render(<Search />);
//         const input = getByPlaceholderText('Pick up location');
//
//         // Simulate user typing
//         await userEvent.type(input, 'Lagos state');
//
//         // Assert the input value
//         expect(input).toHaveValue('Lagos state'); // Matcher from @testing-library/jest-dom
//     });
// });
