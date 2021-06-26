import '@testing-library/jest-dom';
import {MockedProvider} from '@apollo/client/testing';
import {render, waitForElementToBeRemoved} from '@testing-library/react';

import {
  createMockPresignedUpload,
  FakeQueriedDefaultValueForm,
  queryMocks,
} from './mocks';

describe('<FormUpload/> - with gql queried default value', () => {
  const mockOnSubmit = jest.fn();
  const mockPresignedUpload = createMockPresignedUpload();
  let wrapper;
  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = render(
      <MockedProvider mocks={queryMocks} addTypename={false}>
        <FakeQueriedDefaultValueForm
          onSubmit={mockOnSubmit}
          presignedUpload={mockPresignedUpload}
        />
      </MockedProvider>
    );
  });

  it('renders list after data returns', async () => {
    await waitForElementToBeRemoved(wrapper.queryByText(/loading/i));
    // for await (const file of queryMocks[0].result.data.files) {
    //   expect(wrapper.queryByText(file.fileName)).toBeInTheDocument();
    // }
    queryMocks[0].result.data.files.forEach(file => {
      expect(wrapper.getByText(file.fileName)).toBeInTheDocument();
    });
  });
});
