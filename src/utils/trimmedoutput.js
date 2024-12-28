function getTrimmedOverview(overview) {
    if (!overview) return ''; // Return empty if no overview exists

    // Find the position of the first full stop
    const firstStop = overview.indexOf('.');

    // If a full stop is found, slice the string till that position
    if (firstStop !== -1) {
        return overview.slice(0, firstStop + 1); // Include the full stop
    }

    // If no full stop is found, return the entire overview
    return overview;
}
export default getTrimmedOverview