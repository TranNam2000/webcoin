import React from 'react';

const ProfileDetails = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-black">Partnerships</h2>
        
        {/* My Rank Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-black">My Rank</h3>
          <div className="flex justify-between items-center">
            <p className="font-bold text-black">{user.rank}</p>
            <p className="text-green-500 font-bold">{user.secondaryVolume} / {user.totalVolume}</p>
          </div>
          <p className="text-red-500">
            An additional $50,000.00 Secondary Team Volume is required to achieve Brand Representative.
          </p>
        </div>

        {/* Data Sections */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-blue-200 p-4 rounded font-bold text-black">Secondary Team Volume / Total Volume: {user.secondaryVolume} USD</div>
          <div className="bg-blue-200 p-4 rounded font-bold text-black">Total Revenue: {user.totalRevenue} USD</div>
          <div className="bg-blue-200 p-4 rounded font-bold text-black">Secondary Team Volume Today: {user.secondaryToday} USD</div>
          <div className="bg-blue-200 p-4 rounded font-bold text-black">Revenue Today: {user.revenueToday} USD</div>
        </div>

        {/* Referral Link Section */}
        <div className="mt-6 p-4 bg-blue-100 rounded-lg shadow-md">
          <h3 className="font-semibold text-black">Referral Link</h3>
          <p className="text-black">Want your clients to bring you more commissions? Share your referral link.</p>
          <div className="mt-2">
            <p className="font-bold text-black">Referral code: <span className="text-blue-600">{user.referralCode}</span></p>
            <p className="font-bold text-black">Referral link: <a href={user.referralLink} className="text-blue-600 underline">{user.referralLink}</a></p>
          </div>
        </div>

        <button onClick={onClose} className="mt-4 bg-blue-700 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default ProfileDetails; 