import { View } from "@tarojs/components";
import Day from "../Day";
import "./index.less";

const Days = (props) => {
  const { days, view, dayViewDetail, ...restProps } = props
  return <View className='days-wrapper'>
    
    {
      days.map(item => {
        const dayProps = item;
        if (view === 'month') {
          // 如果非本月，则用颜色标记
          if (dayViewDetail.month !== item.month) {
            dayProps.notCurMonth = true
          }
          // dayProps.disabled = item.year + item.month !== dayViewDetail.year + dayViewDetail.month
        }
        return <Day key={`${item.year} ${item.month} ${item.day}`} {...dayProps} {...restProps} />
      })
    }
  </View>
}
export default Days;