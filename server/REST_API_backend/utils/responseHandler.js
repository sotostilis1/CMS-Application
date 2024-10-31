
export const handleSuccess = (res, statusCode, message, ) => {
    res.status(statusCode).json({ message });
};

export const handleError = (res) => (message) => {
    res.status(500).json({ message });
};
