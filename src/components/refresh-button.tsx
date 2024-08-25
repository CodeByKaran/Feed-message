import React from 'react';
import { RefreshCcw } from 'lucide-react';

const RefreshButton = ({ onRefresh,loading }) => {
  return (
    <div className="flex justify-between md:px-14 items-center w-full px-7">
     <p className="font-semibold text-lg">Feeds</p>
      <RefreshCcw size={24} className={`cursor-pointer  ${loading&&"animate-spin"}`} onClick={onRefresh} />
    </div>
  );
};

export default RefreshButton;
