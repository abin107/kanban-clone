import React, { useState } from 'react';
import { 
  GROUP_BY_OPTIONS, 
  SORT_BY_OPTIONS, 
  DownIcon, 
  SettingsIcon, 
  UpIcon
} from '../common';
import '../styles/header.css';

const Header = ({
  sortBy,
  groupBy,
  handleSortByChange,
  handleGroupByChange
}) => {
  const [displayDropdown, setDisplayDropdown] = useState(false);

  const toggleDropdown = () => {
    setDisplayDropdown(!displayDropdown);
  };

  return (
    <header className="App-header">
      <h1>Kanban Board</h1>
      <div>
        <span>
          <button className='display-button' onClick={toggleDropdown}>
            <SettingsIcon width="1rem" padding="1px"/>
              Display
            {displayDropdown ? <UpIcon width="1rem" padding="1px"/> : <DownIcon padding="1px" width="1rem"/>}
          </button>
        </span>
        {displayDropdown && (
          <div className='display-options'>
            <div className='display-options-item'>
              <label htmlFor="sortBy">Sort By:</label>
              <select id="sortBy" value={sortBy} onChange={handleSortByChange}>
                <option value={SORT_BY_OPTIONS.priority}>Priority</option>
                <option value={SORT_BY_OPTIONS.title}>Title</option>
              </select>
            </div>
            <div className='display-options-item'>
            <label htmlFor="groupBy">Group By:</label>
              <select id="groupBy" value={groupBy} onChange={handleGroupByChange}>
                <option value={GROUP_BY_OPTIONS.status}>Status</option>
                <option value={GROUP_BY_OPTIONS.userId}>User</option>
                <option value={GROUP_BY_OPTIONS.priority}>Priority</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;