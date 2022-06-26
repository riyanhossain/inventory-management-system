import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';

export default function Navbar() {
  const [user, setUser] = React.useContext(UserContext);
  const menu = (
    <Menu
      items={[
        {
          label: <Link to='/update-profile'>Update Profile</Link>,
          key: "0",
        },
        {
          label: <Link to='/change-password'>Change Password</Link>,
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: <button onClick={() => setUser({
            signIn: false,
          })}>Logout</button>,
          key: "3",
        },
      ]}
    />
  );
  return (
    <nav className="flex justify-center items-center bg-slate-100 h-12">
      <ul className="flex gap-2 gap-x-6">
        <li>
          <Link to="/">Home</Link>
        </li>
        {user.signIn && <li><Link to="/product-list">ProductList</Link></li>}
        {/* {user.signIn && <li>CategoryList</li>} */}
        {user.signIn && (
          <li>
            <Dropdown overlay={menu} trigger={["click"]}>
              <a  onClick={(e) => e.preventDefault()}>
                <Space>
                  {user.name}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </li>
        )}
      </ul>
    </nav>
  );
}
