export const requestHostInterceptor = host => () => async action => {
    return {
        ...action,
        endpoint: `${host}${action.endpoint}`
    }
}
// Otettu mallia react-fetching-library dokumentaatiosta