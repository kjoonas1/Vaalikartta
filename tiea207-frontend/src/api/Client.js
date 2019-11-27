import { createClient } from "react-fetching-library"

import { requestHostInterceptor } from "./requestHostInterceptor.js"
import {backendUrl} from "../constants"

export const Client = createClient({
    requestInterceptors: [requestHostInterceptor(backendUrl)],
});