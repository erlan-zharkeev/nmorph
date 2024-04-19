import { NmorphIconList } from '@/types/common';

import Eye from '@/assets/icons/eye.svg';
import EyeBlocked from '@/assets/icons/eye-blocked.svg';
import Success from '@/assets/icons/success.svg';
import Error from '@/assets/icons/error.svg';
import Plus from '@/assets/icons/plus.svg';
import Minus from '@/assets/icons/minus.svg';
import Loader from '@/assets/icons/loader.svg';
import ChevronDown from '@/assets/icons/chevron-down.svg';
import Archive from '@/assets/icons/archive.svg';
import Audio from '@/assets/icons/audio.svg';
import Video from '@/assets/icons/video.svg';
import Doc from '@/assets/icons/doc.svg';
import Image from '@/assets/icons/image.svg';
import Enlarge from '@/assets/icons/enlarge.svg';
import Shrink from '@/assets/icons/shrink.svg';
import RotateRight from '@/assets/icons/rotate-right.svg';
import RotateLeft from '@/assets/icons/rotate-left.svg';
import ZoomIn from '@/assets/icons/zoom-in.svg';
import ZoomOut from '@/assets/icons/zoom-out.svg';
import Time from '@/assets/icons/time.svg';
import TriangleDown from '@/assets/icons/triangle-down.svg';

export const NmorphIconsMap: Record<NmorphIconList, string> = {
  [NmorphIconList.eye]: Eye,
  [NmorphIconList['eye-blocked']]: EyeBlocked,
  [NmorphIconList.success]: Success,
  [NmorphIconList.error]: Error,
  [NmorphIconList.plus]: Plus,
  [NmorphIconList.minus]: Minus,
  [NmorphIconList.loader]: Loader,
  [NmorphIconList['chevron-down']]: ChevronDown,
  [NmorphIconList.archive]: Archive,
  [NmorphIconList.audio]: Audio,
  [NmorphIconList.video]: Video,
  [NmorphIconList.time]: Time,
  [NmorphIconList.doc]: Doc,
  [NmorphIconList.image]: Image,
  [NmorphIconList.enlarge]: Enlarge,
  [NmorphIconList.shrink]: Shrink,
  [NmorphIconList['rotate-right']]: RotateRight,
  [NmorphIconList['rotate-left']]: RotateLeft,
  [NmorphIconList['zoom-in']]: ZoomIn,
  [NmorphIconList['zoom-out']]: ZoomOut,
  [NmorphIconList['triangle-down']]: TriangleDown,
};
