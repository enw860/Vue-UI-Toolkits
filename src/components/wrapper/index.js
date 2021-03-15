import { pluginFactory } from "../../utils/plugins";

import Dropdown from "./dropDown";
import LabelWrapper from "./labelWrapper";
import Popup from "./popup";
import Tooltip from "./tooltip";

export default pluginFactory({
    plugins: [
        Dropdown,
        LabelWrapper,
        Popup,
        Tooltip,
    ]
})