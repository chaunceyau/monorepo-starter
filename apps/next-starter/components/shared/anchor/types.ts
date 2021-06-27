import {ButtonStyle} from '@monorepo-starter/ui';

export type AnchorProps = ButtonAnchorProps | TextAnchorProps 

interface BaseAnchorProps {
  href: string;
  variant: 'button' | 'text';
  label: string;
}

type TextAnchorProps = BaseAnchorProps

interface ButtonAnchorProps extends BaseAnchorProps {
  buttonStyle?: ButtonStyle;
}
