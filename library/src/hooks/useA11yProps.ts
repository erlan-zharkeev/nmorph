import { INmorphA11yProps } from '@/types';

export const useA11yProps = (props: INmorphA11yProps) => {
  const result: INmorphA11yProps = {};
  if (props.role) result.role = props.role;
  if (props.ariaLabel) result['aria-label'] = props.ariaLabel;
  if (props.ariaOrientation) result['aria-orientation'] = props.ariaOrientation;
  return result;
};
