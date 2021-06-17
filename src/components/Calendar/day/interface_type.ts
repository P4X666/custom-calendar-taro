import { CalendarDateInfo } from "../interface_type";
import { CustomStyles, StyleGeneratorParams } from "../days/interface_type";

export interface IProps {
    onDayLongPress?: ({ value }: { value: string }) => void;
    /**
     * 是否被选中
     */
    selected: boolean;
    /** 点击事件回调 */
    onClick: (info: CalendarDateInfo) => any;
    value: CalendarDateInfo;
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
    /** 最小的可选时间 */
    minDate: string;
    /** 最大的可选时间 */
    maxDate?: string;
    /** 自定义样式生成器 */
    customStyleGenerator?: (dateInfo: StyleGeneratorParams) => CustomStyles;
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
    disable: boolean;
  }
  