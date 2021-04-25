import { pluginFactory } from "../../utils/plugins";
import "./index.less";

import Input from "./input";
import Slider from "./slider";
import Toggle from "./toggle";

export default pluginFactory({
    plugins: [
        Input,
        Slider,
        Toggle,
    ]
})