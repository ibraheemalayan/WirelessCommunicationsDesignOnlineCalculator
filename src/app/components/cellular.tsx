import React, { useState } from 'react';
import {
    Flex,
    Divider,
} from 'antd';

import { Descriptions } from 'antd';
import { bitsTxtFormatter, bpsTxtFormatter, dbFormatter, erlangBLookup, findClusterSize, hzTxtFormatter, secTxtFormatter } from './functions';
import { CellularInputFormComponent } from './cellular_form';




export default function CellularTab() {

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    // cityArea: number,
    // numSubscribers: number,
    // callsPerSubscriber: number,
    // callDuration: number,
    // callDropProbability: number,
    // minSir: number,
    // powerRefDistance: number,
    // referenceDistance: number,
    // pathLossExponent: number,
    // timeslotsPerCarrier: number,
    // receiverSensitivity: number

    // state
    const [cityArea, setCityArea] = useState<number>(4);
    const [numSubscribers, setNumSubscribers] = useState<number>(80000);
    const [callsPerSubscriber, setCallsPerSubscriber] = useState<number>(3);
    const [callDuration, setCallDuration] = useState<number>(180);
    const [callDropProbability, setCallDropProbability] = useState<number>(0.02);
    const [minSir, setMinSir] = useState<number>(13);
    const [powerRefDistance, setPowerRefDistance] = useState<number>(-51);
    const [referenceDistance, setReferenceDistance] = useState<number>(10);
    const [pathLossExponent, setPathLossExponent] = useState<number>(3);
    const [timeslotsPerCarrier, setTimeslotsPerCarrier] = useState<number>(8);
    const [receiverSensitivity, setReceiverSensitivity] = useState<number>(-22);

    const setAndCalculateRates = (cityArea: number, numSubscribers: number, callsPerSubscriber: number, callDuration: number, callDropProbability: number, minSir: number, powerRefDistance: number, referenceDistance: number, pathLossExponent: number, timeslotsPerCarrier: number, receiverSensitivity: number) => {
        setCityArea(cityArea);
        setNumSubscribers(numSubscribers);
        setCallsPerSubscriber(callsPerSubscriber);
        setCallDuration(callDuration);
        setCallDropProbability(callDropProbability);
        setMinSir(minSir);
        setPowerRefDistance(powerRefDistance);
        setReferenceDistance(referenceDistance);
        setPathLossExponent(pathLossExponent);
        setTimeslotsPerCarrier(timeslotsPerCarrier);
        setReceiverSensitivity(receiverSensitivity);
        setIsSubmitted(true);
    }

    // calculations

    // ----- Cell Coverage Calculations -----

    const powerRefDistanceInWatt = Math.pow(10, powerRefDistance / 10);
    const minSIRInWatt = Math.pow(10, minSir / 10);
    const receiverSensitivityInWatt = Math.pow(10, receiverSensitivity / 10);


    const maxCoverageDistance = Math.pow(powerRefDistanceInWatt / receiverSensitivityInWatt, 1 / pathLossExponent) * referenceDistance;
    const maxCellArea = (3 * Math.sqrt(3) * Math.pow(maxCoverageDistance, 2)) / 2;
    const totalCellsNeeded = Math.ceil(cityArea / maxCellArea);

    // ----- Traffic Calculations -----

    const callDurationInMin = callDuration / 60; // seconds to minutes

    const trafficPerUserPerDay = (callsPerSubscriber * callDurationInMin) / 1440; // minutes per day
    const totalTrafficPerDay = trafficPerUserPerDay * numSubscribers;
    const trafficPerCellPerDay = totalTrafficPerDay / totalCellsNeeded;

    // ----- Cluster Size Calculation -----

    let initialClusterSize = Math.pow(minSIRInWatt * 6, 2 / pathLossExponent) / 3;
    const cellsPerCluster = findClusterSize(initialClusterSize); // Assuming findClusterSize adjusts based on constraints

    // ----- Channel and Carrier Calculations (Initial GradeOfService) -----

    const initialGradeOfService = callDropProbability;
    const initialChannelsPerCell = erlangBLookup(trafficPerCellPerDay, initialGradeOfService);
    const initialCarriersNeeded = Math.ceil(initialChannelsPerCell / timeslotsPerCarrier);

    // ----- Channel and Carrier Calculations (Improved GradeOfService) -----

    const newGradeOfService = 0.05; // Example improved GradeOfService
    const newChannelsPerCell = erlangBLookup(trafficPerCellPerDay, newGradeOfService);
    const newCarriersNeeded = Math.ceil(newChannelsPerCell / timeslotsPerCarrier);


    return (
        <Flex justify='start' align='flex-start' vertical={false}>
            <section>
                <CellularInputFormComponent
                    setValues={setAndCalculateRates}
                />
            </section>
            <Divider type='vertical' />
            <section>
                {isSubmitted ? (
                    <>
                        <Descriptions title="Inputs" column={2}>
                            <Descriptions.Item label="City Area">{cityArea} sq km</Descriptions.Item>
                            <Descriptions.Item label="Number of Subscribers">{numSubscribers} user</Descriptions.Item>
                            <Descriptions.Item label="Calls Per Subscriber">{callsPerSubscriber} call</Descriptions.Item>
                            <Descriptions.Item label="Call Duration">{secTxtFormatter(callDuration)}</Descriptions.Item>
                            <Descriptions.Item label="Call Drop Probability">{callDropProbability}</Descriptions.Item>
                            <Descriptions.Item label="Minimum SIR">{minSir} db</Descriptions.Item>
                            <Descriptions.Item label="Power Reference Distance">{powerRefDistance} db</Descriptions.Item>
                            <Descriptions.Item label="Reference Distance">{referenceDistance} m</Descriptions.Item>
                            <Descriptions.Item label="Path Loss Exponent">{pathLossExponent}</Descriptions.Item>
                            <Descriptions.Item label="Timeslots Per Carrier">{timeslotsPerCarrier} slot</Descriptions.Item>
                            <Descriptions.Item label="Receiver Sensitivity">{hzTxtFormatter(receiverSensitivity)}</Descriptions.Item>
                        </Descriptions>
                        <Descriptions title="Results" column={1} bordered size='small'>
                            <Descriptions.Item label="Max Cell Area">{maxCoverageDistance} sq km</Descriptions.Item>
                            <Descriptions.Item label="Total Cells Needed">{totalCellsNeeded} cell</Descriptions.Item>
                            <Descriptions.Item label="Traffic Per User Per Day">{trafficPerUserPerDay} call/min</Descriptions.Item>
                            <Descriptions.Item label="Total Traffic Per Day">{totalTrafficPerDay} call</Descriptions.Item>
                            <Descriptions.Item label="Traffic Per Cell Per Day">{trafficPerCellPerDay} call</Descriptions.Item>
                            <Descriptions.Item label="Initial Cluster Size">{cellsPerCluster} cell</Descriptions.Item>
                            <Descriptions.Item label="Initial Grade Of Service">{initialGradeOfService}</Descriptions.Item>
                            <Descriptions.Item label="Initial Channels Per Cell">{initialChannelsPerCell} channel</Descriptions.Item>
                            <Descriptions.Item label="Initial Carriers Needed">{initialCarriersNeeded} carrier</Descriptions.Item>
                            <Descriptions.Item label="Improved Grade Of Service">{newGradeOfService}</Descriptions.Item>
                            <Descriptions.Item label="Improved Channels Per Cell">{newChannelsPerCell} channel</Descriptions.Item>
                            <Descriptions.Item label="Improved Carriers Needed">{newCarriersNeeded} carrier</Descriptions.Item>


                        </Descriptions>

                    </>
                ) : (
                    <Descriptions title="Results" column={2}><p>Submit the form to see the results</p></Descriptions>

                )}
            </section>
        </Flex>
    );
}