export declare function convertMaskToPlaceholder(mask?: any, localPlaceholderChar?: string): string;
export declare function isArray(value: any): value is any[];
export declare function isString(value: any): value is string | String;
export declare function isNumber(value: any): boolean;
export declare function isNil(value: any): boolean;
export declare function processCaretTraps(mask: any): {
    maskWithoutCaretTraps: any;
    indexes: number[];
};
