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