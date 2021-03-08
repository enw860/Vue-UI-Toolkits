import { pluginFactory } from "../../../utils/plugins";

import ColorInput from "./ColorInput.vue";
import FileInput from "./FileInput.vue";
import InputText from "./InputText.vue";
import NumInput from "./Number.vue";
import Password from "./Password.vue";
import TextArea from "./TextArea.vue";
import SingleSelect from "./SingleSelect.vue";
import CheckboxGroup from "./CheckboxGroup.vue";
import RadioGroup from "./RadioGroup.vue";

import Button from "../../infomational/button";

export default pluginFactory({
    components: [
        ColorInput,
        FileInput,
        InputText,
        NumInput,
        Password,
        TextArea,
        SingleSelect,
        CheckboxGroup,
        RadioGroup
    ],
    plugins: [
        Button
    ]
})