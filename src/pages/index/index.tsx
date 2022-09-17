import React, { PropsWithChildren, FC, useRef, MutableRefObject, useState } from "react";
import { Button, View } from "@tarojs/components";
import CustCalendar from "src/component/Calendar";
import { CustCalendarInstance } from "src/component/Calendar/type";
import "./index.less";

const Index: FC<PropsWithChildren> = () => {
  const custCalendarInstance = useRef() as MutableRefObject<CustCalendarInstance>;

  const [type, setType] = useState<'week' | 'month'>('week')

  // 修改视图类型
  const viewHandle = () => {
    setType(type === 'week' ? 'month' : 'week')
  }

  const goPre = () => {
    console.log("上个月");
    custCalendarInstance.current.goPre();
  };
  const goNext = () => {
    console.log("下个月");
    custCalendarInstance.current.goNext();
  };

  const unit = type === 'week'?'周': '月'
  return (
    <View className='index'>
      <CustCalendar view={type} ref={custCalendarInstance} />
      <View className='control-btn'>
        <Button onClick={goPre}>上一{unit}</Button>
        <Button onClick={goNext}>下一{unit}</Button>
        <Button onClick={viewHandle}>切换周和月</Button>
      </View>
    </View>
  );
};

export default Index;
