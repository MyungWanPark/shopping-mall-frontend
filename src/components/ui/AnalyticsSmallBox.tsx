import React from 'react';
type Props = {
    logoIcon: React.ReactNode;
    title: string;
    value: string;
    color: string;
};

export default function AnalyticsSmallBox({ logoIcon, title, value, color }: Props) {
    return (
        <div className={color}>
            {logoIcon}
            <p>{title}</p>
            <p>{value}</p>
        </div>
    );
}
