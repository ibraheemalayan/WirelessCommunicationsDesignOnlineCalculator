import {
    Select
} from 'antd';


// fomrat Hz and KHz
export const HzKHzFormatter = (value: number, unit: string) => {
    if (!value) {
        return '';
    }
    if (unit === 'Hz') {
        return `${value}`;
    } else if (unit === 'KHz') {
        return `${value / 1000}`;
    } else if (unit === 'MHz') {
        return `${value / 1000000}`;
    }
    return '';
};

const { Option } = Select;


// parse Hz and KHz
export const HzKHzParser = (displayValue: string | undefined, unit: string) => {
    if (!displayValue) {
        return 0;
    }
    if (unit === 'MHz') {
        return Number(displayValue) * 1000000;
    } else if (unit === 'KHz') {
        return Number(displayValue) * 1000;
    } else {
        return Number(displayValue);
    }
};

// frequency select that takes a function to set the unit
export const frequencyUnitSelector = (setUnit: (unit: string) => void, initialUnit = 'Hz') => (
    <Select defaultValue={initialUnit} style={{ width: 80 }} onChange={(unit) => setUnit(unit)}>
        <Option value="Hz" >Hz</Option>
        <Option value="KHz" >KHz</Option>
        <Option value="MHz" >MHz</Option>
    </Select>
);

// seconds

// format seconds s, ms, ns
export const secondsFormatter = (value: number, unit: string) => {
    if (!value) {
        return '';
    }
    if (unit === 's') {
        return `${(value * 1).toFixed(3)}`;
    } else if (unit === 'ms') {
        return `${(value * 1000).toFixed(3)}`;
    } else if (unit === 'ns') {
        return `${(value * 1000000).toFixed(1)}`;
    }
    return '';
};

// parse seconds s, ms, ns
export const secondsParser = (displayValue: string | undefined, unit: string) => {
    if (!displayValue) {
        return 0;
    }
    if (unit === 'ns') {
        return Number(displayValue) / 1000000;
    } else if (unit === 'ms') {
        return Number(displayValue) / 1000;
    } else {
        return Number(displayValue);
    }
};

// seconds select that takes a function to set the unit
export const secondsUnitSelector = (setUnit: (unit: string) => void, initialUnit = 's') => (
    <Select defaultValue={initialUnit} style={{ width: 80 }} onChange={(unit) => setUnit(unit)}>
        <Option value="s" >s</Option>
        <Option value="ms" >ms</Option>
        <Option value="ns" >ns</Option>
    </Select>
);

// bits and bps

export const bpsFormatter = (value: number, unit: string) => {
    if (!value) {
        return '';
    }
    if (unit === 'bps') {
        return `${value}`;
    } else if (unit === 'Kbps') {
        return `${value / 1000}`;
    } else if (unit === 'Mbps') {
        return `${value / 1000000}`;
    } else if (unit === 'Gbps') {
        return `${value / 1000000000}`;
    }
    return '';
}
export const bpsParser = (displayValue: string | undefined, unit: string) => {
    if (!displayValue) {
        return 0;
    }
    if (unit === 'Gbps') {
        return Number(displayValue) * 1000000000;
    } else if (unit === 'Mbps') {
        return Number(displayValue) * 1000000;
    } else if (unit === 'Kbps') {
        return Number(displayValue) * 1000;
    } else {
        return Number(displayValue);
    }
}

export const bpsUnitSelector = (setUnit: (unit: string) => void, initialUnit = 'bps') => (
    <Select defaultValue={initialUnit} style={{ width: 80 }} onChange={(unit) => setUnit(unit)}>
        <Option value="bps" >bps</Option>
        <Option value="Kbps" >Kbps</Option>
        <Option value="Mbps" >Mbps</Option>
        <Option value="Gbps" >Gbps</Option>
    </Select>
);

// db, dbm, watt
export const dbFormatter = (value: number, unit: string) => {
    if (!value) {
        return '';
    }

    if (unit === 'dB') {
        return `${value}`;
    } else if (unit === 'dBm') {
        value = (value * 1) + 30;
        return `${value}`;
    } else if (unit === 'W') {
        return `${10 * Math.log10(value)}`;
    }
    return '';
}

