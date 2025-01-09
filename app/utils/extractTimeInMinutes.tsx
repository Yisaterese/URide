// Helper function to extract and calculate time in minutes
export default function extractTimeInMinutes(timeString: string): number {
    try {
        // Extract all numeric values from the string
        const timeNumbers = timeString.match(/\d+/g);

        if (!timeNumbers) {
            throw new Error(`No numeric values found in timeString: "${timeString}"`);
        }

        let totalMinutes = 0;

        // Process 'hour'
        if (timeString.includes('hour')) {
            const hoursIndex = timeString.indexOf('hour') > -1 ? 0 : -1;
            totalMinutes += hoursIndex !== -1 ? (parseInt(timeNumbers[0], 10) || 0) * 60 : 0;
        }

        // Process 'minute'
        if (timeString.includes('minute')) {
            const minutesIndex = timeString.indexOf('hour') > -1 ? 1 : 0;
            totalMinutes += (parseInt(timeNumbers[minutesIndex], 10) || 0);
        }

        // Process 'second'
        if (timeString.includes('second')) {
            const secondsIndex = timeString.includes('minute') ? timeNumbers.length - 1 : 0;
            totalMinutes += (parseInt(timeNumbers[secondsIndex], 10) || 0) / 60;
        }

        return totalMinutes;
    } catch (error) {
        return 0
        ; // Return 0 if there is any error or invalid time format
    }
}
