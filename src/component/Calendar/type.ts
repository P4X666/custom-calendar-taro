import { CSSProperties, ReactElement } from "react";

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

interface StyleControlProps {
  /**
   * 是否被选中
   */
  selected: boolean;

  day: number,
  /** 是否范围选择模式并且endDateStr不为空 **/
  isMultiSelectAndFinish: boolean;
  /**
   * 当前日期是否有mark，没有为-1
   */
  markIndex: number;
  /**
   * 当前日期是否有extraInfo，没有为-1
   */
  extraInfoIndex: number;
  /** 是否显示分割线 */
  showDivider: boolean;
  /**
   * 被选择（范围选择）
   */
  isInRange: boolean;
  /**
   * 范围起点
   */
  rangeStart: boolean;
  /**
   * 范围终点
   */
  rangeEnd: boolean;
  /** 禁用(不在minDate和maxDate的时间范围内的日期) */
  disabled: boolean;
}
export interface DayProps extends StyleControlProps, DayType {
  /** 非本月 */
  notCurMonth?: boolean;
  /** 长按事件回调 */
  onDayLongPress?: (info: DayType) => void;
  /** 点击事件回调 */
  onDayClick: (info: DayType) => any;
  /** 最小的可选时间 */
  minDate: string;
  /** 最大的可选时间 */
  maxDate?: string;
  /** 选定时的背景色 */
  selectedDateColor?: string;
  /**
   * mark的背景色
   */
  markColor?: string;
  markSize?: string;
  /**
   * extraInfo的color
   */
  extraInfoColor?: string;
  /**
   * extraInfo的fontSize
   */
  extraInfoSize?: string;
  /**
   * extraInfo的文本
   */
  extraInfoText?: string;
  /**
   * 自定义渲染日期的方法
   */
  custDayRender?: (props: DayProps)=> ReactElement
}

export interface CustCalendarProps {
  /** 额外信息 */
  // extraInfo?: ExtraInfo[];
  /** 要标记的日期列表 YYYY-MM-DD */
  // marks?: CalendarMark[];
  /** 点击回调 */
  onDayClick?: (item: { value: string }) => any;
  /** 长按回调（触发长按事件时不会触发点击事件） */
  onDayLongPress?: (item: { value: string }) => any;
  /** 当前选中的时间 YYYY-MM-DD*/
  selectedDate?: string;
  /** 当前显示的月份/周 所包含的一个日期 YYYY-MM-DD */
  currentView?: string;
  /** 隐藏箭头 */
  hideArrow?: boolean;
  /** 隐藏控制器 */
  hideController?: boolean;
  /** 是否可以滑动 */
  isSwiper?: boolean;
  /** 滑动方向 水平/竖直*/
  isVertical?: boolean;
  /** 最小的可选时间 */
  minDate?: string;
  /** 最大的可选时间 */
  maxDate?: string;
  /** 选中日期的背景色 */
  selectedDateColor?: string;
  /** 是否显示分割线 */
  showDivider?: boolean;
  /** 是否范围选择模式 */
  isMultiSelect?: boolean;
  /** 月份/周改变回调 */
  onCurrentViewChange?: (value: string) => any;
  /** 点击左箭头 */
  onClickPre?: () => any;
  /** 点击右箭头 */
  onClickNext?: () => any;
  /** 范围选择完成时的回调 */
  onSelectDate?: (value: { start: string; end: string }) => any;
  /** 头部自定义样式 */
  controllerCustClassName?: string;
  /** 日历主体的样式 */
  bodyStyle?: CSSProperties;
  /** 视图 月/周 */
  view?: "month" | "week";
  /** 自定义日期选择器文本生成器 */
  pickerTextGenerator?: (currentView: Date) => string;
  /** 指定周几为一行的起点，0为周日*/
  startWeekDay?: WeekDayType;
}

export type CustCalendarInstance = {
  /** 上一页 */
  goNext: () => void
  /** 下一页 */
  goPre: () => void
}
