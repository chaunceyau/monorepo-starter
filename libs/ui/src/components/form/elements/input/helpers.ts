export function getFormInputStyles({
  loading,
  error,
  disabled,
}: GetFormInputStylesProps) {
  const inputBaseClasses = [
    'border',
    'block',
    'w-full',
    'px-3 py-2',
    'pr-10',
    'sm:text-sm',
    'rounded-md',
    'focus:outline-none',
    'tracking-wide'
  ];

  if (loading) {
    inputBaseClasses.push('bg-gray-200 cursor-wait');
  } else {
    inputBaseClasses.push(disabled ? 'bg-gray-200' : 'bg-white');
  }

  if (typeof error === 'undefined') {
    inputBaseClasses.push(
      'border-gray-300',
      'placeholder-gray-300',
      'focus:ring-gray-500',
      'focus:border-indigo-500'
    );
  } else {
    inputBaseClasses.push(
      'border-red-400',
      'placeholder-red-300',
      'focus:ring-red-500',
      'focus:border-red-500'
    );
  }

  return {
    textColor: _getTextColor({loading, error, disabled}),
    inputBaseClasses,
  };
}

interface GetFormInputStylesProps {
  loading: boolean;
  error: any;
  disabled: boolean;
}

function _getTextColor({loading, error, disabled}: GetFormInputStylesProps) {
  if (error) {
    return 'text-red-600';
  } else if (disabled || loading) {
    return 'text-gray-400';
  } else {
    return 'text-gray-700';
  }
}
