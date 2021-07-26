import Notifications from "./Notifications.vue";
import Button from "../button";
import DisplayText from "../displayText";
import { pluginFactory } from "../../../utils/plugins";

export default pluginFactory({
    components: [
        Notifications
    ],
    plugins: [
        Button,
        DisplayText,
    ]
})