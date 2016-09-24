

function stateWithNewerQueryTime(oldState, potentialNewState) {
    // The potentialNewState could be stale because API calls don't always come back in the order they were sent.
    // As a result, only update the state if the data comes from a newer query than what we already have.

    // Ties go to the potentialNewState - updated data from the same query time is better.
    // This allows setting queryTime into state at request time and having state be overwritten only by the return of that request or a newer one.
    return oldState.queryTime > potentialNewState.queryTime ? oldState : potentialNewState;
}

export default stateWithNewerQueryTime;
