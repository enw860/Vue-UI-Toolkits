import Link from "./Link.vue";
import Skeleton from "../skeleton";
import { pluginFactory } from "../../../utils/plugins";

export default pluginFactory({
    components: [
        Link
    ],
    plugins: [
        Skeleton
    ]
})