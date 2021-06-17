import { useEffect,useState } from "react";
import { formatDate } from "../../utils";
import { StyleControlProps } from '../interface_type';

const useStyleControl = (props:StyleControlProps):Array<string> => {
    const {
        selected,
        value,
        markIndex,
        extraInfoIndex,
        disable,
        isInRange,
        rangeStart,
        rangeEnd,
        isMultiSelectAndFinish,
        showDivider,
    } = props;
    const [className, setClassName] = useState<Array<string>>(["calendar-day"]);
    useEffect(() => {
        let set: Array<string> = ["calendar-day"];
        const today = formatDate(new Date(), "day");

        if (!value.currentMonth || disable) {
            // 非本月
            set.push("not-this-month");
        }
        if (selected && !isMultiSelectAndFinish) {
            // 选中
            // 范围选择模式显示已选范围时，不显示selected
            set.push("calendar-selected");
        }
        if (markIndex !== -1) {
            // 标记
            set.push("calendar-marked");
        }
        if (extraInfoIndex !== -1) {
            // 额外信息
            set.push("calendar-extra-info");
        }
        if (value.fullDateStr === today) {
            // 当天
            set.push("calendar-today");
        }
        if (showDivider) {
            // 分割线
            set.push("calendar-line-divider");
        }

        if (isInRange) {
            set.push("calendar-range");
        }

        if (rangeStart) {
            set.push("calendar-range-start");
        }

        if (rangeEnd) {
            set.push("calendar-range-end");
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
    return className
}

export default useStyleControl;