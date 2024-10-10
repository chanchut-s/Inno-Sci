'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useTransition } from 'react';

function LocaleSwitcher() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();  // ดึง searchParams
    const localAcitve = useLocale();

    const onSelectChange = (nextLocale: string) => {
        // ลบ locale จาก path ปัจจุบัน เช่น /en หรือ /th
        const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');

        // แปลง searchParams กลับเป็น query string เช่น ?page=2
        const queryString = searchParams.toString();
        const fullPath = queryString ? `/${nextLocale}${pathWithoutLocale}?${queryString}` : `/${nextLocale}${pathWithoutLocale}`;

        // ใช้ router.replace() เพื่อเปลี่ยน locale โดยคง URL และ query parameters
        startTransition(() => {
            router.replace(fullPath);
        });
    };

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn">
                {localAcitve.toUpperCase()}
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 mt-5 shadow">
                <li>
                    <a onClick={() => onSelectChange('th')} className={isPending ? 'disabled' : ''}>TH</a>
                </li>
                <li>
                    <a onClick={() => onSelectChange('en')} className={isPending ? 'disabled' : ''}>EN</a>
                </li>
            </ul>
        </div>
    );
}

export default LocaleSwitcher;
