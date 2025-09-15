import React, { useState } from 'react';

export default function RuleBuilder({ rules = {}, onRulesChange }) {
  const [conditions, setConditions] = useState(rules.conditions || []);
  const [operator, setOperator] = useState(rules.operator || 'AND');

  const fieldOptions = [
    { value: 'totalSpend', label: 'Total Spend' },
    { value: 'visits', label: 'Visits' },
    { value: 'lastPurchaseDate', label: 'Last Purchase Date' },
    { value: 'inactiveDays', label: 'Inactive Days' }
  ];

  const operatorOptions = [
    { value: '>', label: 'Greater than' },
    { value: '<', label: 'Less than' },
    { value: '=', label: 'Equal to' },
    { value: '!=', label: 'Not equal to' },
    { value: '>=', label: 'Greater than or equal' },
    { value: '<=', label: 'Less than or equal' }
  ];

  const addCondition = () => {
    const newCondition = {
      field: 'totalSpend',
      operator: '>',
      value: ''
    };
    setConditions([...conditions, newCondition]);
    updateRules([...conditions, newCondition], operator);
  };

  const updateCondition = (index, field, value) => {
    const updatedConditions = [...conditions];
    updatedConditions[index] = { ...updatedConditions[index], [field]: value };
    setConditions(updatedConditions);
    updateRules(updatedConditions, operator);
  };

  const removeCondition = (index) => {
    const updatedConditions = [...conditions];
    updatedConditions.splice(index, 1);
    setConditions(updatedConditions);
    updateRules(updatedConditions, operator);
  };

  const updateOperator = (newOperator) => {
    setOperator(newOperator);
    updateRules(conditions, newOperator);
  };

  const updateRules = (updatedConditions, updatedOperator) => {
    onRulesChange({
      conditions: updatedConditions,
      operator: updatedOperator
    });
  };

  return (
    <div className="border border-gray-300 rounded-md p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Combine conditions with:
        </label>
        <select
          value={operator}
          onChange={(e) => updateOperator(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
      </div>

      {conditions.map((condition, index) => (
        <div key={index} className="flex items-center mb-3">
          <select
            value={condition.field}
            onChange={(e) => updateCondition(index, 'field', e.target.value)}
            className="mr-2 px-2 py-1 border border-gray-300 rounded-md"
          >
            {fieldOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={condition.operator}
            onChange={(e) => updateCondition(index, 'operator', e.target.value)}
            className="mr-2 px-2 py-1 border border-gray-300 rounded-md"
          >
            {operatorOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={condition.value}
            onChange={(e) => updateCondition(index, 'value', e.target.value)}
            className="mr-2 px-2 py-1 border border-gray-300 rounded-md"
            placeholder="Value"
          />

          <button
            onClick={() => removeCondition(index)}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={addCondition}
        className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
      >
        Add Condition
      </button>
    </div>
  );
}
