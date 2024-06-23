import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  ColorPicker,
  Form,
  InputNumber,
  Radio,
  Select,
  Slider,
  TreeSelect,
  Flex,
  Row,
} from 'antd';


// fomrat Hz and KHz
const HzKHzFormatter = (value: number, unit: string) => {
  if (!value) {
    return '';
  }
  if (unit === 'Hz') {
    return `${value}`;
  } else if (unit === 'KHz') {
    return `${value / 1000}`;
  }
  return '';
};


const { Option } = Select;




// parse Hz and KHz
const HzKHzParser = (displayValue: string | undefined, unit: string) => {
  if (!displayValue) {
    return 0;
  }
  if (unit === 'KHz') {
    return Number(displayValue) * 1000;
  } else {
    return Number(displayValue);
  }
};

const InputFormComponent: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);

  const [form] = Form.useForm();

  // data
  const [bandwidth, _setBandwidth] = useState<number>(1);
  const [bandwidthUnit, _setBandwidthUnit] = useState<string>('Hz');

  const [useNyquistRate, setUseNyquistRate] = useState<boolean>(true);

  const [samplingFrequency, _setSamplingFrequency] = useState<number>(2);
  const [samplingFrequencyUnit, _setSamplingFrequencyUnit] = useState<string>('Hz');

  // custom setBandwidth that also sets the sampling frequency to 2 times the bandwidth
  const setBandwidthAndSamplingFrequencyByBW = (value: number) => {
    _setBandwidth(value);
    _setSamplingFrequency(value * 2);
  };
  const setBandwidthAndSamplingFrequencyByFs = (value: number) => {
    _setBandwidth(value);
    _setBandwidth(value / 2);
  }

  // 

  const frequencyUnitSelect = (
    <Select defaultValue="Hz" style={{ width: 80 }}>
      <Option value="Hz" >Hz</Option>
      <Option value="KHz" >KHz</Option>
    </Select>
  );

  // frequency select that takes a function to set the unit
  const frequencyUnitSelector = (setUnit: (unit: string) => void) => (
    <Select defaultValue="Hz" style={{ width: 80 }} onChange={(unit) => setUnit(unit)}>
      <Option value="Hz" >Hz</Option>
      <Option value="KHz" >KHz</Option>
    </Select>
  );



  return (
    <>
      {/* <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Form disabled
      </Checkbox> */}
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        labelAlign="left"
        disabled={componentDisabled}
        style={{ minWidth: 600 }}
      >
        <Form.Item label="Use Nyquist Rate" name="use_nyquist_rate" valuePropName="checked">
          <Row >
            <Checkbox checked={useNyquistRate} onChange={(e) => setUseNyquistRate(e.target.checked)}>
              Calculate sampling frequency from bandwidth</Checkbox>
          </Row>
        </Form.Item>
        <Form.Item label="Bandwidth" name="bandwidth" rules={[{ required: useNyquistRate }]}>
          <Row >
            <InputNumber
              disabled={!useNyquistRate}
              value={bandwidth}
              min={1}
              defaultValue={1}
              formatter={(value) => HzKHzFormatter(value as number, bandwidthUnit)}
              parser={(value) => HzKHzParser(value, bandwidthUnit)}
              addonAfter={frequencyUnitSelector(_setBandwidthUnit)}
              onChange={(value) => setBandwidthAndSamplingFrequencyByBW(value as number)}
            />
          </Row>
        </Form.Item>


        <Form.Item label="Sampling Frequncy" name="sampling_frequency" rules={[{ required: !useNyquistRate }]}>
          <Row >
            <InputNumber
              disabled={useNyquistRate}
              value={samplingFrequency}
              min={1}
              defaultValue={1}
              formatter={(value) => HzKHzFormatter(value as number, samplingFrequencyUnit)}
              parser={(value) => HzKHzParser(value, samplingFrequencyUnit)}
              addonAfter={frequencyUnitSelector(_setSamplingFrequencyUnit)}
              onChange={(value) => setBandwidthAndSamplingFrequencyByFs(value as number)}

            />
          </Row>
        </Form.Item>
      </Form >
    </>
  );
};







export default function BitRateTab() {
  return (
    <Flex justify='start' align='flex-start' vertical>
      <section>
        <InputFormComponent />
      </section>

    </Flex>
  );
}