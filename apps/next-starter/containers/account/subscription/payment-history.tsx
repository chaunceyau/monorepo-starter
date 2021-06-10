import {Card} from '@monorepo-starter/ui';
import React from 'react';

const items = [
  {id: '1'},
  {id: '2'},
  {id: '3'},
  // More items...
];

export function PaymentHistory() {
  return (
    <Card
      title="Payment History"
      description="Information about your subscription and any associated charges."
    >
      <div className="bg-gray-50 shadow overflow-hidden sm:rounded-md border">
        <ul className="divide-y divide-gray-200">
          {items.map(item => (
            <li
              key={item.id}
              className="px-4 py-3 sm:px-6 even:bg-gray-100 flex justify-between space-x-6 hover:bg-gray-200 cursor-pointer"
            >
              <span className="text-sm text-gray-600 flex-shrink-0">
                August 14, 2021
              </span>
              <span className="text-sm text-gray-600 truncate">
                $50.00 - Company Plus Subscription
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
