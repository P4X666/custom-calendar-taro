import React, { FC, useEffect, useState } from "react";
import { View } from "@tarojs/components";
import { CustomStyles } from "../days/interface_type";
import { IProps } from "./interface_type";
import StyleControl from "./styleControl";

const Day: FC<IProps> = (props) => {
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
  const [customStyles, setCustomStyles] = useState<CustomStyles>({});

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
    rangeEnd,
  ]);
  const classNameCollection = StyleControl({
    disable,
    extraInfoIndex,
    isMultiSelectAndFinish,
    markIndex,
    selected,
    showDivider,
    value,
    isInRange,
    rangeStart,
    rangeEnd,
  });
  return (
    <View
      onLongPress={
        onDayLongPress
          ? () => onDayLongPress({ value: value.fullDateStr })
          : undefined
      }
      className={classNameCollection.join(" ")}
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
                backgroundColor: selected || isInRange ? selectedDateColor : "",
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
          backgroundColor: markIndex === -1 ? "" : markColor,
          height: markIndex === -1 ? "" : markSize,
          width: markIndex === -1 ? "" : markSize,
          ...customStyles.markStyle,
        }}
      />
      {extraInfoIndex !== -1 && (
        <View
          className='calendar-extra-info'
          style={{
            color: extraInfoIndex === -1 ? "" : extraInfoColor,
            fontSize: extraInfoIndex === -1 ? "" : extraInfoSize,
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
