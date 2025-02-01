import { ElementRef, OnChanges, Provider, SimpleChanges, RendererFactory2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { conformToMask as conformToMaskLocal } from './_utils/masks/conform-to-mask';
import * as i0 from "@angular/core";
export declare const conformToMask: typeof conformToMaskLocal;
export declare class TextMaskConfig {
    mask: Array<string | RegExp> | ((raw: string) => Array<string | RegExp>) | false;
    guide?: boolean;
    placeholderChar?: string;
    pipe?: (conformedValue: string, config: TextMaskConfig) => false | string | object;
    keepCharPositions?: boolean;
    showMask?: boolean;
}
export declare const MASKEDINPUT_VALUE_ACCESSOR: Provider;
/**
 * We must check whether the agent is Android because composition events
 * behave differently between iOS and Android.
 */
export declare function _isAndroid(): boolean;
export declare class MaskedInputDirective implements ControlValueAccessor, OnChanges {
    private _elementRef;
    private _compositionMode;
    textMaskConfig: TextMaskConfig;
    private textMaskInputElement;
    private inputElement;
    private _renderer;
    /** Whether the user is creating a composition string (IME events). */
    private _composing;
    constructor(rendererFactory: RendererFactory2, _elementRef: ElementRef, _compositionMode: boolean);
    onChange: (_: any) => void;
    onTouched: () => void;
    ngOnChanges(changes: SimpleChanges): void;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    _handleInput(value: any): void;
    _setupMask(create?: boolean): void;
    _compositionStart(): void;
    _compositionEnd(value: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MaskedInputDirective, [null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MaskedInputDirective, "[textMask]", ["textMask"], { "textMaskConfig": { "alias": "textMask"; "required": false; }; }, {}, never, never, true, never>;
}
