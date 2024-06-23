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