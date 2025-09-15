import React from 'react';
import { Link } from 'react-router-dom';

export default function CampaignCard({ campaign }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            campaign.status === 'SENT' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {campaign.status}
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Audience Size:</span>
            <span className="font-medium">{campaign.audienceSize}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Created:</span>
            <span className="font-medium">{new Date(campaign.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Link
            to={`/campaigns/${campaign._id}`}
            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
          >
            View Details
          </Link>
          <Link
            to={`/campaigns/duplicate/${campaign._id}`}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Duplicate
          </Link>
        </div>
      </div>
    </div>
  );
}
