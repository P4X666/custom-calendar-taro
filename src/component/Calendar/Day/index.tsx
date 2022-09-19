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
    onDayClick,
    custDayRender
  } = props;

  let dayClass = "day-wrapper";
  /** 日期被选中的样式 */
  if (selected) {
    dayClass += " day-selected";
  }
  /** 日期被禁用的样式 */
  if (disabled) {
    dayClass += " day-disabled";
  }
  /** 非本月的日期的样式 */
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
  if (custDayRender) {
    return custDayRender(props);
  }
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
