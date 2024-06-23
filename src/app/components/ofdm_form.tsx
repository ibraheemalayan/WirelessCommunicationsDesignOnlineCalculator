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
import { frequencyUnitSelector, HzKHzFormatter, HzKHzParser, secondsFormatter, secondsParser, secondsUnitSelector } from './functions';

const { Option } = Select;


// props for the input form
interface InputFormProps {
    setValues: (
        bandwidth: number,
        subCarrierSpacing: number,
        ofdmSymbols: number,
        symbolDuration: number,
        qam_symbols: number,
        parallel_blocks: number
    ) => void;
}

export const OFDMInputFormComponent: React.FC<InputFormProps> = (props) => {

    const [form] = Form.useForm();

    // -------------------- Bandwidth and Sampling Frequency --------------------
    const BW_INITIAL = 100000;

    const [bandwidth, setBandwidth] = useState<number>(BW_INITIAL);
    const [bandwidthUnit, setBandwidthUnit] = useState<string>('KHz');

    const SUBCARRIER_SPACING_INITIAL = 10000;
    const [subCarrierSpacing, setSubCarrierSpacing] = useState<number>(SUBCARRIER_SPACING_INITIAL);
    const [subCarrierSpacingUnit, setSubCarrierSpacingUnit] = useState<string>('KHz');


    // -------------------- OFDM Symbols --------------------

    const OFDM_SYMBOLS_INITIAL = 7;
    const SYMBOL_DURATION_INITIAL = 0.0005; // s
    const [ofdmSymbols, setOFDMSymbols] = useState<number>(OFDM_SYMBOLS_INITIAL);

    const [symbolDuration, setSymbolDuration] = useState<number>(SYMBOL_DURATION_INITIAL);
    const [symbolDurationUnit, setSymbolDurationUnit] = useState<string>('ms');

    // -------------------- QAM Bits --------------------
    const QAM_SYMBOLS_INITIAL = 1024;

    const [qamSymbols, setQAMSymbols] = useState<number>(QAM_SYMBOLS_INITIAL);

    // -------------------- Parallel Blocks --------------------

    const PARALLEL_BLOCKS_INITIAL = 1;
    const [parallelBlocks, setParallelBlocks] = useState<number>(PARALLEL_BLOCKS_INITIAL);


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
                            bandwidth,
                            subCarrierSpacing,
                            ofdmSymbols,
                            symbolDuration,
                            qamSymbols,
                            parallelBlocks

                        );
                    }
                }
            >

                {/* -------------------- Bandwidth and Subcarrier Spacing -------------------- */}
                <Form.Item initialValue={BW_INITIAL} label="Bandwidth" name="bandwidth" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={bandwidth}
                            step={1000}
                            min={1}
                            formatter={(value) => HzKHzFormatter(value as number, bandwidthUnit)}
                            parser={(value) => HzKHzParser(value, bandwidthUnit)}
                            addonAfter={frequencyUnitSelector(setBandwidthUnit, bandwidthUnit)}
                            onChange={(value) => {
                                setBandwidth(value as number);
                                form.validateFields(['subcarrier_spacing']);
                            }}
                        />
                    </Row>
                </Form.Item>


                <Form.Item initialValue={SUBCARRIER_SPACING_INITIAL} label="Subcarrier Spacing" name="subcarrier_spacing"

                    rules={[
                        { required: true },
                        {
                            message: 'Subcarrier spacing must be less than or equal to the bandwidth',
                            validator: (_, value) => {
                                if (subCarrierSpacing > bandwidth) {
                                    return Promise.reject('Subcarrier spacing must be less than or equal to the bandwidth');
                                }
                                return Promise.resolve();
                            }
                        },
                        {
                            message: 'Bandwidth must be a multiple of Subcarrier spacing',
                            validator: (_, value) => {
                                if (bandwidth % subCarrierSpacing !== 0) {
                                    return Promise.reject('Bandwidth must be a multiple of Subcarrier spacing');
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={subCarrierSpacing}
                            step={200}
                            min={1}
                            formatter={(value) => HzKHzFormatter(value as number, subCarrierSpacingUnit)}
                            parser={(value) => HzKHzParser(value, subCarrierSpacingUnit)}
                            addonAfter={frequencyUnitSelector(setSubCarrierSpacingUnit, subCarrierSpacingUnit)}
                            onChange={(value) => setSubCarrierSpacing(value as number)}
                        />
                    </Row>
                </Form.Item>
                {/* -------------------- OFDM Symbols And Duration -------------------- */}

                <Form.Item initialValue={OFDM_SYMBOLS_INITIAL} label="OFDM Symbols" name="ofdm_symbols" rules={[
                    { required: true },
                    {
                        message: 'OFDM symbols must be integer',
                        validator: (_, value) => {
                            if (!Number.isInteger(ofdmSymbols)) {
                                return Promise.reject('OFDM symbols must be integer');
                            }
                            return Promise.resolve();
                        }
                    }
                ]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={ofdmSymbols}
                            step={1}
                            min={1}
                            onChange={(value) => setOFDMSymbols(value as number)}
                        />
                        <span style={{ marginLeft: 10 }}>symbol</span>
                    </Row>
                </Form.Item>

                <Form.Item initialValue={SYMBOL_DURATION_INITIAL} label="Symbol Duration" name="symbol_duration" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={symbolDuration}
                            step={0.001}
                            min={0.00000001}
                            formatter={(value) => secondsFormatter(value as number, symbolDurationUnit)}
                            parser={(value) => secondsParser(value, symbolDurationUnit)}
                            addonAfter={secondsUnitSelector(setSymbolDurationUnit, symbolDurationUnit)}
                            onChange={(value) => setSymbolDuration(value as number)}
                        />
                    </Row>

                </Form.Item>

                {/* -------------------- Symbols -------------------- */}
                <Form.Item initialValue={QAM_SYMBOLS_INITIAL} label="Modulation" name="qam_symbols" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <Select value={`${qamSymbols}`} style={{ width: 200 }} onChange={(val) => { setQAMSymbols(parseInt(val)) }}>
                            <Option value="8" >8-QAM</Option>
                            <Option value="16" >16-QAM</Option>
                            <Option value="32" >32-QAM</Option>
                            <Option value="64" >64-QAM</Option>
                            <Option value="128" >128-QAM</Option>
                            <Option value="256" >256-QAM</Option>
                            <Option value="512" >512-QAM</Option>
                            <Option value="1024" >1024-QAM</Option>
                            <Option value="2048" >2048-QAM</Option>
                            <Option value="4096" >4096-QAM</Option>
                        </Select>
                    </Row>
                </Form.Item>

                {/* -------------------- Parallel Blocks -------------------- */}

                <Form.Item initialValue={PARALLEL_BLOCKS_INITIAL} label="Parallel Blocks" name="parallel_blocks"
                    rules={[
                        { required: true },
                        {
                            message: 'OFDM symbols must be integer',
                            validator: (_, value) => {
                                if (!Number.isInteger(parallelBlocks)) {
                                    return Promise.reject('Parallel Blocks must be integer');
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={parallelBlocks}
                            step={1}
                            min={1}
                            onChange={(value) => setParallelBlocks(value as number)}
                        />
                        <span style={{ marginLeft: 10 }}>block</span>
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