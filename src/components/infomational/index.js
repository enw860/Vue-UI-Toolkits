import { pluginFactory } from "../../utils/plugins";

import Avatar from "./avatar";
import Badge from "./badge";

export default pluginFactory({
    plugins: [
        Avatar,
        Badge
    ]
})