import React from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateRangePicker() {
    const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
    const [endDate, setEndDate] = React.useState<Dayjs | null>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(`${startDate} ~ ${endDate} 기간의 데이터를 조회합니다.`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => {
                        setStartDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => {
                        setEndDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <button>조회하기</button>
        </form>
    );
}
