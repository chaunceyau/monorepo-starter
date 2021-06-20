import React from 'react';
import {useFormContext} from 'react-hook-form';
//
import {FormLabel} from '../misc/label';

interface FormSelectProps {
  name: string;
  label: string;
  options: {id: string; value: string}[];
}

export function FormSelect(props: FormSelectProps) {
  const selectClasses = [
    'block w-full text-base',
    'focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
    'sm:text-sm appearance-none',
    'cursor-pointer',
  ];
  const {register, formState} = useFormContext();

  const wrapperClasses = [
    'pl-3 pr-4 py-2 border border-gray-300 rounded-md flex items-center',
  ];

  if (formState.isSubmitting) {
    selectClasses.push('bg-gray-200 text-gray-400 cursor-wait');
    wrapperClasses.push('bg-gray-200');
  } else {
    selectClasses.push('bg-white');
    wrapperClasses.push('bg-white');
  }

  return (
    <div>
      <FormLabel name={props.name} label={props.label} error={false} />
      <div className={wrapperClasses.join(' ')}>
        <select
          id={props.name}
          disabled={formState.isSubmitting}
          className={selectClasses.join(' ')}
          {...register(props.name)}
        >
          {props.options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.value}
            </option>
          ))}
        </select>
        {/* TODO: fix that this is unclickable */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="w-3 h-3"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
