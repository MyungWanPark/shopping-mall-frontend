import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Period } from '../../types/analytics';
import { getPeriodTime } from './../../utils/analytics/time';
import { User } from '../../types/user';

type Props = {
    setPeriod: React.Dispatch<React.SetStateAction<Period>>;
    dataStatus: {
        isLoading?: boolean;
        allUserInfos?: User[];
    };
};

export default function DateRangePicker({ setPeriod, dataStatus: { isLoading, allUserInfos } }: Props) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    let dateRange;
    // console.log(`allUserInfos in DateRangePicker = ${JSON.stringify(allUserInfos)}`);

    if (allUserInfos && allUserInfos.length > 0) {
        dateRange = {
            min: allUserInfos![0].createdAt!,
            max: new Date(),
        };
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // console.log(`${JSON.stringify(startDate)} ~ ${endDate} 기간의 데이터를 조회합니다.`);
        setPeriod(getPeriodTime(startDate!, endDate!));
    }

    return (
        <form onSubmit={handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => {
                        setStartDate(dayjs(newValue).toDate());
                    }}
                    minDate={dateRange ? dayjs(dateRange.min) : null}
                    maxDate={dateRange ? dayjs(dateRange.max) : null}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => {
                        setEndDate(dayjs(newValue).toDate());
                    }}
                    minDate={dayjs(startDate)}
                    maxDate={dateRange ? dayjs(dateRange.max) : null}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <button>조회하기</button>
        </form>
    );
}
