import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Form,
  InputNumber,
  Divider,
  Select,
  Row,
} from 'antd';

import {
  CalculatorOutlined
} from '@ant-design/icons';
import { frequencyUnitSelector, HzKHzFormatter, HzKHzParser } from './functions';


// props for the input form
interface InputFormProps {
  setValues: (samplingFrequency: number, quantizationBits: number, sourceEncoderRate: number, channelEncoderRate: number) => void;
}

export const BitRateInputFormComponent: React.FC<InputFormProps> = (props) => {

  // -------------------- Bandwidth and Sampling Frequency --------------------
  const BW_INITIAL = 1000;

  const [bandwidth, _setBandwidth] = useState<number>(BW_INITIAL);
  const [bandwidthUnit, _setBandwidthUnit] = useState<string>('Hz');

  const [useNyquistRate, setUseNyquistRate] = useState<boolean>(true);

  const FS_INITIAL = 2000;
  const [samplingFrequency, _setSamplingFrequency] = useState<number>(FS_INITIAL);
  const [samplingFrequencyUnit, _setSamplingFrequencyUnit] = useState<string>('Hz');

  // custom setBandwidth that also sets the sampling frequency to 2 times the bandwidth
  const setBandwidthAndSamplingFrequencyByBW = (value: number) => {
    _setBandwidth(value);
    _setSamplingFrequency(value * 2);
  };
  const setBandwidthAndSamplingFrequencyByFs = (value: number) => {
    _setBandwidth(value / 2);
    _setSamplingFrequency(value);
  }


  // -------------------- Quantization Levels & Bits --------------------
  const [useQuantizationLevels, setUseQuantizationLevels] = useState<boolean>(true);

  const QUANTIAZATION_LEVEL_INITIAL = 8;
  const QUANTIZATION_BITS_INITIAL = 3;
  const [quantization_levels, _setQuantizationLevels] = useState<number>(QUANTIAZATION_LEVEL_INITIAL);
  const [quantization_bits, _setQuantizationBits] = useState<number>(QUANTIZATION_BITS_INITIAL);

  // custom setQuantizationLevels that also sets the quantization bits according to the levels
  const setQuantizationLevels = (value: number) => {

    // make it integer
    value = Math.floor(value);

    _setQuantizationLevels(value);
    _setQuantizationBits(Math.ceil(Math.log2(value)));
  };

  // custom setQuantizationBits that also sets the quantization levels according to the bits
  const setQuantizationBits = (value: number) => {

    // make it integer
    value = Math.floor(value);

    _setQuantizationBits(value);
    _setQuantizationLevels(Math.pow(2, value));
  };

  // -------------------- Rates --------------------
  const SRC_ENCODER_INITIAL = 0.4;
  const CHANNEL_ENCODER_INITIAL = 0.8;

  const [source_encoder_compression_rate, setSourceEncoderCompressionRate] = useState<number>(SRC_ENCODER_INITIAL);
  const [channel_encoder_rate, setChannelEncoderRate] = useState<number>(CHANNEL_ENCODER_INITIAL);

  return (
    <Row>
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        labelAlign="left"
        style={{ width: 600 }}
        onFinish={
          (values) => {
            // set the values
            props.setValues(
              samplingFrequency,
              quantization_bits,
              source_encoder_compression_rate,
              channel_encoder_rate
            );
          }
        }
      >

        {/* -------------------- Bandwidth and Sampling Frequency -------------------- */}
        <Form.Item label="Use Nyquist Rate" name="use_nyquist_rate" valuePropName="checked">
          <Row align={'middle'}>
            <Checkbox checked={useNyquistRate} onChange={(e) => setUseNyquistRate(e.target.checked)}>
              Calculate sampling frequency from bandwidth</Checkbox>
          </Row>
        </Form.Item>
        <Form.Item initialValue={BW_INITIAL} label="Bandwidth" name="bandwidth" rules={[{ required: useNyquistRate }]}>
          <Row align={'middle'}>
            <InputNumber
              disabled={!useNyquistRate}
              value={bandwidth}
              min={1}
              formatter={(value) => HzKHzFormatter(value as number, bandwidthUnit)}
              parser={(value) => HzKHzParser(value, bandwidthUnit)}
              addonAfter={frequencyUnitSelector(_setBandwidthUnit)}
              onChange={(value) => setBandwidthAndSamplingFrequencyByBW(value as number)}
            />
          </Row>
        </Form.Item>


        <Form.Item initialValue={FS_INITIAL} label="Sampling Frequncy" name="sampling_frequency" rules={[{ required: !useNyquistRate }]}>
          <Row align={'middle'}>
            <InputNumber
              disabled={useNyquistRate}
              value={samplingFrequency}
              min={1}
              formatter={(value) => HzKHzFormatter(value as number, samplingFrequencyUnit)}
              parser={(value) => HzKHzParser(value, samplingFrequencyUnit)}
              addonAfter={frequencyUnitSelector(_setSamplingFrequencyUnit)}
              onChange={(value) => setBandwidthAndSamplingFrequencyByFs(value as number)}

            />
          </Row>
        </Form.Item>
        {/* -------------------- Quantization Levels & Bits -------------------- */}

        <Form.Item label="Enter Quantization Levels" name="quantization_levels" valuePropName="checked">
          <Row align={'middle'}>
            <Checkbox checked={useQuantizationLevels} onChange={(e) => setUseQuantizationLevels(e.target.checked)}>
              Calculate quantization bits from levels</Checkbox>
          </Row>
        </Form.Item>

        <Form.Item initialValue={QUANTIAZATION_LEVEL_INITIAL} label="Quantization Levels" name="quantization_levels" rules={[
          { required: useQuantizationLevels },
          {
            message: 'Must be a power of 2',
            validator: (_, value) => {
              if (quantization_levels && Math.log2(quantization_levels) % 1 !== 0) {
                return Promise.reject('Must be a power of 2');
              }
              return Promise.resolve();
            }
          }
        ]}>
          <Row align={'middle'}>
            <InputNumber
              disabled={!useQuantizationLevels}
              value={quantization_levels}
              min={2}
              onStep={(value, info) => {
                if (info.type === 'up') {
                  // if is not power of 2
                  if ((value - 1) % 2 !== 0) {
                    // round up to the next power of 2
                    setQuantizationLevels(Math.pow(2, Math.ceil(Math.log2(value))));
                  } else {
                    // if is power of 2
                    setQuantizationLevels((value - 1) * 2);
                  }
                } else {
                  if ((value + 1) > 2) {
                    // if is not power of 2
                    if ((value + 1) % 2 !== 0) {
                      // round down to the previous power of 2
                      setQuantizationLevels(Math.pow(2, Math.floor(Math.log2(value))));
                    }
                    // if is power of 2
                    else {
                      setQuantizationLevels((value + 1) / 2);
                    }
                  } else {
                    setQuantizationLevels(2);
                  }
                }
              }}
              onChange={(value) => setQuantizationLevels(value as number)}
            />
            <span style={{ marginLeft: 10 }}>level</span>

          </Row>
        </Form.Item>

        <Form.Item initialValue={QUANTIZATION_BITS_INITIAL} label="Quantization Bits Per Sample" name="quantization_bits" rules={[{ required: !useQuantizationLevels }]}>
          <Row align={'middle'}>
            <InputNumber
              disabled={useQuantizationLevels}
              value={quantization_bits}
              step={1}
              min={1}
              onChange={(value) => setQuantizationBits(value as number)}
            />
            {/* bit/sample text */}
            <span style={{ marginLeft: 10 }}> bits/sample</span>
          </Row>

        </Form.Item>

        {/* -------------------- Rates -------------------- */}
        <Form.Item initialValue={SRC_ENCODER_INITIAL} label="Source Encoder Compression Rate" name="source_encoder_compression_rate" rules={[{ required: true }]}>
          <Row align={'middle'}>
            <InputNumber
              value={source_encoder_compression_rate}
              step={0.01}
              min={0.001}
              max={1}
              onChange={(value) => setSourceEncoderCompressionRate(value as number)}
            />
            <span style={{ marginLeft: 10 }}> input/output</span>
          </Row>
        </Form.Item>

        <Form.Item initialValue={CHANNEL_ENCODER_INITIAL} label="Channel Encoder Rate" name="channel_encoder_rate" rules={[{ required: true }]}>
          <Row align={'middle'}>
            <InputNumber
              value={channel_encoder_rate}
              step={0.01}
              min={0.001}
              max={1}
              onChange={(value) => setChannelEncoderRate(value as number)}
            />
            <span style={{ marginLeft: 10 }}> output/input</span>
          </Row>
        </Form.Item>

        {/* -------------------- Submit -------------------- */}
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit"
            // width
            size='large'
            icon={<CalculatorOutlined />}
          >
            Submit
          </Button>
        </Form.Item>


      </Form >
      <Divider type="vertical" />
    </Row>
  );
};