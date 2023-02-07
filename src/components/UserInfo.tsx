import { User } from 'firebase/auth';
import React from 'react';

type Props = {
    user: User;
};

export default function UserInfo({ user }: Props) {
    return (
        <div className="flex items-center">
            <img
                src={user.photoURL!}
                alt={user.displayName!}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full mr-2"
            />
            <span className="hidden md:block">
                {user.displayName!.split(' ')[0]}
            </span>
        </div>
    );
}
