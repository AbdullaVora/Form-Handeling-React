import { useEffect, useState } from "react";



const Form = ({ editIndex, setEditIndex }) => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState({});
  let errors = [];



  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem('Data'));
    if (storedData) {
      setData(storedData);
    }
  }, []);

  useEffect(() => {
    // console.log(editIndex);

    if (editIndex !== undefined && data[editIndex]) {
      setInput(data[editIndex]);
    } else {
      setInput({ name: '', email: '' });
    }
  }, [editIndex, data]);
  const handleInput = (e) => {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value });
    console.log(input);
  };


  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log(e);

    validation(e);
    if (errors.length > 0) {
      let errData = errors.join('\n')
      alert(errData)
      // console.log(errData);
      return;
    }

    if (editIndex === -1) {
      // console.log(editIndex);
      setData((Data) => {
        const newData = [...Data, input];
        sessionStorage.setItem('Data', JSON.stringify(newData));
        return newData;
      });

    } else {
      // console.log(editIndex);
      data[editIndex] = input
      let newData = [...data]
      sessionStorage.setItem('Data', JSON.stringify(newData));
      setEditIndex(-1)
    }
    setInput({});
  };


  const validation = (e) => {

    let check = Object.keys(input);
    for (let i = 0; i < check.length; i++) {
      if (e.target[i].value === '') {
        errors.push(check[i] + " is required")
      }
    }
  }

  return (
    <>
      <div>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" name="name" value={input.name || ''} onChange={(e) => handleInput(e)} />
          <input type="text" name="email" value={input.email || ''} onChange={(e) => handleInput(e)} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>

  );
};

export default Form;
