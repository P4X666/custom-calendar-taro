
export type IState = {
  /** 当前年月YYYY-MM */
  current: string;
  /** 当前选中日期 YYYY-MM-DD*/
  selectedDate: string;
  /** 当前显示的轮播图index */
  currentCarouselIndex: number;
  /** 范围选择 */
  selectedRange: { start: string; end: string };
};
export type CalendarMark = {
  /** 要标记的日期 YYYY-MM-DD*/
  value: string;
  /** 标记颜色 */
  color?: string;
  /** 标记的大小，css中的width、length */
  markSize?: string;
};
export type ExtraInfo = {
  /** 要标记的日期 YYYY-MM-DD*/
  value: string;
  /** 额外信息文本 */
  text: string;
  /** 颜色 */
  color?: string;
  /** 文字大小 */
  fontSize?: string;
};

export type CalendarDateInfo = {
  /** 当前月的第几天1 ~ 31 */
  date: number;
  /** 是否是当前月份的日期 */
  currentMonth: boolean;
  /** 完整的时间表示 YYYY-MM-DD */
  fullDateStr: string;
};