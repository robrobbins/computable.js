export declare const APPLICATION = 1;
export declare const CHALLENGE = 2;
export declare const LISTING_ABI: ({
    "name": string;
    "inputs": ({
        "type": string;
        "name": string;
        "indexed": boolean;
        "unit"?: undefined;
    } | {
        "type": string;
        "name": string;
        "indexed": boolean;
        "unit": string;
    })[];
    "anonymous": boolean;
    "type": string;
    "outputs"?: undefined;
    "constant"?: undefined;
    "payable"?: undefined;
    "gas"?: undefined;
} | {
    "outputs": never[];
    "inputs": {
        "type": string;
        "name": string;
    }[];
    "constant": boolean;
    "payable": boolean;
    "type": string;
    "name"?: undefined;
    "anonymous"?: undefined;
    "gas"?: undefined;
} | {
    "name": string;
    "outputs": never[];
    "inputs": ({
        "type": string;
        "name": string;
        "unit"?: undefined;
    } | {
        "type": string;
        "unit": string;
        "name": string;
    })[];
    "constant": boolean;
    "payable": boolean;
    "type": string;
    "gas": number;
    "anonymous"?: undefined;
} | {
    "name": string;
    "outputs": ({
        "type": string;
        "name": string;
        "unit"?: undefined;
    } | {
        "type": string;
        "unit": string;
        "name": string;
    })[];
    "inputs": {
        "type": string;
        "name": string;
    }[];
    "constant": boolean;
    "payable": boolean;
    "type": string;
    "gas": number;
    "anonymous"?: undefined;
})[];
