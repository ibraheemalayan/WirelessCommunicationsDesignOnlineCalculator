import React, { useState } from 'react';
import {
    Flex,
    Divider,
} from 'antd';

import { Descriptions } from 'antd';
import { bitsTxtFormatter, bpsTxtFormatter, hzTxtFormatter, secTxtFormatter } from './functions';
import { CsmaInputFormComponent } from './csma_form';




export default function CsmaTab() {

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    //   dataTransmissionBw: number,
    // dataRate: number,
    // propagationTime: number,
    // frameSize: number,
    // frameRate: number,
    // protocol: string

    // state
    const [dataTransmissionBw, setDataTransmissionBw] = useState<number>(0);
    const [dataRate, setDataRate] = useState<number>(0);
    const [propagationTime, setPropagationTime] = useState<number>(0);
    const [frameSize, setFrameSize] = useState<number>(0);
    const [frameRate, setFrameRate] = useState<number>(0);
    const [protocol, setProtocol] = useState<string>('Slotted ALOHA');
    // setter function to pass to the form
    const setAndCalculateRates = (dataTransmissionBw: number, dataRate: number, propagationTime: number, frameSize: number, frameRate: number, protocol: string) => {
        setDataTransmissionBw(dataTransmissionBw);
        setDataRate(dataRate);
        setPropagationTime(propagationTime);
        setFrameSize(frameSize);
        setFrameRate(frameRate);
        setProtocol(protocol);
        setIsSubmitted(true);
    };

    // 

    const one_bit_time = 1 / dataRate;
    const one_frame_time = frameSize / dataRate;
    const load_G = one_frame_time * frameRate;
    const alpha = propagationTime / one_frame_time;

    let throughputPercent = 0;
    switch (protocol) {
        case 'Slotted Nonpersistent CSMA':
            throughputPercent = 100 * (alpha * load_G * Math.exp(-2 * alpha * one_frame_time)) / (load_G * (1 - Math.exp(-2 * alpha * load_G)) + alpha);
            break;
        case 'Unslotted Nonpersistent CSMA':
            throughputPercent = 100 * (load_G * Math.exp(-2 * alpha * one_frame_time)) / ((load_G * (1 + 2 * alpha)) + Math.exp(-alpha * load_G));
            break;
        case 'Pure ALOHA':
            throughputPercent = 100 * load_G * Math.exp(-2 * load_G);
            break;
        case 'Slotted ALOHA':
            throughputPercent = 100 * load_G * Math.exp(-load_G);
            break;


        default:
            alert('Invalid protocol selected.');
    }

    return (
        <Flex justify='start' align='flex-start' vertical={false}>
            <section>
                <CsmaInputFormComponent
                    setValues={setAndCalculateRates}
                />
            </section>
            <Divider type='vertical' />
            <section>
                {isSubmitted ? (
                    <>
                        <Descriptions title="Inputs" column={2}>
                            <Descriptions.Item label="Transmission Bandwidth">{bpsTxtFormatter(dataTransmissionBw)}</Descriptions.Item>
                            <Descriptions.Item label="Data Rate">{bpsTxtFormatter(dataRate)}</Descriptions.Item>
                            <Descriptions.Item label="Propagation Time">{secTxtFormatter(propagationTime)}</Descriptions.Item>
                            <Descriptions.Item label="Frame Size">{bitsTxtFormatter(frameSize)}</Descriptions.Item>
                            <Descriptions.Item label="Frame Rate">{frameRate} fps</Descriptions.Item>
                            <Descriptions.Item label="Protocol">{protocol}</Descriptions.Item>
                        </Descriptions>
                        <Descriptions title="Results" column={1} bordered size='small'>
                            <Descriptions.Item label="One bit time">{secTxtFormatter(one_bit_time)}</Descriptions.Item>
                            <Descriptions.Item label="One frame time">{secTxtFormatter(one_frame_time)}</Descriptions.Item>
                            <Descriptions.Item label="Load G">{load_G.toFixed(4)} </Descriptions.Item>
                            <Descriptions.Item label="alpha">{alpha.toFixed(4)} </Descriptions.Item>
                            <Descriptions.Item label="Throughput">{throughputPercent.toFixed(4)} %</Descriptions.Item>
                        </Descriptions>

                    </>
                ) : (
                    <Descriptions title="Results" column={2}><p>Submit the form to see the results</p></Descriptions>

                )}
            </section>
        </Flex>
    );
}