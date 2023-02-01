import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { InputGroup, DropdownButton, Dropdown, FormControl } from 'react-bootstrap';

function TableOfUsers({ users }) {
  const [usersArray, setUsersArray] = useState(users);
  const [sortBy, setSortBy] = useState('возрастание');
  const [sortItem, setSortItem] = useState('Сортировать по:');
  const [findItem, setFindItem] = useState('Поиск по:');
  const [findWord, setFindWord] = useState('');

  const sort = () => {
    if(sortItem === 'id') {
      if(sortBy === 'возрастание') {
        const sArr = [...usersArray];
        const sortedArr = sArr.sort((a, b) => a.id - b.id);
        setUsersArray(sortedArr);
      } else {
        const sArr = [...usersArray];
        const sortedArr = sArr.sort((a, b) => b.id - a.id);
        setUsersArray(sortedArr);
      }
    } else {
      if(sortBy === 'возрастание') {
        const sArr = [...usersArray];
        const sortedArr = sArr.sort();
        setUsersArray(sortedArr);
      } else {
        const sArr = [...usersArray];
        const sortedArr = sArr.sort().reverse();
        setUsersArray(sortedArr);
      }
    }
  }
  const search = () => {
    if(findItem !== 'pay_status') {
      const regExp = new RegExp(`${findWord}`);
      const sArr = [...users];
      const resArr = sArr.filter((user) => {
        return regExp.test(user[findItem]);
      });
      setUsersArray(resArr);
    } else {
      const sArr = [...users];
      switch (findWord) {
        case '+':
          const resArrPlus = sArr.filter((user) => user['pay_status'] === true);
          setUsersArray(resArrPlus);
          break;
        case '-':
          const resArrMinus = sArr.filter((user) => user['pay_status'] === false);
          setUsersArray(resArrMinus);
          break;
        default: 
          setUsersArray([]);  
      }
    }
  }
  return (
    <div>
      <div>
      <InputGroup className="mb-3">
        <DropdownButton
          variant="outline-secondary"
          title={findItem}
          id="input-group-dropdown-1"
        >
          <Dropdown.Item onClick={() => setFindItem('id')}>id</Dropdown.Item>
          <Dropdown.Item onClick={() => setFindItem('email')}>email</Dropdown.Item>
          <Dropdown.Item onClick={() => setFindItem('username')}>username</Dropdown.Item>
          <Dropdown.Item onClick={() => setFindItem('first_name')}>first name</Dropdown.Item>
          <Dropdown.Item onClick={() => setFindItem('last_name')}>last name</Dropdown.Item>
          <Dropdown.Item onClick={() => setFindItem('pay_status')}>pay status</Dropdown.Item>
          <Dropdown.Item onClick={() => setFindItem('profile_link')}>profile link</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => setFindItem('profile_link')}>Поиск по всему</Dropdown.Item>

        </DropdownButton>
        <FormControl aria-label="Text input with dropdown button" placeholder='Введите слово для поиска' onChange={(event) => setFindWord(event.target.value)}/>
        <button type="button" class="btn btn-outline-secondary" onClick={() => search()}>Поиск!</button>
      </InputGroup>
      </div>

      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '5%'}}>
        <InputGroup className="mb-3">
          <DropdownButton
            variant="outline-secondary"
            title={sortItem}
            id="input-group-dropdown-1"
          >
            <Dropdown.Item onClick={() => setSortItem('id')}>id</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortItem('username')}>username</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortItem('first_name')}>first name</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortItem('last_name')}>last name</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            variant="outline-secondary"
            title={sortBy}
            id="input-group-dropdown-1"
          >
            <Dropdown.Item onClick={() => setSortBy('возрастание')}>возрастание</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortBy('убывание')}>убывание</Dropdown.Item>
          </DropdownButton>
        </InputGroup>
        <button type="button" class="btn btn-outline-secondary" onClick={() => sort()}>Сортировать</button>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>id</th>
            <th>email</th>
            <th>first Name</th>
            <th>last Name</th>
            <th>username</th>
            <th>pay status</th>
            <th>profile link</th>
          </tr>
        </thead>  

        <tbody>
          {usersArray.map((user, index) => {
            return <tr>
            <td>{index + 1}</td>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.username}</td>
            <td>{user.pay_status ? '+' : '-'}</td>
            <td>
              {user.profile_link}
            </td>
          </tr>
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default TableOfUsers;
