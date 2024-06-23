import React, { useState } from 'react';
import {
    Flex,
    Divider,
} from 'antd';

import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { FlatPowerInputFormComponent } from './flat_power_form';
import { bpsTxtFormatter, hzTxtFormatter } from './functions';




export default function FlatPowerTab() {

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    // state
    const [modulationTechnique, setModulationTechnique] = useState<string>('');
    const [ber, setBer] = useState<number>(0);
    const [pathLoss, setPathLoss] = useState<number>(0);
    const [frequency, setFrequency] = useState<number>(0);
    const [txAntennaGain, setTxAntennaGain] = useState<number>(0);
    const [rxAntennaGain, setRxAntennaGain] = useState<number>(0);
    const [feedLineLoss, setFeedLineLoss] = useState<number>(0);
    const [otherLosses, setOtherLosses] = useState<number>(0);
    const [dataRate, setDataRate] = useState<number>(0);
    const [rxAmpGain, setRxAmpGain] = useState<number>(0);
    const [txAmpGain, setTxAmpGain] = useState<number>(0);
    const [noiseFigureTotal, setNoiseFigureTotal] = useState<number>(0);
    const [noiseTemperature, setNoiseTemperature] = useState<number>(0);
    const [fadeMargin, setFadeMargin] = useState<number>(0);
    const [linkMargin, setLinkMargin] = useState<number>(0);


    // setter function to pass to the form
    const setAndCalculateRates = (
        modulationTechnique: string,
        ber: number,
        pathLoss: number,
        frequency: number,
        txAntennaGain: number,
        rxAntennaGain: number,
        feedLineLoss: number,
        otherLosses: number,
        dataRate: number,
        rxAmpGain: number,
        txAmpGain: number,
        noiseFigureTotal: number,
        noiseTemperature: number,
        fadeMargin: number,
        linkMargin: number,) => {
        setModulationTechnique(modulationTechnique);
        setBer(ber);
        setPathLoss(pathLoss);
        setFrequency(frequency);
        setTxAntennaGain(txAntennaGain);
        setRxAntennaGain(rxAntennaGain);
        setFeedLineLoss(feedLineLoss);
        setOtherLosses(otherLosses);
        setDataRate(dataRate);
        setRxAmpGain(rxAmpGain);
        setTxAmpGain(txAmpGain);
        setNoiseFigureTotal(noiseFigureTotal);
        setNoiseTemperature(noiseTemperature);
        setFadeMargin(fadeMargin);
        setLinkMargin(linkMargin);
        setIsSubmitted(true);
    }
    return (
        <Flex justify='start' align='flex-start' vertical={false}>
            <section>
                <FlatPowerInputFormComponent
                    setValues={setAndCalculateRates}
                />
            </section>
            <Divider type='vertical' />
            <section>
                {isSubmitted ? (
                    <>
                        <Descriptions title="Inputs" column={2}>
                            <Descriptions.Item label="Modulation Technique">{modulationTechnique}</Descriptions.Item>
                            <Descriptions.Item label="Bit Error Rate">{ber}</Descriptions.Item>
                            <Descriptions.Item label="Path Loss">{pathLoss} db</Descriptions.Item>
                            <Descriptions.Item label="Frequency">{hzTxtFormatter(frequency)}</Descriptions.Item>
                            <Descriptions.Item label="Transmitter Antenna Gain">{txAntennaGain} db</Descriptions.Item>
                            <Descriptions.Item label="Receiver Antenna Gain">{rxAntennaGain} db</Descriptions.Item>
                            <Descriptions.Item label="Feed Line Loss">{feedLineLoss} db</Descriptions.Item>
                            <Descriptions.Item label="Other Losses">{otherLosses} db</Descriptions.Item>
                            <Descriptions.Item label="Data Rate">{bpsTxtFormatter(dataRate)}</Descriptions.Item>
                            <Descriptions.Item label="Receiver Amplifier Gain">{rxAmpGain} db</Descriptions.Item>
                            <Descriptions.Item label="Transmitter Amplifier Gain">{txAmpGain} db</Descriptions.Item>
                            <Descriptions.Item label="Total Noise Figure">{noiseFigureTotal} db</Descriptions.Item>
                            <Descriptions.Item label="Noise Temperature">{noiseTemperature} K</Descriptions.Item>
                            <Descriptions.Item label="Fade Margin">{fadeMargin} db</Descriptions.Item>
                            <Descriptions.Item label="Link Margin">{linkMargin} db</Descriptions.Item>
                        </Descriptions>
                        <Descriptions title="Results" column={1} bordered size='small'>
                            <Descriptions.Item label="Sampler Output">{4} sample/sec </Descriptions.Item>
                        </Descriptions>

                    </>
                ) : (
                    <Descriptions title="Results" column={2}><p>Submit the form to see the results</p></Descriptions>

                )}
            </section>
        </Flex>
    );
}