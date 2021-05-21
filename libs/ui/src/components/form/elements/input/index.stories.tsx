import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { FormInput, FormInputProps } from '.'
import { Form } from '../..'

const Template: Story<FormInputProps> = (args: any) => <FormInput {...args} />

export const Primary = Template.bind({})
Primary.args = {
  name: 'firstName',
  label: 'First Name',
  placeholder: 'Provide your first name',
  registerOptions: { required: true }
}

export default {
  title: 'Forms/FormInput',
  component: FormInput,
  decorators: [
    (Story: any) => (
      <Form
        onSubmit={() => {
          //
        }}
        id='testForm123'
      >
        <Story />
      </Form>
    )
  ]
} as Meta
