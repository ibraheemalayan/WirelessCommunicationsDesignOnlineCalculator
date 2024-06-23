import React, { useState } from 'react';
import {
    Flex,
    Divider,
} from 'antd';

import { Descriptions } from 'antd';
import { OFDMInputFormComponent } from './ofdm_form';
import { bitsTxtFormatter, bpsTxtFormatter, hzTxtFormatter } from './functions';




export default function OFDMTab() {

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    // state
    const [bandwidth, setBandwidth] = useState<number>(1000);
    const [subCarrierSpacing, setSubCarrierSpacing] = useState<number>(15);
    const [ofdmSymbols, setOFDMSymbols] = useState<number>(10);
    const [symbolDuration, setSymbolDuration] = useState<number>(0.1);
    const [qam_symbols, setQAMSymbols] = useState<number>(4);
    const [parallel_blocks, setParallelBlocks] = useState<number>(1);

    const setAndCalculate = (
        bandwidth: number,
        subCarrierSpacing: number,
        ofdmSymbols: number,
        symbolDuration: number,
        qam_symbols: number,
        parallel_blocks: number
    ) => {
        setBandwidth(bandwidth);
        setSubCarrierSpacing(subCarrierSpacing);
        setOFDMSymbols(ofdmSymbols);
        setSymbolDuration(symbolDuration);
        setQAMSymbols(qam_symbols);
        setParallelBlocks(parallel_blocks);
        setIsSubmitted(true);
    }

    // log2 qam_symbols
    const number_of_bits_per_resource_block = Math.log2(qam_symbols);
    const number_of_subcarriers = bandwidth / subCarrierSpacing;
    const number_of_bits_per_symbol = number_of_bits_per_resource_block * number_of_subcarriers;
    const number_of_bits_per_ofdm_resource_block = number_of_bits_per_symbol * ofdmSymbols;

    const maximum_transmission_rate_per_resource_block = parallel_blocks * number_of_bits_per_ofdm_resource_block / symbolDuration;



    return (
        <Flex justify='start' align='flex-start' vertical={false}>
            <section>
                <OFDMInputFormComponent
                    setValues={setAndCalculate}
                />
            </section>
            <Divider type='vertical' />
            <section>
                {isSubmitted ? (
                    <>
                        <Descriptions title="Inputs" column={2}>
                            <Descriptions.Item label="Bandwidth">{hzTxtFormatter(bandwidth)}</Descriptions.Item>
                            <Descriptions.Item label="Sub Carrier Spacing">{hzTxtFormatter(subCarrierSpacing)}</Descriptions.Item>
                            <Descriptions.Item label="OFDM Symbols">{ofdmSymbols} symbols</Descriptions.Item>
                            <Descriptions.Item label="Symbol Duration">{symbolDuration} sec</Descriptions.Item>
                            <Descriptions.Item label="Modulation">{qam_symbols}-QAM</Descriptions.Item>
                            <Descriptions.Item label="Parallel Blocks">{parallel_blocks}</Descriptions.Item>
                        </Descriptions>
                        <Descriptions title="Results" column={1} bordered size='small'>
                            <Descriptions.Item label="Number of Bits per Resource Block">{bitsTxtFormatter(number_of_bits_per_resource_block)}</Descriptions.Item>
                            <Descriptions.Item label="Number of Subcarriers">{number_of_subcarriers}</Descriptions.Item>
                            <Descriptions.Item label="Number of Bits per Symbol">{bitsTxtFormatter(number_of_bits_per_symbol)}</Descriptions.Item>
                            <Descriptions.Item label="Number of Bits per OFDM Resource Block">{bitsTxtFormatter(number_of_bits_per_ofdm_resource_block)}</Descriptions.Item>
                            <Descriptions.Item label="Maximum Transmission Rate per Resource Block">{bpsTxtFormatter(maximum_transmission_rate_per_resource_block)}</Descriptions.Item>


                        </Descriptions>

                    </>
                ) : (
                    <Descriptions title="Results" column={2}><p>Submit the form to see the results</p></Descriptions>

                )}
            </section>
        </Flex >
    );
}