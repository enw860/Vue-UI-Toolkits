import { pluginFactory } from "../utils/plugins";

import InformationalPlugins from "./infomational";
import WrapperPlugins from "./wrapper";

export default pluginFactory({
    plugins: [
        InformationalPlugins,
        WrapperPlugins
    ]
})