import { renderHook } from '@testing-library/react-hooks';
import useStyleControl from "../hooks";
import { StyleControlProps } from "../interface_type";

test("test styleControl output", () => {
  const testProps: StyleControlProps = {
    selected: true,
    value: { date: 12, currentMonth: true, fullDateStr: "2021-06-12" },
    markIndex: -1,
    extraInfoIndex: -1,
    disable: false,
    isInRange: false,
    rangeStart: false,
    rangeEnd: false,
    isMultiSelectAndFinish: false,
    showDivider: false,
  };

  const classNames = renderHook(() => useStyleControl(testProps))
  
  
  console.log(classNames);
  
  expect(classNames.includes("calendar-day")).toBeTruthy();
});
