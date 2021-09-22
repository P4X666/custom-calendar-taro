import { Picker, View, Swiper, SwiperItem } from "@tarojs/components";
import React, { Component, CSSProperties } from "react";
import { formatDate, fillWithZero, getWeekDayList } from "./utils";
import Days from "./days";
import { StyleGeneratorParams, CustomStyles } from "./days/type";
import { ExtraInfo, CalendarMark, IState } from "./type";
import "./index.scss";

export interface IProps {
  /** 额外信息 */
  extraInfo?: ExtraInfo[];
  /** 要标记的日期列表 YYYY-MM-DD */
  marks?: CalendarMark[];
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
  /** 自定义样式生成器 */
  customStyleGenerator?: (dateInfo: StyleGeneratorParams) => CustomStyles | {};
  /** 头部整体样式 */
  headStyle?: CSSProperties;
  /** 头部单元格样式 */
  headCellStyle?: CSSProperties;
  /** body整体样式 */
  bodyStyle?: CSSProperties;
  /** 左箭头样式 */
  leftArrowStyle?: CSSProperties;
  /** 右箭头样式 */
  rightArrowStyle?: CSSProperties;
  /** 日期选择器样式 */
  datePickerStyle?: CSSProperties;
  /** 日期选择器&左右箭头 所在容器样式 */
  pickerRowStyle?: CSSProperties;
  /** 视图 月/周 */
  view: "month" | "week";
  /** 日期选择器文本生成器 */
  pickerTextGenerator?: (currentView: Date) => string;
  /** 父组件通过ref可以调用内部方法 */
  bindRef?: (ref: CustomCalendar) => any;
  /** 指定周几为一行的起点，0为周日*/
  startDay?: number;
}

