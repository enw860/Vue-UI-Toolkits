import { pluginFactory } from "../../utils/plugins";

import Input from "./input";
import Ranger from "./toggle";
import Toggle from "./toggle";

export default pluginFactory({
    plugins: [
        Input,
        Ranger,
        Toggle,
    ]
})