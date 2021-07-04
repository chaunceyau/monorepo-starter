import React from 'react';

import {FormInput} from './elements/input';
import {FormButton} from './elements/button';
import {FormUpload} from './elements/upload';
import {FormToggle} from './elements/toggle';
import {FormSelect} from './elements/select';
import {FormDateInput} from './elements/date';
import {FormDivider} from './elements/divider';
import {FormTextarea} from './elements/textarea';
import {FormRadioGroup, FormRadioGroupProps} from './elements/radio';

// TODO: am i using formsubmitbutton?
const ValidFormComponents: any = [
  FormInput,
  FormUpload,
  FormToggle,
  FormButton,
  FormSelect,
  FormDivider,
  FormTextarea,
  FormDateInput,
  FormRadioGroup,
];

export function validateChild(child: any) {
  if (!ValidFormComponents.includes(child.type)) {
    // fn = "Error: function FormHeader({ ...etc }) { }"
    const fn: string = child.type.toString();
    const firstParenthesisIndex = fn.indexOf('(');
    // 9 = "function ".length
    const componentName: string = fn.slice(9, firstParenthesisIndex);
    throw new Error(
      `${componentName} is not a valid child of the Form component.`
    );
  }
}

export function initializeOptionInForm(child: any, defaultValues: any = {}) {
  switch (child.type) {
    case FormRadioGroup: {
      const props: FormRadioGroupProps = child.props;

      const noDefaultValueForRadioGroup =
        !defaultValues || !defaultValues[props.name];

      // default to first value
      if (noDefaultValueForRadioGroup && !!props.options?.length) {
        Object.assign(defaultValues, {
          [props.name]: props.options[0].id,
        });
      }
    }
  }
}

// currently causes errors with storybook
const VALIDATE_CHILDREN = false;

export function validateChildrenAndInitializeOptionForm(
  children: React.ReactElement | React.ReactElement[],
  defaultValues?: {[key: string]: any}
) {
  React.Children.map(children, child => {
    // make sure valid child
    if (VALIDATE_CHILDREN) {
      validateChild(child);
    }
    // add default values if not provided for options
    initializeOptionInForm(child, defaultValues);
  });
}

export function createArrayOfFilesPendingDeletion(children, data) {
  const deleteFiles: {
    [key: string]: {
      files: Array<string>;
      onDeleteFunction: (fileIds: string[]) => void;
    };
  } = {};

  /**
   * Create an internal array of files that need to be removed if saved
   */
  React.Children.forEach(children, async child => {
    if (child.type === FormUpload) {
      deleteFiles[child.props.name] = {
        onDeleteFunction: child.props.onDeleteMutation,
        files:
          data[child.props.name]?.reduce((acc: any, val: any) => {
            return val.status === 'PENDING_REMOVAL' ? acc.concat(val.id) : acc;
          }, []) || [],
      };
    }
  });

  return deleteFiles;
}
