import React from 'react';
import { render, fireEvent } from '@testing-library/react';

test('input forms change value correctly', () => {
    const { container } = render(<input type="test" />);
    const inputBox = container.firstChild;
    fireEvent.change(inputBox, { target: { value: 'testing' } });
    expect(inputBox.value).toBe('testing');
});

test('checkbox fires event and changes', () => {
    const handleChange = jest.fn();
    const { container } = render(
        <input type="checkbox" onChange={handleChange} />
    );
    const checkbox = container.firstChild;
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox.checked).toBe(true);
});
