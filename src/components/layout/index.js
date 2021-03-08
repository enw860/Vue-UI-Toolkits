import { pluginFactory } from "../../utils/plugins";

import MaskLayer from "./maskLayer";
import Separator from "./separator";


export default pluginFactory({
    plugins: [
        MaskLayer,
        Separator
    ]
})