import {useQuery, gql} from '@apollo/client';

import {Form, FormButton, FormUpload} from '@monorepo-starter/ui';

import {FileStateObject} from '../types';

// keep fileNames <= 20 characters or test will break
export const defaultValue: Array<FileStateObject> = [
  {
    id: 'file_id_123',
    progress: 100,
    status: 'COMPLETE',
    fileName: 'fake-file.png',
  },
  {
    id: 'file_id_456',
    progress: 100,
    status: 'COMPLETE',
    fileName: 'another-file.png',
  },
];

export const mocks = {
  formId: 'mock-form',
  input: {
    defaultValue,
    name: 'mockUploadInputVariableName',
    label: 'mock upload input label',
    // value: 'some new mock value',
  },
};

export const FakeQueriedDefaultValueFormQuery = gql`
  query {
    files {
      id
      fileName
    }
  }
`;

export const FakeQueriedDefaultValueForm = ({onSubmit, presignedUpload}) => {
  const {data} = useQuery(FakeQueriedDefaultValueFormQuery);
  if (data) {
    return (
      <Form id={mocks.formId} onSubmit={onSubmit}>
        <FormUpload
          multiple={true}
          name={mocks.input.name}
          label={mocks.input.label}
          defaultValue={data.files.map(file => ({
            status: 'COMPLETE',
            progress: 100,
            id: file.id,
            fileName: file.fileName,
          }))}
          onDeleteMutation={() => {}}
          onUploadComplete={async () => {}}
          presignedUpload={presignedUpload}
          // registerOptions={{required: 'this value is required'}}
        />
        <FormButton buttonStyle="primary">submit</FormButton>
      </Form>
    );
  }
  return <span>loading...</span>;
};

export const queryMocks = [
  {
    request: {
      query: FakeQueriedDefaultValueFormQuery,
    },
    result: {
      data: {
        files: [
          {fileName: 'some mocked fileName', id: 'some_mocked_id'},
          {fileName: 'some mocked fileName2', id: 'some_mocked_id2'},
          {fileName: 'some mocked fileName3', id: 'some_mocked_id3'},
        ],
      },
    },
  },
];
