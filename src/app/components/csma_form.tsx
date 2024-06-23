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
import { bitsFormatter, bitsParser, bitsUnitSelector, bpsFormatter, bpsParser, bpsUnitSelector, frequencyUnitSelector, HzKHzFormatter, HzKHzParser, secondsFormatter, secondsParser, secondsUnitSelector } from './functions';

const { Option } = Select;


// props for the input form
interface InputFormProps {
    setValues: (
        dataTransmissionBw: number,
        dataRate: number,
        propagationTime: number,
        frameSize: number,
        frameRate: number,
        protocol: string
    ) => void;
}

export const CsmaInputFormComponent: React.FC<InputFormProps> = (props) => {

    const [form] = Form.useForm();

    // -------------------- Bandwidth and Data Rate --------------------

    const DATA_TRANSMISSION_BW_INITIAL = 20000000; // Example: 20 MHz
    const [dataTransmissionBw, setDataTransmissionBw] = useState<number>(DATA_TRANSMISSION_BW_INITIAL);
    const [dataTransmissionBwUnit, setDataTransmissionBwUnit] = useState<string>('Mbps');

    const DATA_RATE_INITIAL = 50000000; // Example: 100 Mbps
    const [dataRate, setDataRate] = useState<number>(DATA_RATE_INITIAL);
    const [dataRateUnit, setDataRateUnit] = useState<string>('Mbps'); // Or 'Gbps', 'kbps' as needed


    // -------------------- Propagation Time, Frame Size, and Frame Rate --------------------

    const PROPAGATION_TIME_INITIAL = 0.000001; // Example: 1 microsecond (µs)
    const [propagationTime, setPropagationTime] = useState<number>(PROPAGATION_TIME_INITIAL);
    const [propagationTimeUnit, setPropagationTimeUnit] = useState<string>('us'); // 

    const FRAME_SIZE_INITIAL = 1500; // Example: 1500 bytes
    const [frameSize, setFrameSize] = useState<number>(FRAME_SIZE_INITIAL);
    const [frameSizeUnit, setFrameSizeUnit] = useState<string>('bits'); // Or 'bits'

    const FRAME_RATE_INITIAL = 1000; // Example: 1000 frames per second (fps)
    const [frameRate, setFrameRate] = useState<number>(FRAME_RATE_INITIAL);
    const [frameRateUnit, setFrameRateUnit] = useState<string>('Hz');

    // -------------------- Technique --------------------
    const PROTOCOL_INTIAL = 'Slotted ALOHA';
    const [protocol, setProtocol] = useState<string>(PROTOCOL_INTIAL);

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
                            dataTransmissionBw,
                            dataRate,
                            propagationTime,
                            frameSize,
                            frameRate,
                            protocol
                        );

                    }
                }
            >

                {/* -------------------- Bandwidth and Data Rate -------------------- */}
                <Form.Item initialValue={DATA_TRANSMISSION_BW_INITIAL} label="Data Transmission Bandwidth" name="data_transmission_bw" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={dataTransmissionBw}
                            step={1}
                            min={1}
                            formatter={(value) => bpsFormatter(value as number, dataTransmissionBwUnit)}
                            parser={(value) => bpsParser(value, dataTransmissionBwUnit)}
                            addonAfter={bpsUnitSelector(setDataTransmissionBwUnit, dataTransmissionBwUnit)}
                            onChange={(value) => { setDataTransmissionBw(value as number) }}
                        />
                    </Row>
                </Form.Item>

                <Form.Item initialValue={DATA_RATE_INITIAL} label="Data Rate" name="data_rate" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={dataRate}
                            step={1}
                            min={1}
                            formatter={(value) => bpsFormatter(value as number, dataRateUnit)}
                            parser={(value) => bpsParser(value, dataRateUnit)}
                            addonAfter={bpsUnitSelector(setDataRateUnit, dataRateUnit)}
                            onChange={(value) => { setDataRate(value as number) }}
                        />
                    </Row>
                </Form.Item>

                {/* -------------------- Propagation Time, Frame Size, and Frame Rate -------------------- */}
                <Form.Item initialValue={PROPAGATION_TIME_INITIAL} label="Propagation Time" name="propagation_time" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={propagationTime}
                            step={0.001}
                            min={0.00000001}
                            formatter={(value) => secondsFormatter(value as number, propagationTimeUnit)}
                            parser={(value) => secondsParser(value, propagationTimeUnit)}
                            addonAfter={secondsUnitSelector(setPropagationTimeUnit, propagationTimeUnit)}
                            onChange={(value) => { setPropagationTime(value as number) }}
                        />
                    </Row>
                </Form.Item>

                <Form.Item initialValue={FRAME_SIZE_INITIAL} label="Frame Size" name="frame_size" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={frameSize}
                            step={1}
                            min={1}
                            formatter={(value) => bitsFormatter(value as number, frameSizeUnit)}
                            parser={(value) => bitsParser(value, frameSizeUnit)}
                            addonAfter={bitsUnitSelector(setFrameSizeUnit)}
                            onChange={(value) => { setFrameSize(value as number) }}
                        />
                    </Row>
                </Form.Item>

                <Form.Item initialValue={FRAME_RATE_INITIAL} label="Frame Rate" name="frame_rate" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={frameRate}
                            step={1}
                            min={1}
                            formatter={(value) => HzKHzFormatter(value as number, frameRateUnit)}
                            parser={(value) => HzKHzParser(value, frameRateUnit)}
                            addonAfter={frequencyUnitSelector(setFrameRateUnit)}
                            onChange={(value) => { setFrameRate(value as number) }}
                        />
                    </Row>
                </Form.Item>

                {/* -------------------- Technique -------------------- */}
                <Form.Item initialValue={PROTOCOL_INTIAL} label="Protocol" name="protocol" rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <Select value={protocol} style={{ width: 280 }} onChange={(val) => { setProtocol(val) }}>
                            <Option value="Slotted Nonpersistent CSMA" >Slotted Nonpersistent CSMA</Option>
                            <Option value="Unslotted Nonpersistent CSMA" >Unslotted Nonpersistent CSMA</Option>
                            <Option value="Pure ALOHA" >Pure ALOHA</Option>
                            <Option value="Slotted ALOHA" >Slotted ALOHA</Option>
                        </Select>
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