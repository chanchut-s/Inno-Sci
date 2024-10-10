'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface DateRangeSearchProps {
  startDate: string;
  endDate: string;
}

const DateRangeSearch: React.FC<DateRangeSearchProps> = ({ startDate, endDate }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      newParams.set(e.target.name, e.target.value);
    } else {
      newParams.delete(e.target.name);
    }
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      <div className='flex flex-col md:flex-row md:gap-2'>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">ตั้งแต่วันที่</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={handleDateChange}
          className="mt-1 block w-full border-[1px] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div  className='flex flex-col md:flex-row md:gap-2'>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">ถึงวันที่</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={endDate}
          onChange={handleDateChange}
          className="mt-1 block w-full border-[1px] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
    </div>
  );
};


export default DateRangeSearch;