import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input component', () => {
  const mockProps = {
    value: '',
    type: 'text',
    name: 'email',
    placeholder: 'Text',
    handleChange: jest.fn()
  };
  test('should render without crashing', () => {
    render(<Input {...mockProps} />);
    (<Input {...mockProps}/>);
    expect(screen.getByText(mockProps.placeholder)).toBeTruthy();
  });
});
