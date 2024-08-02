export const isValidEnum = (value: any, enumStore: any) => {
    return Object.values(enumStore).includes(value);
}

