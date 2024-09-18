import React, { useEffect, useState } from 'react'

const Table = ({handleEdit}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        let oldData = JSON.parse(sessionStorage.getItem('Data'));
        if (oldData) {
            setData(oldData);
        }
    }, [])

    const handleDelete = (index) => {
        console.log(index);

        data.splice(index, 1);
        setData([...data]);
        sessionStorage.setItem('Data', JSON.stringify([...data]));
        console.log([...data]);

    }

    return (
        <div>
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
        </div>
    )
}

export default Table
