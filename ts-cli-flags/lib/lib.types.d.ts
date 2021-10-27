/**
 *
 */
declare type GenericFlag<T, C extends string = 'unknown'> = {
    description: string;
    value: T;
    type: C;
};
declare type StringFlag = GenericFlag<string, 'string'>;
declare type NumberFlag = GenericFlag<number, 'number'>;
declare type BooleanFlag = GenericFlag<boolean, 'boolean'>;
declare type DateFlag = GenericFlag<Date, 'date'>;
export declare type Flag = StringFlag | NumberFlag | BooleanFlag | DateFlag;
/**
 *
 */
declare type ParsedGenericFlag<T> = Pick<GenericFlag<T>, 'value'>;
declare type ParsedStringFlag = ParsedGenericFlag<string>;
declare type ParsedNumberFlag = ParsedGenericFlag<number>;
declare type ParsedBooleanFlag = ParsedGenericFlag<boolean>;
declare type ParsedDateFlag = ParsedGenericFlag<Date>;
export declare type ParsedFlag = ParsedStringFlag | ParsedNumberFlag | ParsedBooleanFlag | ParsedDateFlag;
/**
 *
 */
declare type RegisterGenericFlag<T> = (name: string, value: T, description: string) => ParsedGenericFlag<T>;
declare type RegisterStringFlag = RegisterGenericFlag<string>;
declare type RegisterNumberFlag = RegisterGenericFlag<number>;
declare type RegisterBooleanFlag = RegisterGenericFlag<boolean>;
declare type RegisterDateFlag = RegisterGenericFlag<Date>;
export declare type RegisterFlag = {
    String: RegisterStringFlag;
    Number: RegisterNumberFlag;
    Boolean: RegisterBooleanFlag;
    Date: RegisterDateFlag;
};
/**
 *
 */
export declare type PrintDefaultsFn = () => void;
export declare type ParseFn = () => void;
export {};
