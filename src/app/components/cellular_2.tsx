import React, { useState } from 'react';
import {
    Flex,
    Divider,
} from 'antd';

import { Descriptions } from 'antd';
import { bitsTxtFormatter, bpsTxtFormatter, dbFormatter, erlangBLookup, findClusterSize, hzTxtFormatter, secTxtFormatter } from './functions';
import { CellularInputFormComponent } from './cellular_form_2';




export default function CellularTab2() {

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
    const [cityAreaInKmSq, setCityArea] = useState<number>(4);
    const [numSubscribers, setNumSubscribers] = useState<number>(80000);
    const [callsPerSubscriberPerDay, setCallsPerSubscriber] = useState<number>(3);
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

    const co_channel_interfering_cells = 6;

    // ----- Conversion of dB to Watt -----

    const powerRefDistanceInWatt = Math.pow(10, powerRefDistance / 10);
    const minSIRInWatt = Math.pow(10, minSir / 10);
    const receiverSensitivityInWatt = Math.pow(10, receiverSensitivity / 10);

    // ----- Cluster Size Calculation -----

    const minClusterSize = (Math.pow(co_channel_interfering_cells * minSIRInWatt, 2 / pathLossExponent)) / 3;
    const [N_ClusterSize, i, j] = findClusterSize(minClusterSize); // Assuming findClusterSize adjusts based on constraints

    // ----- Cell Size Calculation -----

    // equation is Pr = P_ref * (d_ref / d)^n
    // Pr = receiver sensitivity
    // P_ref = power reference distance
    // d_ref = reference distance
    // d = distance from the transmitter ( cell radius )
    // n = path loss exponent

    // rearranging the equation to get the cell radius
    // Pr/P_ref = (d_ref / d)^n
    // (Pr / P_ref)^(1/n) = d_ref / d
    // d = d_ref / (Pr / P_ref)^(1/n)

    const cellRadius = referenceDistance / Math.pow(receiverSensitivityInWatt / powerRefDistanceInWatt, 1 / pathLossExponent);

    // cells are hexagonal in shape
    const cellArea = (3 * Math.sqrt(3) * Math.pow(cellRadius, 2)) / 2;
    const cellAreaInKmSq = cellArea / 1000000;

    const totalNumberOfCellsUnceiled = cityAreaInKmSq / cellAreaInKmSq;

    const totalNumberOfCells = Math.ceil(totalNumberOfCellsUnceiled);

    // ----- Traffic Calculations -----

    const callDurationInMin = callDuration / 60; // seconds to minutes

    const trafficPerUserInErlang = (callsPerSubscriberPerDay * callDurationInMin) / (24 * 60)
    const totalTrafficInErlangs = trafficPerUserInErlang * numSubscribers;
    const trafficPerCellInErlangs = totalTrafficInErlangs / totalNumberOfCells;





    // ----- Channel and Carrier Calculations (Initial GradeOfService) -----

    const GradeOfService = callDropProbability;
    const ChannelsPerCell = erlangBLookup(trafficPerCellInErlangs, GradeOfService);
    const CarriersNeeded = ChannelsPerCell / timeslotsPerCarrier;



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
                            <Descriptions.Item label="City Area">{cityAreaInKmSq} km<sup>2</sup></Descriptions.Item>
                            <Descriptions.Item label="Number of Subscribers">{numSubscribers} user</Descriptions.Item>
                            <Descriptions.Item label="Calls Per Subscriber">{callsPerSubscriberPerDay} call</Descriptions.Item>
                            <Descriptions.Item label="Call Duration">{secTxtFormatter(callDuration)}</Descriptions.Item>
                            <Descriptions.Item label="Call Drop Probability">{callDropProbability}</Descriptions.Item>
                            <Descriptions.Item label="Minimum SIR">{minSir} db</Descriptions.Item>
                            <Descriptions.Item label="Power Reference Distance">{powerRefDistance} db</Descriptions.Item>
                            <Descriptions.Item label="Reference Distance">{referenceDistance} m</Descriptions.Item>
                            <Descriptions.Item label="Path Loss Exponent">{pathLossExponent}</Descriptions.Item>
                            <Descriptions.Item label="Timeslots Per Carrier">{timeslotsPerCarrier} slot</Descriptions.Item>
                            <Descriptions.Item label="Receiver Sensitivity">{receiverSensitivity} db</Descriptions.Item>
                        </Descriptions>
                        <Descriptions title="Results" column={1} bordered size='small'>
                            <Descriptions.Item label="Min Cluster Size">{minClusterSize.toFixed(2)} cell</Descriptions.Item>
                            <Descriptions.Item label="Actual Cluster Size">{N_ClusterSize} cell (i={i}, j={j})</Descriptions.Item>
                            <Descriptions.Item label="Cell Radius">{cellRadius.toFixed(2)} m</Descriptions.Item>
                            {/* if cell area km < 0.8 show it in sq m */}
                            <Descriptions.Item label="Cell Area">{cellAreaInKmSq < 0.8 ? `${cellArea.toFixed(2)} m` : `${cellAreaInKmSq.toFixed(2)} km`} <sup>2</sup></Descriptions.Item>
                            <Descriptions.Item label="Total Cells In City">{totalNumberOfCellsUnceiled.toFixed(3)} &rarr; {totalNumberOfCells} cell</Descriptions.Item>
                            <Descriptions.Item label="Traffic Per User">{trafficPerUserInErlang.toFixed(4)} Erlang</Descriptions.Item>
                            <Descriptions.Item label="Total Traffic">{totalTrafficInErlangs.toFixed(2)} Erlang</Descriptions.Item>
                            <Descriptions.Item label="Traffic Per Cell">{trafficPerCellInErlangs.toFixed(2)} Erlang</Descriptions.Item>


                            <Descriptions.Item label="Grade Of Service">{GradeOfService}</Descriptions.Item>
                            <Descriptions.Item label="Channels Per Cell">{ChannelsPerCell} channel</Descriptions.Item>
                            <Descriptions.Item label="Carriers Needed">{CarriersNeeded.toFixed(2)} &rarr; {Math.ceil(CarriersNeeded)}  carrier</Descriptions.Item>

                        </Descriptions>

                    </>
                ) : (
                    <Descriptions title="Results" column={2}><p>Submit the form to see the results</p></Descriptions>

                )}
            </section>
        </Flex >
    );
}