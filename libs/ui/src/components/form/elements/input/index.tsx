import * as React from 'react';
import * as RHForm from 'react-hook-form';

import {FormLabel} from '../misc/label';
import {getFormInputStyles} from './helpers';
import {FormInputErrorMessage} from './error-message';

export interface FormInputProps {
  name: string;
  label: string;
  type?: 'text' | 'number';
  placeholder?: string;
  disabled?: boolean;
  registerOptions?: RHForm.RegisterOptions;
  defaultValue?: string;
}

export const FormInput = (props: FormInputProps) => {
  const ctx = RHForm.useFormContext();
  if (ctx === undefined) {
    throw new Error('FormInput must be rendered inside a Form component');
  }

  const styles = getFormInputStyles({
    loading: ctx.formState.isSubmitting,
    error: ctx.formState.errors[props.name],
    disabled: props.disabled,
  });

  return (
    <div className={styles.textColor}>
      <FormLabel
        name={props.name}
        label={props.label}
        error={!!ctx.formState.errors[props.name]}
        required={Boolean(props.registerOptions?.required)}
      />
      <div className="relative rounded-md shadow-sm">
        <input
          id={props.name}
          type={props.type || 'text'}
          disabled={ctx.formState.isSubmitting || props.disabled}
          placeholder={props.placeholder}
          className={styles.inputBaseClasses.join(' ')}
          aria-describedby={
            ctx.formState.errors ? props.name + '-error' : props.name
          }
          defaultValue={props.defaultValue}
          aria-invalid={!!ctx.formState.errors[props.name]}
          {...ctx.register(props.name, props.registerOptions)}
        />
      </div>
      {ctx.formState.errors[props.name] ? (
        <FormInputErrorMessage
          name={props.name}
          message={
            ctx.formState.errors[props.name]?.message ||
            ctx.formState.errors[props.name]?.type === 'required'
              ? 'You must provide a value for this field'
              : ''
          }
        />
      ) : null}
    </div>
  );
};
