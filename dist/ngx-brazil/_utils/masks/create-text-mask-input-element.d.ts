export declare function createTextMaskInputElement(config: any): {
    state: {
        previousConformedValue: any;
        previousPlaceholder: any;
    };
    update(rawValue: any, { inputElement, mask: providedMask, guide, pipe, placeholderChar, keepCharPositions, showMask }?: any): void;
};
