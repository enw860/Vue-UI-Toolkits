import { pluginFactory } from "../../utils/plugins";

import Avatar from "./avatar";
import Badge from "./badge";
import BreadCrumbs from "./breadCrumbs";
import Button from "./button";
import DisplayText from "./displayText";
import HTMLTextLoader from "./htmlTextLoader";
import Link from "./link";
import Table from "./table";

export default pluginFactory({
    plugins: [
        Avatar,
        Badge,
        BreadCrumbs,
        Button,
        DisplayText,
        HTMLTextLoader,
        Link,
        Table,
    ]
})