import React, { useState } from 'react';
import {
  Flex,
  Divider,
} from 'antd';

import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { BitRateInputFormComponent } from './bit_rate_form';




export default function BitRateTab() {

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // state
  const [samplingFrequency, setSamplingFrequency] = useState<number>(0);
  const [quantizationBitsPerSample, setQuantizationBits] = useState<number>(0);
  const [sourceEncoderRate, setSourceEncoderRate] = useState<number>(0);
  const [channelEncoderRate, setChannelEncoderRate] = useState<number>(0);

  // 

  // setter function to pass to the form
  const setAndCalculateRates = (samplingFrequency: number, quantizationBits: number, sourceEncoderRate: number, channelEncoderRate: number) => {
    setSamplingFrequency(samplingFrequency);
    setQuantizationBits(quantizationBits);
    setSourceEncoderRate(sourceEncoderRate);
    setChannelEncoderRate(channelEncoderRate);
    setIsSubmitted(true);
  };

  return (
    <Flex justify='start' align='flex-start' vertical={false}>
      <section>
        <BitRateInputFormComponent
          setValues={setAndCalculateRates}
        />
      </section>
      <Divider type='vertical' />
      <section>
        {isSubmitted ? (
          <>
            <Descriptions title="Inputs" column={2}>
              <Descriptions.Item label="Sampling Frequency">{samplingFrequency} Hz</Descriptions.Item>
              <Descriptions.Item label="Quantization Bits">{quantizationBitsPerSample} bit/sample</Descriptions.Item>
              <Descriptions.Item label="Source Encoder Rate">{sourceEncoderRate}</Descriptions.Item>
              <Descriptions.Item label="Channel Encoder Rate">{channelEncoderRate}</Descriptions.Item>
            </Descriptions>
            <Descriptions title="Results" column={1} bordered size='small'>
              <Descriptions.Item label="Sampler Output">{samplingFrequency} sample/sec </Descriptions.Item>
              <Descriptions.Item label="Quantizer Levels">{
                // 2^bit 
                Math.pow(2, quantizationBitsPerSample)
              } level</Descriptions.Item>
              <Descriptions.Item label="Quantizer Output In Levels">{
                samplingFrequency
              } level/sec</Descriptions.Item>
              <Descriptions.Item label="Quantizer Output In Bits">{
                (samplingFrequency * quantizationBitsPerSample).toFixed(2)
              } bit/sec</Descriptions.Item>
              <Descriptions.Item label="Source Encoder Output">{
                (sourceEncoderRate * samplingFrequency * quantizationBitsPerSample).toFixed(2)
              } bit/sec</Descriptions.Item>
              <Descriptions.Item label="Channel Encoder Output">{
                (sourceEncoderRate * samplingFrequency * quantizationBitsPerSample / channelEncoderRate).toFixed(2)
              } bit/sec</Descriptions.Item>
              <Descriptions.Item label="Interleaver Output">{
                (sourceEncoderRate * samplingFrequency * quantizationBitsPerSample / channelEncoderRate).toFixed(2)
              } bit/sec</Descriptions.Item>
            </Descriptions>

          </>
        ) : (
          <Descriptions title="Results" column={2}><p>Submit the form to see the results</p></Descriptions>

        )}
      </section>
    </Flex>
  );
}