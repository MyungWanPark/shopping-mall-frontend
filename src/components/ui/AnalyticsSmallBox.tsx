import React from 'react';
type Props = {
    logoIcon: React.ReactNode;
    iconStyle: string;
    title: string;
    value: string;
    customStyle: string;
};

export default function AnalyticsSmallBox({ logoIcon, iconStyle, title, value, customStyle }: Props) {
    return (
        <div className={`${customStyle}`}>
            <div className="flex justify-center items-center">
                <div className={`${iconStyle} mr-1`}>{logoIcon}</div>
                <p>{title}</p>
            </div>
            <p className="mt-5 text-2xl">{value}</p>
        </div>
    );
}
