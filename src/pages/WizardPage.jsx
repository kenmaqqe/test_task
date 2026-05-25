import { useState } from "react";
import {
    Button,
    Descriptions,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
} from "antd";

const countries = [
    "Ukraine",
    "Poland",
    "Germany",
    "USA",
    "UK",
    "France",
    "Canada",
];

function WizardPage() {
    const [form] = Form.useForm();
    const [submitted, setSubmitted] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [, setFormVersion] = useState(0);

    function handleFinish(values) {
        setFormValues(values);
        setSubmitted(true);
    }

    function handleStartOver() {
        form.resetFields();
        setFormValues({});
        setSubmitted(false);
    }

    if (submitted) {
        return (
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Descriptions title="Summary" bordered column={1}>
                    <Descriptions.Item label="Name">
                        {formValues.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                        {formValues.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Country">
                        {formValues.country}
                    </Descriptions.Item>
                    <Descriptions.Item label="Age">
                        {formValues.age}
                    </Descriptions.Item>
                </Descriptions>
                <Button type="primary" onClick={handleStartOver}>
                    Start Over
                </Button>
            </Space>
        );
    }

    return (
        <Form
            form={form}
            name="wizard"
            layout="vertical"
            onFinish={handleFinish}
            onValuesChange={() => setFormVersion((version) => version + 1)}
        >
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    { required: true, message: "Please enter your name." },
                    { min: 2, message: "Name must be at least 2 characters." },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[
                    { required: true, message: "Please enter your email." },
                    { type: "email", message: "Please enter a valid email." },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="country"
                label="Country"
                rules={[{ required: true, message: "Please choose a country." }]}
            >
                <Select
                    options={countries.map((country) => ({
                        label: country,
                        value: country,
                    }))}
                />
            </Form.Item>

            <Form.Item
                name="age"
                label="Age"
                rules={[{ required: true, message: "Please enter your age." }]}
            >
                <InputNumber min={18} max={100} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item shouldUpdate>
                {() => {
                    const hasErrors = form
                        .getFieldsError()
                        .some((field) => field.errors.length > 0);
                    const allFieldsTouched = form.isFieldsTouched(
                        ["name", "email", "country", "age"],
                        true,
                    );

                    return (
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors || !allFieldsTouched}
                        >
                            Submit
                        </Button>
                    );
                }}
            </Form.Item>
        </Form>
    );
}

export default WizardPage;
