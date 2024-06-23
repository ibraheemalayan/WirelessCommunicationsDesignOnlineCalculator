'use client';

import React from 'react';
import { Tabs, Flex, Card } from 'antd';
import type { TabsProps } from 'antd';

import BitRateTab from './components/bit_rate_tab';
import OFDMTab from './components/ofdm';
import FlatPowerTab from './components/flat_power';
import CsmaTab from './components/csma';


const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Bit/Rate',
    children: <BitRateTab />,
  },
  {
    key: '2',
    label: 'OFDM',
    children: <OFDMTab />,
  },
  {
    key: '3',
    label: 'Power in Flat Environments',
    children: <FlatPowerTab />,
  },
  {
    key: '4',
    label: 'CSMA/ALOHA',
    children: <CsmaTab />,
  }
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen text-center content-center items-center p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Wireless Communications Calculator</h1>
      <Flex justify='center' align='flex-start' vertical>

        <Card title="Select a calculater" bordered={false} style={{ width: 1200 }}>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Card>

      </Flex>
      <footer className="text-center text-sm mt-12 text-gray-600">
        <p>&copy; 2024 Birzeit University, Ibraheem Alyan & Adham Dar Al Masri</p>
      </footer>
    </main>
  );
}
