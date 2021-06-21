import { CSSProperties } from "react";
import { CalendarDateInfo,CalendarMark, ExtraInfo  } from "../type";

export interface DaysProps {
  /** 日期 用于确定年月 */
  date: Date;
  /** 点击事件回调 */
  onClick: (info: CalendarDateInfo) => any;
  /** 长按回调（触发长按事件时不会触发点击事件） */
  onDayLongPress?: (item: { value: string }) => any;
  /** 额外信息 */
  extraInfo: ExtraInfo[];
  /** 要标记的日期 */
  marks: CalendarMark[];
  /** 选定的日期 */
  selectedDate: string;
  /** 选定时的背景色 */
  selectedDateColor?: string;
  /** 最小的可选时间 */
  minDate: string;
  /** 最大的可选时间 */
  maxDate: string;
  /** 是否显示分割线 */
  showDivider: boolean;
  /** 是否范围选择模式 */
  isMultiSelect: boolean;
  /** 范围选择结果 */
  selectedRange: { start: string; end: string };
  /** 自定义样式生成器 */
  customStyleGenerator?: (dateInfo: StyleGeneratorParams) => CustomStyles;
  /** 自定义Calendar Body样式 */
  bodyStyle?: CSSProperties;
  /** 视图模式 */
  view: "month" | "week";
  /** 一行的开始 0代表周日*/
  startDay: number;
}
export type StyleGeneratorParams = {
  /** 当前月的第几天1 ~ 31 */
  date: number;
  /** 是否是当前月份的日期 */
  currentMonth: boolean;
  /** 完整的时间表示 YYYY-MM-DD */
  fullDateStr: string;
  /** 是否被选中 */
  selected: boolean;
  /** 是否标记 */
  marked: boolean;
  /** 是否含有额外信息 */
  hasExtraInfo: boolean;
  /** 多选模式选项 */
  multiSelect: {
    /** 是否在选择范围内 */
    multiSelected: boolean;
    /** 是否是选择起点 */
    multiSelectedStar: boolean;
    /** 是否是选择终点 */
    multiSelectedEnd: boolean;
  };
};
export type CustomStyles = {
  /** 日期样式 */
  dateStyle?: CSSProperties;
  /** 标记样式 */
  markStyle?: CSSProperties;
  /** 容器单元格样式 */
  containerStyle?: CSSProperties;
  /** 额外信息样式 */
  extraInfoStyle?: CSSProperties;
};
