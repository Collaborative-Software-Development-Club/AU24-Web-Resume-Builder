import {useEffect, useState} from 'react';
import getUserData from '@/services/getUserData';

export default function useUserData(userId, USE_API) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const getData = async () => {
            const userData = await getUserData(userId, {useApi: USE_API});
            console.log(userData);
            setUser(userData);
        };
        getData();
    });
    return user;
}
