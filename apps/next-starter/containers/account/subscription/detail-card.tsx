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
      <h3 className={topLineClass}>{props.topLine}</h3>
      <p className={priceClass}>
        {props.amount === 0 ? (
          '-'
        ) : (
          <>
            ${props.amount / 100}
            <span className="text-xs">.00</span>
          </>
        )}
      </p>
      <p className={bottomLineClass}>{props.bottomLine}</p>
      {props.callToAction}
    </div>
  );
};

function getBillingDetailCardClasses(props) {
  const wrapperClass = `${props.backgroundClass} px-6 py-4 rounded-lg w-1/2 mb-2`;
  const topLineClass = `${
    props.textVariant === 'dark' ? 'text-gray-600' : 'text-white'
  } mb-2`;
  const priceClass = `${
    props.textVariant === 'dark' ? 'text-gray-700' : 'text-white'
  } text-3xl font-bold`;
  const bottomLineClass = `${
    props.textVariant === 'dark' ? 'text-gray-500' : 'text-white'
  } mb-3 mt-1 text-lg`;

  return {topLineClass, wrapperClass, priceClass, bottomLineClass};
}
