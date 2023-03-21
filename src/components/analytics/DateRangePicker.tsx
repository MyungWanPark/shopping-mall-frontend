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
import Button from '../ui/Button';
import { ANALYTICS_BOX_CLASS_NAME } from './../../pages/analytics/Analytics';

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

    if (allUserInfos && allUserInfos.length > 0) {
        dateRange = {
            min: allUserInfos![0].createdAt!,
            max: new Date(),
        };
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setPeriod(getPeriodTime(startDate!, endDate!));
    }

    return (
        <form onSubmit={handleSubmit} className="flex datePickers">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                <div className={`${ANALYTICS_BOX_CLASS_NAME} basis-2/6 md:basis-2/5`}>
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
                </div>
                <div className={`mx-2 ${ANALYTICS_BOX_CLASS_NAME} basis-2/6 md:basis-2/5`}>
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
                </div>
            </LocalizationProvider>
            <Button text="조회하기" customCss="rounded-xl shadow-sm bg-brand basis-2/6 md:basis-2/5" />
        </form>
    );
}
