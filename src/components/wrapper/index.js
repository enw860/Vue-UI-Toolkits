import { pluginFactory } from "../../utils/plugins";

import Dropdown from "./dropDown";
import LabelWrapper from "./labelWrapper";

export default pluginFactory({
    plugins: [
        Dropdown,
        LabelWrapper,
    ]
})