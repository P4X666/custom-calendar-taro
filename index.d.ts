import { ComponentClass } from 'react';
import { IProps } from './src/components/Calendar/index';

export declare type CalendarMark = {
  /** 要标记的日期 */
  value: string;
  /** 标记颜色 */
  color?: string;
  /** 标记的大小，css中的width、length */
  markSize?: string;
};

declare const Calendar: ComponentClass<IProps>;

export default Calendar;
