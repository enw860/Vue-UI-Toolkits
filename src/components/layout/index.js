import { pluginFactory } from "../../utils/plugins";

import MaskLayer from "./maskLayer";
import Separator from "./separator";
import Slideout from "./slideout";

export default pluginFactory({
    plugins: [
        MaskLayer,
        Separator,
        Slideout
    ]
})