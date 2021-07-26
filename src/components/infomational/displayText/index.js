import DisplayText from "./DisplayText.vue";
import Skeleton from "../skeleton";
import { pluginFactory } from "../../../utils/plugins";

export default pluginFactory({
    components: [
        DisplayText
    ],
    plugins: [
        Skeleton
    ]
})