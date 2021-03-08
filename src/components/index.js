import { pluginFactory } from "../utils/plugins";

import InformationalPlugins from "./infomational";
import LayoutPlugins from "./layout";
import WrapperPlugins from "./wrapper";

export default pluginFactory({
    plugins: [
        InformationalPlugins,
        LayoutPlugins,
        WrapperPlugins
    ]
})