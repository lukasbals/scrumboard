/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    'antd',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'rc-pagination',
    'rc-util',
    'rc-picker',
    'rc-input',
    'rc-tree',
    'rc-table',
    '@react-dnd/asap',
    '@react-dnd/invariant',
    '@react-dnd/shallowequal',
    'dnd-core',
    'react-dnd',
    'react-dnd-html5-backend',
  ],
};

module.exports = nextConfig;
