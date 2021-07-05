import React from 'react';
import {toast} from 'react-hot-toast';
import * as RHForm from 'react-hook-form';
//
import {Card, FormButton} from '@monorepo-starter/ui';
//
import {createArrayOfFilesPendingDeletion, validateChildrenAndInitializeOptionForm} from './helpers';
import {Toasts} from '../../misc/toasts';

export interface FormProps {
  id: string;
  title?: string;
  styled?: boolean;
  description?: string;
  clearValuesOnSubmit?: boolean;
  children: React.ReactElement | React.ReactElement[];
  defaultValues?: {[key: string]: any};
  // UPDATE
  onSubmit: (data: any) => void | Promise<void>;
}

export function Form({
  id,
  onSubmit: _onSubmit,
  children,
  title,
  description,
  styled,
  clearValuesOnSubmit,
}: FormProps) {
  //
  validateChildrenAndInitializeOptionForm(children);

  const methods = RHForm.useForm({});
  const {handleSubmit, reset, setValue} = methods;
  const onSubmit = async (data: any) => {
    const isFunctionAsync = _onSubmit.constructor.name === 'AsyncFunction';
    
    const deleteFiles = createArrayOfFilesPendingDeletion(children, data);
    
    try {
      for await (const [key, value] of Object.entries(deleteFiles)) {
        // TODO: is await needed?
        // await new Promise(function(resolve, reject) {
        await deleteFiles[key].onDeleteFunction(deleteFiles[key].files)
        // });
      }

      console.log({data})
      await _onSubmit(data);

      for (const [key, deletes] of Object.entries<any>(deleteFiles)) {
        setValue(
          key,
          data[key].filter(
            (val: any) => !deletes.some((d: string) => d === val.id)
          )
        );
      }

      if (clearValuesOnSubmit) {
        reset();
      }

      if (isFunctionAsync) {
        toast.success('successfully submitted your info');
      }
    } catch (err) {
      if (isFunctionAsync) {
        toast.error(err);
      }
    }
  };

  // TODO: test this for form id...
  // const ref = useRef<any>()
  // ref.current = Math.random()

  return (
    // todo pass formId to form children
    <form id={id} onSubmit={handleSubmit(onSubmit)} data-testid={id}>
      <Card styled={styled} title={title} description={description}>
        {/* <div className={styled ? 'border rounded-lg bg-white py-6 px-8 shadow-sm relative' : ''}> */}
        {/* {title ? <CardHeader title={title} description={description} /> : null} */}
        <div className={`flex flex-col space-y-4 ${styled ? 'pb-20' : ''}`}>
          <RHForm.FormProvider {...methods}>
            {React.Children.map(children, child => {
              switch (child.type) {
                case FormButton: {
                  return (
                    <div
                      className={
                        styled
                          ? 'bg-gray-50 py-4 px-8 rounded-b-lg shadow-t flex justify-end absolute bottom-0 left-0 w-full'
                          : 'pt-2'
                      }
                    >
                      {child}
                    </div>
                  );
                }
                default:
                  return child;
              }
            })}
          </RHForm.FormProvider>
        </div>
      </Card>
      <Toasts />
    </form>
  );
}