export const dbParser = (displayValue: string | undefined, unit: string) => {
    if (!displayValue) {
        return 0;
    }
    if (unit === 'W') {
        return Math.pow(10, Number(displayValue) / 10);
    } else if (unit === 'dBm') {
        return Number(displayValue) - 30;
    } else {
        return Number(displayValue);
    }
}

export const dbUnitSelector = (setUnit: (unit: string) => void, initialUnit = 'dB') => (
    <Select defaultValue={initialUnit} style={{ width: 80 }} onChange={(unit) => setUnit(unit)}>
        <Option value="dB" >dB</Option>
        <Option value="dBm" >dBm</Option>
        <Option value="W" >W</Option>
    </Select>
);

// convert value in bps to string with relevant units (bps, Kbps, Mbps, Gbps) 
export const bpsTxtFormatter = (value: number) => {

    value = Math.abs(value);
    if (value < 1000) {
        return `${value} bps`;
    } else if (value < 1000000) {
        return `${(value / 1000).toFixed(2)} Kbps`;
    } else if (value < 1000000000) {
        return `${(value / 1000000).toFixed(2)} Mbps`;
    } else {
        return `${(value / 1000000000).toFixed(2)} Gbps`;
    }
}

// convert value in bits to string with relevant units (bits, Kb, Mb, Gb)
export const bitsTxtFormatter = (value: number) => {
    if (value < 1000) {
        return `${value} bit`;
    } else if (value < 1000000) {
        return `${(value / 1000).toFixed(2)} Kb`;
    } else if (value < 1000000000) {
        return `${(value / 1000000).toFixed(2)} Mb`;
    } else {
        return `${(value / 1000000000).toFixed(2)} Gb`;
    }
}

export const hzTxtFormatter = (value: number) => {
    if (value < 1000) {
        return `${value} Hz`;
    } else if (value < 1000000) {
        return `${(value / 1000).toFixed(2)} KHz`;
    } else if (value < 1000000000) {
        return `${(value / 1000000).toFixed(2)} MHz`;
    } else {
        return `${(value / 1000000000).toFixed(2)} GHz`;
    }
}



export function getEbNo(ber: number, scheme: string) {
    // Data initialization (replace with your actual data)
    const data: { [key: string]: number[] } = {
        "Eb/No [dB]": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
        "BPSK/QPSK": [5.95E-03, 2.39E-03, 7.73E-04, 1.91E-04, 3.36E-05, 3.87E-06, 2.61E-07, 9.01E-09, 1.33E-10, 6.81E-13, 9.12E-16, 2.27E-19, 6.76E-24, 1.40E-29, 1.00E-36, 0.00E+00, 0.00E+00, 0.00E+00, 0.00E+00, 0.00, 0.00E+00, 0.00E+00, 0.00E+00, 0.00E+00],
        "8-PSK": [3.19E-02, 2.05E-02, 1.20E-02, 6.18E-03, 2.75E-03, 1.01E-03, 2.94E-04, 6.34E-05, 9.42E-06, 8.76E-07, 4.52E-08, 1.11E-09, 1.07E-11, 3.21E-14, 2.19E-17, 2.33E-21, 2.39E-26, 1.29E-32, 0.00, 0.00E+00, 0.00E+00, 0.00E+00, 0.00E+00, 0.00E+00],
        "16-PSK": [8.29E-02, 6.82E-02, 5.43E-02, 4.15E-02, 3.00E-02, 2.02E-02, 1.26E-02, 7.01E-03, 3.43E-03, 1.42E-03, 4.79E-04, 1.25E-04, 2.34E-05, 2.93E-06, 2.19E-07, 8.57E-09, 1.49E-10, 9.35E-13, 1.62E-15, 5.55E-19, 2.49E-23, 8.57E-29, 1.17E-35, 0.00E+00]
    };

    let minDiff = Infinity;
    let closestIndex = -1;

    for (let i = 0; i < data[scheme].length; i++) {
        const diff = Math.abs(ber - data[scheme][i]);
        if (diff < minDiff) {
            minDiff = diff;
            closestIndex = i;
        }
    }

    return closestIndex !== -1 ? data["Eb/No [dB]"][closestIndex] : 0;
}