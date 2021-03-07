import { pluginFactory } from "../../utils/plugins";

import Avatar from "./avatar";
import Badge from "./badge";
import Link from "./link";

export default pluginFactory({
    plugins: [
        Avatar,
        Badge,
        Link
    ]
})