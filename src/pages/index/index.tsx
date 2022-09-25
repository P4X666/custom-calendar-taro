import React, {
  PropsWithChildren,
  FC,
  useRef,
  MutableRefObject,
  useState
} from 'react';
import { Button, View } from '@tarojs/components';
// import CustCalendar from "custom-calendar-taro";
import CustCalendar from 'src/component/Calendar';
import 'custom-calendar-taro/dist/index.css';
import './index.less';

const Index: FC<PropsWithChildren> = () => {
  const custCalendarInstance = useRef() as MutableRefObject<any>;

  const [type, setType] = useState<'week' | 'month'>('month');

  // 修改视图类型
  const viewHandle = () => {
    setType(type === 'week' ? 'month' : 'week');
  };

  const goPre = () => {
    console.log('上个月');
    custCalendarInstance.current.goPre();
  };
  const goNext = () => {
    console.log('下个月');
    custCalendarInstance.current.goNext();
  };

  const unit = type === 'week' ? '周' : '月';
  return (
    <View className='index'>
      <CustCalendar
        view={type}
        ref={custCalendarInstance}
        currentView='2022-08-24'
        selectedDate='2022-09-24'
        marks={[
          { value: '2022-09-21', color: 'red' },
          { value: '2022-09-22', color: 'pink' },
          { value: '2022-09-23', color: 'gray' },
          { value: '2022-09-24', color: 'yellow' },
          { value: '2022-09-25', color: 'darkblue' },
          { value: '2022-09-26', color: 'pink' },
          { value: '2022-09-27', color: 'green' }
        ]}
        extraInfo={[
        { value: "2021-06-21", text: "生日", color: "red" },
        { value: "2021-06-22", text: "休假", color: "darkblue" },
        { value: "2021-06-23", text: "会议", color: "gray" },
      ]}
      />
      <View className='control-btn'>
        <Button onClick={goPre}>上一{unit}</Button>
        <Button onClick={goNext}>下一{unit}</Button>
        <Button onClick={viewHandle}>切换周和月</Button>
      </View>
    </View>
  );
};

export default Index;
