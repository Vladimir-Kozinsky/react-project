
export const RequiredField = value => {
    if (value) {
        return undefined;
    }
    return " Field must be filled. ";
}

export const MaxLengthCreator = (maxLenght) => (value) => {
    if (value && value.length > maxLenght) return ` Max length is more then ${maxLenght} symbols. `;
    return undefined;
}