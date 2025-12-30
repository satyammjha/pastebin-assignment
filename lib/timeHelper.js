export function getCurrentTime(req) {
    if (process.env.TEST_MODE === '1') {
        const testHeader = req.headers['x-test-now-ms'];
        if (testHeader) {
            const parsed = parseInt(testHeader, 10);
            if (!isNaN(parsed)) {
                return new Date(parsed);
            }
        }
    }
    return new Date();
}