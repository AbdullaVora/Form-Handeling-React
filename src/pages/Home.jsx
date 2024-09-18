import React, { useState } from 'react'
import Form from '../components/Form'
import Table from '../components/Table'

const Home = () => {

  const [editIndex, setEditIndex] = useState(-1);

  const editData = (index) => {
    setEditIndex(index)
  }

  return (
    <div>
      <Form editIndex={editIndex} setEditIndex={setEditIndex}/>
      <Table handleEdit={editData} />
    </div>
  )
}

export default Home
