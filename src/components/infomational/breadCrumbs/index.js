import LinkPlugin from "../link";
import BreadCrumbs from "./BreadCrumbs.vue";
import { pluginFactory } from "../../../utils/plugins";

export default pluginFactory({
    components: [
        BreadCrumbs
    ],
    plugins: [
        LinkPlugin
    ]
})