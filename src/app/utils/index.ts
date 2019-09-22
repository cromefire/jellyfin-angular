export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function assertNever(value: never): never {
    throw new Error(`Unexpected value "${value}"`);
}
