export declare function createNumberMask({ prefix, suffix, includeThousandsSeparator, thousandsSeparatorSymbol, allowDecimal, decimalSymbol, decimalLimit, requireDecimal, allowNegative, allowLeadingZeroes, integerLimit }?: {
    prefix?: string;
    suffix?: string;
    includeThousandsSeparator?: boolean;
    thousandsSeparatorSymbol?: string;
    allowDecimal?: boolean;
    decimalSymbol?: string;
    decimalLimit?: number;
    requireDecimal?: boolean;
    allowNegative?: boolean;
    allowLeadingZeroes?: boolean;
    integerLimit?: any;
}): {
    (rawValue?: string): any;
    instanceOf: string;
};
