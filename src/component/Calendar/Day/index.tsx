import { View } from '@tarojs/components';
import React, { FC } from 'react';
import { DayProps } from '../type';
import './index.less';

const Day: FC<DayProps> = props => {
  const {
    dateFormate,
    year,
    month,
    day,
    weekDay,
    disabled,
    notCurMonth = false,
    selected,
    hasMarker,
    selectedDateColor,
    isToday,
    onDayLongPress,
    onDayClick,
    custDayRender,
    extraInfo
  } = props;

  let dayClass = '';

  if (isToday) {
    dayClass += ' day-today';
  }
  if (selected) {
    dayClass += ' day-selected';
  }
  /** 日期被禁用的样式 */
  if (disabled) {
    dayClass += ' day-disabled';
  }
  /** 非本月的日期的样式 */
  if (notCurMonth) {
    dayClass += ' day-not-cur-month';
  }

  const _onLongPress = () => {
    if (!disabled) {
      onDayLongPress?.({ year, month, day, weekDay }, dateFormate);
    }
  };
  const _onClick = () => {
    if (!disabled) {
      onDayClick?.({ year, month, day, weekDay }, dateFormate);
    }
  };
  console.log(custDayRender, 'custDayRendercustDayRender');
  
  return (
    <View onLongPress={_onLongPress} onClick={_onClick} className='day-wrapper'>
      {!custDayRender ? (
        <View
          className={dayClass}
          style={selected ? `backgroundColor: ${selectedDateColor}`: ''}
        >
          <View className='day-content'>
            {hasMarker && <View className='day-marker'></View>}
            <View>
              {/* 日期 */}
              {day}
            </View>
          </View>
          <View
            className='day-extrainfo'
            style={extraInfo?.color ? `color: ${extraInfo.color}` : ``}
          >
            {extraInfo?.text}
          </View>
        </View>
      ) : (
        custDayRender(props)
      )}
    </View>
  );
};

const areEquals = (preProps: DayProps, nextProps: DayProps) => {
  if (
    preProps.dateFormate === nextProps.dateFormate &&
    preProps.disabled === nextProps.disabled &&
    preProps.selected === nextProps.selected &&
    preProps.hasMarker === nextProps.hasMarker &&
    preProps.notCurMonth === nextProps.notCurMonth
  ) {
    return true;
  }
  return false;
};

export default React.memo(Day, areEquals);
