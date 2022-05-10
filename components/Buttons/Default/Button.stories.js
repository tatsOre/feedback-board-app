import React from "react"
import Button from "./index"

export default {
    title: "Button",
    component: Button,
    argTypes: { handleClick: { action: "handleClick" } },
}

const Template = args => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
    variant: "primary",
    children: "+ Add Feedback"
}
