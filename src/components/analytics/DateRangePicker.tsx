import React from 'react';
import { DateRange as Calendar, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import { useState } from 'react';
import { ko } from 'date-fns/locale';
export default function DateRangePicker() {
    const [state, setState] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection',
        },
    ]);
    // console.log(`state = ${state[0].startDate}`);
    // console.log(`state = ${state[0].endDate}`);

    return (
        <article>
            <p>
                지정하신 날짜는 시작시간: {`${changeToKoreanTimes(state[0].startDate!)}`} 종료시간:
                {`${changeToKoreanTimes(state[0].endDate!)}`} 입니다.
            </p>
            <Calendar
                // className="!hidden"
                onChange={(item) => setState([item.selection])}
                // showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={state}
                locale={ko}
                rangeColors={['#f96162']}
                direction="horizontal"
                // showDateDisplay={false}
                // showMonthAndYearPickers={false}
                // showDateDisplay={false}
            />
        </article>
    );
}

function changeToKoreanTimes(date: Date) {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}
