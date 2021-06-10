interface BillingDetailCardProps {
  backgroundClass?: string;
  textVariant?: string;
  amount?: number;
  topLine?: string;
  bottomLine?: string;
  callToAction?: React.ReactElement;
}

export const BillingDetailCard = (props: BillingDetailCardProps) => {
  const {
    wrapperClass,
    topLineClass,
    priceClass,
    bottomLineClass,
  } = getBillingDetailCardClasses(props);



  return (
    <div className={wrapperClass}>
      <h3 className={topLineClass}>{props.topLine || '-'}</h3>
      <p className={priceClass}>
        {!props.amount ? (
          '-'
        ) : (
          <>
            ${props.amount / 100}
            <span className="text-xs tracking-wider">.00</span>
          </>
        )}
      </p>
      <p className={bottomLineClass}>{props.bottomLine || '-'}</p>
      {props.callToAction}
    </div>
  );
};

function getBillingDetailCardClasses(props) {
  const wrapperClass = `${props.backgroundClass} px-6 py-4 rounded-lg w-1/2 mb-2`;
  const topLineClass =  ['mb-1 tracking-wide']
  const priceClass = ['text-3xl font-bold tracking-wide mb-1'];
  const bottomLineClass = ['mb-3 mt-1 text-lg tracking-wide'];

  if (!props.bottomLine) {
    bottomLineClass.push('opacity-0');
  }

  if (!props.topLine) {
    topLineClass.push('opacity-0');
  }
  
  if (props.textVariant === 'dark') {
    priceClass.push('text-gray-700');
    bottomLineClass.push('text-gray-700');
    topLineClass.push('text-gray-600');
  } else {
    priceClass.push('text-white');
    bottomLineClass.push('text-white');
    topLineClass.push('text-white');
  }

  if (!props.amount) {
    priceClass.push('opacity-0');
  }

  return {
    wrapperClass,
    priceClass: priceClass.join(' '),
    topLineClass: topLineClass.join(' '),
    bottomLineClass: bottomLineClass.join(' '),
  };
}
