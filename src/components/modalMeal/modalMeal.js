import React, { useState, useEffect } from 'react'
import {
    Button,
    Input,
    Form,
    Modal,
    notification
} from "antd";
import axios from 'axios'
import { ACTION } from './../../consts/index'
import { useDispatch, useSelector } from 'react-redux'
import { getMeal } from '../../actions';
const ModalMeal = (props) => {
    useEffect(() => {
        if (props.modal2Visible === false) {
            setModal2Visible(false)
        }
    }, [])
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const [modal2Visible, setModal2Visible] = useState(false)
    const modal2VisibleModal = (modal2Visible) => {
        setModal2Visible(modal2Visible)
    }
    const openNotificationSearch = (name) => {
        notification.success({
            message: 'Success',
            description:
                <div>Searching for meal <b>{name}</b> successfully </div>,
        });
    };
    const getAllMealSearch = async (name) => {
        try {

            dispatch({ type: ACTION.LOADING, data: true });
            const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name.mealName}`);
            console.log(res)
            if (res.status === 200) {
                // var actions = getMeal(res.data.meals)
                var array = []
                res.data.meals && res.data.meals.length > 0 && res.data.meals.forEach((values, index) => {
                    array.push({ ...values, count: 1 })
                })
                var actions = getMeal([...array])
                localStorage.setItem('data', JSON.stringify(array))
                dispatch(actions)
                setModal2Visible(false)
                openNotificationSearch(name.mealName)
                form.resetFields()
            }
            dispatch({ type: ACTION.LOADING, data: false });

        } catch (error) {

            dispatch({ type: ACTION.LOADING, data: false });
        }
    };
    const [key, setKey] = useState('')
    const onFinish = (values) => {
        console.log('Success:', values);
        getAllMealSearch(values)
        setKey(values)
    };
    return (
        <div style={{ margin: '0rem 0rem 1rem 1rem', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
            <Button onClick={() => modal2VisibleModal(true)} type="primary" style={{ width: '7.5rem' }}>Add new</Button>

            <Modal
                title="Add new"
                centered
                footer={null}
                visible={modal2Visible}
                onOk={() => modal2VisibleModal(false)}
                onCancel={() => modal2VisibleModal(false)}
            >
                <Form
                    layout={'vertical'}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        name="mealName"
                        label="Input the meal name will count"
                        rules={[{ required: true, message: 'Please input meal name!' }]}
                    >
                        <Input placeholder="Meal name." />
                    </Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
                        <Form.Item >
                            <Button style={{ width: '7.5rem', backgroundColor: '#616161', color: 'white' }} type="primary" htmlType="submit">
                                Add
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>

        </div>

    )
}
export default ModalMeal