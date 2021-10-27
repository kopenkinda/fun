"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registered = new Map();
const parsed = new Map();
let isParsed = false;
const registerNumber = (name, value, description) => {
    registered.set(name, { description, value, type: 'number' });
    const ref = { value };
    parsed.set(name, ref);
    return ref;
};
const registerString = (name, value, description) => {
    registered.set(name, { description, value, type: 'string' });
    const ref = { value };
    parsed.set(name, ref);
    return ref;
};
const registerBool = (name, value, description) => {
    registered.set(name, { description, value, type: 'boolean' });
    const ref = { value };
    parsed.set(name, ref);
    return ref;
};
const registerDate = (name, value, description) => {
    registered.set(name, { description, value, type: 'date' });
    const ref = { value };
    parsed.set(name, ref);
    return ref;
};
const printDefaults = () => {
    const entries = registered.entries();
    for (const entry of entries) {
        const flag = entry[0];
        const info = entry[1];
        console.log('  -%s %s\n    %s (Default: %s)', flag, info.type, info.description, info.value.toString());
    }
};
const parse = () => {
    const args = process.argv.slice(2);
    // ? Parse next argument
    let flag = '';
    let flagArg = '';
    for (let argIdx = 0; argIdx < args.length; argIdx++) {
        const current = args[argIdx];
        let next = args === null || args === void 0 ? void 0 : args[argIdx + 1];
        if (current.startsWith('---'))
            throw new Error('Please use -flag or --flag');
        for (let charIdx = 0; charIdx < current.length; charIdx++) {
            const char = current[charIdx];
            if (char === '-' && flag === '')
                continue;
            if (char === '=') {
                flagArg = current.slice(charIdx + 1);
                charIdx = current.length;
                continue;
            }
            flag += char;
        }
        while (next !== undefined && !next.startsWith('-')) {
            flagArg += ' ';
            flagArg += next;
            argIdx += 1;
            next = args === null || args === void 0 ? void 0 : args[argIdx + 1];
        }
        const registeredFlag = registered.get(flag);
        const parsedFlag = parsed.get(flag);
        // ? Update the reference if the type is supported
        if (registeredFlag !== undefined && parsedFlag !== undefined) {
            if (registeredFlag.type === 'number') {
                const v = Number(flagArg);
                if (Number.isNaN(v)) {
                    throw new Error(`Flag -${flag} is of type ${registeredFlag.type}.\nProvided: ${flagArg}`);
                }
                parsedFlag.value = v;
            }
            if (registeredFlag.type === 'boolean') {
                if (flagArg === '') {
                    parsedFlag.value = true;
                }
                else if (['1', 't', 'T', 'true', 'TRUE', 'True'].includes(flagArg)) {
                    parsedFlag.value = true;
                }
                else if (['0', 'f', 'F', 'false', 'FALSE', 'False'].includes(flagArg)) {
                    parsedFlag.value = false;
                }
                else {
                    throw new Error(`Flag -${flag} is of type ${registeredFlag.type}.\nAccepts: 1, 0, t, f, T, F, true, false, TRUE, FALSE, True, False\nProvided: ${flagArg}`);
                }
            }
            if (registeredFlag.type === 'string') {
                parsedFlag.value = flagArg;
            }
            if (registeredFlag.type === 'date') {
                const v = Date.parse(flagArg);
                if (Number.isNaN(v))
                    throw new Error(`Flag -${flag} is of type ${registeredFlag.type}.\nProvided: ${flagArg}`);
                parsedFlag.value = new Date(v);
            }
        }
        flag = '';
        flagArg = '';
    }
    isParsed = true;
};
exports.default = {
    number: registerNumber,
    string: registerString,
    boolean: registerBool,
    date: registerDate,
    printDefaults,
    parse,
    parsed: () => isParsed,
};
