import Link from 'next/link';
//
import {Button} from '@monorepo-starter/ui';
import {AnchorProps} from './types';

export function Anchor({href, label, variant = 'text', ...others}: AnchorProps) {
  if (variant === 'button') {
    const _buttonStyle = 'buttonStyle' in others ? others.buttonStyle : 'primary';
    return (
      <Link href={href}>
        <Button buttonStyle={_buttonStyle}>{label}</Button>
      </Link>
    );
  }

  return <Link href={href}>{label}</Link>;
}
