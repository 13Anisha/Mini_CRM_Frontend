import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import RuleBuilder from '../components/RuleBuilder';
import useAuth from '../hooks/useAuth';

export default function Segments() {
  const { user } = useAuth();
  const [segments, setSegments] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newSegment, setNewSegment] = useState({
    name: '',
    rules: {}
  });
  const [aiInput, setAiInput] = useState('');
  const [aiProcessing, setAiProcessing] = useState(false);

  useEffect(() => {
    fetchSegments();
  }, []);

  const fetchSegments = async () => {
    try {
      const response = await apiClient.get('/segments');
      setSegments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching segments:', error);
      setLoading(false);
    }
  };

  const handleCreateSegment = async () => {
    try {
      await apiClient.post('/segments', newSegment);
      setNewSegment({ name: '', rules: {} });
      setShowCreateForm(false);
      fetchSegments();
    } catch (error) {
      console.error('Error creating segment:', error);
    }
  };

  const handleRulesChange = (rules) => {
    setNewSegment({ ...newSegment, rules });
  };

  const handleAiSubmit = async () => {
    if (!aiInput.trim()) return;
    setAiProcessing(true);
    try {
      const response = await apiClient.post('/ai/nl-to-rules', { prompt: aiInput });
      setNewSegment({ ...newSegment, rules: response.data.rules });
      setAiInput('');
    } catch (error) {
      console.error('Error processing AI request:', error);
      alert('Failed to process your request. Please try again.');
    } finally {
      setAiProcessing(false);
    }
  };

  if (!user) {
    return <div>Please log in to view segments.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Segments</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showCreateForm ? 'Cancel' : 'Create New Segment'}
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Segment</h2>
          <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
            <h3 className="font-medium text-indigo-800 mb-2">AI-Powered Rule Builder</h3>
            <div className="flex">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Describe your segment in natural language (e.g., 'Customers who spent more than $1000 and visited less than 3 times')"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md"
              />
              <button
                onClick={handleAiSubmit}
                disabled={aiProcessing}
                className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {aiProcessing ? 'Processing...' : 'Generate Rules'}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Segment Name
            </label>
            <input
              type="text"
              value={newSegment.name}
              onChange={(e) => setNewSegment({ ...newSegment, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter segment name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Segment Rules
            </label>
            <RuleBuilder rules={newSegment.rules} onRulesChange={handleRulesChange} />
          </div>
          <button
            onClick={handleCreateSegment}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Save Segment
          </button>
        </div>
      )}

      {loading ? (
        <div>Loading segments...</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {segments.map((segment) => (
                <tr key={segment._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{segment.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{segment.customerCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(segment.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/segments/${segment._id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      View
                    </Link>
                    <Link
                      to={`/campaigns/new?segmentId=${segment._id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Create Campaign
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
