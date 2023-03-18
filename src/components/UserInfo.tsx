// import { User } from 'firebase/auth';
import React from 'react';
import { User } from '../types/user';

type Props = {
    user: User;
};

export default function UserInfo({ user }: Props) {
    return (
        <div className="flex items-center shrink-0">
            <span className="md:block">{user.name}</span>
        </div>
    );
}