class CustomCalendar extends Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    isVertical: false,
    marks: [],
    selectedDate: formatDate(new Date(), "day"),
    selectedDateColor: "#90b1ef",
    hideArrow: false,
    isSwiper: true,
    minDate: "1970-01-01",
    maxDate: "2100-12-31",
    showDivider: false,
    isMultiSelect: false,
    view: "month",
    currentView: formatDate(new Date()),
    startDay: 0,
    extraInfo: [],
  };
  state: IState = {
    current: formatDate(new Date(this.props.currentView as string)),
    selectedDate: this.props.selectedDate as string,
    currentCarouselIndex: 1,
    selectedRange: { start: "", end: "" },
  };
  componentWillMount() {
    if (this.props.bindRef) {
      this.props.bindRef(this);
    }
  }
  componentWillReceiveProps(nextProps: Readonly<IProps>): void {
    if (
      nextProps.selectedDate &&
      nextProps.selectedDate !== this.props.selectedDate
    ) {
      this.setState({
        selectedDate: nextProps.selectedDate,
        current: nextProps.selectedDate,
      });
    }
    if (
      nextProps.currentView &&
      nextProps.currentView !== this.props.currentView
    ) {
      this.setState({ current: nextProps.currentView });
    }
  }
  getPickerText = () => {
    let { view, startDay } = this.props;
    startDay = startDay as number;
    const { current } = this.state;
    const currentDateObj = new Date(current);
    const monthStr = formatDate(currentDateObj, "month");

    if (view === "week") {
      currentDateObj.setDate(
        currentDateObj.getDate() -
          (currentDateObj.getDay() >= startDay
            ? currentDateObj.getDay() - startDay
            : 6 - startDay + currentDateObj.getDay())
      );
      const weekStart = currentDateObj.getDate();
      const weekStartMonth = currentDateObj.getMonth() + 1;
      const weekStartYear = currentDateObj.getFullYear();
      currentDateObj.setDate(currentDateObj.getDate() + 6);
      const weekEnd = currentDateObj.getDate();
      const weekEndMonth = currentDateObj.getMonth() + 1;
      const weekEndYear = currentDateObj.getFullYear();
      let weekEndStr = `${fillWithZero(weekEnd, 2)}`;
      if (weekEndMonth !== weekStartMonth) {
        weekEndStr = `${fillWithZero(weekEndMonth, 2)}-${weekEndStr}`;
      }
      if (weekEndYear !== weekStartYear) {
        weekEndStr = `${weekEndYear}-${weekEndStr}`;
      }
      return `${monthStr}-${fillWithZero(weekStart, 2)}~${weekEndStr}`;
    }
    if (view === "month") {
      return monthStr;
    }
  };
  onClickDate = (value) => {
    const { onDayClick, onSelectDate } = this.props;
    let { current, currentCarouselIndex, selectedRange } = this.state;
    if (!selectedRange.start || selectedRange.end) {
      selectedRange = { start: value.fullDateStr, end: "" };
    } else {
      if (new Date(selectedRange.start) > new Date(value.fullDateStr)) {
        selectedRange = {
          start: value.fullDateStr,
          end: selectedRange.start,
        };
      } else {
        selectedRange.end = value.fullDateStr;
      }
    }

    if (!value.currentMonth) {
      // 点到非本月的日期就跳转到相应月份
      const { onCurrentViewChange, onClickNext, onClickPre } = this.props;
      let dateObj = new Date(value.fullDateStr);
      if (dateObj.getMonth() > new Date(current).getMonth()) {
        currentCarouselIndex = (currentCarouselIndex + 1) % 3;
        if (onClickNext) onClickNext();
      } else {
        currentCarouselIndex = (currentCarouselIndex + 2) % 3;
        if (onClickPre) onClickPre();
      }
      if (onCurrentViewChange) onCurrentViewChange(value.fullDateStr);

      current = formatDate(dateObj);
    }
    this.setState({
      selectedDate: value.fullDateStr,
      selectedRange,
      currentCarouselIndex,
      current,
    });
    if (onDayClick) {
      onDayClick({ value: value.fullDateStr });
    }
    if (onSelectDate) {
      onSelectDate(selectedRange);
    }
  };

  goNext = () => {
    const { view } = this.props;
    const { currentCarouselIndex, current } = this.state;
    let dateObj = new Date(current);
    const { onClickNext, onCurrentViewChange } = this.props;
    let currentDate = "";
    if (view === "month") {
      dateObj.setMonth(dateObj.getMonth() + 1);
      const nextMonth = formatDate(dateObj);
      currentDate = nextMonth;
    }
    if (view === "week") {
      dateObj.setDate(dateObj.getDate() + 7);
      const nextWeek = formatDate(dateObj, "day");
      currentDate = nextWeek;
    }
    if (onClickNext) onClickNext();
    if (onCurrentViewChange) onCurrentViewChange(currentDate);
    this.setState({
      currentCarouselIndex: (currentCarouselIndex + 1) % 3,
      current: currentDate,
    });
  };

  goPre = () => {
    const { view } = this.props;
    const { currentCarouselIndex, current } = this.state;
    let dateObj = new Date(current);
    let currentDate = "";
    if (view === "month") {
      dateObj.setMonth(dateObj.getMonth() - 1);
      currentDate = formatDate(dateObj);
    }
    if (view === "week") {
      dateObj.setDate(dateObj.getDate() - 7);
      currentDate = formatDate(dateObj, "day");
    }
    const { onClickPre, onCurrentViewChange } = this.props;
    if (onClickPre) onClickPre();
    if (onCurrentViewChange) onCurrentViewChange(currentDate);
    this.setState({
      currentCarouselIndex: (currentCarouselIndex + 2) % 3,
      current: currentDate,
    });
  };

  render() {
    const { current, selectedDate, currentCarouselIndex, selectedRange } =
      this.state;
    let {
      marks,
      isVertical,
      selectedDateColor,
      hideArrow,
      isSwiper,
      minDate,
      maxDate,
      onDayLongPress,
      showDivider,
      isMultiSelect,
      customStyleGenerator,
      headStyle,
      headCellStyle,
      bodyStyle,
      leftArrowStyle,
      rightArrowStyle,
      datePickerStyle,
      pickerRowStyle,
      view,
      pickerTextGenerator,
      hideController,
      onCurrentViewChange,
      startDay,
      extraInfo,
    } = this.props;
    startDay = startDay as number;
    const currentDate = new Date(current);
    const preDate = new Date(current);
    const nextDate = new Date(current);

    if (view === "month") {
      preDate.setMonth(currentDate.getMonth() - 1);
      nextDate.setMonth(currentDate.getMonth() + 1);
    }
    if (view === "week") {
      preDate.setDate(currentDate.getDate() - 7);
      nextDate.setDate(currentDate.getDate() + 7);
    }
    const preIndex = (currentCarouselIndex + 2) % 3;
    const nextIndex = (currentCarouselIndex + 1) % 3;
    let monthObj: Array<Date> = [];
    monthObj[currentCarouselIndex] = currentDate;
    monthObj[preIndex] = preDate;
    monthObj[nextIndex] = nextDate;
    // 所有Days组件的公共Props
    extraInfo = extraInfo as ExtraInfo[] | [];
    marks = marks as CalendarMark[] | [];
    minDate = minDate as string;
    maxDate = maxDate as string;
    showDivider = showDivider as boolean;
    isMultiSelect = isMultiSelect as boolean;
    view = view as "month" | "week";
    const publicDaysProp = {
      marks,
      onClick: this.onClickDate,
      selectedDate,
      minDate,
      maxDate,
      selectedDateColor,
      onDayLongPress,
      showDivider,
      isMultiSelect,
      selectedRange,
      customStyleGenerator,
      view,
      startDay: startDay as number,
      extraInfo,
    };

    return (
      <View className='custom-calendar'>
        {!hideController && (
          <View
            className='calendar-picker'
            style={{
              ...pickerRowStyle,
            }}
          >
            {!hideArrow && (
              <View
                style={leftArrowStyle}
                className='calendar-arrow-left'
                onClick={this.goPre}
              />
            )}
            <Picker
              style={{
                display: "inline-block",
                lineHeight: "25px",
                ...datePickerStyle,
              }}
              mode='date'
              onChange={(e) => {
                const nowDate = formatDate(new Date(e.detail.value));
                this.setState({ current: nowDate });
                onCurrentViewChange && onCurrentViewChange(nowDate);
              }}
              value={current}
              fields='month'
              start={minDate}
              end={maxDate}
            >
              {pickerTextGenerator
                ? pickerTextGenerator(new Date(current))
                : this.getPickerText()}
            </Picker>
            {!hideArrow && (
              <View
                style={rightArrowStyle}
                className='calendar-arrow-right'
                onClick={this.goNext}
              />
            )}
          </View>
        )}

        <View className='calendar-head' style={headStyle}>
          {getWeekDayList(startDay).map((value) => (
            <View style={headCellStyle} key={value}>
              {value}
            </View>
          ))}
        </View>
        {isSwiper ? (
          <Swiper
            style={{
              height: view === "month" ? "19rem" : "3rem",
              ...bodyStyle,
            }}
            vertical={isVertical}
            circular
            current={currentCarouselIndex}
            onChange={(e) => {
              if (e.detail.source === "touch") {
                const currentIndex = e.detail.current;
                (currentCarouselIndex + 1) % 3 === currentIndex
                  ? this.goNext()
                  : this.goPre();
              }
            }}
            className='calendar-swiper'
          >
            <SwiperItem style='position: absolute; width: 100%; height: 100%;'>
              <Days date={monthObj[0]} {...publicDaysProp} />
            </SwiperItem>
            <SwiperItem style='position: absolute; width: 100%; height: 100%;'>
              <Days date={monthObj[1]} {...publicDaysProp} />
            </SwiperItem>
            <SwiperItem style='position: absolute; width: 100%; height: 100%;'>
              <Days date={monthObj[2]} {...publicDaysProp} />
            </SwiperItem>
          </Swiper>
        ) : (
          <Days bodyStyle={bodyStyle} date={currentDate} {...publicDaysProp} />
        )}
      </View>
    );
  }
}

export default CustomCalendar;
