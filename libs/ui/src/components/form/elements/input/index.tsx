import React from 'react';
import * as RHForm from 'react-hook-form';
import {FormLabel} from '../misc/label';
import {FormInputErrorMessage} from './error-message';
import { getFormInputStyles } from './helpers';

export interface FormInputProps {
  name: string;
  label: string;
  type?: 'text' | 'number';
  placeholder?: string;
  disabled?: boolean;
  registerOptions?: RHForm.RegisterOptions;
}

export const FormInput = (props: FormInputProps) => {
  const ctx = RHForm.useFormContext();
  if (ctx === undefined) {
    throw new Error('FormInput must be rendered inside a Form component');
  }

  const styles = getFormInputStyles({
    loading: ctx.formState.isSubmitting,
    error: ctx.errors[props.name],
    disabled: props.disabled,
  });

  return (
    <div className={styles.textColor}>
      <FormLabel
        name={props.name}
        label={props.label}
        error={!!ctx.errors[props.name]}
        required={Boolean(props.registerOptions?.required)}
      />
      <div className="relative rounded-md shadow-sm">
        <input
          type={props.type || 'text'}
          id={props.name}
          name={props.name}
          ref={ctx.register(props.registerOptions)}
          disabled={ctx.formState.isSubmitting || props.disabled}
          placeholder={props.placeholder}
          className={styles.inputBaseClasses.join(' ')}
          aria-describedby={
            ctx.formState.errors ? props.name + '-error' : props.name
          }
          aria-invalid={!!ctx.errors[props.name]}
        />
      </div>
      {ctx.errors[props.name] ? (
        <FormInputErrorMessage
          name={props.name}
          message={
            ctx.errors[props.name]?.message ||
            ctx.errors[props.name]?.type === 'required'
              ? 'You must provide a value for this field'
              : ''
          }
        />
      ) : null}
    </div>
  );
};
