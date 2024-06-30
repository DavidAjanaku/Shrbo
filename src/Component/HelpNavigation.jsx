import React, { useState } from 'react';
import { Input, Dropdown, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Logo from "../assets/logo.png";
import logoutIcon from "../assets/enter-icon.svg";
import { Link } from 'react-router-dom';

const HelpNavigation = () => {
  const [searchValue, setSearchValue] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setDropdownVisible(value.length > 0);
  };

  const searchResults = [
    { path: "/CancellationPolicy", label: "How cancellations work" },
    { path: "/DamagesAndIncidentals", label: "Shrbo damage policy" },
    { path: "/AboutUs", label: "Learn more about Shrbo" },
    { path: "/TermsofService", label: "Shrbo Terms of Service" },
    { path: "/FAQAccordion", label: "Frequently Asked Questions" },
    { path: "/SupportAndHelp", label: "Contact Support" },
    { path: "/PrivacyPolicy", label: "Privacy policy" },
  ];

  const filteredResults = searchResults.filter(result =>
    result.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const menu = (
    <Menu>
      {filteredResults.length > 0 ? (
        filteredResults.map((result, index) => (
          <Menu.Item key={index}>
            <Link to={result.path} onClick={() => setDropdownVisible(false)}>
              <div className='flex items-center gap-2'>
                <div className='bg-orange-300 w-fit p-2 rounded-xl'>
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                {result.label}
              </div>
            </Link>
          </Menu.Item>
        ))
      ) : (
        <Menu.Item disabled>
          <div className='text-gray-500'>No results found</div>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 z-50">
      <div className="flex items-center md:w-[90%] justify-between mx-auto">
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-10 w-10 mr-2" />
          </Link>
          <div className="md:block mx-auto">
            <span className="md:text-2xl">Help Center</span>
          </div>
        </div>
        <div className="md:w-2/3 relative">
          <Dropdown overlay={menu} visible={dropdownVisible} onVisibleChange={setDropdownVisible} trigger={['click']}>
            <Input
              placeholder="Search..."
              className="bg-gray-600 text-white rounded-lg p-2"
              value={searchValue}
              onChange={handleSearchInputChange}
              onClick={() => setDropdownVisible(true)}
            />
          </Dropdown>
          <button
            type="submit"
            className="absolute right-0 top-0 text-white rounded-r-lg p-2"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className='hidden md:block'>
          {/* <img src={logoutIcon} className='w-4 text-white' alt=""  title='logout'/> */}
        </div>
      </div>
    </div>
  );
};

export default HelpNavigation;
