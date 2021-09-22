import React, { FunctionComponent, useRef, useState } from 'react'
import { View, Button } from '@tarojs/components'
import CustomCalendar from '../../components/Calendar'
import './index.scss'

const Index: FunctionComponent = () => {

  const [type, setType] = useState<'week' | 'month'>('week')
  // 组件节点
  const CalendarComponent: any = useRef(null);
  // 修改视图类型
  const viewHandle = () => {
    setType(type === 'week' ? 'month' : 'week')
  }
  // 设置当前的视图
  const setCurrentView = date => {
    console.log(date);
  }
  // 向前
  const goPre = () => {
    CalendarComponent.current.goPre()
  }
  // 向后
  const goNext = () => {
    CalendarComponent.current.goNext()
  }
  const customStyleGenerator = {
    extraInfoStyle: {
      position: 'absolute',
      fontSize: '0.5rem',
      right: '-0.8rem',
      top: '0'
    },
    dateStyle: {
      marginTop: '0.6rem',
      borderRadius: '30%'
    },
    markStyle: {
      top: 'auto',
      bottom: '0',
      right: '50%',
      transform: 'translateX(50%)'
    }
  };
  return (
    <View className='index'>
      <CustomCalendar
        view={type}
        marks={[
          { value: '2021-06-11', color: 'red', markSize: '9px' },
          { value: '2021-06-12', color: 'pink', markSize: '9px' },
          { value: '2021-06-13', color: 'gray', markSize: '9px' },
          { value: '2021-06-14', color: 'yellow', markSize: '9px' },
          { value: '2021-06-15', color: 'darkblue', markSize: '9px' },
          { value: '2021-06-16', color: 'pink', markSize: '9px' },
          { value: '2021-06-23', color: 'green', markSize: '9px' },
        ]}
        customStyleGenerator={() => customStyleGenerator}
        extraInfo={[
          { value: '2021-06-21', text: '生日', color: 'red' },
          { value: '2021-06-22', text: '休假', color: 'darkblue' },
          { value: '2021-06-23', text: '会议', color: 'gray' },
        ]}
        isMultiSelect
        selectedDateColor='#346fc2'
        onDayClick={item => console.log(item)}
        onDayLongPress={item => console.log(item)}
        onCurrentViewChange={setCurrentView}
        bindRef={(ref)=>{CalendarComponent.current=ref}}
      />
      <View>
        <Button onClick={viewHandle}>切换周和月</Button>
        <Button onClick={goPre}>上一页</Button>
        <Button onClick={goNext}>下一页</Button>
      </View>

    </View>
  )
}


export default Index;