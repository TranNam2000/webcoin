'use client';
import {useRouter} from 'next/navigation';
import {useState, useEffect} from 'react';

// Sample data structure for transactions
interface Transaction {
    id: number;
    type: 'deposit' | 'withdrawal';
    amount: number;
    date: string;
}

export default function History() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        // Fetch transaction data from an API or database
        // For now, we'll use mock data
        const mockData: Transaction[] = [
            { id: 1, type: 'deposit', amount: 100, date: '2023-10-01' },
            { id: 2, type: 'withdrawal', amount: 50, date: '2023-10-02' },
            { id: 3, type: 'deposit', amount: 200, date: '2023-10-03' },
            { id: 4, type: 'withdrawal', amount: 100, date: '2023-10-04' },
            // Add more transactions as needed
        ];
        setTransactions(mockData);
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
            <ul className="space-y-4">
                {transactions.map(transaction => (
                    <li key={transaction.id} className="p-4 border rounded-lg shadow-sm bg-white">
                        <div className="flex justify-between items-center">
                            <span className={`font-semibold ${transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'}`}>
                                {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                            </span>
                            <span className="text-gray-600">${transaction.amount}</span>
                        </div>
                        <div className="text-gray-500 text-sm">
                            {transaction.date}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}