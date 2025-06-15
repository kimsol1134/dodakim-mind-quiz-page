
import React from "react";

type Props = {
  priority: string;
};

const PriorityBadge: React.FC<Props> = ({ priority }) => {
  const getBadgeClassName = (priority: string) => {
    switch (priority) {
      case '긴급':
        return 'bg-red-100 text-red-900 dark:bg-red-800 dark:text-red-200 border-red-400';
      case '높음':
        return 'bg-orange-100 text-orange-900 dark:bg-orange-800 dark:text-orange-200 border-orange-400';
      case '보통':
        return 'bg-yellow-100 text-yellow-900 dark:bg-yellow-700 dark:text-yellow-200 border-yellow-400';
      default:
        return 'bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-200 border-green-400';
    }
  };

  return (
    <span className={`text-xs px-2 py-1 rounded font-medium border ${getBadgeClassName(priority)}`}>
      {priority}
    </span>
  );
};

export default PriorityBadge;
