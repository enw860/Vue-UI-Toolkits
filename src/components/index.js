import { pluginFactory } from "../utils/plugins";

import "../style/style.less";

import InformationalPlugins from "./infomational";
import InputsPlugins from "./inputs";
import LayoutPlugins from "./layout";
import WrapperPlugins from "./wrapper";

export default pluginFactory({
    plugins: [
        InformationalPlugins,
        InputsPlugins,
        LayoutPlugins,
        WrapperPlugins
    ]
})