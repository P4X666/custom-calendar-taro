import React, { FC, useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import {
  CustomStyles,
  StyleGeneratorParams
} from "../days/index";
import { formatDate, CalendarDateInfo, } from "../utils";

interface IProps {
  onDayLongPress?: ({value}: {value: string})=>void;
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
  maxDate?: string | undefined;
  /** 自定义样式生成器 */
  customStyleGenerator?: (dateInfo: StyleGeneratorParams) => CustomStyles;
  /** 选定时的背景色 */
  selectedDateColor?: string;
  /**
   * mark的背景色
   */
  markColor: string|undefined;
  markSize: string|undefined;
  /**
   * extraInfo的color
   */
  extraInfoColor: string|undefined;
  /**
   * extraInfo的fontSize
   */
  extraInfoSize: string|undefined;
  /**
   * extraInfo的文本
   */
  extraInfoText: string|undefined;
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

const Day:FC<IProps> = (props)=>{
  const {
    selected,
    onDayLongPress,
    onClick,
    value,
    markIndex,
    extraInfoIndex,
    customStyleGenerator,
    disable,
    isInRange,
    rangeStart,
    rangeEnd,
    isMultiSelectAndFinish,
    selectedDateColor,
    markColor,
    markSize,
    extraInfoColor,
    extraInfoSize,
    extraInfoText,
    showDivider,
  } = props;
  const [className, setClassName] = useState<Array<string>>(['calendar-day']);
  const [customStyles, setCustomStyles] = useState<CustomStyles>({});

  useEffect(() => {
    let set:Array<string> = ['calendar-day'];
    const today = formatDate(new Date(), 'day');

    if (!value.currentMonth || disable) {
      // 非本月
      set.push('not-this-month');
    }
    if (selected && !isMultiSelectAndFinish) {
      // 选中
      // 范围选择模式显示已选范围时，不显示selected
      set.push('calendar-selected');
    }
    if (markIndex !== -1) {
      // 标记
      set.push('calendar-marked');
    }
    if (extraInfoIndex !== -1) {
      // 额外信息
      set.push('calendar-extra-info');
    }
    if (value.fullDateStr === today) {
      // 当天
      set.push('calendar-today');
    }
    if (showDivider) {
      // 分割线
      set.push('calendar-line-divider');
    }

    if (isInRange) {
      set.push('calendar-range');
    }

    if (rangeStart) {
      set.push('calendar-range-start');
    }

    if (rangeEnd) {
      set.push('calendar-range-end');
    }

    setClassName(set);
  }, [
    disable,
    extraInfoIndex,
    isMultiSelectAndFinish,
    markIndex,
    selected,
    showDivider,
    value.currentMonth,
    value.fullDateStr,
    isInRange,
    rangeStart,
    rangeEnd,
  ]);

  useEffect(() => {
    if (customStyleGenerator) {
      // 用户定制样式
      const generatorParams = {
        ...value,
        selected: selected,
        multiSelect: {
          multiSelected: isInRange,
          multiSelectedStar: rangeStart,
          multiSelectedEnd: rangeEnd,
        },
        marked: markIndex !== -1,
        hasExtraInfo: extraInfoIndex !== -1,
      };
      setCustomStyles(customStyleGenerator(generatorParams));
    }
  }, [
    selected,
    value,
    markIndex,
    extraInfoIndex,
    customStyleGenerator,
    isInRange,
    rangeStart,
    rangeEnd
  ]);

  return (
    <View
      onLongPress={
        onDayLongPress
          ? () => onDayLongPress({ value: value.fullDateStr })
          : undefined
      }
      className={className.join(' ')}
      onClick={() => {
        if (!disable) {
          onClick(value);
        }
      }}
      style={customStyles.containerStyle}
    >
      <View
        className='calendar-date'
        style={
          customStyles.dateStyle || customStyles.dateStyle === {}
            ? customStyles.dateStyle
            : {
              backgroundColor: selected || isInRange ? selectedDateColor : '',
            }
        }
      >
        {/* 日期 */}
        {value.date}
      </View>

      {/* 标记 */}
      <View
        className='calendar-mark'
        style={{
          backgroundColor: markIndex === -1 ? '' : markColor,
          height: markIndex === -1 ? '' : markSize,
          width: markIndex === -1 ? '' : markSize,
          ...customStyles.markStyle,
        }}
      />
      {extraInfoIndex !== -1 && (
        <View
          className='calendar-extra-info'
          style={{
            color: extraInfoIndex === -1 ? '' : extraInfoColor,
            fontSize: extraInfoIndex === -1 ? '' : extraInfoSize,
            ...customStyles.extraInfoStyle,
          }}
        >
          {/* 额外信息 */}
          {extraInfoText}
        </View>
      )}
    </View>
  );
};

export default React.memo(Day);
