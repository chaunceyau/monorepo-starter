import '@testing-library/jest-dom';
import {MockedProvider} from '@apollo/client/testing';
import {
  screen,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import {
  createMockPresignedUpload,
  FakeQueriedDefaultValueForm,
  queryMocks,
} from './mocks';

describe('<FormUpload/> - with gql queried default value', () => {
  const mockOnSubmit = jest.fn();
  const mockPresignedUpload = createMockPresignedUpload();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <MockedProvider mocks={queryMocks} addTypename={false}>
        <FakeQueriedDefaultValueForm
          onSubmit={mockOnSubmit}
          presignedUpload={mockPresignedUpload}
        />
      </MockedProvider>
    );
  });

  it('renders list after data returns', async () => {
    await waitForElementToBeRemoved(screen.queryByText(/loading/i));

    queryMocks[0].result.data.files.forEach(file => {
      expect(screen.getByText(file.fileName)).toBeInTheDocument();
    });
  });
});
