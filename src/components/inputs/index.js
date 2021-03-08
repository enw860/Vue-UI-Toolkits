import { pluginFactory } from "../../utils/plugins";

import Input from "./input";
import Toggle from "./toggle";

export default pluginFactory({
    plugins: [
        Input,
        Toggle,
    ]
})