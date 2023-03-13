import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type Props = {
    setPeriod: React.Dispatch<React.SetStateAction<Date[] | undefined>>;
};

export default function DateRangePicker({ setPeriod }: Props) {
    const [startDate, setStartDate] = React.useState<Date>();
    const [endDate, setEndDate] = React.useState<Date>();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(`${JSON.stringify(startDate)} ~ ${endDate} 기간의 데이터를 조회합니다.`);
        setPeriod([startDate!, endDate!]);
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
                    minDate={dayjs(new Date('2023-03-07'))}
                    maxDate={dayjs(new Date())}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => {
                        setEndDate(dayjs(newValue).toDate());
                    }}
                    minDate={dayjs(new Date('2023-03-07'))}
                    maxDate={dayjs(new Date())}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <button>조회하기</button>
        </form>
    );
}
