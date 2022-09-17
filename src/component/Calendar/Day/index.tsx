import { View } from "@tarojs/components";
import React, { FC } from "react";
import { DayProps } from "../type";
import "./index.less";

const Day: FC<DayProps> = props => {
  const {
    year,
    month,
    day,
    weekDay,
    selected,
    disabled,
    notCurMonth = false,
    onDayLongPress,
    onDayClick
  } = props;

  let dayClass = "day-wrapper";
  if (selected) {
    dayClass += " day-selected";
  }
  if (disabled) {
    dayClass += " day-disabled";
  }
  if (notCurMonth) {
    dayClass += " day-not-cur-month";
  }
  const _onLongPress = () => {
    onDayLongPress?.({ year, month, day, weekDay });
  };
  const _onClick = () => {
    if (!disabled) {
      onDayClick?.({ year, month, day, weekDay });
    }
  };
  return (
    <View className={dayClass} onLongPress={_onLongPress} onClick={_onClick}>
      <View className='day-content'>
        {/* marker */}
        <View>
          {/* 日期 */}
          {day}
        </View>
      </View>
    </View>
  );
};
export default Day;
