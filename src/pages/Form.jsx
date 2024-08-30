import { useEffect, useState } from "react";



const Form = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState({});
  const [editIndex, setEditIndex] = useState();

  const handleInput = (e) => {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value });
    console.log(input);
  };

  useEffect(() => {
    let oldData = JSON.parse(localStorage.getItem('Data'));
    if (oldData) {
      setData(oldData);
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(editIndex === undefined){
      setData((Data) => {
        const newData = [...Data, input];
        localStorage.setItem('Data', JSON.stringify(newData));
        return newData;
      });
    } else {
      data[editIndex] = input
      let newData = [...data]
      localStorage.setItem('Data', JSON.stringify(newData));
      window.location.reload();
    }
    setInput({});
  };

  const handleDelete = (index) => {
    console.log(index);

    data.splice(index, 1);
    setData([...data]);
    localStorage.setItem('Data', JSON.stringify([...data]));
    console.log([...data]);

  }

  const handleEdit = (index) => {
    let editData = data[index];
    setInput(editData);
    setEditIndex(index);
  }

  return (
    <>
      <div>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" name="name" value={input.name ? input.name : ''} onChange={(e) => handleInput(e)} />
          <input type="email" name="email" value={input.email ? input.email : ''} onChange={(e) => handleInput(e)} />
          <button type="submit">Submit</button>
        </form>
      </div>

      <table align="center" border={1} cellSpacing={5} cellPadding={10}>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{v.name}</td>
                <td>{v.email}</td>
                <td><button onClick={() => handleDelete(i)}>Delete</button></td>
                |||
                <td><button onClick={() => handleEdit(i)}>Edit</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>

  );
};

export default Form;
