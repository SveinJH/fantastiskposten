import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import CreateArticle from '../containers/CreateArticle/CreateArticle';

test('CreateArticle renders', async () => {
    const { getByText } = render(<CreateArticle />);
    const element = await waitForElement(() => getByText(/Ny artikkel/i));
    expect(element).toBeInTheDocument();
});
