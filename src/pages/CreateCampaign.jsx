
import React, { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';

export default function CreateCampaign() {
  const [campaign, setCampaign] = useState({
    name: '',
    objective: '',
    audienceSize: '',
    message: '',
    scheduledTime: '',
    tags: []
  });
  
  const [segmentRules, setSegmentRules] = useState({
    operator: 'AND',
    conditions: [
      { field: 'visits', operator: '>', value: '0' }
    ]
  });
  
  const [naturalLanguagePrompt, setNaturalLanguagePrompt] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [scheduleSuggestion, setScheduleSuggestion] = useState(null);
  const [lookalikeRules, setLookalikeRules] = useState(null);
  const [autoTags, setAutoTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [loadingLookalike, setLoadingLookalike] = useState(false);
  const [loadingTags, setLoadingTags] = useState(false);
  const [sending, setSending] = useState(false);
  const [activeTab, setActiveTab] = useState('create');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampaign(prev => ({ ...prev, [name]: value }));
  };

  const handleConditionChange = (index, field, value) => {
    const newConditions = [...segmentRules.conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setSegmentRules(prev => ({ ...prev, conditions: newConditions }));
  };

  const addCondition = () => {
    setSegmentRules(prev => ({
      ...prev,
      conditions: [...prev.conditions, { field: 'visits', operator: '>', value: '0' }]
    }));
  };

  const removeCondition = (index) => {
    const newConditions = [...segmentRules.conditions];
    newConditions.splice(index, 1);
    setSegmentRules(prev => ({ ...prev, conditions: newConditions }));
  };

  const generateAiSuggestions = async () => {
    try {
      setLoadingSuggestions(true);
      const response = await apiClient.post('/ai/message-suggestions', {
        objective: campaign.objective,
        audienceSize: campaign.audienceSize
      });
      
      if (response.data.fallback) {
        alert("AI service is currently unavailable. Using fallback suggestions.");
      }
      
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error('Error generating AI suggestions:', error);
      alert("Failed to generate suggestions. Please try again later.");
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const convertNaturalLanguage = async () => {
    try {
      setLoading(true);
      const response = await apiClient.post('/ai/nl-to-rules', {
        prompt: naturalLanguagePrompt
      });
      
      if (response.data.fallback) {
        alert("AI service is currently unavailable. Using fallback rules.");
      }
      
      setSegmentRules(response.data.rules);
    } catch (error) {
      console.error('Error converting natural language:', error);
      alert("Failed to convert natural language. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const generateScheduleSuggestion = async () => {
    try {
      setLoadingSchedule(true);
      const response = await apiClient.post('/ai/schedule-suggestions', {
        campaignData: {
          objective: campaign.objective,
          audienceSize: campaign.audienceSize
        }
      });
      
      if (response.data.fallback) {
        alert("AI service is currently unavailable. Using fallback schedule suggestion.");
      }
      
      setScheduleSuggestion(response.data);
      setCampaign(prev => ({ 
        ...prev, 
        scheduledTime: `${response.data.suggestedDay} at ${response.data.suggestedTime}` 
      }));
    } catch (error) {
      console.error('Error generating schedule suggestion:', error);
      alert("Failed to generate schedule suggestion. Please try again later.");
    } finally {
      setLoadingSchedule(false);
    }
  };

  const generateLookalikeAudience = async () => {
    try {
      setLoadingLookalike(true);
      const response = await apiClient.post('/ai/lookalike-audience', {
        segmentRules,
        currentCustomers: [] // In a real app, you would pass actual customer data
      });
      
      if (response.data.fallback) {
        alert("AI service is currently unavailable. Using fallback lookalike rules.");
      }
      
      setLookalikeRules(response.data);
    } catch (error) {
      console.error('Error generating lookalike audience:', error);
      alert("Failed to generate lookalike audience. Please try again later.");
    } finally {
      setLoadingLookalike(false);
    }
  };

  const generateAutoTags = async () => {
    try {
      setLoadingTags(true);
      const response = await apiClient.post('/ai/auto-tag-campaign', {
        campaignData: {
          objective: campaign.objective,
          audienceSize: campaign.audienceSize
        }
      });
      
      if (response.data.fallback) {
        alert("AI service is currently unavailable. Using fallback tags.");
      }
      
      setAutoTags(response.data.tags);
      setCampaign(prev => ({ ...prev, tags: response.data.tags }));
    } catch (error) {
      console.error('Error generating auto tags:', error);
      alert("Failed to generate auto tags. Please try again later.");
    } finally {
      setLoadingTags(false);
    }
  };

  const sendCampaign = async () => {
    try {
      setSending(true);
      const response = await apiClient.post('/campaigns/send', {
        campaignId: campaign.name,
        message: campaign.message,
        scheduledTime: campaign.scheduledTime
      });
      
      if (response.data.success) {
        alert(`Campaign sent successfully! Delivered to ${response.data.results.sent} out of ${response.data.results.totalRecipients} recipients.`);
      } else {
        alert("Failed to send campaign. Please try again.");
      }
    } catch (error) {
      console.error('Error sending campaign:', error);
      alert("Failed to send campaign. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  const useSuggestion = (suggestion) => {
    setCampaign(prev => ({ ...prev, message: suggestion }));
  };

  const applyLookalikeRules = () => {
    if (lookalikeRules) {
      setSegmentRules(lookalikeRules.lookalikeRules);
      alert(`Lookalike rules applied! Estimated audience size: ${lookalikeRules.estimatedAudienceSize}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Campaign</h1>
        <p className="text-gray-600">Design and send targeted campaigns to your customers</p>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'create' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('create')}
          >
            Create Campaign
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'ai-tools' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('ai-tools')}
          >
            AI Tools
          </button>
        </nav>
      </div>

      {activeTab === 'create' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
            <input
              type="text"
              name="name"
              value={campaign.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter campaign name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Objective</label>
            <input
              type="text"
              name="objective"
              value={campaign.objective}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Win back inactive customers"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Audience Size</label>
            <input
              type="number"
              name="audienceSize"
              value={campaign.audienceSize}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Number of customers"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Message</label>
            <textarea
              name="message"
              value={campaign.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your campaign message"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Time</label>
            <input
              type="text"
              name="scheduledTime"
              value={campaign.scheduledTime}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Tuesday at 2:00 PM"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <div className="flex flex-wrap gap-2">
              {campaign.tags.map((tag, index) => (
                <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={sendCampaign}
              disabled={sending || !campaign.name || !campaign.message}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Send Campaign'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'ai-tools' && (
        <div className="space-y-8">
          {/* AI Message Suggestions */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Message Suggestions</h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <button
                onClick={generateAiSuggestions}
                disabled={loadingSuggestions || !campaign.objective || !campaign.audienceSize}
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loadingSuggestions ? 'Generating...' : 'Generate Suggestions'}
              </button>
            </div>
            
            {suggestions.length > 0 && (
              <div className="mt-4 space-y-3">
                <h3 className="font-medium text-gray-700">Suggested Messages:</h3>
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-700 mb-2">{suggestion}</p>
                    <button
                      onClick={() => useSuggestion(suggestion)}
                      className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      Use This Message
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Natural Language to Segment Rules */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Natural Language to Segment Rules</h2>
            <div className="mb-4">
              <textarea
                value={naturalLanguagePrompt}
                onChange={(e) => setNaturalLanguagePrompt(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., People who haven't shopped in 6 months and spent over ₹5K"
              ></textarea>
            </div>
            <button
              onClick={convertNaturalLanguage}
              disabled={loading || !naturalLanguagePrompt}
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Converting...' : 'Convert to Rules'}
            </button>
          </div>

          {/* Smart Scheduling Suggestions */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Smart Scheduling Suggestions</h2>
            <button
              onClick={generateScheduleSuggestion}
              disabled={loadingSchedule || !campaign.objective}
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 mb-4"
            >
              {loadingSchedule ? 'Generating...' : 'Suggest Best Time'}
            </button>
            
            {scheduleSuggestion && (
              <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-700 mb-2">Suggested Schedule:</h3>
                <p className="text-gray-700 mb-1">{scheduleSuggestion.suggestion}</p>
                <p className="text-sm text-gray-500">{scheduleSuggestion.reasoning}</p>
              </div>
            )}
          </div>

          {/* Audience Lookalike Generator */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Audience Lookalike Generator</h2>
            <button
              onClick={generateLookalikeAudience}
              disabled={loadingLookalike}
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 mb-4"
            >
              {loadingLookalike ? 'Generating...' : 'Find Similar Customers'}
            </button>
            
            {lookalikeRules && (
              <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-700 mb-2">Lookalike Audience:</h3>
                <p className="text-gray-700 mb-3">{lookalikeRules.description}</p>
                <p className="text-sm text-gray-500 mb-3">Estimated audience size: {lookalikeRules.estimatedAudienceSize}</p>
                <button
                  onClick={applyLookalikeRules}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Apply These Rules
                </button>
              </div>
            )}
          </div>

          {/* Auto-tagging Campaigns */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Auto-tagging Campaigns</h2>
            <button
              onClick={generateAutoTags}
              disabled={loadingTags || !campaign.objective}
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 mb-4"
            >
              {loadingTags ? 'Generating...' : 'Generate Tags'}
            </button>
            
            {autoTags.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium text-gray-700 mb-2">Suggested Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {autoTags.map((tag, index) => (
                    <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


