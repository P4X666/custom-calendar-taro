import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from '@tarojs/components';
import {
  formatDate,
  getDateListByMonth,
  getDateListByWeek,
} from '../utils';
import Day from '../day';

const Days = ({
  date,
  onClick,
  marks,
  selectedDate,
  selectedDateColor,
  minDate,
  maxDate,
  onDayLongPress,
  showDivider,
  isMultiSelect,
  selectedRange,
  customStyleGenerator,
  bodyStyle,
  view,
  startDay,
  extraInfo,
}) => {
  const [days, setDays] = useState([]);
  const prevDateRef = useRef(null);
  const prevViewRef = useRef(null);
  const _onDayClick = useCallback(
    (value) => {
      onClick && onClick(value);
    },
    [onClick]
  );

  const _onDayLongPress = useCallback(
    (args) => {
      onDayLongPress && onDayLongPress(args);
    },
    [onDayLongPress]
  );

  useEffect(() => {
    //view和startDay基本不会变，就date会经常变化
    //由于传递的是date对象，需要判断date对象的值是否变化，防止因为days变化导致的重复刷新
    if (
      !prevDateRef.current ||
      formatDate(prevDateRef.current) !== formatDate(date) ||
      prevViewRef.current !== view
    ) {
      const dateObj = date ? new Date(date) : new Date();
      let tempDays = [];
      if (view === 'month') {
        tempDays = getDateListByMonth(dateObj, startDay);
      }
      if (view === 'week') {
        tempDays = getDateListByWeek(dateObj, startDay);
      }
      setDays(tempDays);
    }

    prevDateRef.current = date;

    prevViewRef.current = view;
  }, [view, date, startDay]);

  const maxDateObj = new Date(maxDate);
  const markDateList = marks.map((value) => value.value);
  const extraInfoDateList = extraInfo.map((value) => value.value);
  let endDateStr = selectedRange ? selectedRange.end : '';
  const startDateObj = new Date(selectedRange ? selectedRange.start : '');
  const endDateObj = new Date(endDateStr);
  const minDateObj = new Date(minDate);
  return (
    <View className='calendar-body' style={bodyStyle}>
      {days.map((value) => {
        const markIndex = markDateList.indexOf(value.fullDateStr);
        const extraInfoIndex = extraInfoDateList.indexOf(value.fullDateStr);
        let isInRange = false;
        let rangeStart = false;
        let rangeEnd = false;
        if (isMultiSelect && endDateStr) {
          // 范围选择模式
          const valueDateTimestamp = new Date(value.fullDateStr).getTime();
          if (
            valueDateTimestamp >= startDateObj.getTime() &&
            valueDateTimestamp <= endDateObj.getTime()
          ) {
            // 被选择（范围选择）
            isInRange = true;
            if (valueDateTimestamp === startDateObj.getTime()) {
              // 范围起点
              rangeStart = true;
            }
            if (valueDateTimestamp === endDateObj.getTime()) {
              // 范围终点
              rangeEnd = true;
            }
          }
        }
        let disable =
          new Date(value.fullDateStr).getTime() < minDateObj.getTime() ||
          (maxDate &&
            new Date(value.fullDateStr).getTime() > maxDateObj.getTime()) ||
          false;
        return (
          <Day
            key={value.fullDateStr}
            onDayLongPress={_onDayLongPress}
            selected={selectedDate === value.fullDateStr}
            isMultiSelectAndFinish={
              isMultiSelect && (selectedRange.end || '') != ''
            }
            markIndex={markIndex}
            extraInfoIndex={extraInfoIndex}
            showDivider={showDivider}
            minDate={minDate}
            value={value}
            onClick={_onDayClick}
            selectedDateColor={selectedDateColor}
            markColor={markIndex === -1 ? '' : marks[markIndex].color}
            markSize={markIndex === -1 ? '' : marks[markIndex].markSize}
            extraInfoColor={
              extraInfoIndex === -1 ? '' : extraInfo[extraInfoIndex].color
            }
            extraInfoSize={
              extraInfoIndex === -1 ? '' : extraInfo[extraInfoIndex].fontSize
            }
            extraInfoText={
              extraInfoIndex === -1 ? '' : extraInfo[extraInfoIndex].text
            }
            customStyleGenerator={customStyleGenerator}
            isInRange={isInRange}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            disable={disable}
          />
        );
      })}
    </View>
  );
};

export default React.memo(Days);
