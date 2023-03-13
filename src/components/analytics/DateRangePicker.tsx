import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Period } from '../../types/analytics';
import { getPeriodTime } from './../../utils/analytics/time';

type Props = {
    setPeriod: React.Dispatch<React.SetStateAction<Period>>;
    dateRange: {
        min: Date;
        max: Date;
    };
};

export default function DateRangePicker({ setPeriod, dateRange }: Props) {
    const [startDate, setStartDate] = React.useState<Date>(new Date());
    const [endDate, setEndDate] = React.useState<Date>(new Date());

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(`${JSON.stringify(startDate)} ~ ${endDate} 기간의 데이터를 조회합니다.`);
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
                    minDate={dayjs(dateRange.min)}
                    maxDate={dayjs(dateRange.max)}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => {
                        setEndDate(dayjs(newValue).toDate());
                    }}
                    minDate={dayjs(startDate)}
                    maxDate={dayjs(dateRange.max)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <button>조회하기</button>
        </form>
    );
}
