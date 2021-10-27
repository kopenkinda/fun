/**
 *
 */
type GenericFlag<T, C extends string = 'unknown'> = {
  description: string;
  value: T;
  type: C;
};
type StringFlag = GenericFlag<string, 'string'>;
type NumberFlag = GenericFlag<number, 'number'>;
type BooleanFlag = GenericFlag<boolean, 'boolean'>;
type DateFlag = GenericFlag<Date, 'date'>;
export type Flag = StringFlag | NumberFlag | BooleanFlag | DateFlag;

/**
 *
 */
type ParsedGenericFlag<T> = Pick<GenericFlag<T>, 'value'>;
type ParsedStringFlag = ParsedGenericFlag<string>;
type ParsedNumberFlag = ParsedGenericFlag<number>;
type ParsedBooleanFlag = ParsedGenericFlag<boolean>;
type ParsedDateFlag = ParsedGenericFlag<Date>;
export type ParsedFlag = ParsedStringFlag | ParsedNumberFlag | ParsedBooleanFlag | ParsedDateFlag;

/**
 *
 */
type RegisterGenericFlag<T> = (name: string, value: T, description: string) => ParsedGenericFlag<T>;
type RegisterStringFlag = RegisterGenericFlag<string>;
type RegisterNumberFlag = RegisterGenericFlag<number>;
type RegisterBooleanFlag = RegisterGenericFlag<boolean>;
type RegisterDateFlag = RegisterGenericFlag<Date>;
export type RegisterFlag = {
  String: RegisterStringFlag;
  Number: RegisterNumberFlag;
  Boolean: RegisterBooleanFlag;
  Date: RegisterDateFlag;
};
/**
 *
 */
export type PrintDefaultsFn = () => void;
export type ParseFn = () => void;
