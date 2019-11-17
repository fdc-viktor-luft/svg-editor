const convertToNumber = (value: string): number | undefined => {
    if (!value) return undefined;
    const parsed = Number(value);
    return isNaN(parsed) ? undefined : parsed;
};

const inputHandler = (cb?: (event: any) => unknown | void) => (event: any) => {
    event.preventDefault();
    const target = event.target;
    const change = target.value;
    const value = target.type === 'number' ? convertToNumber(change) : change;
    if (cb) cb(value);
};

export const EventUtil = { inputHandler };
