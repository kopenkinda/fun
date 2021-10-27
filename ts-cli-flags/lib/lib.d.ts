import type { PrintDefaultsFn, ParseFn } from './lib.types';
declare const _default: {
    number: (name: string, value: number, description: string) => {
        value: number;
    };
    string: (name: string, value: string, description: string) => {
        value: string;
    };
    boolean: (name: string, value: boolean, description: string) => {
        value: boolean;
    };
    date: (name: string, value: Date, description: string) => {
        value: Date;
    };
    printDefaults: PrintDefaultsFn;
    parse: ParseFn;
    parsed: () => boolean;
};
export default _default;
