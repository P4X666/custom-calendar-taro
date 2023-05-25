import { ReactElement } from "react";

/** 周几 取值范围 0 | 1 | 2 | 3 | 4 | 5 | 6 */
export type WeekDayType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type DayType = {
  /** 年份 */
  year: number
  /** 月份 */
  month: number
  /** 第几天 */
  day: number
  /** 周几 */
  weekDay: WeekDayType
}

export type DateDetail = Omit<DayType, 'weekDay'>

export type DaysType = Omit<DateDetail, 'day'> & {
  /** 该月总共多少天 */
  days: number
}


export type CalendarMark = {
  /** 要标记的日期 YYYY-MM-DD*/
  value: string;
  /** 标记颜色 */
  color?: string;
};

export type DayProps = DayType & Omit<DaysProps,
  'days' | 'view' | 'extraInfo' | 'dayViewDetail' | 'today'
> & {
  /**
   * 是否被选中
   * @default false
   */
  selected: boolean;
  /**
   * 当前日期是否有mark
   * @default false
   */
  hasMarker: boolean;
  /**
   * 当前日期的 extraInfo
   */
  extraInfo?: { text: string, color: string };
  /** 禁用日期
   * @default false
   */
  disabled: boolean;
  /** 非本月
   * @default false
   */
  notCurMonth?: boolean;
  /** 
   * 是否为当天的日期
   * @default false
   *  */
  isToday: boolean;
  /** 格式化后的日期 */
  dateFormate: string;
  /** 是否范围选择模式并且endDateStr不为空 **/
  // isMultiSelectAndFinish: boolean;
  /** 是否显示分割线 */
  // showDivider: boolean;
  /**
   * 被选择（范围选择）
   */
  // isInRange: boolean;
  /**
   * 范围起点
   */
  // rangeStart: boolean;
  /**
   * 范围终点
   */
  // rangeEnd: boolean;
}

export interface DaysProps extends Omit<CustCalendarProps,
  'currentView' | 'hideArrow' | 'hideController' | 'isSwiper' | 'isVertical' | 'pickerTextGenerator' | 'isMultiSelect' | 'className' | 'custWeekRender'
> {
  days: DayType[];
  dayViewDetail: DateDetail;
  today: DayType
}

export interface CustCalendarProps {
  /** 长按事件回调 */
  onDayLongPress?: (info: DayType, dateFormate: string) => void;
  /** 点击事件回调 */
  onDayClick?: (info: DayType, dateFormate: string) => any;
  /** 当前选中的时间 YYYY-MM-DD*/
  selectedDate?: string;
  /** 当前显示的月份/周 所包含的一个日期 YYYY-MM-DD */
  currentView?: string;
  /** 隐藏箭头 */
  hideArrow?: boolean;
  /** 隐藏控制器 */
  hideController?: boolean;
  /** 是否可以滑动
   * @default true
   */
  isSwiper?: boolean;
  /** 滑动方向 水平/竖直*/
  isVertical?: boolean;
  /** 最小的可选时间
   * @default 1970-01-01
   */
  minDate?: string;
  /** 最大的可选时间
   * @default 2100-12-31
   */
  maxDate?: string;
  /** 选中日期的背景色 */
  selectedDateColor?: string;
  /** 是否范围选择模式 */
  isMultiSelect?: boolean;
  /** 范围选择完成时的回调 */
  onSelectDate?: (value: { start: string; end: string }) => any;
  /** 视图 月/周
   * @default month
   */
  view?: "month" | "week";
  /** 自定义日期选择器文本生成器 */
  pickerTextGenerator?: (currentView: string) => string;
  /** 指定周几为一行的起点，0为周日
   * @default 1
  */
  startWeekDay?: WeekDayType;
  /** 月视图下的高度
   * @default 19rem
   */
  monthWrapHeigh?: "string",
  /** 周视图下的高度
   *  @default 3rem
   */
  weekWrapHeight?: "string",
  /** 要标记的日期列表 */
  marks?: CalendarMark[],
  /** 设置日期格式。配置参考 day.js，支持自定义格式
   * @default 'YYYY-MM-DD'
   */
  format?: string

  extraInfo?: { value: string, text: string, color: string }[]
  /**
   * 自定义渲染日期的方法
   */
  custDayRender?: (props: DayProps) => ReactElement,
  custWeekRender?: (weekItem: string) => ReactElement,
  /** 自定义 class */
  className?: string
  /**
   * 当日期发生变化回调当前日期
   */
  onCurrentViewChange?: (value: string) => string
}

export type CustCalendarInstance = {
  /** 上一页 */
  goNext: () => void
  /** 下一页 */
  goPre: () => void
}
