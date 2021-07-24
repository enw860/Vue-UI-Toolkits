import Timer from "./Timer.vue";
import { pluginFactory } from "../../../utils/plugins";
import ButtonPlugin from "../../infomational/button";

export default pluginFactory({
    components: [
        Timer
    ],
    plugins: [
        ButtonPlugin
    ]
})