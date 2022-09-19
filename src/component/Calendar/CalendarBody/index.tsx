import React from "react";
import { Swiper, SwiperItem } from "@tarojs/components";
import Days from "../Days";
import { matchDate } from "../utils";

const CalendarBody = props => {
  const {
    isVertical,
    currentCarouselIndex,
    onSwiperChange,
    view,
    bodyStyle,
    daysArr,
    dayViewDetail,
    onDayClick
  } = props;
  
  return (
    <Swiper
      vertical={isVertical}
      circular
      current={currentCarouselIndex}
      onChange={onSwiperChange}
      style={{
        height: view === 'month' ? '19rem' : '3rem',
        ...bodyStyle
      }}
    >
      {daysArr.map((item, index) => {
        const publicProps = {
          view,
          dayViewDetail,
          onDayClick
        };
        return (
          <SwiperItem key={index}>
            <Days days={item} {...publicProps} />
          </SwiperItem>
        );
      })}
    </Swiper>
  );
};

const areEquals = (preProps, nextProps) => {
  if (
    preProps.isVertical === nextProps.isVertical && // 滑动方向上的展示
    preProps.currentCarouselIndex === nextProps.currentCarouselIndex && // 当前页的 index
    preProps.view === nextProps.view && // 周月展示
    matchDate(preProps.daysArr[0][0], nextProps.daysArr[0][0]) // 日期展示
  ) {
    return true;
  }
  return false;
}

export default React.memo(CalendarBody, areEquals);