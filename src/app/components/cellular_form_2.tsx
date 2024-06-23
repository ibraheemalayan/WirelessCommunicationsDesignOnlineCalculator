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
import { dbFormatter, dbParser, dbUnitSelector, frequencyUnitSelector, HzKHzFormatter, HzKHzParser, secondsFormatter, secondsParser, secondsUnitSelector } from './functions';


// props for the input form
interface InputFormProps {
    setValues: (
        cityArea: number,
        numSubscribers: number,
        callsPerSubscriber: number,
        callDuration: number,
        callDropProbability: number,
        minSir: number,
        powerRefDistance: number,
        referenceDistance: number,
        pathLossExponent: number,
        timeslotsPerCarrier: number,
        receiverSensitivity: number
    ) => void;
}

export const CellularInputFormComponent: React.FC<InputFormProps> = (props) => {

    // -------------------- City and Subscriber Characteristics --------------------

    const CITY_AREA_INITIAL = 4; // km square
    const [cityArea, setCityArea] = useState<number>(CITY_AREA_INITIAL);

    const NUM_SUBSCRIBERS_INITIAL = 80000;
    const [numSubscribers, setNumSubscribers] = useState<number>(NUM_SUBSCRIBERS_INITIAL);

    const CALLS_PER_SUBSCRIBER_INITIAL = 8;
    const [callsPerSubscriber, setCallsPerSubscriber] = useState<number>(CALLS_PER_SUBSCRIBER_INITIAL);


    // -------------------- Call Quality Metrics --------------------

    const CALL_DURATION_INITIAL = 180;
    const [callDuration, setCallDuration] = useState<number>(CALL_DURATION_INITIAL);
    const [callDurationUnit, setCallDurationUnit] = useState<string>('min');

    const CALL_DROP_PROBABILITY_INITIAL = 0.02;
    const [callDropProbability, setCallDropProbability] = useState<number>(CALL_DROP_PROBABILITY_INITIAL);

    const MIN_SIR_INITIAL = 13;
    const [minSir, setMinSir] = useState<number>(MIN_SIR_INITIAL);
    const [minSirUnit, setMinSirUnit] = useState<string>('dB');


    // -------------------- Signal Power and Propagation --------------------

    const POWER_REF_DISTANCE_INITIAL = -22;
    const [powerRefDistance, setPowerRefDistance] = useState<number>(POWER_REF_DISTANCE_INITIAL);
    const [powerRefDistanceUnit, setPowerRefDistanceUnit] = useState<string>('dB');

    const REFERENCE_DISTANCE_INITIAL = 10;
    const [referenceDistance, setReferenceDistance] = useState<number>(REFERENCE_DISTANCE_INITIAL);

    const PATH_LOSS_EXPONENT_INITIAL = 3;
    const [pathLossExponent, setPathLossExponent] = useState<number>(PATH_LOSS_EXPONENT_INITIAL);


    // -------------------- System Capacity and Sensitivity --------------------

    const TIMESLOTS_PER_CARRIER_INITIAL = 8;
    const [timeslotsPerCarrier, setTimeslotsPerCarrier] = useState<number>(TIMESLOTS_PER_CARRIER_INITIAL);

    const RECEIVER_SENSITIVITY_INITIAL = -51.549;
    const [receiverSensitivity, setReceiverSensitivity] = useState<number>(RECEIVER_SENSITIVITY_INITIAL);
    const [receiverSensitivityUnit, setReceiverSensitivityUnit] = useState<string>('dB');


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
                            cityArea,
                            numSubscribers,
                            callsPerSubscriber,
                            callDuration,
                            callDropProbability,
                            minSir,
                            powerRefDistance,
                            referenceDistance,
                            pathLossExponent,
                            timeslotsPerCarrier,
                            receiverSensitivity
                        );
                    }
                }
            >

                {/* -------------------- City and Subscriber Characteristics -------------------- */}
                <Form.Item label="City Area" name="city_area" initialValue={CITY_AREA_INITIAL} rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={cityArea}
                            min={0.1}
                            onChange={(value) => setCityArea(value as number)}
                            addonAfter={<>km<sup>2</sup></>}
                        />
                    </Row>
                </Form.Item>

                <Form.Item label="Number of Subscribers" name="num_subscribers" initialValue={NUM_SUBSCRIBERS_INITIAL} rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={numSubscribers}
                            min={1}
                            onChange={(value) => setNumSubscribers(value as number)}
                            addonAfter={'users'}
                        />
                    </Row>
                </Form.Item>

                <Form.Item label="Calls Per Subscriber" name="calls_per_subscriber" initialValue={CALLS_PER_SUBSCRIBER_INITIAL} rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={callsPerSubscriber}
                            min={1}
                            onChange={(value) => setCallsPerSubscriber(value as number)}
                            addonAfter={'calls'}
                        />
                    </Row>
                </Form.Item>

                {/* -------------------- Call Quality Metrics -------------------- */}
                <Form.Item label="Call Duration" name="call_duration" initialValue={CALL_DURATION_INITIAL} rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={callDuration}
                            min={1}
                            onChange={(value) => setCallDuration(value as number)}
                            parser={(value) => secondsParser(value, callDurationUnit)}
                            formatter={(value) => secondsFormatter(value as number, callDurationUnit)}
                            addonAfter={secondsUnitSelector(setCallDurationUnit, callDurationUnit)}
                        />
                    </Row>
                </Form.Item>

                <Form.Item label="Call Drop Probability" name="call_drop_probability" initialValue={CALL_DROP_PROBABILITY_INITIAL} rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={callDropProbability}
                            min={0}
                            max={1}
                            step={0.01}
                            onChange={(value) => setCallDropProbability(value as number)}
                        />
                    </Row>
                </Form.Item>

                <Form.Item label="Minimum SIR" name="min_sir" initialValue={MIN_SIR_INITIAL} rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={minSir}
                            min={-200}
                            formatter={(value) => dbFormatter(value as number, minSirUnit)}
                            parser={(value) => dbParser(value, minSirUnit)}
                            onChange={(value) => setMinSir(value as number)}
                            addonAfter={dbUnitSelector(setMinSirUnit, minSirUnit)}
                        />
                    </Row>
                </Form.Item>

                {/* -------------------- Signal Power and Propagation -------------------- */}

                <Form.Item label="Reference Distance" name="reference_distance" initialValue={REFERENCE_DISTANCE_INITIAL} rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={referenceDistance}
                            min={1}
                            onChange={(value) => setReferenceDistance(value as number)}
                            addonAfter={'m'}
                        />
                    </Row>
                </Form.Item>

                <Form.Item label="Power At Reference Distance" name="power_ref_distance" initialValue={POWER_REF_DISTANCE_INITIAL} rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={powerRefDistance}
                            min={-200}
                            onChange={(value) => setPowerRefDistance(value as number)}
                            formatter={(value) => dbFormatter(value as number, powerRefDistanceUnit)}
                            parser={(value) => dbParser(value, powerRefDistanceUnit)}
                            addonAfter={dbUnitSelector(setPowerRefDistanceUnit, powerRefDistanceUnit)}
                        />
                    </Row>
                </Form.Item>

                <Form.Item label="Path Loss Exponent" name="path_loss_exponent" initialValue={PATH_LOSS_EXPONENT_INITIAL} rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={pathLossExponent}
                            min={1}
                            onChange={(value) => setPathLossExponent(value as number)}
                        />
                    </Row>
                </Form.Item>

                {/* -------------------- System Capacity and Sensitivity -------------------- */}
                <Form.Item label="Timeslots Per Carrier" name="timeslots_per_carrier" initialValue={TIMESLOTS_PER_CARRIER_INITIAL} rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={timeslotsPerCarrier}
                            min={1}
                            onChange={(value) => setTimeslotsPerCarrier(value as number)}
                            addonAfter={'slot'}
                        />
                    </Row>
                </Form.Item>

                <Form.Item label="Receiver Sensitivity" name="receiver_sensitivity" initialValue={RECEIVER_SENSITIVITY_INITIAL} rules={[{ required: true }]}>
                    <Row align={'middle'}>
                        <InputNumber
                            value={receiverSensitivity}
                            min={-200}
                            onChange={(value) => setReceiverSensitivity(value as number)}
                            formatter={(value) => dbFormatter(value as number, receiverSensitivityUnit)}
                            parser={(value) => dbParser(value, receiverSensitivityUnit)}
                            addonAfter={dbUnitSelector(setReceiverSensitivityUnit, receiverSensitivityUnit)}
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