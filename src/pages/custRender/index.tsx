import React, {
  PropsWithChildren,
  FC,
  useRef,
  MutableRefObject,
  useState
} from 'react';
import { Button, View } from '@tarojs/components';
import { CustCalendarInstance, DayProps } from 'custom-calendar-taro';
import CustCalendar from 'src/component/Calendar';
// import 'custom-calendar-taro/dist/index.css';
import styles from './index.module.less';

const CustRender: FC<PropsWithChildren> = () => {
  const custCalendarInstance = useRef() as MutableRefObject<
    CustCalendarInstance
  >;

  const [type, setType] = useState<'week' | 'month'>('week');

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

  const custWeekRender = (weekItem: string) => {
    return (
      <View style={['六', '日'].includes(weekItem) ? { color: 'red' } : {}}>
        {weekItem}
      </View>
    );
  };
  const custDayRender = (dayProps: DayProps) => {
    const isRest = [6, 0].includes(dayProps.weekDay);
    return (
      <>
        <View style={isRest ? { color: 'red' } : {}}>{dayProps.day}</View>
        {isRest && <View className={styles.tips}>休息</View>}
      </>
    );
  };

  const unit = type === 'week' ? '周' : '月';
  return (
    <View>
      <CustCalendar
        className={styles.cust}
        view={type}
        ref={custCalendarInstance}
        custDayRender={custDayRender}
        custWeekRender={custWeekRender}
      />
      <View className='control-btn'>
        <Button onClick={goPre}>上一{unit}</Button>
        <Button onClick={goNext}>下一{unit}</Button>
        <Button onClick={viewHandle}>切换周和月</Button>
      </View>
    </View>
  );
};

export default CustRender;
