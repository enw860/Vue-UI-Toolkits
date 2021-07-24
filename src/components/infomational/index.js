import { pluginFactory } from "../../utils/plugins";

import Avatar from "./avatar";
import Badge from "./badge";
import BreadCrumbs from "./breadCrumbs";
import Button from "./button";
import Clock from "./clock";
import DisplayText from "./displayText";
import HTMLTextLoader from "./htmlTextLoader";
import Link from "./link";
import Messages from "./messages";
import Timer from "./timer";
import Table from "./table";

export default pluginFactory({
    plugins: [
        Avatar,
        Badge,
        BreadCrumbs,
        Button,
        Clock,
        DisplayText,
        HTMLTextLoader,
        Link,
        Messages,
        Timer,
        Table
    ]
})