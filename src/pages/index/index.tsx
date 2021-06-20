import React, { FunctionComponent,useRef, useState } from 'react'
import { View, Button } from '@tarojs/components'
import CustomCalendar from '../../components/calendar'
import './index.scss'

const Index: FunctionComponent = () => {

  const [type, setType] = useState<'week'|'month'>('week')
  // 组件节点
  const CalendarComponent:any = useRef(null);
  // 修改视图类型
  const viewHandle = ()=>{
    setType(type==='week'?'month':'week')
  }
  // 设置选中的日期
  const setSelectDay = date => {
    console.log(date);
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
            { value: '2021-06-17', color: 'green', markSize: '9px' },
          ]}
          // customStyleGenerator={(params) => {
          //   console.log(params);

          //   return {
          //     markStyle: {},
          //   };
          // }}
          extraInfo={[
            { value: '2021-06-21', text: '生日', color: 'red' },
            { value: '2021-06-22', text: '休假', color: 'darkblue' },
            { value: '2021-06-23', text: '会议', color: 'gray' },
          ]}
          bindRef={(ref) => (CalendarComponent.current
            = ref)}

          onCurrentViewChange={setCurrentView}
          // selectedDate={`${date.year}-${date.month}-${date.day}`}
          onDayClick={(item) => setSelectDay(item.value)}
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