import { NmorphIconList } from './NmorphIconList.enums';
import Eye from './../../../assets/icons/eye.svg';
import EyeBlocked from './../../../assets/icons/eye-blocked.svg';
import Success from './../../../assets/icons/success.svg';
import Error from './../../../assets/icons/error.svg';

export const NmorphIconsMap: { [key in NmorphIconList]: string } = {
  [NmorphIconList.eye]: Eye,
  [NmorphIconList['eye-blocked']]: EyeBlocked,
  [NmorphIconList.success]: Success,
  [NmorphIconList.error]: Error,
};
