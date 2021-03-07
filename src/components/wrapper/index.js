import { pluginFactory } from "../../utils/plugins";

import Dropdown from "./dropDown";
import LabelWrapper from "./labelWrapper";
import Popup from "./Popup";

export default pluginFactory({
    plugins: [
        Dropdown,
        LabelWrapper,
        Popup,
    ]
})