import React, { useState } from 'react';
import {
    Flex,
    Divider,
} from 'antd';

import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { FlatPowerInputFormComponent } from './flat_power_form';
import { bpsTxtFormatter, hzTxtFormatter, getEbNo } from './functions';


// 


export default function FlatPowerTab() {

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    // state
    const [modulationTechnique, setModulationTechnique] = useState<string>('8-PSK');
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

    const K = 10 * Math.log10(1.38e-23); // Boltzmann constant);

    // calculations
    const Eb_N0 = getEbNo(ber, modulationTechnique);

    const noiseTemperatureDb = 10 * Math.log10(noiseTemperature);
    const dataRateDb = 10 * Math.log10(dataRate);

    const power_received = linkMargin + K + noiseTemperatureDb + noiseFigureTotal + dataRateDb + Eb_N0;

    const power_transmitted_in_db = power_received + pathLoss + feedLineLoss + otherLosses + fadeMargin - txAntennaGain - txAmpGain - rxAntennaGain - rxAmpGain;

    const power_transmitted_in_watt = Math.pow(10, power_transmitted_in_db / 10);


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
                            <Descriptions.Item label="Path Loss">{pathLoss.toFixed(2)} db</Descriptions.Item>
                            <Descriptions.Item label="Frequency">{hzTxtFormatter(frequency)}</Descriptions.Item>
                            <Descriptions.Item label="Transmitter Antenna Gain">{txAntennaGain.toFixed(2)} db</Descriptions.Item>
                            <Descriptions.Item label="Receiver Antenna Gain">{rxAntennaGain.toFixed(2)} db</Descriptions.Item>
                            <Descriptions.Item label="Feed Line Loss">{feedLineLoss.toFixed(2)} db</Descriptions.Item>
                            <Descriptions.Item label="Other Losses">{otherLosses.toFixed(2)} db</Descriptions.Item>
                            <Descriptions.Item label="Data Rate">{bpsTxtFormatter(dataRate)}</Descriptions.Item>
                            <Descriptions.Item label="Receiver Amplifier Gain">{rxAmpGain.toFixed(2)} db</Descriptions.Item>
                            <Descriptions.Item label="Transmitter Amplifier Gain">{txAmpGain.toFixed(2)} db</Descriptions.Item>
                            <Descriptions.Item label="Total Noise Figure">{noiseFigureTotal.toFixed(2)} db</Descriptions.Item>
                            <Descriptions.Item label="Noise Temperature">{noiseTemperature} K</Descriptions.Item>
                            <Descriptions.Item label="Fade Margin">{fadeMargin.toFixed(2)} db</Descriptions.Item>
                            <Descriptions.Item label="Link Margin">{linkMargin.toFixed(2)} db</Descriptions.Item>
                        </Descriptions>
                        <Descriptions title="Results" column={1} bordered size='small'>
                            <Descriptions.Item label="Eb/N0">{Eb_N0.toFixed(2)} db</Descriptions.Item>
                            <Descriptions.Item label="Noise Temperature">{noiseTemperatureDb.toFixed(2)} db</Descriptions.Item>
                            <Descriptions.Item label="Data Rate">{dataRateDb.toFixed(2)} db</Descriptions.Item>
                            <Descriptions.Item label="Received Power">{power_received.toFixed(2)} db</Descriptions.Item>
                            <Descriptions.Item label="Transmitted Power">{power_transmitted_in_db.toFixed(2)} db</Descriptions.Item>
                            <Descriptions.Item label="Transmitted Power in Watt">{power_transmitted_in_watt.toFixed(4)} W</Descriptions.Item>
                        </Descriptions>

                    </>
                ) : (
                    <Descriptions title="Results" column={2}><p>Submit the form to see the results</p></Descriptions>

                )}
            </section>
        </Flex>
    );
}