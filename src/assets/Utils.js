const HandleEmpty = (val) => {
    const emptyString = "-- VAZIO --";
    if (!val) return emptyString;
    if (val && val === '') return emptyString;
    return val;
};

export default HandleEmpty;