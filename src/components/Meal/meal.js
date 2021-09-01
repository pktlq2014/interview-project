import React, { useState, useEffect } from 'react'
import { ACTION } from './../../consts/index'
import axios from 'axios'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Input,
  Modal,
  notification,
  Table,
  Form,
} from "antd";
import { getMeal, getMealDelete, getMealSearch, getMealUpdate } from './../../actions';
import ModalMeal from '../modalMeal/modalMeal';
function Meal() {
  const [modal2Visible, setModal2Visible] = useState(false)
  const [modal3Visible, setModal3Visible] = useState(false)
  const [modal4Visible, setModal4Visible] = useState(false)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const getMealReducers = useSelector((getMeal) => getMeal)
  const modal2VisibleModal = (modal2Visible) => {
    setModal2Visible(modal2Visible)
  }
  const [recordUpdate, setRecordUpdate] = useState({})
  const modal3VisibleModal = (modal3Visible, record) => {
    setModal3Visible(modal3Visible)
    setRecordUpdate(record)
    console.log(record)
  }
  const [recordDelete, setRecordDelete] = useState('')
  const modal4VisibleModal = (modal4Visible, record) => {
    setModal4Visible(modal4Visible)
    setRecordDelete(record)
  }
  const modal4VisibleModalMain = (modal4Visible) => {
    setModal4Visible(modal4Visible)
  }
  console.log(getMealReducers.getMeal)
  const getAllMeal = async () => {
    try {
      dispatch({ type: ACTION.LOADING, data: true });
      setLoading(true)
      const res = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      console.log(res)
      if (res.status === 200) {
        var actions = getMeal(res.data.meals)
        var array = []
        res.data.meals && res.data.meals.length > 0 && res.data.meals.forEach((values, index) => {
          array.push({ ...values, count: 1 })
        })
        var actions = getMeal([...array])
        dispatch(actions)

      }
      dispatch({ type: ACTION.LOADING, data: false });
      setLoading(false)
    } catch (error) {
      setLoading(false)
      dispatch({ type: ACTION.LOADING, data: false });
    }
  };

  useEffect(() => {
    getAllMeal();
  }, []);
  const onClickResetData = async () => {
    await getAllMeal()
  }
  const countBy = (arr, prop) => arr.reduce((prev, curr) => (prev[curr[prop]] = ++prev[curr[prop]] || 1, prev), []);

  var count = 0;
  var data = countBy(getMealReducers.getMeal, 'strCategory')
  console.log(countBy(getMealReducers.getMeal, 'strCategory'))
  var dataTable = []
  console.log(data)
  data && data.length > 0 && data.forEach((values, index) => {
    console.log(values)
    dataTable.push({ name: values.split(" ")[0], value: values.split(" ")[1] })
  })
  const [key, setKey] = useState('')
  const [mealData, setMealData] = useState([])
  const columns = [
    // {
    //   title: 'No',
    //   dataIndex: 'name',
    //   render: (text, record) => count++
    // },
    {
      title: 'Meal',
      dataIndex: 'strMeal',
      // render: (text, record) => key ? key : ''
    },
    {
      title: 'Count',
      dataIndex: 'count',
      // render: (text, record) => mealData && mealData.length > 0 ? mealData.length : 0
    },
    {
      title: '',
      dataIndex: 'action',
      width: 150,
      render: (text, record) =>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
          <div onClick={() => modal3VisibleModal(true, record)} style={{ color: '#40A9FF', cursor: 'pointer' }}>Edit</div>
          <div style={{ margin: '0 1rem' }}>|</div>
          <div onClick={() => modal4VisibleModal(true, record)} style={{ color: '#40A9FF', cursor: 'pointer' }}>Delete</div>
        </div>


    },
  ];
  const [form] = Form.useForm()
  const openNotificationSearch = (name) => {
    notification.success({
      message: 'Success',
      description:
        <div>Searching for meal <b>{name}</b> successfully </div>,
    });
  };
  // const [dataLocal, setDataLocal] = useState([])
  // useEffect(() => {
  //   var data = JSON.parse(localStorage.getItem('data'))
  //   setDataLocal(data && data.length > 0 ? data : [])
  // }, [])
  const getAllMealSearch = async (name) => {
    try {
      setLoading(true)
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
      setLoading(false)
    } catch (error) {
      setLoading(false)
      dispatch({ type: ACTION.LOADING, data: false });
    }
  };
  const openNotificationUpdate = (name) => {
    notification.success({
      message: 'Success',
      description:
        <div>Update for meal <b>{name}</b> successfully </div>,
    });
  };
  const openNotificationDelete = (name) => {
    notification.success({
      message: 'Success',
      description:
        <div>Delete for meal <b>{name}</b> successfully </div>,
    });
  };
  const onFinish = (values) => {
    console.log('Success:', values);
    getAllMealSearch(values)
    setKey(values)
  };
  const onFinishUpdate = (values) => {
    console.log('Success:', values);
    var actions = getMealUpdate({ strMeal: values.strMeal, count: values.count, idMeal: recordUpdate.idMeal })
    dispatch(actions)
    setModal3Visible(false)
    openNotificationUpdate(values.strMeal)
  };
  const onClickDelete = () => {
    var actions = getMealDelete({ idMeal: recordDelete.idMeal })
    dispatch(actions)
    setModal4Visible(false)
    openNotificationDelete(recordDelete.strMeal)
  }
  console.log(dataTable)
  const dataForm = form.getFieldValue()
  dataForm.strMeal = recordUpdate && recordUpdate.strMeal ? recordUpdate.strMeal : ''
  dataForm.count = recordUpdate && recordUpdate.count ? recordUpdate.count : 1
  return (
    <div style={{ width: '100%', padding: '1rem', flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
        <div style={{ margin: '0rem 0rem 1rem 1rem', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
          <Button danger onClick={onClickResetData} type="primary" style={{ width: '7.5rem' }}>Reset data</Button>
        </div>
        <ModalMeal />
      </div>
      <Table loading={loading} style={{ width: '100%' }} columns={columns} bordered dataSource={getMealReducers.getMeal} />

      <Modal
        title="Edit meal"
        centered
        footer={null}
        visible={modal3Visible}
        onOk={() => modal3VisibleModal(false)}
        onCancel={() => modal3VisibleModal(false)}
      >
        <Form
          layout={'vertical'}
          onFinish={onFinishUpdate}
          form={form}
        >
          <Form.Item
            name="strMeal"
            // label="Input the meal name will count"
            rules={[{ required: true, message: 'Please input meal name!' }]}
          >
            <Input placeholder="Meal name." />
          </Form.Item>
          <Form.Item
            name="count"
            // label="Input the meal name will count"
            rules={[{ required: true, message: 'Please input meal name!' }]}
          >
            <Input placeholder="Meal name." />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
            <Form.Item >
              <Button style={{ width: '7.5rem', backgroundColor: '#616161', color: 'white' }} type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Delete meal"
        centered
        footer={null}
        visible={modal4Visible}
        onOk={() => modal4VisibleModalMain(false)}
        onCancel={() => modal4VisibleModalMain(false)}
      >
        <div>{`Are you want to delete "${(recordDelete.strMeal && recordDelete) || (recordDelete && recordDelete.strMeal !== '') || (recordDelete && recordDelete.strMeal !== 'default') || (recordDelete && recordDelete.strMeal !== ' ') ? recordDelete.strMeal : ''}" with the count is ${recordDelete.count && recordDelete ? recordDelete.count : ''}?`}</div>
        <div style={{ display: 'flex', marginTop: '1rem', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>

          <Button onClick={onClickDelete} style={{ width: '7.5rem', backgroundColor: '#616161', color: 'white' }} type="primary" htmlType="submit">
            Delete
          </Button>

        </div>
      </Modal>
    </div>
  );
}

export default Meal;
