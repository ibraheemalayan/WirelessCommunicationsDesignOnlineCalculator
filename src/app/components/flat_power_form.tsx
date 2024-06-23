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
import { frequencyUnitSelector, HzKHzFormatter, HzKHzParser, secondsFormatter, secondsParser, secondsUnitSelector, dbFormatter, dbParser, dbUnitSelector, bpsParser, bpsFormatter, bpsUnitSelector } from './functions';

const { Option } = Select;


// props for the input form
interface InputFormProps {
    setValues: (
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
        linkMargin: number,
    ) => void;
}

export const FlatPowerInputFormComponent: React.FC<InputFormProps> = (props) => {

    const [form] = Form.useForm();

    // -------------------- Modulation Technique --------------------
    const MODULATION_TECHNIQUE_INITIAL = 'BPSK/QPSK';
    const [modulationTechnique, setModulationTechnique] = useState<string>(MODULATION_TECHNIQUE_INITIAL);

    // -------------------- Bit Error Rate --------------------
    const BER_INITIAL = 1e-3;
    const [ber, setBer] = useState<number>(BER_INITIAL);

    // -------------------- Path Loss and Frequency --------------------

    const PATH_LOSS_INITIAL = 80; // Example: 80 dB
    const [pathLoss, setPathLoss] = useState<number>(PATH_LOSS_INITIAL);
    const [pathLossUnit, setPathLossUnit] = useState<string>('dB');

    const FREQUENCY_INITIAL = 900000000; // Example: 2400 MHz
    const [frequency, setFrequency] = useState<number>(FREQUENCY_INITIAL);
    const [frequencyUnit, setFrequencyUnit] = useState<string>('MHz');


    // -------------------- Antenna Gains and Losses --------------------

    const TX_ANTENNA_GAIN_INITIAL = 8; // Example: 15 dBi
    const [txAntennaGain, setTxAntennaGain] = useState<number>(TX_ANTENNA_GAIN_INITIAL);
    const [txAntennaGainUnit, setTxAntennaGainUnit] = useState<string>('dB');

    const RX_ANTENNA_GAIN_INITIAL = 10; // Example: 10 dBi
    const [rxAntennaGain, setRxAntennaGain] = useState<number>(RX_ANTENNA_GAIN_INITIAL);
    const [rxAntennaGainUnit, setRxAntennaGainUnit] = useState<string>('dB');

    const FEED_LINE_LOSS_INITIAL = 7; // Example: 2 dB
    const [feedLineLoss, setFeedLineLoss] = useState<number>(FEED_LINE_LOSS_INITIAL);
    const [feedLineLossUnit, setFeedLineLossUnit] = useState<string>('dB');

    const OTHER_LOSSES_INITIAL = 11; // Example: 1 dB
    const [otherLosses, setOtherLosses] = useState<number>(OTHER_LOSSES_INITIAL);
    const [otherLossesUnit, setOtherLossesUnit] = useState<string>('dB');


    // -------------------- Data Rate and Amplifier Gains --------------------

    const DATA_RATE_INITIAL = 9600; // Example: 100 Mbps
    const [dataRate, setDataRate] = useState<number>(DATA_RATE_INITIAL);
    const [dataRateUnit, setDataRateUnit] = useState<string>('Kbps'); // Or 'Gbps', 'kbps' as needed

    const RX_AMP_GAIN_INITIAL = 28; // Example: 20 dB
    const [rxAmpGain, setRxAmpGain] = useState<number>(RX_AMP_GAIN_INITIAL);
    const [rxAmpGainUnit, setRxAmpGainUnit] = useState<string>('dB');

    const TX_AMP_GAIN_INITIAL = 30; // Example: 30 dBm (dBm for power)
    const [txAmpGain, setTxAmpGain] = useState<number>(TX_AMP_GAIN_INITIAL);
    const [txAmpGainUnit, setTxAmpGainUnit] = useState<string>('dB');


    // -------------------- Noise, Margins, and Link Budget --------------------

    const NOISE_FIGURE_TOTAL_INITIAL = 6; // Example: 5 dB
    const [noiseFigureTotal, setNoiseFigureTotal] = useState<number>(NOISE_FIGURE_TOTAL_INITIAL);
    const [noiseFigureTotalUnit, setNoiseFigureTotalUnit] = useState<string>('dB');

    const NOISE_TEMPERATURE_INITIAL = 290; // Example: 290 Kelvin (no unit state needed)
    const [noiseTemperature, setNoiseTemperature] = useState<number>(NOISE_TEMPERATURE_INITIAL);

    const FADE_MARGIN_INITIAL = 8;  // Example: 10 dB
    const [fadeMargin, setFadeMargin] = useState<number>(FADE_MARGIN_INITIAL);
    const [fadeMarginUnit, setFadeMarginUnit] = useState<string>('dB');

    const LINK_MARGIN_INITIAL = 6; // Example: 15 dB (calculated from other values, but here for completeness)
    const [linkMargin, setLinkMargin] = useState<number>(LINK_MARGIN_INITIAL);
    const [linkMarginUnit, setLinkMarginUnit] = useState<string>('dB');



    return (
        <Row>
            <Form
                form={form}
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                labelAlign="left"
                style={{ width: 600 }}
                onFinish={
                    (values) => {
                        // set the values
                        props.setValues(
                            modulationTechnique,
                            ber,
                            pathLoss,
                            frequency,
                            txAntennaGain,
                            rxAntennaGain,
                            feedLineLoss,
                            otherLosses,
                            dataRate,
                            rxAmpGain,
                            txAmpGain,
                            noiseFigureTotal,
                            noiseTemperature,
                            fadeMargin,
                            linkMargin
                        );

                    }
                }
            >
                {/* -------------------- Modulation -------------------- */}
                <Form.Item initialValue={MODULATION_TECHNIQUE_INITIAL} label="Modulation Technique" name="modulation_technique" rules={[{ required: true }]}>
                    <Select value={modulationTechnique} style={{ width: 160 }} onChange={(value) => setModulationTechnique(value)}>
                        <Option value="BPSK/QPSK" >BPSK/QPSK</Option>
                        <Option value="8-QAM" >8-QAM</Option>
                        <Option value="16-QAM" >16-QAM</Option>
                    </Select>
                </Form.Item>

                {/* -------------------- Bit Error Rate -------------------- */}
                <Form.Item initialValue={BER_INITIAL} label="Bit Error Rate" name="ber" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={ber}
                            onStep={(value, info) => {
                                // step in powers of 10
                                if (info.type === 'up') {
                                    setBer(ber * 10);
                                } else {
                                    setBer(ber / 10);
                                }
                            }}
                            min={0}
                            onChange={(value) => setBer(value as number)}
                        />
                        <span style={{ marginLeft: 10 }}> bit/error rate</span>
                    </Row>
                </Form.Item>

                {/* -------------------- Path Loss and Frequency -------------------- */}
                <Form.Item initialValue={PATH_LOSS_INITIAL} label="Path Loss" name="path_loss" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={pathLoss}
                            step={1}
                            min={0}
                            formatter={(value) => dbFormatter(value as number, pathLossUnit)}
                            parser={(value) => dbParser(value, pathLossUnit)}
                            addonAfter={dbUnitSelector(setPathLossUnit, pathLossUnit)}
                            onChange={(value) => setPathLoss(value as number)}
                        />
                    </Row>
                </Form.Item>


                <Form.Item initialValue={FREQUENCY_INITIAL} label="Frequency" name="frequency" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={frequency}
                            step={1}
                            min={0}
                            formatter={(value) => HzKHzFormatter(value as number, frequencyUnit)}
                            parser={(value) => HzKHzParser(value, frequencyUnit)}
                            addonAfter={frequencyUnitSelector(setFrequencyUnit, frequencyUnit)}
                            onChange={(value) => setFrequency(value as number)}
                        />
                    </Row>
                </Form.Item>

                {/* -------------------- Antenna Gains and Losses -------------------- */}

                <Form.Item initialValue={TX_ANTENNA_GAIN_INITIAL} label="TX Antenna Gain" name="tx_antenna_gain" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={txAntennaGain}
                            step={1}
                            min={0}
                            formatter={(value) => dbFormatter(value as number, txAntennaGainUnit)}
                            parser={(value) => dbParser(value, txAntennaGainUnit)}
                            addonAfter={dbUnitSelector(setTxAntennaGainUnit, txAntennaGainUnit)}
                            onChange={(value) => setTxAntennaGain(value as number)}
                        />
                    </Row>
                </Form.Item>

                <Form.Item initialValue={RX_ANTENNA_GAIN_INITIAL} label="RX Antenna Gain" name="rx_antenna_gain" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={rxAntennaGain}
                            step={1}
                            min={0}
                            formatter={(value) => dbFormatter(value as number, rxAntennaGainUnit)}
                            parser={(value) => dbParser(value, rxAntennaGainUnit)}
                            addonAfter={dbUnitSelector(setRxAntennaGainUnit, rxAntennaGainUnit)}
                            onChange={(value) => setRxAntennaGain(value as number)}
                        />
                    </Row>
                </Form.Item>

                <Form.Item initialValue={FEED_LINE_LOSS_INITIAL} label="Feed Line Loss" name="feed_line_loss" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={feedLineLoss}
                            step={1}
                            min={0}
                            formatter={(value) => dbFormatter(value as number, feedLineLossUnit)}
                            parser={(value) => dbParser(value, feedLineLossUnit)}
                            addonAfter={dbUnitSelector(setFeedLineLossUnit, feedLineLossUnit)}
                            onChange={(value) => setFeedLineLoss(value as number)}
                        />
                    </Row>
                </Form.Item>

                <Form.Item initialValue={OTHER_LOSSES_INITIAL} label="Other Losses" name="other_losses" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={otherLosses}
                            step={1}
                            min={0}
                            formatter={(value) => dbFormatter(value as number, otherLossesUnit)}
                            parser={(value) => dbParser(value, otherLossesUnit)}
                            addonAfter={dbUnitSelector(setOtherLossesUnit, otherLossesUnit)}
                            onChange={(value) => setOtherLosses(value as number)}
                        />
                    </Row>
                </Form.Item>

                {/* -------------------- Data Rate and Amplifier Gains -------------------- */}

                <Form.Item initialValue={DATA_RATE_INITIAL} label="Data Rate" name="data_rate" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={dataRate}
                            step={1}
                            min={0}
                            formatter={(value) => bpsFormatter(value as number, dataRateUnit)}
                            parser={(value) => bpsParser(value, dataRateUnit)}
                            addonAfter={bpsUnitSelector(setDataRateUnit, dataRateUnit)}
                            onChange={(value) => setDataRate(value as number)}
                        />
                    </Row>
                </Form.Item>

                <Form.Item initialValue={RX_AMP_GAIN_INITIAL} label="RX Amplifier Gain" name="rx_amp_gain" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={rxAmpGain}
                            step={1}
                            min={0}
                            formatter={(value) => dbFormatter(value as number, rxAmpGainUnit)}
                            parser={(value) => dbParser(value, rxAmpGainUnit)}
                            addonAfter={dbUnitSelector(setRxAmpGainUnit, rxAmpGainUnit)}
                            onChange={(value) => setRxAmpGain(value as number)}
                        />
                    </Row>
                </Form.Item>

                <Form.Item initialValue={TX_AMP_GAIN_INITIAL} label="TX Amplifier Gain" name="tx_amp_gain" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={txAmpGain}
                            step={1}
                            min={0}
                            formatter={(value) => dbFormatter(value as number, txAmpGainUnit)}
                            parser={(value) => dbParser(value, txAmpGainUnit)}
                            addonAfter={dbUnitSelector(setTxAmpGainUnit, txAmpGainUnit)}
                            onChange={(value) => setTxAmpGain(value as number)}
                        />
                    </Row>
                </Form.Item>

                {/* -------------------- Noise, Margins, and Link Budget -------------------- */}
                <Form.Item initialValue={NOISE_FIGURE_TOTAL_INITIAL} label="Noise Figure" name="noise_figure" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={noiseFigureTotal}
                            step={1}
                            min={0}
                            formatter={(value) => dbFormatter(value as number, noiseFigureTotalUnit)}
                            parser={(value) => dbParser(value, noiseFigureTotalUnit)}
                            addonAfter={dbUnitSelector(setNoiseFigureTotalUnit, noiseFigureTotalUnit)}
                            onChange={(value) => setNoiseFigureTotal(value as number)}
                        />
                    </Row>
                </Form.Item>

                <Form.Item initialValue={NOISE_TEMPERATURE_INITIAL} label="Noise Temperature" name="noise_temperature" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={noiseTemperature}
                            step={1}
                            min={0}
                            addonAfter={'K'}
                            onChange={(value) => setNoiseTemperature(value as number)}
                        />
                    </Row>
                </Form.Item>

                <Form.Item initialValue={FADE_MARGIN_INITIAL} label="Fade Margin" name="fade_margin" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={fadeMargin}
                            step={1}
                            min={0}
                            formatter={(value) => dbFormatter(value as number, fadeMarginUnit)}
                            parser={(value) => dbParser(value, fadeMarginUnit)}
                            addonAfter={dbUnitSelector(setFadeMarginUnit, fadeMarginUnit)}
                            onChange={(value) => setFadeMargin(value as number)}
                        />
                    </Row>
                </Form.Item>

                <Form.Item initialValue={LINK_MARGIN_INITIAL} label="Link Margin" name="link_margin" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={linkMargin}
                            step={1}
                            min={0}
                            formatter={(value) => dbFormatter(value as number, linkMarginUnit)}
                            parser={(value) => dbParser(value, linkMarginUnit)}
                            addonAfter={dbUnitSelector(setLinkMarginUnit, linkMarginUnit)}
                            onChange={(value) => setLinkMargin(value as number)}
                        />
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