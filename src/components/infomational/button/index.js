import Button from "./Button.vue";
import Skeleton from "../skeleton";
import { pluginFactory } from "../../../utils/plugins";

export default pluginFactory({
    components: [
        Button
    ],
    plugins: [
        Skeleton
    ]
})