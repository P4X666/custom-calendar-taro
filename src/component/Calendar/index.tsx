import { Picker, View } from "@tarojs/components";
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from "react";
import { CustCalendarInstance, CustCalendarProps, DayType } from "./type";
import { fillWithZero, getCurrentDayDetail, getMonthDays, getCurMonthViewDetail, getCurWeekViewDetail, getWeekDayList, getWeekDays, textFormat } from "./utils";
import "./index.less";
import CalendarBody from "./CalendarBody";

const CustCalendar = forwardRef<CustCalendarInstance,CustCalendarProps>((props, ref) => {
  /** 绑在实例上的方法，外界可直接使用 */
  useImperativeHandle(
      ref,
      (): CustCalendarInstance => {
        return {
          goNext,
          goPre
        };
      }
    );
  const {
    view = 'month',
    isVertical = false,
    startWeekDay = 1,
    hideController = false,
    hideArrow = false,
    pickerTextGenerator,
    controllerCustClassName,
    bodyStyle
  } = props;
  /** 当前锁定的 SwiperItem */
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(1);
  /** 当天的数据 */
  const currentDayDetail = getCurrentDayDetail();
  console.log(currentDayDetail, 'currentDayDetail');
  
  /** 当前页展示的月份 */
  const [dayViewDetail, setDayViewDetail] = useState(currentDayDetail);

  const goNext = () => {
    const nextViewDetail = view === "month"
      ? getCurMonthViewDetail(dayViewDetail.year, dayViewDetail.month+1)
      : getCurWeekViewDetail(dayViewDetail.year, dayViewDetail.month, dayViewDetail.day + 7);

    const dayView = { ...dayViewDetail, ...nextViewDetail };
    setDayViewDetail(dayView);
    setCurrentCarouselIndex((currentCarouselIndex + 1) % 3);
  };
  const goPre = () => {
    const preViewDetail = view === "month"
      ? getCurMonthViewDetail(dayViewDetail.year, dayViewDetail.month - 1)
      : getCurWeekViewDetail(dayViewDetail.year, dayViewDetail.month, dayViewDetail.day - 7);
    const dayView = { ...dayViewDetail, ...preViewDetail };
    setDayViewDetail(dayView);
    setCurrentCarouselIndex((currentCarouselIndex + 2) % 3)
  };
  const onSwiperChange = (e: any) => {
    if (e.detail.source === 'touch') {
      const currentIndex = e.detail.current;
      (currentCarouselIndex + 1) % 3 === currentIndex ? goNext() : goPre();
    }
  };

  /** 日历滑块中的数据 */
  const daysArr: DayType[][] = useMemo(() => {
    const curMonthDays: DayType[] =
      view === 'month'
        ? getMonthDays(dayViewDetail.year, dayViewDetail.month, startWeekDay)
        : getWeekDays(
            dayViewDetail.year,
            dayViewDetail.month,
            dayViewDetail.day,
            startWeekDay
        );
    
    return [curMonthDays, curMonthDays, curMonthDays];
  }, [
    dayViewDetail.year,
    dayViewDetail.month,
    dayViewDetail.day,
    startWeekDay,
    view
  ]);

  console.log(daysArr, 'render -------------------------------->');
  
  const weekList = useMemo(() => getWeekDayList(startWeekDay), [startWeekDay])
  
  const onDayClick = useCallback((e) => {
    console.log(e, 'click ---------->');
  }, [])
  const onPickerChange = (e) => {
    console.log(e);
  }
  const getCurrentMonth = () => {
    return `${dayViewDetail.year}-${fillWithZero(dayViewDetail.month)}`
  }

  const getPickerText = () => {
    if (view === 'month') return getCurrentMonth();
    const startDay = daysArr[0][0];
    const endDay = daysArr[0][daysArr[0].length - 1];
    return textFormat(startDay) + '~' + textFormat(endDay);
  }

  const bodyProps = {
    isVertical,
    currentCarouselIndex,
    onSwiperChange,
    view,
    bodyStyle,
    daysArr,
    dayViewDetail,
    onDayClick
  };

  return (
    <View className='cust-calendar'>
      {!hideController && (
        <View className={`calendar-picker ${controllerCustClassName}`}>
          {!hideArrow && (
            <View className='calendar-arrow-wrap'>
              <View
                className='calendar-arrow calendar-arrow-left'
                onClick={goPre}
              />
            </View>
          )}
          <Picker
            mode='date'
            onChange={onPickerChange}
            value={getCurrentMonth()}
            fields='month'
            // TODO: 增加 picker及日历 的开始及结束日期限制
            // start={minDate}
            // end={maxDate}
          >
            {pickerTextGenerator
              ? pickerTextGenerator(new Date(getCurrentMonth()))
              : getPickerText()}
          </Picker>
          {!hideArrow && (
            <View className='calendar-arrow-wrap'>
              <View
                className='calendar-arrow calendar-arrow-right'
                onClick={goNext}
              />
            </View>
          )}
        </View>
      )}
      <View className='week-desc'>
        {weekList.map(item => {
          return (
            <View key={item} className='week-desc-item'>
              {item}
            </View>
          );
        })}
      </View>
      <CalendarBody {...bodyProps} />
    </View>
  );
});

export default CustCalendar;
